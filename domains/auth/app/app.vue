<script setup>

const loading = ref(false);

/* display breakpoints */

import { useDisplay } from 'vuetify/lib/framework.mjs';
const display = useDisplay();

provide('isMobile', computed(() => display.smAndDown.value));
provide('isTablet', computed(() => display.mdAndDown.value && !display.smAndDown.value));
provide('isDesktop', computed(() => display.lgAndUp.value));

provide('globalBreakpoints', computed(() => ({
  xs: display.thresholds.value.sm,
  sm: display.thresholds.value.md,
  md: display.thresholds.value.lg,
  lg: display.thresholds.value.xl,
  xl: display.thresholds.value.xxl,
})));


/* unified dialogs */

import { UnifiedDialogProvider } from '../../.../../../plugins/unified-dialogs/mod';
import { UnifiedSheetProvider } from '../../.../../../plugins/unified-sheets/mod';
import { UnifiedToastsProvider } from '../../.../../../plugins/unified-toasts/mod';

</script>


<template>
  <v-app>

    <Head>
      <Title>
       opendata new version
      </Title>
    </Head>

    <template v-if="loading">
      <div class="h-100 d-flex flex-column align-center justify-center">

        <v-img
          src="/logo.svg"
          width="192"
          height="auto"
          class="flex-grow-0"
        />

        <v-progress-circular
          indeterminate
          color="primary"
          size="24"
          class="mt-3"
        />

      </div>
    </template>
    <template v-else>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </template>

    <unified-dialog-provider />
    <unified-sheet-provider />
    <unified-toasts-provider />

  </v-app>
</template>


<style lang="scss">

  @import '@/assets/stylesheets/rtl.scss';

  .v-btn {
    text-transform: none !important;
  }

  .v-messages__message + .v-messages__message {
    margin-top: 6px;
  }

  .text-ltr {
    direction: ltr;
  }

  .text-rtl {
    direction: rtl;
  }

  .gap-1 {
    gap: 4px;
  }

  .gap-2 {
    gap: 8px;
  }

  .gap-3 {
    gap: 12px;
  }

  .leaflet-marker-icon {
    background-color: teal;
    border-radius: 50%;
  }

  .v-card-title {
    white-space: normal;
  }

  .v-locale--is-rtl .v-navigation-drawer__scrim {
    inset: unset !important;
  }

</style>