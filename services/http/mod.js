import { makeUnifiedNetwork } from 'unified-network'
import { toastError } from '../toasts/mod'
import { AppConfig } from '~~/app-config'
// import { logoutUser } from '~/domains/auth/app';
// import { useToken } from '~/domains/auth/app/composables/use-token';
// import { useUser } from '~/domains/auth/app/composables/use-user';
import { launchButtonPickerDialog } from '~/plugins/unified-dialogs-vuetify/button-picker/mod'
import { runDebounced } from '~/plugins/debounced-runner/debounced-runner'

export const http = makeUnifiedNetwork({
  baseUrl: `${AppConfig.sarv.baseUrl}/api`,
  headers: {
    Origin: AppConfig.sarv.websiteUrl
  },
  processor: async ({ url, method, body, headers }) => {
    try {
      const response = await $fetch.raw(url, {
        method: method.toUpperCase(),
        body,
        headers
      })

      return {
        status: response?.status,
        headers: Object.fromEntries(response?.headers.entries() ?? []),
        data: response?._data
      }
    } catch (error) {
      if (!('statusCode' in error)) {
        console.error(error)
      }

      return {
        status: error.statusCode,
        headers: Object.fromEntries(error.response?.headers.entries() ?? []),
        data: error.data
      }
    }
  }
})

export function generalHttpHandle (status, data, silent) {
  if (status === 423) {
    useRouter().replace({
      name: 'auth.index'
    })

    logoutUser(useToken().value, useUser().value, true)

    if (!silent) {
      runDebounced('logout-blocked', 200, () => {
        launchButtonPickerDialog({
          icon: 'mdi-cancel',
          title: 'مسدودی حساب کاربری',
          text: 'حساب کاربری شما مسدود شده است. جهت بررسی وضعیت می‌توانید درخواست پشتیبانی ثبت کنید.',
          startButtons: [
            {
              title: 'ثبت درخواست پشتیبانی',
              color: 'warning',
              value: 'submit-ticket'
            }
          ],
          endButtons: [
            {
              title: 'بستن'
            }
          ]
        }).then(choice => {
          if (choice === 'submit-ticket') {
            useRouter().replace({
              name: 'admin.dashboard'
            })
          }
        })
      })
    }

    return true
  }

  if (status !== 200 && status !== 201) {
    if (!silent) {
      toastError({
        title: data?.error || data?.message || 'لطفا دوباره تلاش کنید.'
      })
    }

    return true
  }
}

export async function syncedRequest (key, config) {
  const response = await useAsyncData(key, () => http.request(config))

  return JSON.parse(JSON.stringify(response.data.value))
}
