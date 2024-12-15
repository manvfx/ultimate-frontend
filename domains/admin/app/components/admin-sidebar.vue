<script setup>
import { generalHttpHandle, http } from '~~/services/http/mod'
import { toastSuccess } from '~~/services/toasts/mod'
import { launchButtonPickerDialog } from '~~/plugins/unified-dialogs-vuetify/button-picker/mod'
import { launchFormPickerDialog } from '~~/plugins/unified-dialogs-vuetify/form-picker/mod'
// import { logoutUser } from '../authentication/controller'

const router = useRouter()
const route = useRoute()
const user = useUser();
const token = inject('token')
/* groups */
const selectedGroupName = ref('Dashboard')
const previewingGroupName = ref('')

const groups = [
  {
    icon: 'mdi-view-dashboard-outline',
    name: 'Dashboard',
    children: [
      {
        icon: 'mdi-chart-box-outline',
        name: 'پیشخوان',
        pathName: 'admin.dashboard',
      },
      {
        icon: 'mdi-help-box',
        name: 'راهنماها',
      },
      {
        icon: 'mdi-server-security',
        name: 'تنظیمات خانه Api',
      },
    ],
  },
  {
    icon: 'mdi-account-group-outline',
    name: 'Users',
    children: [
      {
        icon: 'mdi-account-outline',
        name: 'مدیریت کاربران',
      },
      {
        icon: 'mdi-shield-account-outline',
        name: 'نقش‌ها',
      },
      {
        icon: 'mdi-shield-lock-outline',
        name: 'مجوز‌ها',
      },
      {
        icon: 'mdi-select-group',
        name: 'گروه‌ها',
      },
      {
        icon: 'mdi-account-question',
        name: 'شرایط',
      },
      {
        icon: 'mdi-file-question',
        name: 'فرم شرایط',
      },
      {
        icon: 'mdi-file-clock',
        name: 'تایید فرم شرایط',
      },
    ],
  },
  {
    icon: 'mdi-bank-outline',
    name: 'Finance',
    children: [
      {
        icon: 'mdi-receipt-text',
        name: 'تراکنش‌ها',
      },
      {
        icon: 'mdi-transfer',
        name: 'مدیریت انتقال‌ها',
      },
      {
        icon: 'mdi-cash',
        name: 'مدیریت تراکنش‌ها',
      },
      {
        icon: 'mdi-bank',
        name: 'مدیریت حساب‌ها',
      },
    ],
  },
  {
    icon: 'mdi-file-outline',
    name: 'Data',
    children: [
      {
        icon: 'mdi-database-plus',
        name: 'انتشار داده از دیتابیس',
      },
      {
        icon: 'mdi-wizard-hat',
        name: 'انتشار داده از سرویس',
      },
      {
        icon: 'mdi-shape',
        name: 'دسته‌بندی‌های داده',
        permissions: ['admin.data-category.list'],
      },
      {
        icon: 'mdi-file-tree',
        name: 'درخت دسته‌بندی‌ها',
      },
      {
        icon: 'mdi-file',
        name: 'داده‌ها',
      },
      {
        icon: 'mdi-clock',
        name: 'تگ‌های زمانی',
      },
      {
        icon: 'mdi-shape-outline',
        name: 'انواع داده',
      },
      {
        icon: 'mdi-account',
        name: 'انتشار دهنده‌ها',
      },
      {
        icon: 'mdi-database-clock',
        name: 'درخواست‌های داده',
      },
      {
        icon: 'mdi-database-edit',
        name: 'مجوزهای داده',
      },
    ],
  },
  {
    icon: 'mdi-server-outline',
    name: 'API Management',
    children: [
      {
        icon: 'mdi-web-plus',
        name: 'انتشار Api موجود',
      },
      {
        icon: 'mdi-web-sync',
        name: 'انتشار Api جدید',
      },
      {
        icon: 'mdi-server-network',
        name: 'واحد‌های Api',
      },
      {
        icon: 'mdi-tag-text',
        name: 'نسخه‌های Api',
      },
      {
        icon: 'mdi-play-circle',
        name: 'اجراکننده Api',
      },
      {
        icon: 'mdi-history',
        name: 'لاگ اجرای Api',
      },
      {
        icon: 'mdi-note-text',
        name: 'مجوزهای Api',
      },
      {
        icon: 'mdi-clipboard-list',
        name: 'سیاست‌های Api',
      },
      {
        icon: 'mdi-link-lock',
        name: 'تحویل‌گیرنده‌ها',
      },
      {
        icon: 'mdi-file-tree',
        name: 'درخت تحویل‌گیرنده‌ها',
      },
      {
        icon: 'mdi-chart-bar',
        name: 'ایجاد Api از گزارش',
      },
      {
        icon: 'mdi-star',
        name: 'درخواست‌های Api',
      },
      {
        icon: 'mdi-file',
        name: 'درخواست‌های ایجاد Api',
      },
    ],
  },
  {
    icon: 'mdi-chart-line',
    name: 'Reports',
    children: [
      {
        icon: 'mdi-account-group',
        name: 'کاربران',
      },
      {
        icon: 'mdi-ticket-confirmation',
        name: 'فراخوانی‌های Api',
      },
      {
        icon: 'mdi-server-network',
        name: 'Api انتشار یافته',
      },
      {
        icon: 'mdi-tag-text',
        name: 'وضعیت انتشار هر Api',
      },
      {
        icon: 'mdi-note-text',
        name: 'مجوزهای هر Api',
      },
      {
        icon: 'mdi-star',
        name: 'درخواست‌های Api',
      },
      {
        icon: 'mdi-file',
        name: 'درخواست‌های ایجاد Api',
      },
      {
        icon: 'mdi-transfer',
        name: 'انتقال‌ها',
      },
      {
        icon: 'mdi-file-account',
        name: 'گزارش لاگ‌ها',
      },
      {
        icon: 'mdi-face-agent',
        name: 'تیکت‌های عمومی',
      },
      {
        icon: 'mdi-ticket-confirmation',
        name: 'تیکت‌های Api',
      },
      {
        icon: 'mdi-file',
        name: 'گزارش داده‌ها',
      },
      {
        icon: 'mdi-shape',
        name: 'دسته‌بندی‌های داده',
      },
    ],
  },
  {
    icon: 'mdi-cog-outline',
    name: 'Management',
    children: [
      {
        icon: 'mdi-account-group',
        name: 'مدیریت کاربران',
      },
      {
        icon: 'mdi-account-box-multiple',
        name: 'مدیریت نقش‌ها',
      },
      {
        icon: 'mdi-list-box',
        name: 'دسته‌بندی‌های تیکت‌ها',
      },
      {
        icon: 'mdi-face-agent',
        name: 'تیکت‌های پشتیبانی',
      },
      {
        icon: 'mdi-view-list',
        name: 'دسته‌بندی‌های تیکت‌های Api',
      },
      {
        icon: 'mdi-ticket-confirmation',
        name: 'تیکت‌های پشتیبانی Api',
      },
      {
        icon: 'mdi-file-account',
        name: 'مدیریت لاگ‌ها',
      },
      {
        icon: 'mdi-chart-arc',
        name: 'مشاهده آمار',
      },
    ],
  },
];


const selectedGroup = computed(() =>
  groups.find(it => it.name === selectedGroupName.value)
)

const previewingGroup = computed(() =>
  !previewingGroupName.value
    ? []
    : groups.find(it => it.name === previewingGroupName.value)
)

const visibleGroupName = computed(
  () => previewingGroupName.value || selectedGroupName.value
)

const visibleGroup = computed(() =>
  groups.find(it => it.name === visibleGroupName.value)
)

;(function identifyStartingGroup () {
  if (route.name === 'general.home') {
    return
  }

  const initialGroup = groups.find(it =>
    it.children.some(i => i.pathName === route.name)
  )
  if (!initialGroup) {
    return
  }

  selectedGroupName.value = initialGroup.name
})()

async function doLogoutAccount () {
  launchButtonPickerDialog({
    title: 'خروج از حساب کاربری',
    text: 'آیا مایل به خروج هستید',
    startButtons: [
      {
        title: 'خیر'
      }
    ],
    endButtons: [
      {
        title: 'بلی',
        color: 'info',
        async handler () {
        //   await logoutUser(token, user)
          router.replace({ name: 'authentication.page' })
        }
      }
    ]
  })
}

async function doUpdateProfile (item) {
  launchFormPickerDialog({
    title: 'پروفایل من',
    subtitle: 'در این بخش می توانید پروفایل خود را اپدیت نمایید',
    initialForm: item,
    fields: [
      {
        key: 'firstName',
        identifier: 'text',
        label: 'نام',
        disabled: true
      },
      {
        key: 'lastName',
        identifier: 'text',
        label: 'نام خانوادگی',
        disabled: true
      },
      {
        key: 'email',
        identifier: 'text',
        label: 'ایمیل',
        disabled: true
      },
    ],
    options: {
      width: 320,
    },
    submitLabel: 'بروزرسانی',
    cancelLabel: 'بازگشت',
    async submitHandler (form) {
      const { currentPassword, newPassword, newPasswordRepeat } = form
      const { status, data } = await http.request({
        method: 'PATCH',
        url: `/auth/admin/profile/update`,
        body: {
          currentPassword,
          newPassword,
          newPasswordRepeat
        }
      })

      if (generalHttpHandle(status, data)) {
        return
      }

      if (status === 200) {
        toastSuccess({ title: 'پروفایل شما بروزرسانی شد' })
      }
    }
  })
}
/* template */
const drawerVisible = ref('full')

// Toggle function for the drawer
const toggleDrawer = () => {
  drawerVisible.value = drawerVisible.value === 'full' ? 'mini' : 'full'
}

const computedStyles = computed(() => {
  let baseStyles = {
    padding: '6px',
    gap: '4px',
    overflowY: 'auto'
  }

  if (drawerVisible.value === 'full') {
    baseStyles.borderLeft = '1px solid rgba(0, 0, 0, 0.175)'
  }

  return baseStyles
})

const handleProfile = () => {
  console.log("Navigating to Profile...");
};

const handleExit = () => {
  console.log("Logging out...");
};

const handleSelectPanel = () => {
  console.log("Selecting a Panel...");
};

const handleSettings = () => {
  console.log("Opening Settings...");
};

const overlay = ref(false)
const doSwitchPanel = () => {
  overlay.value= true
};

</script>

<template>
  <v-navigation-drawer
    permanent
    elevation="2"
    :model-value="true"
    :width="drawerVisible === 'full' ? '300' : '60'"
  >
    <div class="fill-height d-flex flex-column">
      <div
        class="flex-grow-1 d-flex flex-row"
        style="height: 0"
      >
        <div
          class="flex-grow-0 fill-height d-flex flex-column"
          :style="computedStyles"
        >
        <v-card
        class="flex-grow-0 d-flex align-center mr-2 py-3"
        flat
      >
        <v-img src="/logo-mini.svg" class="flex-grow-0" width="34" />
      </v-card>
          <v-btn
            v-for="group of groups"
            :key="group.name"
            :variant="group.name === previewingGroupName ? 'tonal' : 'text'"
            min-width="0"
            width="45"
            height="45"
            size="small"
            :title="group.name"
            :active="group.name === selectedGroupName"
            @click="previewingGroupName = group.name"
            :color="group.name === previewingGroupName ? 'primary' : 'grey-darken-3'"
            :icon="group.icon"
          >
          </v-btn>

          <v-spacer />
          <v-btn
            variant="text"
            icon="mdi-switch"
            size="small"
            @click="doSwitchPanel()"
          >
          </v-btn>

          <v-overlay v-model="overlay" class="align-center justify-center bg-indigo-darken-3" contained>
            <v-row class="pa-8">
              <v-col cols="12">
                <v-card>
                  <v-card-title class="d-flex align-center text-body-1 font-weight-bold">                  
                    <img src="/logo-publish.svg" width="32" class="ml-4"/>
                    نمایش
                  </v-card-title>
                </v-card>
              </v-col>
              <v-col cols="12">
                <v-card>
                  <v-card-title class="d-flex align-center text-body-1 font-weight-bold">                  
                    <img src="/logo-mini.svg" width="32" class="ml-4"/>
                    انتشار
                  </v-card-title>
                </v-card>
              </v-col>
              <v-col cols="12">
                <v-card>
                  <v-card-title class="d-flex align-center text-body-1 font-weight-bold">                  
                    <img src="/logo-analytics.svg" width="32" class="ml-4"/>
                   جمع آوری
                  </v-card-title>
                </v-card>
              </v-col>
            </v-row>
          </v-overlay>

          <v-btn
            variant="text"
            icon="mdi-account-outline"
            size="small"
            @click="doUpdateProfile({})"
          >
          </v-btn>

          <v-btn
            variant="text"
            icon="mdi-exit-to-app"
            size="small"
            @click="doLogoutAccount"
          >
          </v-btn>

          <v-btn
            variant="text"
            icon="mdi-arrow-right"
            size="small"
            @click="toggleDrawer"
          >
          </v-btn>
        </div>
        <v-list
          nav
          density="compact"
          class="flex-grow-1 d-flex flex-column"
          style="padding: 6px"
          v-if="drawerVisible === 'full'"
        >
        <v-list-item
            prepend-avatar="https://cdn.vuetifyjs.com/images/john.png"
            subtitle="مدیر سیستم"
            title="محمد امین نجفی"
            class="bg-grey-lighten- mb-2"
          >
            <template v-slot:append>
              <v-menu>
    <template v-slot:activator="{ props }">
      <v-btn
        variant="text"
        icon="mdi-dots-vertical"
        size="small"
        v-bind="props"
      ></v-btn>
    </template>
                   
              <v-list>
                  <v-list-item
                    class="my-list-item"
                    title="پروفایل کاربری"
                    prepend-icon="mdi-account-circle-outline"
                    @click="handleProfile"
                  ></v-list-item>
                  <v-list-item
                   class="my-list-item "
                    title="انتخاب پنل"
                    prepend-icon="mdi-inbox-outline"
                    @click="handleSelectPanel"
                  ></v-list-item>
                  <v-list-item
                   class="my-list-item "
                    title="تنظیمات"
                    prepend-icon="mdi-cog-outline"
                    @click="handleSettings"
                  ></v-list-item>
                  <v-divider/>
                  <v-list-item
                   class="my-list-item "
                    title="خروج از برنامه"
                    prepend-icon="mdi-exit-to-app"
                    @click="handleExit"
                  ></v-list-item>
                </v-list>
              </v-menu>
            </template>
          </v-list-item>
          <v-list-item
            v-for="child of visibleGroup.children"
            :key="child.name"
            :prepend-icon="child.icon"
            :title="child.name"
            class="sidebar-nav-child"
            :to="child.pathName ? { name: child.pathName } : undefined"
            exact
            color="primary"
            @click="
              selectedGroupName = visibleGroup.name
              // previewingGroupName = ''
            "
          />
        </v-list>
      </div>
    </div>
  </v-navigation-drawer>
</template>

<style lang="scss" scoped>
.sidebar-nav-child :deep(.v-icon) {
  margin-inline-end: -12px;
  font-size: 1.2em;
}

.mini-drawer {
  .v-btn {
    min-width: 0;
    width: 40px;
    height: 40px;
    padding: 5px;
  }
}

</style>
