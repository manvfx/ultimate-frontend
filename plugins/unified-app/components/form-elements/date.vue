<script setup>

/* interface */

const props = defineProps({
  field: Object,
  modelValue: {},
  success: Boolean,
  error: Boolean,
  messages: Array,
});

const emit = defineEmits(['update:modelValue'])


/* date */

import dayjs from 'dayjs';

const fieldTitle = computed(() => {

  if (!props.modelValue) {
    return;
  }

  if (props.field.dateType === 'time') {
    return props.modelValue;
  }

  if (props.field.labelFormat) {
    return dayjs(props.modelValue).locale(props.field.labelLocale || 'fa').calendar(props.field.labelCalender || 'jalali').format(props.field.labelFormat);
  }

  return props.modelValue;

});

const fieldValue = computed(() => {

  if (!props.modelValue) {
    return;
  }

  if (props.field.dateType === 'time') {
    return props.modelValue;
  }

  if (props.field.valueFormat || props.field.labelFormat) {
    return dayjs(props.modelValue, { jalali: true }).locale('en').calendar('gregory').format('YYYY-MM-DD HH:mm');
  }

  return props.modelValue;

});

function handleDateChange(newDate) {

  if (props.field.dateType === 'time') {
    emit('update:modelValue', newDate.slice(newDate.indexOf(' ') + 1));
    return;
  }

  const epoch = dayjs(newDate, 'YYYY-MM-DD HH:mm').locale('en').calendar('gregory').valueOf();

  if (props.field.valueFormat) {

    emit(
      'update:modelValue',
      dayjs(epoch).locale('fa').calendar('jalali').format(props.field.valueFormat)
    );

    isOpened.value = false;
    return;

  }

  emit('update:modelValue', epoch);
  isOpened.value = false;

}


/* template */

import DatePicker from 'vue3-persian-datetime-picker';

const isOpened = ref(false);

</script>

<template>
  <div class="form-element-date">

    <v-text-field
      :label="props.field.label"
      readonly
      :variant="props.field.variant"
      :density="props.field.density"
      :direction="props.field.direction"
      :prepend-icon="props.field.prependIcon"
      :append-icon="props.field.appendIcon"
      :prepend-inner-icon="props.field.prependInnerIcon"
      :append-inner-icon="props.field.appendInnerIcon"
      :color="props.field.color"
      :autofocus="props.field.autofocus"
      :placeholder="props.field.placeholder"
      :hint="props.field.hint"
      :model-value="fieldTitle"
      :success="props.success"
      :error="props.error || !!error"
      :messages="props.messages"
      @click="isOpened = true"
      hide-details="auto"
    />

    <v-dialog v-model="isOpened" width="320">
      <v-card width="320">
        <date-picker
          class="vpd-datepicker-form-element"
          locale="fa"
          display-format="jYYYY/jMM/jDD"
          format="YYYY-MM-DD HH:mm"
          :type="props.field.dateType"
          auto-submit
          inline
          :model-value="fieldValue"
          @update:model-value="handleDateChange($event)"
          :min="props.field.min"
          :max="props.field.max"
        />
      </v-card>
    </v-dialog>

  </div>
</template>

<style scoped>

  .vpd-datepicker-form-element :deep(.vpd-content) {
    width: unset;
  }

  .vpd-datepicker-form-element :deep(.vpd-input-group) {
    display: none;
  }

</style>
