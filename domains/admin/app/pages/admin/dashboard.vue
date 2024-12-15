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
    <v-sheet class="d-flex flex-column justify-center rounded-lg text-white pa-8 bg-login" height="100">
      <div class="justify-center text-h6 font-weight-bold">به پنل مدیریت خوش آمدید</div>
      <div class="text-body-2"> داده‌هایی آزاد و قابل‌دسترسی برای استفاده و بازنشر بدون محدودیت است.</div>
    </v-sheet>
  </v-container>
</template>

<style lang="scss" scoped>
.bg-login{
  background-color: #2e3192;
  opacity: 1;
  background-image:  repeating-radial-gradient( circle at 0 0, transparent 0, #2e3192 25px ), repeating-linear-gradient( #16196a55, #2e3192 );
}
</style>