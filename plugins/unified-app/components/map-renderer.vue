<script setup>

import { http, generalHttpHandle } from '~~/services/http/mod';

const router = useRouter();
const route = useRoute();


/* interface */

const props = defineProps({
  markers: Array,
  initialZoom: Number,
  disabled: Boolean,
});

const emit = defineEmits([
  'update:center',
]);

/* marker */

function handleCenterChanged(newCenter) {

  if (props.disabled) {
    return;
  }

  emit('update:center', { lat: newCenter.lat, long: newCenter.lng });

}


const center = computed(() => {

  if (props.markers && props.markers[0]) {
    return props.markers[0];
  }

  return undefined;

});


/* template */

import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LMarker, LIcon, LPopup } from "@vue-leaflet/vue-leaflet";

</script>


<template>
  <l-map
    :use-global-leaflet="false"
    :zoom="props.initialZoom || 12"
    :center="center ? [center.lat, center.long] : [29.604274, 52.5294684]"
    class="rounded-lg overflow-hidden"
    style="height: 250px;"
    @update:center="handleCenterChanged($event);">

    <l-tile-layer
      url="https://map.shiraz.ir/srvtiles/{z}/{x}/{y}"
      layer-type="base"
      name="OpenStreetMap"
    />

    <template v-if="props.markers && props.markers.length > 0">
      <l-marker
        v-for="marker of props.markers" :key="`${marker.lat}${marker.long}`"
        :lat-lng="[marker.lat, marker.long]">

        <l-icon class-name="testing">
          <svg width="32px" height="32px" viewBox="0 0 36.00 36.00" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000" transform="rotate(0)matrix(1, 0, 0, 1, 0, 0)" style="transform: translateX(40%) translateY(-50%);">
            <g id="SVGRepo_iconCarrier">
              <g id="Vivid.JS" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g id="Vivid-Icons" transform="translate(-125.000000, -643.000000)">
                  <g id="Icons" transform="translate(37.000000, 169.000000)">
                    <g id="map-marker" transform="translate(78.000000, 468.000000)">
                      <g transform="translate(10.000000, 6.000000)">
                        <path d="M14,0 C21.732,0 28,5.641 28,12.6 C28,23.963 14,36 14,36 C14,36 0,24.064 0,12.6 C0,5.641 6.268,0 14,0 Z" id="Shape" :fill="marker.color ?? '#FF6E6E'"> </path>
                        <circle id="Oval" fill="#0C0058" fill-rule="nonzero" cx="14" cy="14" r="7"> </circle>
                      </g>
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </svg>
        </l-icon>

        <l-popup v-if="marker.title" style="width: 200px;">
          <p class="text-rtl text-right" style="width: 200px; white-space: pre-line;">
            {{ marker.title }}
          </p>
        </l-popup>

      </l-marker>
    </template>

  </l-map>
</template>


<style lang="scss" scoped>
  :deep(.leaflet-control-attribution) {
    display: none !important;
  }
</style>
