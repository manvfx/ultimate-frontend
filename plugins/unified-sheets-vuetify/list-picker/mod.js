import { launchSheet } from '../../unified-sheets/mod';

import ListPickerSheet from './sheet.vue';


export async function launchListPickerSheet({ icon, title, subtitle, text, items, isNavigation, options }) {
  return launchSheet({
    component: ListPickerSheet,
    props: {
      icon,
      title,
      subtitle,
      text,
      items,
      isNavigation,
    },
    options,
  });
}
