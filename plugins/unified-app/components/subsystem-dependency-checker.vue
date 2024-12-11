<script setup>

import { toastSuccess } from '~/services/toasts/mod';
import { http, generalHttpHandle } from '~~/services/http/mod';

const router = useRouter();
const route = useRoute();


/* interface */

const props = defineProps({
  subsystem: String,
});

const emit = defineEmits([]);


/* settings */

const { data: settings, loading: loadingSettings } = useNetwork({
  url: '/v1/home/settings?key=subsystemsDependencies',
});


/* authorization */

const user = inject('user');


const isAuthorized = computed(() => {

  const subsystemsDependencies = settings.value?.subsystemsDependencies.find(it => it.name === props.subsystem);
  const dependenciesFields = user.value?.type === 'person' ? subsystemsDependencies?.personFields : subsystemsDependencies?.legalFields;

  for (const field of dependenciesFields ?? []) {
    if (field.compulsory && !user.value[field.name]) {
      return false;
    }
  }

  return true;

});

const needsNationalCodeVerification = computed(() => {

  const subsystemsDependencies = settings.value?.subsystemsDependencies.find(it => it.name === props.subsystem);
  const dependenciesFields = user.value?.type === 'person' ? subsystemsDependencies?.personFields : subsystemsDependencies?.legalFields;

  const nationalCodeField = (dependenciesFields ?? []).find(it => it.name === 'nationalCode');
  return Boolean(nationalCodeField && nationalCodeField.compulsory);

});


/* filling profile */

import * as ProfileFields from '../domains/panel-profile/fields';
import cloneDeepWith from 'lodash/cloneDeepWith';
const formatDate = inject('formatDate');


const shahkarVerificationMessage = computed(() => {
  if (user.value && !user.value.tempNationalCode && !user.value.nationalCode && !user.value.adminNationalCode) {
    return `کد ملی وارد نشده است.`;
  }
  else if (user.value?.nationalCodeVerifiedByShahkar?.toLowerCase() === "unknown") {
    return `در انتظار بررسی کد ملی ${user.value.tempNationalCode}`;
  }
  else if (user.value?.nationalCodeVerifiedByShahkar?.toLowerCase() === "no") {
    return `کد ملی ${user.value.tempNationalCode} به این شماره موبایل تعلق ندارد.`;
  }
  else {
    return `کد ملی ${user.value.type === "person" ? user.value.nationalCode : user.value.adminNationalCode} احراز هویت شده است.`;
  }
});

const systemDependantFields = computed(() => {

  const allFields = cloneDeepWith(
    [
      ProfileFields.firstName,
      ProfileFields.lastName,
      ProfileFields.fatherName,
      ProfileFields.gender,
      {
        ...ProfileFields.nationalCode,
        hint: shahkarVerificationMessage.value,
      },
      ProfileFields.education,
      ProfileFields.dateOfBirth(formatDate),
      ProfileFields.immigrantCode,
      ProfileFields.email,
      ProfileFields.companyName,
      ProfileFields.companyType,
      ProfileFields.economicalCode,
      ProfileFields.registrationCode,
      ProfileFields.adminName,
      ProfileFields.adminNationalCode,
      ProfileFields.nationalId,
      ProfileFields.companyRegistrationDate,
      ProfileFields.address,
      ProfileFields.postalCode,
      ProfileFields.homePhone,
      ProfileFields.IBAN,
    ],
    (v) => {
      if (typeof v === 'function') {
        return v;
      }
    }
  );

  for (const field of allFields) {
    field.label = field.label.replace(' *', '');
    field.width = 12;
    field.rules = (field.rules || []).filter(it => it !== 'is-filled' && it[0] !== 'is-filled');
  }


  const subsystemsDependencies = settings.value?.subsystemsDependencies.find(it => it.name === props.subsystem);
  const dependenciesFields = user.value?.type === 'person' ? subsystemsDependencies?.personFields : subsystemsDependencies?.legalFields;

  const neededFields = allFields.filter(it => dependenciesFields.find(i => i.name === it.key));


  for (const field of neededFields) {
    if (dependenciesFields.find(i => i.name === field.key).compulsory) {
      field.label += ' *';
      field.rules.unshift(['is-filled', `وارد کردن ${field.label}الزامی است.`]);
    }
  }

  return neededFields;

});


import { launchFormPickerDialog } from '~/plugins/unified-dialogs-vuetify/form-picker/mod';
const reloadUser = inject('reloadUser');

async function completeProfile() {

  const prevForm = JSON.parse(JSON.stringify(user.value));

  prevForm.nationalCode = user.value.nationalCode || user.value.tempNationalCode;

  if (prevForm.IBAN?.startsWith('IR')) {
    prevForm.IBAN = prevForm.IBAN.slice(2);
  }

  launchFormPickerDialog({
    icon: 'mdi-folder-account-outline',
    title: 'تکمیل اطلاعات کاربری',
    text: 'جهت دسترسی به این قسمت، باید اطلاعات زیر را کامل کنید.',
    initialForm: prevForm,
    fields: systemDependantFields.value,
    submitHandler: async form => {

      const userChanges = {};

      for (const key in prevForm) {
        if (JSON.stringify(prevForm[key]) !== JSON.stringify(form[key])) {
          userChanges[key] = form[key];
        }
      }

      if (userChanges.IBAN) {
        userChanges.IBAN = 'IR' + userChanges.IBAN;
      }


      const { status, data } = await http.request({
        method: 'patch',
        url: `/v1/citizen/profile`,
        body: userChanges,
      });

      if (generalHttpHandle(status, data)) {
        throw new Error();
      }


      await reloadUser();

      toastSuccess({
        title: 'اطلاعات کاربری با موفقیت به روزرسانی شد.',
      });

    }
  });

}


/* template */

</script>


<template>
  <loading-section :loading="loadingSettings">
    <template v-if="isAuthorized">
      <slot />
    </template>
    <template v-else>

      <v-alert
        variant="tonal"
        type="warning"
        text="برای مشاهده این بخش باید قسمتی از اطلاعات پروفایل خود را کامل کنید.">

        <div class="pa-1 text-end">
          <v-btn
            color="primary"
            prepend-icon="mdi-account"
            @click="completeProfile()">
            تکمیل اطلاعات پروفایل
          </v-btn>
        </div>

      </v-alert>

      <v-alert
        v-if="needsNationalCodeVerification"
        variant="tonal"
        type="warning"
        class="mt-3"
        :text="shahkarVerificationMessage"
      />

    </template>

  </loading-section>
</template>