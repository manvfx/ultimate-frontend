<script setup>

/* page */

definePageMeta({
  name: 'admin.dashboard',
  layout: 'admin',
  // middleware: 'is-authenticated-admin',
});

useHead({
  title: 'Dashboard',
});

</script>


<template>
  <v-container fluid class="text-xl font-bold">
    Admin Dashboard
  </v-container>
</template>