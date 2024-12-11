<script setup>

/* interface */

const props = defineProps({
  size: {
    type: String,
    default: 'sm',
  },
  loading: {
    type: Boolean,
  },
});

const emit = defineEmits([]);


/* sizing */

const maxWidth = computed(() =>
  ({
    sm: 412,
    md: 548,
    lg: 768,
  })[props.size] ?? 412
);

/* template */

</script>


<template>
  <v-container :style="{ 'max-width': `${maxWidth}px` }">
    <loading-section :loading="props.loading">
      <slot />
    </loading-section>
  </v-container>
</template>