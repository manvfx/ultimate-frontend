<script setup>

/* interface */

const props = defineProps({
  url: String,
  noCache: Boolean,
});

const emit = defineEmits([
  'resolve',
]);


/* template */

</script>


<template>
  <v-card width="512">

    <sarv-image
      :url="props.url"
      :no-cache="props.noCache"
      class="d-block w-100"
    />

    <v-card-actions>
      <v-btn @click="emit('resolve')">
        بستن
      </v-btn>
    </v-card-actions>

  </v-card>
</template>