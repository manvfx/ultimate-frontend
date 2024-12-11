<script setup>

/* interface */

const props = defineProps({
  headers: Array,
  items: Array,
  itemKey: {
    type: String,
    default: '_id',
  },
  actions: Array,
  actionsTitle: {
    type: String,
    default: 'Actions',
  },
  selectedItems: Array,
});

const emit = defineEmits([]);

/* actions */

const actionsLoading = reactive({});
async function handleActionClick(action, item, index) {
  actionsLoading[`${item[props.itemKey]}-${action.key}`] = true;
  try {
    await action.handler?.(item, index);
  }
  catch {}
  actionsLoading[`${item[props.itemKey]}-${action.key}`] = false;

}

/* template */

import startCase from 'lodash/startCase';
const isMobile = inject('isMobile');

// pagination
const currentPage = ref(1);
const itemsPerPage = 10; // You can adjust this based on your requirements

const totalPages = ref(Math.ceil(props.items.length / itemsPerPage));

watchEffect(() => {
  // Update total pages when items change
  totalPages.value = Math.ceil(props.items.length / itemsPerPage);
});

const changePage = (page) => {
  currentPage.value = page;
};

const paginatedItems = ref([]);

watchEffect(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  paginatedItems.value = props.items.slice(startIndex, endIndex);
});

const generateIcon = (item) => {
  if (item.status === 'started') {
    return 'mdi-stop'
  } else{
    return 'mdi-play'
  }
}

const generateColor = (item) => {
  if (item.status === 'started') {
    return 'error'
  } else{
    return 'success'
  }
}

</script>


<template>
  <v-card variant="flat">
    <v-card-text>
      <v-table hover style="border-radius: 0;">

      <thead class="bg-grey-lighten-3 text-caption">
        <tr>
          <th v-for="header of headers" :key="header.key" style="white-space: nowrap;">
            {{ header.title || startCase(header.key) }}
          </th>
          <th v-if="props.actions">
            {{ props.actionsTitle }}
          </th>

        </tr>
      </thead>

      <tbody>
        <tr
          v-for="(item, index) of paginatedItems" :key="item[props.itemKey]"
          :style="{
            'background': (props.selectedItems?.includes(item[props.itemKey])) ? 'rgba( var(--v-theme-primary), 0.069)' : undefined,
          }">

          <td v-for="header of headers" :key="header.key">
            <slot name="item" :header="header" :item="item" :data="item[header.key]">
              {{ item[header.key] }}
            </slot>
          </td>

          <td v-if="props.actions" style="white-space: nowrap;">
            <!-- :loading="actionsLoading[`${item[props.itemKey]}-${action.key}`]" -->
            <template v-if="isMobile">
              <v-btn
                v-for="action of props.actions" :key="action.key"
                :color="action.color"
                variant="outlined"
                :prepend-icon="action.icon"
                size="small"
                flat
                class="me-2 my-1"                
                @click="handleActionClick(action, item, index)">
                {{ action.title }}
              </v-btn>
            </template>

            <template v-else>
              <!-- :loading="actionsLoading[`${item[props.itemKey]}-${action.key}`]" -->
              <v-btn
                v-for="action of props.actions" :key="action.key"
                size="small"
                density="comfortable"
                :variant="action.variant || 'tonal'"
                :color="action.color === '' ? generateColor(item) : action.color"
                :icon="action.icon === '' ? generateIcon(item) : action.icon"
                class="me-2 my-1"
                
                @click="handleActionClick(action, item, index)">

                <v-icon
                  size="small"
                  :icon="action.icon === '' ? generateIcon(item) : action.icon"
                />
               
                <v-tooltip
                  activator="parent"
                  :text="action.title"
                />
              </v-btn>
            </template>

          </td>

        </tr>
      </tbody>

      </v-table>
      
      <v-pagination
          v-if="items.length > 0"
          v-model="currentPage"
          :length="totalPages"
          @input="changePage"
          size="small"
          class="text-left"
        ></v-pagination>
    </v-card-text>
  </v-card>
</template>
