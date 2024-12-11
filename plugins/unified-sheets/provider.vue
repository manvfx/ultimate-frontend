<script setup>

/* dialogs */

import { useSheets } from './state';
const sheets = useSheets();


/* remove */

function removeSheet(sheet) {

  sheet.modelValue = false;

  setTimeout(() => {
    sheets.value.splice(
      sheets.value.findIndex(it => it.key === sheet.key),
      1
    );
  }, 1000);

}

</script>


<template>
  <v-bottom-sheet
    v-for="sheet of sheets"
    :key="sheet.key"
    width="auto"
    v-bind="sheet.options"
    :model-value="sheet.modelValue"
    @update:model-value="!$event && !sheet.options.prominent && (sheet.resolve(undefined) || removeSheet(sheet))">

    <component
      :is="sheet.component"
      v-bind="sheet.props"
      @resolve="sheet.resolve($event); removeSheet(sheet);"
      @reject="sheet.reject($event ?? undefined); removeSheet(sheet);"
      style="max-width: 100%;"
    />

  </v-bottom-sheet>
</template>
