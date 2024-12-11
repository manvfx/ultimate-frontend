import { launchSheet } from '../../unified-sheets/mod';

import FormPickerSheet from './sheet.vue';


export async function launchFormPickerSheet({ icon, title, subtitle, text, initialForm, fields, submitLabel, cancelLabel, submitHandler, options }) {
  return launchSheet({
    component: FormPickerSheet,
    props: {
      icon,
      title,
      subtitle,
      text,
      initialForm,
      fields,
      submitLabel,
      cancelLabel,
      submitHandler,
    },
    options,
  });
}
