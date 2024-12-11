<script setup>

import { http, cartaxHttp, generalHttpHandle } from '~~/services/http/mod';

import get from 'lodash/get';


/* interface */

const props = defineProps({
  modelValue: {},
  field: {},
  success: Boolean,
  error: Boolean,
  messages: Array,
});

const emit = defineEmits([
  'update:modelValue'
]);


/* items */

const loading = ref(false);
const items = ref([]);


async function loadData() {

  if (props.field.gate && !props.field.gate()) {
    return;
  }


  let url = props.field.baseUrl;

  if (!url) {
    return;
  }


  const handler = props.field.isCartax ? cartaxHttp : http;

  loading.value = true;
  const { status, data } = await handler.request({
    method: 'get',
    url,
  });
  loading.value = false;

  if (generalHttpHandle(status, data)) {
    return;
  }


  if (props.field.dataExtractPath) {
    items.value = get(data, props.field.dataExtractPath);
  }
  else {
    items.value = data;
  }

}

watch(
  [() => props.field.baseUrl],
  loadData,
  {
    immediate: true,
  }
);


/* menu */

const isMenuOpened = ref(false);
const query = ref('');

const queriedItems = computed(() =>
  items.value.filter(it =>
    (props.field.itemTitle ? it[props.field.itemTitle] : (it?.title ?? it))?.includes(query.value)
  )
);

</script>

<template>
  <v-menu :close-on-content-click="false" v-model="isMenuOpened">

    <template #activator="{ props: pr }">
      <div v-bind="props.field.complexMenu ? pr : {}">
        <v-autocomplete
          :label="props.field.label"
          :variant="props.field.variant ?? 'outlined'"
          :type="props.field.type"
          :density="props.field.density"
          :direction="props.field.direction"
          :prepend-icon="props.field.prependIcon"
          :append-icon="props.field.appendIcon"
          :prepend-inner-icon="props.field.prependInnerIcon"
          :color="props.field.color"
          :autofocus="props.field.autofocus"
          :placeholder="props.field.placeholder"
          :prefix="props.field.prefix"
          :suffix="props.field.suffix"
          :hint="props.field.hint"
          :multiple="props.field.multiple"
          :chips="props.field.chips"
          :closeable-chips="props.field.closeableChips"
          :menu-icon="props.field.menuIcon"
          :menu-props="props.field.menuProps"
          :items="items"
          :item-value="props.field.itemValue"
          :item-title="props.field.itemTitle"
          :model-value="props.modelValue"
          :loading="loading"
          @update:model-value="emit('update:modelValue', $event)"
          @click:append-inner="props.field.appendInnerAction()"
          :error="props.error"
          :success="props.success"
          :messages="props.messages"
          :return-object="props.field.returnObject"
          hide-details="auto"
          :readonly="props.field.complexMenu"
        >
          <template v-for="action of props.field.actions" #[action.side] :key="action.title + action.icon">
            <v-btn
              :density="action.icon ? 'comfortable' : undefined"
              class="mt-n2"
              v-bind="action">
              <v-icon v-if="action.icon">{{ action.icon }}</v-icon>
              <span v-else>{{ action.title }}</span>
            </v-btn>
          </template>
        </v-autocomplete>
      </div>
    </template>
    <v-card>

      <v-card-text>
        <v-text-field
          variant="outlined"
          prepend-inner-icon="mdi-magnify"
          density="comfortable"
          label="جستجو"
          hide-details
          v-model="query"
        />
      </v-card-text>

      <template v-if="!queriedItems || queriedItems.length === 0">
        <p class="text-caption text-center pb-4">
          موردی وجود ندارد.
        </p>
      </template>
      <template v-else>

        <v-list>
          <v-list-item
            v-for="item of queriedItems.slice(0, 10)" :key="item[props.field.itemValue]"
            :title="item[props.field.itemTitle]"
            :active="item[props.field.itemValue] === (props.field.returnObject ? props.modelValue?.[props.field.itemValue] : props.modelValue)"
            active-color="primary"
            @click="emit('update:modelValue', props.field.returnObject ? item : item[props.field.itemValue]); isMenuOpened = false;"
          />
        </v-list>

        <p v-if="queriedItems.length > 10" class="text-caption text-center pa-4">
          {{ queriedItems.length - 10 }} مورد دیگر وجود دارد. عنوان مورد نظر را در قسمت جستجو وارد کنید.
        </p>

      </template>
    </v-card>
  </v-menu>
</template>
/* این کامپوننت جهت نمایش فیلد سلکت با امکان دریافت دیتا از طریق api میباشد. که
دارای امکان سرچ و همچنین امکان نمایش به صورت lazyload در صورت ارسال complex prop
مبیاشد */