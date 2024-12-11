<script setup>
import { ref, computed } from 'vue'
import { launchButtonPickerDialog } from '../../plugins/unified-dialogs-vuetify/button-picker/mod'

/* interface */

const props = defineProps({
  value: {},
  field: {},
  success: Boolean,
  error: Boolean,
  messages: Array,
})

const emit = defineEmits(['input'])

/* variants */

const hasVariants = computed(() => !!props.field.variants)

const variants = computed(() => Object.keys(props.field.variants ?? {}))

const selectedVariant = ref(variants.value[0])

function addMore() {
  launchButtonPickerDialog({
    icon: 'mdi-help-box',
    title: `راهنما`,
    text: 'آیا مایل به حذف ملک خانه جدید می باشید؟',
    startButtons: [
      {
        title: 'خیر',
      },
    ],
    endButtons: [
      {
        title: 'بله، حذف کن',
        color: 'error',
        async handler() {

        },
      },
    ],
  })
}
</script>

<template>
  <v-text-field
    :label="props.field.label"
    :variant="props.field.variant"
    :type="props.field.type"
    :inputmode="props.field.inputMode"
    :density="props.field.density"
    :direction="props.field.direction"
    :prepend-icon="props.field.prependIcon"
    :append-icon="props.field.appendIcon"
    :prepend-inner-icon="props.field.prependInnerIcon"
    :append-inner-icon="props.field.appendInnerIcon"
    :color="props.field.color"
    :autofocus="props.field.autofocus"
    :placeholder="props.field.placeholder"
    :prefix="props.field.prefix"
    :suffix="props.field.suffix"
    :hint="props.field.hint"
    :model-value="hasVariants ? props.value?.[selectedVariant] : props.value"
    @update:model-value="emit('input', $event, selectedVariant)"
    @click:append-inner="addMore"
    :error="props.error"
    :success="props.success"
    :messages="props.messages"
    hide-details="auto"
  >
    <template v-if="hasVariants" #append-inner>
      <v-btn
        variant="tonal"
        size="small"
        density="comfortable"
        class="me-2 px-2"
        style="min-width: 0;"
      >
        <div class="text-caption">
          {{ selectedVariant }}
        </div>

        <v-menu activator="parent">
          <v-list density="comfortable">
            <v-list-item
              v-for="variant of variants"
              :key="variant"
              :title="variant"
              @click="selectedVariant = variant"
            />
          </v-list>
        </v-menu>
      </v-btn>
    </template>
  </v-text-field>
</template>
