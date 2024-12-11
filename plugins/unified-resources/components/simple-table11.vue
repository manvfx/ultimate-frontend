<template>
<div>{{ itemsPerPage }}</div>
<div>{{ props.items.length }}</div>
<div>{{ serverItems.length }}</div>
{{ loadItems.length }}
<br/>
{{ itemsPerPage }}
<br/>
{{ totalElements }}
    <v-data-table-server
      v-model:items-per-page="itemsPerPage"
      :search="search"
      :headers="headers"
      :items-length="totalElements"
      :items="serverItems"
      :loading="loading"
      item-value="name"
      @update:options="loadItems"
    >
    <!-- <template v-slot:thead>
        <tr>
          <td>
            <v-text-field v-model="name" hide-details placeholder="جستجو کنید..." class="ma-2" density="compact"></v-text-field>
          </td>
          <td>
            <v-text-field
              v-model="calories"
              hide-details
              placeholder="Minimum calories"
              type="number"
              class="ma-2"
              density="compact"
            ></v-text-field>
          </td>
        </tr>
    </template> -->
    <template v-slot:headers="{ columns }">
        <tr class="bg-grey-lighten-3">
          <template v-for="column in columns" :key="column.key">
            <td>
            {{ column.title }}
          </td>
          </template>
          <td  v-if="props.actions.length > 0">
            عملیات
          </td>
        </tr>
    </template>
    <template v-slot:item="{ item }">
        <tr v-for="item in serverItems">
          <td v-for="header in props.headers">
            <div class="text-start" v-if="header.type ==='chip'">
              <v-chip :color="header.color"
                :text="item[header.key]" class="text-uppercase" label size="small"></v-chip>
            </div>
            <div v-else>
                {{ item[header.key] }}
            </div>
          </td>
          <td>
            <v-btn v-for="action of props.actions" :key="action.key" size="small" density="comfortable"
                :variant="action.variant || 'tonal'" :color="action.color === '' ? generateColor(item) : action.color"
                :icon="action.icon === '' ? generateIcon(item) : action.icon" class="me-2 my-1"
                @click="handleActionClick(action, item, index)">
                <v-icon size="small" :icon="action.icon === '' ? generateIcon(item) : action.icon" />
                <v-tooltip activator="parent" :text="action.title" />
              </v-btn>
          </td>
        </tr>
    </template>
  </v-data-table-server>
</template>
<script setup>
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
      Count: Number,
      totalElements: Number,
      totalPages:Number,
      PageNum:Number
    });
    const emit = defineEmits(['loadList']);

    const itemsPerPage= ref(10)
    const loading= ref(true)
    const totalItems=ref(0)
    const search= ref('')
    const name= ref('')
    const calories= ref('')
    const serverItems= ref([])
    
    const page = ref(1)

    itemsPerPage.value = props.Count   
    page.value=props.PageNum
    totalItems.value=props.totalElements
    const actionsLoading = reactive({});
    async function handleActionClick(action, item, index) {
      actionsLoading[`${item[props.itemKey]}-${action.key}`] = true;
      try {
        await action.handler?.(item, index);
      }
      catch {}
      actionsLoading[`${item[props.itemKey]}-${action.key}`] = false;
    }
 
    // watch(events, (newEvents) => {
    //     name(()=> {
    //       search.value = String(Date.now())
    //     }),
    //     calories(()=> {
    //       search.value = String(Date.now())
    //     })
    // });


    const callAPI={
      async fetch ({ page, itemsPerPage, sortBy, search }) {
        
        return new Promise(resolve => {
          setTimeout(() => {
            // const start = (page - 1) * itemsPerPage
            // const end = start + itemsPerPage
            console.log('swkdlsaddcfvdvdc xc',page, itemsPerPage)
            // const start = (page - 1) * itemsPerPage
            // const end = start + itemsPerPage
            emit('update:loadList',{page,itemsPerPage})

            const items = props.items.slice()
  
            // if (sortBy.length) {
            //   const sortKey = sortBy[0].key
            //   const sortOrder = sortBy[0].order
            //   items.sort((a, b) => {
            //     const aValue = a[sortKey]
            //     const bValue = b[sortKey]
            //     return sortOrder === 'desc' ? bValue - aValue : aValue - bValue
            //   })
            // }
            
            // console.log('swkdlsaddcfvdvdc xc',start, end)
            // console.log('items ',items.length)
            console.log('items in callAPI',items)


            // let paginated = [];

            // // use a for loop to iterate from index 10 to index 20
            // for (let i = start; i < end; i++) {
            //   console.log(i)
            // // check if the index is valid
            //   if (i < itemss.length) {
            //   // push the element to the slice array
            //     paginated.push(props.items[i]);
              
            //   }
            // }

             const paginated = items.slice(0, itemsPerPage)
            // console.log('paginated in callAPI',paginated)
            resolve({ items: paginated, total: items.length })
          }, 1000)
        })
      }
    }

    const loadItems =async ({page, itemsPerPage, sortBy })=>{
      // console.log('page=====>', page )
      // console.log('itemsPerPage=====>', itemsPerPage)
      loading.value= true
      await callAPI.fetch({ page, itemsPerPage, sortBy, search: { name: name.value, calories:calories.value } }).then(({ items, total }) => {
        console.log('items in callAPI',items)
          serverItems.value = items
          totalItems.value = total
          loading.value = false
          console.log('serverItems in callAPI',totalItems.value)
          console.log('serverItems in callAPI',serverItems.value)
      })
    }
    // watchEffect(() =>{
    //   // console.log('props.items changed', props.items)
      
    //   if(serverItems.value){
    //     loadItems
    //   }
    //   // loadItems(page, itemsPerPage, {} )
    // }
      
    // )

</script>