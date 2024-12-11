<script setup>
/* interface */
const props = defineProps({
  headers: Array,
  items: Array,
  itemKey: {
    type: String,
    default: 'id'
  },
  actions: Array,
  actionsTitle: {
    type: String,
    default: 'عملیات'
  },
  selectedItems: Array
})

const emit = defineEmits([])
const itemsPerPage = ref(5)
const search = ref('')

const actionsLoading = reactive({})

async function handleActionClick (action, item, index) {
  actionsLoading[`${item[props.itemKey]}-${action.key}`] = true
  try {
    await action.handler?.(item.raw, index)
  } catch {}
  actionsLoading[`${item[props.itemKey]}-${action.key}`] = false
}

/* template */

import startCase from 'lodash/startCase'
const isMobile = inject('isMobile')
</script>

<template>
  <v-responsive max-width="320">
    <v-text-field
      v-model="search"
      density="compact"
      append-inner-icon="mdi-magnify"
      label="جستجو"
      single-line
      hide-details
      variant="outlined"
      class="mb-4"
    ></v-text-field>
  </v-responsive>

  <v-data-table
    v-model:items-per-page="itemsPerPage"
    :headers="headers"
    :items="items"
    :items-value="name"
    :search="search"
    class="elevation-0 no-wrap"
  >
    <template v-slot:headers="{ columns, isSorted, getSortIcon, toggleSort }">
      <tr>
        <template v-for="column in columns" :key="column.key">
          <td>
            <span
              class="mr-2 cursor-pointer text-uppercase text-caption font-weight-meduim"
              @click="() => toggleSort(column)"
              >{{ column.title }}</span
            >
            <template v-if="isSorted(column)">
              <v-icon size="small" :icon="getSortIcon(column)"></v-icon>
            </template>
            <v-icon
              v-if="column.removable"
              icon="$close"
              @click="() => remove(column.key)"
            ></v-icon>
          </td>
        </template>
        <td
          v-if="actions"
          class="text-uppercase text-caption font-weight-meduim"
        >
          عملیات
        </td>
      </tr>
    </template>

    <template v-slot:item="{ item, index }">
      <tr>
        <template v-for="(row, itemIndex) in item.columns" :key="itemIndex">
          <td>
            {{ row }}
          </td>
        </template>

        <td v-if="actions" style="white-space: nowrap">
          <template v-if="isMobile">
            <v-btn
              v-for="action of actions"
              :key="action.key"
              :color="action.color"
              variant="outlined"
              :prepend-icon="action.icon"
              size="small"
              flat
              class="me-2 my-1"
              
              @click="handleActionClick(action, item, index)"
            >
              {{ action.title }}
            </v-btn>
          </template>

          <template v-else>
            <v-btn
              v-for="action of actions"
              :key="action.key"
              variant="flat"
              size="small"
              density="comfortable"
              :color="action.color"
              :icon="action.icon"
              class="me-2 my-1"              
              @click="handleActionClick(action, item, index)"
            >
              <v-icon size="small" :icon="action.icon" />
              <v-tooltip activator="parent" :text="action.title" />
            </v-btn>
          </template>
        </td>
      </tr>
    </template>

  </v-data-table>
</template>
<style lang="scss" scoped>
.v-data-table {
  padding-bottom: 20px;
}
.v-data-table.no-wrap {
  th {
    white-space: nowrap;
  }
}
.v-data-table .v-table__wrapper > table > thead > tr > td,
.v-data-table .v-table__wrapper > table > thead > tr th {
  background: #f1f1f1;
  color: black;
  font-size: 16px;
}
</style>
