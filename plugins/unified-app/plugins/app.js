import { http, generalHttpHandle } from '~/services/http/mod';

import { useToken } from '~/domains/auth/app/composables/use-token';
import { useUser } from '~/domains/auth/app/composables/use-user';

import { launchDialog } from '~/services/dialogs/mod';

import dayjs from 'dayjs';
import jalaliDay from 'jalaliday';


export default defineNuxtPlugin(app => {

  /* http */

  app.vueApp.provide('http', http);
  app.vueApp.provide('generalHttpHandle', generalHttpHandle);


  /* authentication */

  const token = useToken();
  const user = useUser();

  app.vueApp.provide('token', token.value);
  app.vueApp.provide('user', user.value);


  /* unified dialogs */

  app.vueApp.provide('launchDialog', launchDialog);


  /* uuid */

  app.vueApp.provide('makeUuid', (sections = 4) => {
    return (
      new Array(sections)
        .fill()
        .map(() => Math.random().toString(16).slice(2))
        .join('-')
    );
  });


  /* date format */

  dayjs.extend(jalaliDay);

  app.vueApp.provide('formatDate', (timestamp, format = 'YYYY/MM/DD HH:mm', calendar = 'jalali', locale = 'fa') => {
    return dayjs(timestamp).calendar(calendar).locale(locale).format(format);
  });

});
