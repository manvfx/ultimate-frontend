<script setup>

import { http, generalHttpHandle } from '~~/services/http/mod';

const router = useRouter();
const route = useRoute();

/* interface */

const props = defineProps({
  url: String,
  noCache: Boolean,
});

const emit = defineEmits([]);


/* src */

const imageData = ref('');

onMounted(loadImage);


async function hasImageCache(key) {

  const imageCache = await caches.open('--sarc-images-cache--');

  return (await imageCache.keys(key)).length > 0;

}

async function getImageCache(key) {

  const imageCache = await caches.open('--sarc-images-cache--');

  const res = await imageCache.match(key).then(it => it.text()).then(it => JSON.parse(it));

  return res;

}

async function setImageCache(key, value) {

  const imageCache = await caches.open('--sarc-images-cache--');

  await imageCache.put(key, Response.json(value));

}


async function loadImage() {

  if (!props.noCache && await hasImageCache(`--sarv-image-cache-${props.url}--`)) {
    imageData.value = await getImageCache(`--sarv-image-cache-${props.url}--`);
    return;
  }


  const { status, data } = await http.request({
    method: 'post',
    url: `/v1/media${props.url}`,
  });

  if (generalHttpHandle(status, data, true)) {
    return;
  }


  const fileReader = new FileReader();

  fileReader.onloadend = () => {

    imageData.value = fileReader.result;

    if (!props.noCache) {
      setImageCache(`--sarv-image-cache-${props.url}--`, imageData.value);
    }

  }

  fileReader.readAsDataURL(data);

}


/* template */

</script>


<template>
  <img
    :src="imageData"
  />
</template>