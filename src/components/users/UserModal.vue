<script setup lang="ts">
import { ref, reactive, watch, computed } from 'vue';
import type { User, UserRole, UserDepartment, UserStatus } from '../../types';
import AppModal from '../common/AppModal.vue';
import AppButton from '../common/AppButton.vue';
import AppInput from '../common/AppInput.vue';
import AppSelect from '../common/AppSelect.vue';

interface Props {
  modelValue: boolean;
  user?: User | null;
}

const props = withDefaults(defineProps<Props>(), {
  user: null
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
  (e: 'save', userData: any): void;
}>();

const isEdit = computed(() => !!props.user);
const title = computed(() => (isEdit.value ? 'Edit User Details' : 'Invite New Team Member'));
const description = computed(() =>
  isEdit.value
    ? 'Update user workspace credentials, department, and role.'
    : 'Send an invitation to join your enterprise organization.'
);

const form = reactive({
  name: '',
  email: '',
  role: 'Engineering Lead' as UserRole,
  department: 'Engineering' as UserDepartment,
  status: 'Active' as UserStatus,
  phone: '',
  location: '',
  bio: '',
  mfaEnabled: true
});

const errors = reactive({
  name: '',
  email: ''
});

const isSubmitting = ref(false);

const roleOptions: UserRole[] = [
  'Administrator',
  'Engineering Lead',
  'Senior Engineer',
  'Product Manager',
  'Security Analyst',
  'DevOps Specialist',
  'Finance Manager'
];

const departmentOptions: UserDepartment[] = [
  'Engineering',
  'Product & Design',
  'Operations & Cloud',
  'Security & Compliance',
  'Customer Success',
  'Finance'
];

const statusOptions: UserStatus[] = ['Active', 'Inactive', 'Pending', 'Suspended'];

watch(
  () => props.user,
  (u) => {
    if (u) {
      form.name = u.name;
      form.email = u.email;
      form.role = u.role;
      form.department = u.department;
      form.status = u.status;
      form.phone = u.phone || '';
      form.location = u.location || '';
      form.bio = u.bio || '';
      form.mfaEnabled = u.mfaEnabled ?? true;
    } else {
      form.name = '';
      form.email = '';
      form.role = 'Senior Engineer';
      form.department = 'Engineering';
      form.status = 'Active';
      form.phone = '';
      form.location = '';
      form.bio = '';
      form.mfaEnabled = true;
    }
    errors.name = '';
    errors.email = '';
  },
  { immediate: true }
);

function validate(): boolean {
  let valid = true;
  errors.name = '';
  errors.email = '';

  if (!form.name.trim()) {
    errors.name = 'Full name is required.';
    valid = false;
  }

  if (!form.email.trim()) {
    errors.email = 'Email address is required.';
    valid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
    errors.email = 'Please provide a valid email format.';
    valid = false;
  }

  return valid;
}

async function handleSubmit() {
  if (!validate()) return;

  isSubmitting.value = true;
  await new Promise(r => setTimeout(r, 400));

  emit('save', {
    ...form,
    id: props.user ? props.user.id : undefined
  });

  isSubmitting.value = false;
  emit('update:modelValue', false);
}
</script>

<template>
  <AppModal
    :model-value="props.modelValue"
    size="lg"
    :title="title"
    :description="description"
    @update:model-value="(val) => emit('update:modelValue', val)"
  >
    <form class="space-y-4" @submit.prevent="handleSubmit">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <!-- Full Name -->
        <AppInput
          v-model="form.name"
          label="Full Name"
          placeholder="e.g. Jordan Miller"
          :error="errors.name"
          required
        />

        <!-- Email -->
        <AppInput
          v-model="form.email"
          label="Email Address"
          type="email"
          placeholder="jordan.miller@acmewave.io"
          :error="errors.email"
          required
        />
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <!-- Role -->
        <AppSelect
          v-model="form.role"
          label="Assigned Role"
          :options="roleOptions"
          required
        />

        <!-- Department -->
        <AppSelect
          v-model="form.department"
          label="Department"
          :options="departmentOptions"
          required
        />

        <!-- Status -->
        <AppSelect
          v-model="form.status"
          label="Account Status"
          :options="statusOptions"
          required
        />
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <!-- Phone -->
        <AppInput
          v-model="form.phone"
          label="Phone Number (Optional)"
          placeholder="+1 (555) 000-0000"
        />

        <!-- Location -->
        <AppInput
          v-model="form.location"
          label="Primary Office / Location"
          placeholder="San Francisco, CA"
        />
      </div>

      <!-- Bio / Notes -->
      <div class="space-y-1.5 text-left">
        <label class="text-xs font-semibold tracking-wide text-light-text-primary dark:text-dark-text-primary uppercase">
          Internal Notes & Responsibilities
        </label>
        <textarea
          v-model="form.bio"
          rows="2"
          placeholder="Short description of core ownership or permissions..."
          class="w-full p-2.5 rounded-md border text-sm transition-all duration-150 outline-none
                 bg-light-surface text-light-text-primary border-light-border
                 dark:bg-dark-elevated dark:text-dark-text-primary dark:border-dark-border
                 focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
        />
      </div>

      <!-- MFA Toggle -->
      <div class="flex items-center justify-between p-3 rounded-md bg-light-elevated/40 dark:bg-dark-elevated/40 border border-light-border dark:border-dark-border text-left">
        <div>
          <p class="text-xs font-semibold text-light-text-primary dark:text-dark-text-primary">
            Require Multi-Factor Authentication (MFA)
          </p>
          <p class="text-[11px] text-light-text-muted dark:text-dark-text-muted">
            Enforces hardware security keys or authenticator TOTP app during sign-in.
          </p>
        </div>
        <input
          v-model="form.mfaEnabled"
          type="checkbox"
          class="rounded border-light-border dark:border-dark-border text-brand-600 focus:ring-brand-500 w-4 h-4 cursor-pointer"
        />
      </div>
    </form>

    <template #footer>
      <AppButton
        variant="ghost"
        size="sm"
        @click="emit('update:modelValue', false)"
      >
        Cancel
      </AppButton>
      <AppButton
        variant="primary"
        size="sm"
        :loading="isSubmitting"
        @click="handleSubmit"
      >
        {{ isEdit ? 'Save Changes' : 'Send Invitation' }}
      </AppButton>
    </template>
  </AppModal>
</template>
