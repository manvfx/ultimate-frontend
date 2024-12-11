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
  'input'
]);


/* plaque */

const plaque = reactive([]);


onMounted(() => {
  if (props.value?.length === 8) {
    plaque[0] = props.value.slice(0, 3);
    plaque[1] = props.value.slice(3, 8);
  }
});


function updatePlaque(value, startIndex, length, nextElement) {

  plaque[startIndex] = value.slice(0, length);

  emit('input', plaque.join(''));

  if (plaque[startIndex].length >= length) {
    nextElement?.focus?.();
  }

}


/* toggling */

const elPlaque1 = ref();
const elPlaque2 = ref();


/* template */

</script>

<template>
  <div class="form-element-bike-plaque">
    <div
      class="rounded mt-1 d-flex flex-column w-50 text-ltr"
      style="height: 90px; border: 2px solid rgba(0, 0, 0, 0.5);">

      <div class="h-50 d-flex flex-row align-center justify-center">

        <div class="bg-blue-darken-4 text-caption ps-2 pe-1 h-100 d-flex align-center justify-center">
          I.R. <br />
          IRAN
        </div>

        <v-spacer />

        <input
          ref="elPlaque1"
          inputmode="numeric"
          maxlength="3"
          class="w-0 h-75 text-center font-weight-bold"
          style="border-bottom: 1px solid gray; flex-grow: 6; letter-spacing: 10px; font-size: 20px;"
          :value="plaque[0]"
          @input="updatePlaque($event.target.value, 0, 3, elPlaque2)"
        />

        <v-spacer />

      </div>

      <div class="h-50 d-flex flex-row align-center justify-center mb-1 mx-2">
        <input
          ref="elPlaque2"
          inputmode="numeric"
          maxlength="5"
          class="w-0 h-75 text-center mx-1 font-weight-bold"
          style="border-bottom: 1px solid gray; flex-grow: 6; letter-spacing: 10px; font-size: 20px;"
          :value="plaque[1]"
          @input="updatePlaque($event.target.value, 1, 5)"
        />
      </div>

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

<style scoped>
  textarea:focus, input:focus {
    outline: none;
  }
</style>
/* این کامپوننت جهت نمایش فیلد پلاک موتور در فرم ها میباشد که در بخش خودرو های من
استفاده شده. */