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

  const currentValue  = [...props.field.format].map((c, i) => props.value?.[i] ?? '-').join('');
  const newValue = [...currentValue].map((c, i) => i === index ? value.slice(-1)[0] : c).join('');

  emit('input', newValue);

}


/* element hopping */

const elements = ref([]);

async function handleKeypress(index, event) {

  await new Promise(r => setTimeout(r, 5));


  let direction = event.code !== 'Backspace' ? 1 : -1;


  let nextElementIndex = index + direction;

  while (!elements.value[nextElementIndex]?.click) {

    nextElementIndex += direction;

    if (nextElementIndex > Math.max(...Object.keys(elements.value)) || nextElementIndex < 0) {
      return;
    }

  }


  elements.value[nextElementIndex].click();

}


/* template */

</script>


<template>
  <div class="form-element-renovation-code">

    <v-label :class="{ 'text-error': props.error }">
      {{ props.field.label }}
    </v-label>

    <div class="d-flex align-center gap-2 text-ltr mt-2">

      <template v-for="(element, index) of props.field.format?.split('')" :key="element">

        <div v-if="element !== 'x'">
          {{ element }}
        </div>
        <v-text-field
          v-else
          :ref="it => elements[index] = it"
          type="number"
          hide-details
          class="pa-0"
          :model-value="props.value?.[index] === '-' ? '' : props.value?.[index]"
          @update:model-value="updateCode(index, $event)"
          @keydown="handleKeypress(index, $event)"
        />

      </template>

      <v-btn
        variant="text"
        icon="mdi-close"
        size="small"
        density="comfortable"
        @click="emit('input', '')"
      />

    </div>

    <div v-if="props.field.hint" class="text-caption pa-2">
      {{ props.field.hint }}
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