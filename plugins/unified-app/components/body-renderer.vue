<script setup>

/* interface */

const props = defineProps({
  body: String,
});

const emit = defineEmits([]);


/* template */

</script>


<template>
  <div
    class="body-renderer-root"
    v-html="props.body"
  />
</template>


<style lang="scss">
  .body-renderer-root {

    figure.image {
      display: block;
      margin: 24px auto;
      max-width: 500px;
      img {
        width: 100%;
        display: block;
      }
    }

    p {
      margin: 12px 0;
    }

    ol, ul {
      margin: 24px 24px;
    }

    td, th {
      padding: 4px 8px;
    }

  }
</style>