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
        pathName: 'admin.dashboard'
      }
    ]
  },
  {
    icon: 'mdi-account-group-outline',
    name: 'Users',
    children: [
      {
        icon: 'mdi-account-outline',
        name: 'مدیریت کاربران',
        pathName: 'panel.users'
      },  
      {
        icon: 'mdi-shield-account-outline',
        name: 'نقش ها',
        pathName: 'panel.roles'
      },
      {
        icon: 'mdi-shield-lock-outline',
        name: 'مجوز ها',
        pathName: 'panel.permissions'
      },
      {
        icon: 'mdi-select-group',
        name: 'گروه ها',
        pathName: 'panel.groups'
      },      
    ]
  },
  {
    icon: 'mdi-cog-outline',
    name: 'System',
    children: [
      {
        icon: 'mdi-office-building-outline',
        name: 'ملک ها',
        pathName: 'panel.property'
      },
      {
        icon: 'mdi-file-cabinet',
        name: 'ارزیابی ها',
        pathName: 'panel.evaluation'
      },
      {
        icon: 'mdi-shape-outline',
        name: 'دسته بندی ها',
        pathName: 'panel.category'
      },
      {
        icon: 'mdi-form-textbox',
        name: 'بانک سوالات',
        pathName: 'panel.question.list'
      },
    ]
  },
  {
    icon: 'mdi-bank-outline',
    name: 'Finance',
    children: [
      {
        icon: 'mdi-receipt-text',
        name: 'تراکنش ها',
      },
    ]
  },
]

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
</script>

<template>
  <v-navigation-drawer
    permanent
    :model-value="true"
    :width="drawerVisible === 'full' ? '280' : '60'"
  >
    <div class="fill-height d-flex flex-column">
      <v-card
        v-if="drawerVisible !== 'full'"
        class="ma-2 flex-grow-0 d-flex align-center py-1 px-2"
        flat
      >
        <v-img src="/logo-mini.svg" class="flex-grow-0" width="64" />
      </v-card>

      <div
        class="flex-grow-1 d-flex flex-row"
        style="height: 0; border-top: 1px solid rgba(0, 0, 0, 0.175)"
      >
        <div
          class="flex-grow-0 fill-height d-flex flex-column"
          :style="computedStyles"
        >
          <v-btn
            v-for="group of groups"
            :key="group.name"
            :variant="group.name === previewingGroupName ? 'outlined' : 'text'"
            min-width="0"
            width="45"
            height="45"
            :title="group.name"
            :active="group.name === selectedGroupName"
            @click="previewingGroupName = group.name"
          >
            <v-icon :icon="group.icon"/>
          </v-btn>

          <v-spacer />

          <v-btn
            variant="text"
            icon="mdi-account-outline"
            size="small"
            @click="doUpdateProfile(user.data)"
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
          <div class="flex-grow-1"></div>
          <v-list-item
            prepend-avatar="https://cdn.vuetifyjs.com/images/john.png"
            subtitle="مدیر سیستم"
            title="محمد امین نجفی"
            class="border bg-white"
          >
            <template v-slot:append>
              <v-btn
                icon="mdi-cog-outline"
                size="small"
                variant="text"
              ></v-btn>
            </template>
          </v-list-item>
        </v-list>
      </div>
    </div>
  </v-navigation-drawer>
</template>

<style lang="scss" scoped>
.sidebar-nav-child :deep(.v-icon) {
  margin-inline-end: 12px;
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
