<script setup>

/* interface */

const props = defineProps({
  field: Object,
  value: {},
  success: Boolean,
  error: Boolean,
  messages: {},
});

const emit = defineEmits([
  'input',
]);


/* plaque */

const plaque = reactive([]);

onMounted(() => {
  if (props.value?.length === 9) {
    plaque[0] = props.value.slice(0, 2);
    plaque[1] = props.value.slice(2, 4);
    plaque[2] = props.value.slice(4, 7);
    plaque[3] = props.value.slice(7, 9);
  }
});

function updatePlaque(value, startIndex, length, nextElement) {

  plaque[startIndex] = value.slice(0, length);

  emit('input', plaque.join(''));

  if (plaque[startIndex].length >= length) {

    nextElement?.focus?.();

    if (nextElement === elPlaque2.value) {
      pickPlaqueCharacter();
    }

  }

}


/* character */

import { launchGridPickerDialog } from '../../plugins/unified-dialogs-vuetify/grid-picker/mod';

const plaqueItems = [
  {
    value: '10',
    title: 'الف',
  },
  {
    value: '11',
    title: 'ب',
  },
  {
    value: '12',
    title: 'پ',
  },
  {
    value: '13',
    title: 'ت',
  },
  {
    value: '14',
    title: 'ث',
  },
  {
    value: '15',
    title: 'ج',
  },
  {
    value: '16',
    title: 'چ',
  },
  {
    value: '17',
    title: 'ح',
  },
  {
    value: '18',
    title: 'خ',
  },
  {
    value: '19',
    title: 'د',
  },
  {
    value: '20',
    title: 'ذ',
  },
  {
    value: '21',
    title: 'ر',
  },
  {
    value: '22',
    title: 'ز',
  },
  {
    value: '23',
    title: 'س',
  },
  {
    value: '24',
    title: 'ش',
  },
  {
    value: '25',
    title: 'ص',
  },
  {
    value: '26',
    title: 'ض',
  },
  {
    value: '27',
    title: 'ط',
  },
  {
    value: '28',
    title: 'ظ',
  },
  {
    value: '29',
    title: 'ع',
  },
  {
    value: '30',
    title: 'غ',
  },
  {
    value: '31',
    title: 'ف',
  },
  {
    value: '32',
    title: 'ق',
  },
  {
    value: '33',
    title: 'ک',
  },
  {
    value: '34',
    title: 'گ',
  },
  {
    value: '35',
    title: 'ل',
  },
  {
    value: '36',
    title: 'م',
  },
  {
    value: '37',
    title: 'ن',
  },
  {
    value: '38',
    title: 'و',
  },
  {
    value: '39',
    title: 'ه',
  },
  {
    value: '40',
    title: 'ی',
  },
  {
    value: '41',
    title: 'ژ',
  },
  {
    value: '42',
    icon: 'mdi-wheelchair',
  },
  {
    value: '43',
    title: 'S',
  },
  {
    value: '44',
    title: 'D',
  },
];

async function pickPlaqueCharacter() {
  const result = await launchGridPickerDialog({
    icon: 'mdi-alphabetical',
    title: 'انتخاب حرف میانی پلاک',
    text: 'لطفا حرف مورد نظر خود را انتخاب کنید.',
    items: plaqueItems,
    selectedItem: plaque[1],
    options: {
      maxWidth: 1024,
    },
  });

  if (!result) {
    return;
  }


  updatePlaque(result, 1, 2, elPlaque3);

}


/* toggling */

const elPlaque1 = ref();
const elPlaque2 = ref();
const elPlaque3 = ref();
const elPlaque4 = ref();


/* template */

</script>

<template>
  <div class="form-element-plaque">

    <v-label v-if="props.field.label" :class="{ 'text-error': props.error }">
      {{ props.field.label }}
    </v-label>

    <div class="rounded mt-1 d-flex align-center" style="height: 56px; border: 2px solid rgba(0, 0, 0, 0.5); direction: ltr">

      <div class="bg-blue-darken-4 text-caption ps-2 pe-1 h-100 d-flex align-center justify-center">
        I.R. <br />
        IRAN
      </div>

      <v-spacer />

      <input
        ref="elPlaque1"
        inputmode="numeric"
        maxlength="2"
        class="w-0 h-75 text-center mx-2 text-h6 font-weight-bold"
        style="border-bottom: 1px solid black; flex-grow: 6"
        :value="plaque[0]"
        @input="updatePlaque($event.target.value, 0, 2, elPlaque2)"
      />

      <v-spacer />

      <template v-if="plaqueItems.find((it) => it.value === plaque[1])?.icon">
        <v-icon ref="elPlaque2" @click="pickPlaqueCharacter()">
          {{ plaqueItems.find((it) => it.value === plaque[1]).icon }}
        </v-icon>
      </template>
      <template v-else>
        <input
          ref="elPlaque2"
          readonly
          class="w-0 h-75 text-center mx-2 text-h6 font-weight-bold"
          style="border-bottom: 1px solid black; flex-grow: 6"
          :value="plaque[1] && plaqueItems.find((it) => it.value === plaque[1])?.title"
          @click="pickPlaqueCharacter()"
        />
      </template>

      <v-spacer />

      <input
        ref="elPlaque3"
        inputmode="numeric"
        maxlength="3"
        class="w-0 h-75 text-center mx-2 text-h6 font-weight-bold"
        style="border-bottom: 1px solid black; flex-grow: 6"
        :value="plaque[2]"
        @input="updatePlaque($event.target.value, 2, 3, elPlaque4)"
      />

      <v-divider vertical class="flex-grow-0" />

      <input
        ref="elPlaque4"
        inputmode="numeric"
        maxlength="2"
        class="w-0 h-75 text-center mx-2 text-h6 font-weight-bold"
        style="border-bottom: 1px solid black; flex-grow: 6"
        :value="plaque[3]"
        @input="updatePlaque($event.target.value, 3, 2)"
      />

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
  input:focus {
    outline: none;
  }
</style>
/* این کامپوننت جهت نمایش فیلد پلاک خودرو در فرم ها میباشد که در بخش خودرو های من
استفاده شده. */