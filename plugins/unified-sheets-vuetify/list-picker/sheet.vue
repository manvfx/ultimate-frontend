<script setup>
const router = useRouter();
const route = useRoute();

const props = defineProps({
  icon: String,
  title: String,
  subtitle: String,
  text: String,
  isNavigation: Boolean,
  items: Array,
});

const emit = defineEmits([
  'resolve',
]);

function redirectRoute(item){
  emit('resolve', item.value || item.title || item)
  router.replace({ path: item.link })
}

</script>


<template>
  <v-card
    :prepend-icon="props.icon"
    :title="props.title"
    :subtitle="props.subtitle">

    <v-card-text v-if="props.text">
      {{ props.text }}
    </v-card-text>

    <v-card-text>
      <v-list v-if="props.items" :nav="props.isNavigation">
        <v-list-item
          v-for="item of props.items" :key="item.value"
          :prepend-icon="item.icon"
          :title="item.title"
          :subtitle="item.subtitle"
          :color="item.color"
          @click="redirectRoute(item)"
        />
      </v-list>
    </v-card-text>

  </v-card>
</template>