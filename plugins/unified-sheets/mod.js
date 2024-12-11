import { markRaw } from 'vue';
import { useSheets } from './state';


function uuid() {
  return (
    new Array(4)
      .fill()
      .map(() => Math.random().toString(16).slice(2))
      .join('-')
  );
}


export function launchSheet({ component, props, options }) {

  const sheets = useSheets();

  return new Promise((resolve, reject) => {
    sheets.value.push({
      key: uuid(),
      component: markRaw(component),
      modelValue: true,
      props: props ?? {},
      options: options ?? {},
      resolve,
      reject,
    });
  });

}


export {
  default as UnifiedSheetProvider
} from './provider.vue';
