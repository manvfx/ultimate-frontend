<script setup>

/* interface */

const props = defineProps({
  file: File,
});

const emit = defineEmits([]);


/* file */

const src = ref('');

onMounted(() => {

  if (props.file.type.startsWith('image')) {
    const reader = new FileReader();
    reader.readAsDataURL(props.file);
    reader.onloadend = () => src.value = reader.result;
  }

});


/* template */

</script>


<template>
  <v-card>
    <template v-if="props.file.type.startsWith('image')">
      <v-img
        :src="src"
        class="d-block"
        style="width: 1024px;"
      />
    </template>
  </v-card>
</template>