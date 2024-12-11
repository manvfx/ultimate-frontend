<script setup>

import { AppConfig } from '~~/app-config';
import { http, generalHttpHandle } from '~~/services/http/mod';
import { toastError } from '~/services/toasts/mod';
import checkotikMediaView from '../checkotik-media-view.vue';

const token = inject('token');
const maximumFileSize = 1024 * 1024 * 6;


/* interface */

const props = defineProps({
  modelValue: {},
  field: {},
  success: Boolean,
  error: Boolean,
  messages: Array,
});

const emit = defineEmits([
  'update:modelValue',
]);


/* file */

const refInput = ref();
const uploading = ref(false);
let mediaBlob = ref(null);

function handleFileSelection(file) {
  
  if (!file) {
    return;
  }

  if (file.size > maximumFileSize) {
    return toastError({
      title: 'حداکثر اندازه فایل انتخاب شده ۶ مگا بایت می باشد.'
    });
  }

  if (!file.type.toLowerCase().includes('image')) {
    return toastError({
      title: 'فرمت فایل انتخابی اشتباه می باشد.'
    });
  }
  var reader = new FileReader();


  reader.onload = async function(e) {
  // Get the Base64 string of the image
  var base64String = e.target.result;


  emit('update:modelValue', base64String);
  // mediaBlob.value = file;
};

// Read the file as a Data URL (Base64 string)
 reader.readAsDataURL(file);

}

import { launchDialog } from '~~/services/dialogs/mod';

function viewFile() {
  launchDialog({
    component: checkotikMediaView,
    props: {
      url: props.field.url,
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
    let dlUrl = `${AppConfig.http.baseUrl}/api/v4/media${props.field.url}`;
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
    :model-value="props.modelValue"
    @update:model-value="emit('update:modelValue', $event)"
    @click:append-inner="props.field.appendInnerAction()"
    @click="refInput.click()"
  >
    <template v-slot:append-inner v-if="props.modelValue">
      <v-icon size="25" class="ml-2" @click="emit('update:modelValue', '')"> mdi-close </v-icon>
      <v-icon size="25" class="ml-2" @click="viewFile()">mdi-eye</v-icon>
      <v-icon size="25" class="ml-2" @click="downloadFile()"> mdi-download </v-icon>
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