<script setup>

import { AppConfig } from '~~/app-config';
import { http, generalHttpHandle } from '~~/services/http/mod';
import { toastError } from '~/services/toasts/mod';

import carMediaView from '../car-media-view.vue';
import heic2any from 'heic2any';

const token = inject('token');
const maximumFileSize = 1024 * 1024 * 6;


/* interface */

const props = defineProps({
  value: {},
  field: {},
  success: Boolean,
  error: Boolean,
  messages: Array,
});

const emit = defineEmits([
  'input',
  'update:modelValue',
]);


/* file */

const refInput = ref();
const uploading = ref(false);
let mediaBlob = ref(null);

async function handleFileSelection(file) {

  if (!file) {
    return;
  }

  if (file.size > maximumFileSize) {
    return toastError({
      title: 'حداکثر اندازه فایل انتخاب شده ۶ مگا بایت می باشد.'
    });
  }

  if (!file.type.toLowerCase().includes('image') && !file.name.toLowerCase().includes('.heic')) {
    return toastError({
      title: 'فرمت فایل انتخابی اشتباه می باشد.'
    });
  }


  if (file.name.toLowerCase().includes('.heic')) {

    const fileObjectUrl = URL.createObjectURL(file);
    const res = await fetch(fileObjectUrl);
    const blob = await res.blob();

    const conversionResult = await heic2any({
      blob,
    });

    file = conversionResult;

  }


  const formData = new FormData();
  formData.append('file', file);

  uploading.value = true;
  const { status, data } = await (props.field.httpHandler ?? http).request({
    method: 'post',
    url: props.field.url,
    body: formData,
  });
  uploading.value = false;

  if (generalHttpHandle(status, data)) {
    return;
  }


  emit('input', data.mediaId);
  mediaBlob.value = file;

}


import { launchDialog } from '~~/services/dialogs/mod';

function viewFile() {
  launchDialog({
    component: carMediaView,
    props: {
      url: props.field.downloadUrl,
      noCache: true,
      blob: mediaBlob.value ? URL.createObjectURL(mediaBlob.value) : null,
    },
  });
}


import { saveBlobAsFile } from '~/plugins/file-saver/blob-saver';

function downloadFile() {

  if (!props.field.downloadUrl && !mediaBlob.value) {
    return;
  }

  if (mediaBlob.value) {
    saveBlobAsFile(mediaBlob.value, 'file');
  }
  else {

    let dlUrl = `${AppConfig.sarv.baseUrl}/api/v1/media${props.field.downloadUrl}`;

    fetch(dlUrl, {
      method: 'POST',
      headers: { Authorization: token.value },
    }).then((response) => {
      response.arrayBuffer().then(function (buffer) {
        const url = window.URL.createObjectURL(new Blob([buffer]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'image.jpg');
        document.body.appendChild(link);
        link.click();
      });
    });

  }

}

</script>

<template>
  <v-text-field
    :label="props.field.label"
    :variant="props.field.variant"
    :prepend-icon="props.field.prependIcon"
    :append-icon="props.field.appendIcon"
    :prepend-inner-icon="props.field.prependInnerIcon"
    :append-inner-icon="props.field.appendInnerIcon"
    :placeholder="props.field.placeholder"
    :density="props.field.density"
    :hint="props.field.hint"
    :readonly="props.field.readonly"
    :loading="uploading"
    hide-details
    v-bind="$attrs"
    :model-value="props.value"
    @update:model-value="emit('input', $event)"
    @click:append-inner="props.field.appendInnerAction()"
    @click="refInput.click()"
  >
    <template v-slot:append-inner v-if="props.value">
      <v-icon size="25" class="ml-1" @click="emit('input', '')"> mdi-close </v-icon>
      <v-icon size="25" class="ml-1" @click="viewFile()">mdi-eye</v-icon>
      <v-icon size="25" class="ml-1" @click="downloadFile()"> mdi-download </v-icon>
    </template>
  </v-text-field>

  <input
    ref="refInput"
    type="file"
    :key="uploading"
    class="d-none"
    @change="handleFileSelection($event.target.files?.[0])"
  />
</template>
/* این کامپوننت جهت نمایش فایل آپلود در فرم میباشد که امکان دریافت فایل با فرمت
heic، حذف فایل انتخاب شده، پیش نمایش فایل انتخاب شده و دانلود فایل انتخاب شده را
داراست. و در بخش خوردرو های من در قبت خوردرو مورد استفاده قرار گرفته است. */