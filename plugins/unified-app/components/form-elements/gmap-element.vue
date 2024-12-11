<script setup>

/* interface */

const props = defineProps({
  field: {
    type: Object,
  },
  modelValue: {},
  success: Boolean,
  error: Boolean,
  messages: {},
});

const emit = defineEmits(['update:modelValue'])

import NeshanMap from '@neshan-maps-platform/vue3-openlayers'
// import { Map } from "@neshan-maps-platform/ol"

const submitting = ref(false)
const mapRef = ref()
const currentLocationData = ref({ latitude: 35.7219, longitude: 51.3347 })
const mapCenter = ref({ latitude: 35.7219, longitude: 51.3347 })
const addressData = ref()

onMounted(() => {
});

watch(
  () => mapRef.value?.state.map,
  (nv, ol) => {
    if (ol) return

    setTimeout(() => {
      mapRef.value?.search({
        term: 'ولی عصر',
        coords: [
          currentLocationData.value.longitude,
          currentLocationData.value.latitude
        ]
      })
    }, 3000)
  }
)

/* template */
function updatePayload (event) {
  submitting.value = true
  addressData.value = event.apiData
  mapCenter.value = {
      latitude: event.coords[1],
      longitude: event.coords[0]
    }

  emit('update:modelValue', { location:mapCenter.value,address:addressData.value?.formatted_address });
  submitting.value = false
}
</script>

<template>
  <div class="form-element-map">
    <v-alert color="primary" variant="tonal" class="text-caption text-black my-3" v-if="addressData"
          >{{ addressData?.state }} {{ addressData?.city }}
          {{ addressData?.district }}
          {{ addressData?.formatted_address }}
    </v-alert>
    <NeshanMap
            ref="mapRef"
            class="map"
            mapKey="web.ee4813c993ea4f1082827fc89e4bad15"
            serviceKey="service.cbb07d5b05a446f0b12a1c6e06cdcd51"
            :center="mapCenter"
            :zoom="17"
            :scale="0.8"
            :hide-search-container="true"
            :hide-layers="true"
            :traffic="false"
            :poi="true"
            defaultType="standard-day"
            @on-click="updatePayload">
    </NeshanMap>
  </div>
</template>

<style scoped>
@import url('@neshan-maps-platform/vue3-openlayers/dist/style.css');

  textarea:focus, input:focus {
    outline: none;
  }

  .map{
    width: 100%;
    height: 400px;
  }
</style>