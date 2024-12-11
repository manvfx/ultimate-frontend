import { launchSheet } from '../../unified-sheets/mod';

import ButtonPickerSheet from './sheet.vue';


export async function launchButtonPickerSheet({ icon, title, subtitle, text, startButtons, endButtons, isReversed, options }) {
  return launchSheet({
    component: ButtonPickerSheet,
    props: {
      icon,
      title,
      subtitle,
      text,
      startButtons,
      endButtons,
      isReversed,
    },
    options,
  });
}
