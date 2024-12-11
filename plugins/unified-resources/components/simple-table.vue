<script setup>

const props = defineProps({
  headers: Array,
  items: {
    type: Array,
    required: true,
  },
  itemKey: {
    type: String,
    default: '_id',
  },
  actions: {
    type: Array,
    default: () => [],
  },
  toggleActions: {
    type: Array,
    default: () => [],
  },
  actionsTitle: {
    type: String,
    default: 'Actions',
  },
  totalElements: Number,
  PageNum: Number,
});

const emit = defineEmits(['update:loadList']);
const actionsLoading = reactive({});
const loading = ref(false);

const arrayItems = computed(() => props.items);

async function handleActionClick(action, item, index) {
  const num = arrayItems.value.findIndex(elem => elem[props.itemKey] === item[props.itemKey]);

  if (num !== -1) {
    const currentItem = arrayItems.value[num];
    currentItem.status = currentItem.status === 'stopped' ? 'started' : 'stopped';

    actionsLoading[`${item[props.itemKey]}-${action.key}`] = true;
    try {
      await action.handler?.(item, index);
    } catch (error) {
      console.error('Action handler failed:', error);
    } finally {
      actionsLoading[`${item[props.itemKey]}-${action.key}`] = false;
    }
  }
}

const loadItems = async ({ page, itemsPerPage, sortBy }) => {
  loading.value = true;

  try {
    const adjustedItemsPerPage = itemsPerPage === -1 ? '' : itemsPerPage;
    emit('update:loadList', { page, itemsPerPage: adjustedItemsPerPage, sortBy });
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <v-card flat>
    <v-data-table-server
      hover
      :loading="loading"
      :items-length="totalElements"
      :page="PageNum"
      :headers="headers"
      :items="arrayItems"
      @update:options="loadItems"
    >
      <template v-slot:headers="{ columns }">
        <tr class="bg-grey-lighten-3 py-0 my-0">
          <td v-if="toggleActions.length > 0"></td>
          <template v-for="column in columns" :key="column.key">
            <td class="text-caption header-cell">{{ column.title }}</td>
          </template>
          <td class="text-caption" v-if="actions.length > 0">{{ actionsTitle }}</td>
        </tr>
      </template>

      <template v-slot:item="{ item, index }">
        <tr>
          <td v-if="toggleActions.length > 0" class="text-center">
            <v-btn
              v-for="action in toggleActions"
              :key="action.key"
              icon
              size="small"
              density="comfortable"
              :variant="action.variant || 'tonal'"
              :color="item.status === 'stopped' ? action.playColor : action.stopColor"
              :disabled="item.status === 'started'"
              class="me-2 my-1"
              @click="handleActionClick(action, item, index)"
            >
              <v-icon size="small" :icon="item.status === 'stopped' ? action.playIcon : action.stopIcon" />
              <v-tooltip activator="parent" :text="action.title" />
            </v-btn>
          </td>

          <td v-for="header in headers" :key="header.key">
            <div v-if="header.type === 'chip'" class="text-start">
              <v-chip :color="header.color" :text="item[header.key]" class="text-uppercase" label size="small" />
            </div>
            <div v-else>{{ item[header.key] }}</div>
          </td>

          <td v-if="actions.length > 0">
            <v-menu>
              <template v-slot:activator="{ props }">
                <v-btn size="small" color="blue-darken-3" variant="tonal" prepend-icon="mdi-dots-horizontal" v-bind="props">
                  {{ actionsTitle }}
                </v-btn>
              </template>
              <v-list>
                <v-list-item v-for="action in actions" :key="action.key" style="min-height: 35px;">
                  <v-btn
                    density="comfortable"
                    :prepend-icon="action.icon"
                    size="small"
                    class="me-2 my-1"
                    :variant="action.variant || 'flat'"
                    :color="action.color"
                    @click="handleActionClick(action, item, index)"
                  >
                    {{ action.title }}
                  </v-btn>
                </v-list-item>
              </v-list>
            </v-menu>
          </td>
        </tr>
      </template>
    </v-data-table-server>
  </v-card>
</template>
<style lang="scss" scoped>
.header-cell {
  margin: 0px !important;
  height: 10px !important;
}
</style>