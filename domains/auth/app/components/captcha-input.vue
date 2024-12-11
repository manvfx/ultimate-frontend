<script setup>

/* interface */

const props = defineProps({

});

const emit = defineEmits([

]);


const captchaId = defineModel('captchaId');
const captchaText = defineModel('captchaText');


/* captcha */

const { data: captchaData, refresh } = useUFetch(`/captcha-tokens/`, {
  method: 'post',
  server: false,
});

watch(() => captchaData.value?.captchaId, () => {
  captchaId.value = captchaData.value?.captchaId;
  captchaText.value = '';
}, { immediate: true });

</script>


<template>
  <div>

    <v-text-field label="Enter the number below">
      <u-input
        class="block"
        inputmode="numeric"
        v-model="captchaText"
      />
    </v-text-field>

    <div class="flex items-center justify-center gap-1 mt-3">

      <img
        :src="captchaData?.captchaData"
        class="rounded"
      />

      <v-btn
        variant="ghost"
        icon="i-mdi-refresh"
        tabindex="-1"
        @click="refresh();"
      />

    </div>

  </div>
</template>