<script setup>

import { http, generalHttpHandle } from '~~/services/http/mod';

const router = useRouter();
const route = useRoute();


/* interface */

const props = defineProps({
  label: String,
  url: String,
  modelValue: String,
});

const emit = defineEmits([
  'update:modelValue',
]);


/* file */

const refInput = ref();
const uploading = ref(false);


async function handleFileSelection(file) {

  if (!file) {
    return;
  }


  const formData = new FormData();
  formData.append('file', file);

  uploading.value = true;
  const { status, data } = await http.request({
    method: 'post',
    url: props.url,
    body: formData,
  });
  uploading.value = false;

  if (generalHttpHandle(status, data)) {
    return;
  }


  emit('update:modelValue', data.mediaId);

}


/* template */

</script>


<template>

  <v-text-field
    :label="props.label"
    readonly
    hide-details
    v-bind="$attrs"
    :model-value="props.modelValue"
    @click="refInput.click()"
  />

  <input
    ref="refInput"
    type="file"
    :key="uploading"
    class="d-none"
    @change="handleFileSelection($event.target.files?.[0])"
  />

</template>