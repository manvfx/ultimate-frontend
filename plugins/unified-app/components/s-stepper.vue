<script setup>

import { http, generalHttpHandle } from '~~/services/http/mod';

const router = useRouter();
const route = useRoute();


/* interface */
const props = defineProps({
  steps: Array,
  modelValue: {},
});
const emit = defineEmits([]);

/* steps */
const activeStepIndex = computed(() =>
  props.steps?.findIndex((it) => it.value === props.modelValue)
);
/* template */

</script>

<template>
  <v-card class="s-stepper d-flex align-center" variant="flat">
    <template v-for="(step, index) of props.steps" :key="step.value">
      <v-card
        flat
        rounded="0"
        :ripple="false"
        class="flex-shrink-0 py-4 px-2"
        border="false">
        <div class="d-flex flex-row align-center">
          <v-chip
            density="comfortable"
            :variant="index <= activeStepIndex ? 'elevated' : undefined"
            elevation="0"
            :color="index <= activeStepIndex ? 'info' : undefined"
            class="d-inline-flex align-center justify-center me-2"
            style="height: 28px; width: 28px">
            <v-icon
              v-if="index < activeStepIndex"
              size="25">
              mdi-check
            </v-icon>
            <span v-else>
              {{ step.number }}
            </span>
          </v-chip>

          <span class="text-subtitle-2 mt-2">
            {{ step.title }}
          </span>
        </div>
      </v-card>
      <v-divider
        v-if="index < props.steps?.length - 1"
      />
    </template>
  </v-card>
</template>
