<script setup>
/* page */

definePageMeta({
  name: 'auth',
  layout: 'empty'
})

useHead({
  title: 'ورود به مدیریت'
})

const router = useRouter();
const route = useRoute();

const email = ref("");
const password = ref("");

const submitForm = () => {
  console.log("Email:", email.value, "Password:", password.value);
  // Add your form submission logic here
};
</script>

<template>
  <v-container fluid>
    <v-row>
      <!-- Right Section -->
      <v-col
        cols="12"
        md="6"
        class="d-flex align-center justify-center form-section rounded-xl bg-login"
        style="background-color: #2e3192; color: white;"
      >
        <v-card class="px-16 py-8" max-width="600" variant="flat" color="transparent">
          <v-card-title class="justify-center text-h4 font-weight-bold pb-0">داده های باز شهرداری شیراز</v-card-title>
          <v-card-subtitle class="text-body-2 mb-6"> داده‌هایی آزاد و قابل‌دسترسی برای استفاده و بازنشر بدون محدودیت است.</v-card-subtitle>
          <v-card-text>
              نسخه ۲.۰.۰
          </v-card-text>
        </v-card>
      </v-col>
      <!-- Left Section (Form) -->
      <v-col
        cols="12"
        md="6"
        class="d-flex align-center justify-center image-section"
        style="position: relative; padding-bottom: 80px;"
      >
        <v-card class="px-16 py-8 rounded-lg" width="480" variant="flat" color="white">
          <img src="/logo-mini.svg" class="mr-4" width="48" />
          <v-card-title class="justify-center text-body-1 font-weight-bold pb-0">ورود به پنل مدیریت</v-card-title>
          <v-card-subtitle class="mb-4 mt-0 text-body-2">نام کاربری و رمز عبور خود را وارد نمایید</v-card-subtitle>
          <v-card-text>
            <v-form @submit.prevent="submitForm">
              <v-text-field
                label="نام کاربری"
                v-model="email"
                type="email"
                required
                variant="filled"
              ></v-text-field>
              <v-text-field
                label="رمز عبور"
                v-model="password"
                type="password"
                required
                variant="filled"
              ></v-text-field>
              <v-btn
                color="primary"
                block
                type="submit"
                variant="flat"
                @click="router.replace({name:'admin.dashboard'})"
              >
                ورود به پنل
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>

        <!-- Footer Section inside Left Section -->
        <v-footer color="transparent" padless style="position: absolute; bottom: 0; left: 0; width: 100%; padding-top: 16px;">
          <v-row align="center" justify="center">
            <v-col class="text-center" cols="12" md="4">
              <span class="text-caption text-grey">© ۱۴۰۳ سازمان فاوا شهرداری شیراز</span>
            </v-col>
            <v-col class="text-left" cols="12" md="8">
              <v-row justify="end">
                <v-col cols="auto">
                  <v-btn variant="text" size="small" color="grey">حریم خصوصی کاربر</v-btn>
                </v-col>
                <v-col cols="auto">
                  <v-btn variant="text" size="small" color="grey">قوانین و مقررات</v-btn>
                </v-col>
                <v-col cols="auto">
                  <v-btn variant="text" size="small" color="grey">تماس با ما</v-btn>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-footer>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
body {
  overflow: hidden;
}

.full-height {
  height: 100%;
}

.image-section .v-img {
  object-fit: cover;
  height: 85vh;
  border-radius: 10px;
}

.form-section {
  height: 99vh;
}

.v-divider {
  margin-top: 16px;
}
</style>
