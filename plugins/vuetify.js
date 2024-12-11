import { createVuetify } from 'vuetify';
import fa from 'vuetify/lib/locale/fa.mjs';
import * as components from 'vuetify/components';
import * as labsComponents from 'vuetify/labs/components';

export default defineNuxtPlugin(nuxtApp => {

  const vuetify = createVuetify({
    ssr: false,
    components: {
      ...components,
      ...labsComponents,
    },
    theme: {
      themes: {
        light: {
          colors: {
            primary: '#282828',
          },
        },
      },
    },
    locale: {
      messages: {
        fa,
      },
      locale: 'fa',
      rtl: {
        fa: true,
      },
    },
    defaults: {
      VTextField: {
        variant: 'outlined',
      },
      VSelect: {
        variant: 'outlined',
      },
      VTextarea: {
        variant: 'outlined',
      },
    },
  });

  nuxtApp.vueApp.use(vuetify);

});
