<script setup>

const dialog = ref(true);
const search = ref("");
const selectedCities = ref([]);
const selectedProvince = ref('');
const showCities = ref(false);

const provinces = ref([
  {
    name: "آذربایجان شرقی",
    cities: ["تبریز", "مراغه", "مرند", "میانه", "اهر", "بناب", "سراب", "شبستر", "بستان‌آباد", "هشترود"],
    expanded: false,
  },
  {
    name: "آذربایجان غربی",
    cities: ["ارومیه", "خوی", "میاندوآب", "بوکان", "مهاباد", "سلماس", "پیرانشهر", "نقده", "شاهین‌دژ", "سردشت"],
    expanded: false,
  },
  {
    name: "اردبیل",
    cities: ["اردبیل", "مشگین‌شهر", "پارس‌آباد", "خلخال", "گرمی", "بیله‌سوار", "نمین", "نیر", "کوثر", "اصلاندوز"],
    expanded: false,
  },
  {
    name: "اصفهان",
    cities: ["اصفهان", "کاشان", "خمینی‌شهر", "نجف‌آباد", "فلاورجان", "شاهین‌شهر", "زرین‌شهر", "لنجان", "مبارکه", "نایین"],
    expanded: false,
  },
  {
    name: "البرز",
    cities: ["کرج", "فردیس", "نظرآباد", "هشتگرد", "محمدشهر", "ماهدشت", "کمال‌شهر", "مشکین‌دشت", "گرمدره", "چهارباغ"],
    expanded: false,
  },
  {
    name: "ایلام",
    cities: ["ایلام", "دهلران", "مهران", "آبدانان", "دره‌شهر", "ایوان", "سرابله", "بدره", "موسیان", "چوار"],
    expanded: false,
  },
  {
    name: "بوشهر",
    cities: ["بوشهر", "برازجان", "گناوه", "کنگان", "دیر", "دیلم", "جم", "خورموج", "عسلویه", "آب‌پخش"],
    expanded: false,
  },
  {
    name: "تهران",
    cities: ["تهران", "ری", "شمیرانات", "اسلامشهر", "شهریار", "قدس", "ملارد", "بهارستان", "پاکدشت", "ورامین"],
    expanded: false,
  },
  {
    name: "چهارمحال و بختیاری",
    cities: ["شهرکرد", "بروجن", "فارسان", "لردگان", "فرخ‌شهر", "هفشجان", "سامان", "سورشجان", "چلگرد", "بلداجی"],
    expanded: false,
  },
  {
    name: "خراسان جنوبی",
    cities: ["بیرجند", "قائن", "فردوس", "طبس", "نهبندان", "سربیشه", "بشرویه", "خوسف", "درمیان", "زهان"],
    expanded: false,
  },
  {
    name: "خراسان رضوی",
    cities: ["مشهد", "نیشابور", "سبزوار", "تربت حیدریه", "قوچان", "تربت جام", "کاشمر", "گناباد", "چناران", "خواف"],
    expanded: false,
  },
  {
    name: "خراسان شمالی",
    cities: ["بجنورد", "شیروان", "اسفراین", "آشخانه", "جاجرم", "فاروج", "گرمه", "راز", "سنخواست", "صفی‌آباد"],
    expanded: false,
  },
  {
    name: "خوزستان",
    cities: ["اهواز", "آبادان", "خرمشهر", "دزفول", "ماهشهر", "بهبهان", "شادگان", "اندیمشک", "شوشتر", "ایذه"],
    expanded: false,
  },
  {
    name: "زنجان",
    cities: ["زنجان", "ابهر", "خدابنده", "خرمدره", "سلطانیه", "طارم", "ماه‌نشان", "ایجرود", "قیدار", "زرین‌رود"],
    expanded: false,
  },
  {
    name: "سمنان",
    cities: ["سمنان", "شاهرود", "دامغان", "گرمسار", "مهدی‌شهر", "میامی", "آرادان", "سرخه", "بیارجمند", "ایوانکی"],
    expanded: false,
  },
  {
    name: "سیستان و بلوچستان",
    cities: ["زاهدان", "چابهار", "ایرانشهر", "زابل", "خاش", "سراوان", "نیک‌شهر", "کنارک", "سرباز", "راسک"],
    expanded: false,
  },
  {
    name: "فارس",
    cities: ["شیراز", "مرودشت", "کازرون", "جهرم", "فسا", "لار", "داراب", "آباده", "اقلید", "نورآباد"],
    expanded: false,
  },
  {
    name: "قزوین",
    cities: ["قزوین", "البرز", "آبیک", "بوئین‌زهرا", "تاکستان", "محمدیه", "شریفیه", "اقبالیه", "سیردان", "خرمدشت"],
    expanded: false,
  },
  {
    name: "قم",
    cities: ["قم", "جعفریه", "قنوات", "دستجرد", "سلفچگان", "کهک", "خلجستان", "جعفرآباد", "کوه‌سفید", "قمرود"],
    expanded: false,
  },
  {
    name: "کردستان",
    cities: ["سنندج", "سقز", "مریوان", "بانه", "قروه", "بیجار", "کامیاران", "دیواندره", "دهگلان", "زرینه"],
    expanded: false,
  },
  {
    name: "کرمان",
    cities: ["کرمان", "رفسنجان", "سیرجان", "جیرفت", "بم", "زرند", "کهنوج", "بردسیر", "راور", "عنبرآباد"],
    expanded: false,
  },
  {
    name: "کهگیلویه و بویراحمد",
    cities: ["یاسوج", "دوگنبدان", "دهدشت", "لیکک", "چرام", "سی‌سخت", "لنده", "باشت", "مارگون", "سوق"],
    expanded: false,
  },
  {
    name: "گلستان",
    cities: ["گرگان", "گنبد کاووس", "بندر ترکمن", "علی‌آباد کتول", "آق‌قلا", "مینودشت", "کلاله", "آزادشهر", "رامیان", "گمیشان"],
    expanded: false,
  },
  {
    name: "گیلان",
    cities: ["رشت", "بندر انزلی", "لاهیجان", "لنگرود", "آستارا", "رودبار", "صومعه‌سرا", "فومن", "تالش", "ماسال"],
    expanded: false,
  },
  {
    name: "لرستان",
    cities: ["خرم‌آباد", "بروجرد", "دورود", "کوهدشت", "الیگودرز", "نورآباد", "الشتر", "ازنا", "پلدختر", "سراب‌دوره"],
    expanded: false,
  },
  {
    name: "مازندران",
    cities: ["ساری", "بابل", "آمل", "قائم‌شهر", "تنکابن", "بابلسر", "نوشهر", "چالوس", "بهشهر", "رامسر"],
    expanded: false,
  },
  {
    name: "مرکزی",
    cities: ["اراک", "ساوه", "خمین", "محلات", "دلیجان", "شازند", "تفرش", "آشتیان", "کمیجان", "خنداب"],
    expanded: false,
  },
  {
    name: "هرمزگان",
    cities: ["بندرعباس", "بندر لنگه", "میناب", "قشم", "کیش", "جاسک", "حاجی‌آباد", "بستک", "خمیر", "پارسیان"],
    expanded: false,
  },
  {
    name: "همدان",
    cities: ["همدان", "ملایر", "نهاوند", "اسدآباد", "تویسرکان", "بهار", "رزن", "کبودرآهنگ", "فامنین", "قهاوند"],
    expanded: false,
  },
  {
    name: "یزد",
    cities: ["یزد", "میبد", "اردکان", "مهریز", "بافق", "اشکذر", "ابرکوه", "خاتم", "هرات", "تفت"],
    expanded: false,
  },
]);

// Reactive list of cities for the selected province
const filteredCities = ref([]);

// Helper Functions
const toggleCityView = (view, province = null) => {
  search.value = "";
  if (view && province) {
    // When switching to city view with a specific province
    selectedProvince.value = province.name;
    filteredCities.value = [...province.cities];
  }
  showCities.value = view;
};

const confirmSelection = () => {
  console.log("Final Selected Cities:", selectedCities.value);
  dialog.value = false;
};

const removeCity = (city) => {
  selectedCities.value = selectedCities.value.filter((selected) => selected !== city);
};

const allCitiesSelected = () => {
  return filteredCities.value.every((city) => selectedCities.value.includes(city));
};

const toggleSelectAllCities = () => {
  if (allCitiesSelected()) {
    selectedCities.value = selectedCities.value.filter((city) => !filteredCities.value.includes(city));
  } else {
    const newCities = filteredCities.value.filter((city) => !selectedCities.value.includes(city));
    selectedCities.value.push(...newCities);
  }
};

// Watch search to filter cities dynamically
watch(search, () => {
  if (!search.value) {
    filteredCities.value = provinces.value.find(
      (province) => province.name === selectedProvince.value
    )?.cities || [];
  } else {
    filteredCities.value = provinces.value
      .find((province) => province.name === selectedProvince.value)
      ?.cities.filter((city) => city.includes(search.value)) || [];
  }
});
</script>

<template>
<v-dialog v-model="dialog" width="380" scrollable>
  <template v-slot:activator="{ props: activatorProps }">
    <v-btn
      color="brown"
      prepend-icon="mdi-map-marker-outline"
      text="انتخاب شهر"
      variant="outlined"
      v-bind="activatorProps"
    ></v-btn>
  </template>
  <template v-slot:default="{ isActive }">
    <v-card class="px-2 py-2">
      <template v-slot:title>
        <div class="text-body-1 font-weight-black d-flex justify-center">
            <v-icon>mdi-map-marker-outline</v-icon> انتخاب شهر
            <v-spacer></v-spacer>
            <v-btn variant="text" size="small" color="error" v-if="selectedCities.length" @click="selectedCities = []">حذف همه</v-btn>
          </div>
        </template>
      <v-card-text style="overflow: hidden">
         <v-chip-group v-if="selectedCities.length" class="mb-2" multiple variant="outlined" mobile>
          <v-chip
            v-for="(city, index) in selectedCities"
            :key="index"
            closable              
            size="x-small"
            color="primary" 
            @click:close="removeCity(city)"
          >
            {{ city }}
          </v-chip>
        </v-chip-group>
        <div v-else class="text-body-2 text-grey mt-2 mb-3">حداقل یک شهر را انتخاب کنید.</div>
        <v-text-field
          v-model="search"
          label="جستجو در شهرها"
          class="mb-12"
          variant="outlined"
          density="comfortable"
          clearable
        ></v-text-field>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-text>
        <template v-if="showCities">
          <v-btn
            prepend-icon="mdi-arrow-right"
            variant="text"
            @click="toggleCityView(false)"
            class="mb-3"
          >
            بازگشت به استان‌ها
          </v-btn>
          <v-list density="compact">
            <v-list-item>
              <template v-slot:append>
                <v-list-item-action end>
                  <v-checkbox-btn
                    :value="allCitiesSelected()"
                    @change="toggleSelectAllCities"
                  ></v-checkbox-btn>
                </v-list-item-action> 
              </template>
              <v-list-item-title>همه شهرهای {{selectedProvince}}</v-list-item-title> 
            </v-list-item>

            <v-list-item
              v-for="(city, index) in filteredCities"
              :key="index"
              class="py-0"
            >
            <template v-slot:append>
              <v-list-item-action end>
                <v-checkbox-btn v-model="selectedCities"
                :value="city"
                class="my-0 py-0"
              ></v-checkbox-btn>
              </v-list-item-action>
            </template>
            <v-list-item-title>{{ city }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </template>

        <template v-else>
          <v-list density="comfortable">
            <v-list-item
              v-for="(province, index) in provinces"
              :key="index"
              @click="toggleCityView(true, province)"
              append-icon="mdi-chevron-left"
            >
              <v-list-item-title>{{ province.name }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </template>
      </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="primary" text @click="confirmSelection" variant="flat">تایید</v-btn>
          <v-spacer></v-spacer>
          <v-btn text @click="isActive.value = false">لغو</v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>