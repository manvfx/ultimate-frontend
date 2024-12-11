<script setup>

/* interface */

const props = defineProps({
  field: {
    type: Object,
  },
  value: {},
  success: Boolean,
  error: Boolean,
  messages: {},
});

const emit = defineEmits([
  'input',
]);


/* code */

function updateCode(index, value) {

  const currentItems = (props.value || '').split('-');
  currentItems.length = 7;

  currentItems[index] = value;

  emit('input', currentItems.join('-'));

}


/* template */

</script>


<template>
  <div class="form-element-renovation-code">

    <v-label :class="{ 'text-error': props.error }">
      {{ props.field.label }}
    </v-label>

    <div class="d-flex align-center gap-1 text-ltr mt-2">

      <v-text-field
        v-for="index of 7" :key="index"
        type="number"
        hide-details
        class="pa-0"
        :model-value="props.value?.split('-')[index - 1]"
        @update:model-value="updateCode(index - 1, $event)"
      />

      <v-btn
        variant="text"
        icon="mdi-close"
        size="x-small"
        density="comfortable"
        @click="emit('input', '')"
      />

    </div>

    <v-list density="compact" color="error" class="pt-0">
      <v-list-item v-for="message of props.messages" :key="message">
        <v-list-item-title class="text-caption text-error">
          {{ message }}
        </v-list-item-title>
      </v-list-item>
    </v-list>

  </div>
</template>


<style lang="scss" scoped>
  .form-element-renovation-code :deep(input) {
    padding-left: 4px;
    padding-right: 4px;
    text-align: center;
  }
</style>
/* این کامپوننت جهت نمایش فیلد کد نوسازی در فرم میباشد که در بخش املاک من مورد
استفاده قرار گرفته است */