<script setup>

/* interface */

const props = defineProps({
  size: Number,
  fps: Number,
});

const emit = defineEmits([
  'scan',
]);


/* scanner */

import { Html5Qrcode } from 'html5-qrcode';

const divId = ref(`qr-code-scanner-${Math.random()}`);

let scanner;


onMounted(() => {
  try {

    scanner = new Html5Qrcode(divId.value);

    scanner.start(
      {
        facingMode: 'environment'
      },
      {
        fps: props.fps,
        qrbox: props.size,
      },
      text => emit('scan', text)
    );

  }
  catch {}
});

onUnmounted(() => {
  try {
    if (scanner) {
      scanner.stop();
    }
  }
  catch {}
});

/* template */

</script>


<template>
  <div :id="divId" />
</template>