import { registerFormElement, registerValidator, registerTransformer, prependValueProcessor } from 'unified-form';


const charsToReplace = [
  ['۰', '0'],
  ['۱', '1'],
  ['۲', '2'],
  ['۳', '3'],
  ['۴', '4'],
  ['۵', '5'],
  ['۶', '6'],
  ['۷', '7'],
  ['۸', '8'],
  ['۹', '9'],
];

export default defineNuxtPlugin(app => {

  prependValueProcessor({
    criterion: f => f.identifier === 'text',
    processor: v => {

      for (const pair of charsToReplace) {
        v = v.replace(new RegExp(pair[0], 'g'), pair[1]);
      }

      return v;

    },
  });

  registerTransformer({
    criterion: field => !('persistentHint' in field),
    transducer: field => ({
      ...field,
      persistentHint: true,
    }),
  });


  registerFormElement({
    identifier: 'plaque',
    component: defineAsyncComponent(() =>
      import('../components/form-elements/plaque.vue')
    ),
  });

  registerFormElement({
    identifier: 'bike-plaque',
    component: defineAsyncComponent(() =>
      import('../components/form-elements/bike-plaque.vue')
    ),
  });

  registerFormElement({
    identifier: 'renovation-code',
    component: defineAsyncComponent(() =>
      import('../components/form-elements/renovation-code.vue')
    ),
  });

  registerFormElement({
    identifier: 'remote-select',
    component: defineAsyncComponent(() =>
      import('../components/form-elements/remote-select.vue')
    ),
  });

  registerFormElement({
    identifier: 'upload-file',
    component: defineAsyncComponent(() =>
      import('../components/form-elements/upload-file-element.vue')
    ),
  });

  registerFormElement({
    identifier: 'text-dialog',
    component: defineAsyncComponent(() =>
      import('../components/form-elements/text-dialog-element.vue')
    ),
  });

  registerFormElement({
    identifier: 'date',
    component: defineAsyncComponent(() =>
      import('../components/form-elements/date.vue')
    ),
  });

  registerFormElement({
    identifier: 'text-boxed',
    component: defineAsyncComponent(() =>
      import('../components/form-elements/text-boxed.vue')
    ),
  });

  registerFormElement({
    identifier: 'seriesx',
    component: defineAsyncComponent(() =>
      import('../components/form-elements/seriesx.vue')
    ),
  });

  registerFormElement({
    identifier: 'upload-file-base64',
    component: defineAsyncComponent(() =>
      import('../components/form-elements/upload-file-base64-element.vue')
    )
  })

  registerFormElement({
    identifier: 'select-element',
    component: defineAsyncComponent(() =>
      import('../components/form-elements/select-element.vue')
    )
  })

  registerFormElement({
    identifier: 'gmap-element',
    component: defineAsyncComponent(() =>
      import('../components/form-elements/gmap-element.vue')
    ),
  });

  registerValidator({
    key: 'is-filled',
    validator: v => {

      if (typeof v === 'string') {
        return v.trim().length > 0;
      }

      if (typeof v === 'number') {
        return v === 0 || !!v;
      }

      return !!v;

    },
  });

  registerValidator({
    key: 'is-plate-filled',
    validator: v => {
      if (v.trim().length < 9) {
        return 'اطلاعات پلاک را به طور کامل وارد کنید';
      }
      return true;

    },
  });

  registerValidator({
    key: 'is-bike-plate-filled',
    validator: v => {
      if (v.trim().length < 8) {
        return 'اطلاعات پلاک را به طور کامل وارد کنید';
      }
      return true;

    },
  });

  registerValidator({
    key: 'is-persian-chars',
    validator: v => {
      return /^[اآبپتثجچحخدذرزژسشصضطظعغفقکگلمنوهی\sأإؤئء ٔ]*$/.test(v);
    },
  });

  registerValidator({
    key: 'is-phone-number',
    validator: v => {

      if (!/^[0-9]*$/.test(v)) {
        return 'فقط باید عدد وارد شود.';
      }

      if (!v.startsWith('09')) {
        return 'شماره تلفن باید با ۰۹ شروع شود.';
      }

      if (v.length !== 11) {
        return 'شماره تلفن باید ۱۱ رقم باشد.';
      }

      return true;

    },
  });

  registerValidator({
    key: 'is-national-code',
    validator: v => {

      if (!/^[0-9]*$/.test(v)) {
        return 'فقط باید عدد وارد شود.';
      }

      if (v.length !== 10) {
        return 'کد ملی باید ۱۰ رقم باشد.';
      }


      const check = +v[9];
      const sum = Array(9).fill().map((_, i) => +v[i] * (10 - i)).reduce((x, y) => x + y) % 11;

      return (sum < 2 && check === sum) || (sum >= 2 && check + sum === 11) || 'کد ملی به شکل صحیح وارد نشده است.';

    },
  });

  registerValidator({
    key: 'is-postal-code',
    validator: v => {

      if (!v) {
        return true;
      }

      if (!/^[0-9]*$/.test(v)) {
        return 'فقط باید عدد وارد شود.';
      }

      if (v.length !== 10) {
        return 'کد پستی باید ۱۰ رقم باشد.';
      }

      return true;

    },
  });

  registerValidator({
    key: 'is-vin',
    validator: v => {

      if (v.length !== 17) {
        return 'VIN باید ۱۷ حرف باشد.';
      }

      if (!new RegExp("^(?=.*[a-zA-Z])(?=.*[۰-۹0-9])([a-zA-Z۰-۹0-9]+)$").test(v)) {
        return  'VIN باید شامل اعداد از ۱ تا ۹ و حروف انگلیسی  باشد'
      }

      return true;

    },
  });

  registerValidator({
    key: 'is-renovation-code',
    validator: v => {

      if (!/^[0-9a-z\-]*$/.test(v)) {
        return 'فقط باید عدد یا حرف انگلیسی کوچک وارد شود.';
      }

      if (v.split('-').length !== 7) {
        return 'کد نوسازی باید ۷ بخش داشته باشد که با - جدا شده اند.';
      }

      if (!v.split('-').every(c => !!c && !isNaN(c))) {
        return 'همه بخش‌ها باید فقط عدد باشند.';
      }

      return true;

    },
  });

  registerValidator({
    key: 'is-digit-chars',
    validator: v => {

      if (!/^[0-9a-z\-]*$/.test(v)) {
        return 'فقط باید عدد یا حرف انگلیسی کوچک وارد شود.';
      }

      return true;

    },
  });

});
