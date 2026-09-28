<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../stores/auth';
import { useToastStore } from '../../stores/toast';
import AppButton from '../../components/common/AppButton.vue';
import AppInput from '../../components/common/AppInput.vue';
import AppSelect from '../../components/common/AppSelect.vue';
import { Eye, EyeOff, Lock, Mail, User, Building, Check, X, AlertCircle } from 'lucide-vue-next';

const router = useRouter();
const authStore = useAuthStore();
const toast = useToastStore();

const form = reactive({
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
  company: '',
  role: 'Engineering Lead',
  agreeTerms: false
});

const errors = reactive({
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
  terms: ''
});

const showPassword = ref(false);

const roleOptions = [
  'Administrator',
  'Engineering Lead',
  'Senior Engineer',
  'Product Manager',
  'Security Analyst',
  'DevOps Specialist',
  'Finance Manager'
];

// Dynamic password requirement checks
const hasLength = computed(() => form.password.length >= 8);
const hasUppercase = computed(() => /[A-Z]/.test(form.password));
const hasNumber = computed(() => /[0-9]/.test(form.password));
const hasSpecial = computed(() => /[^A-Za-z0-9]/.test(form.password));
const isPasswordValid = computed(() => hasLength.value && hasUppercase.value && hasNumber.value && hasSpecial.value);

function validate(): boolean {
  let valid = true;
  errors.fullName = '';
  errors.email = '';
  errors.password = '';
  errors.confirmPassword = '';
  errors.terms = '';

  if (!form.fullName.trim()) {
    errors.fullName = 'Full name is required.';
    valid = false;
  }

  if (!form.email.trim()) {
    errors.email = 'Email address is required.';
    valid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
    errors.email = 'Please enter a valid work email address.';
    valid = false;
  }

  if (!form.password) {
    errors.password = 'Password is required.';
    valid = false;
  } else if (!isPasswordValid.value) {
    errors.password = 'Please satisfy all password security criteria.';
    valid = false;
  }

  if (form.password !== form.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match.';
    valid = false;
  }

  if (!form.agreeTerms) {
    errors.terms = 'You must agree to the Terms of Service to continue.';
    valid = false;
  }

  return valid;
}

async function handleRegister() {
  if (!validate()) return;

  const success = await authStore.register(
    form.fullName,
    form.email,
    form.password,
    form.company,
    form.role
  );

  if (success) {
    toast.success('Account Created', `Welcome to Nexus, ${form.fullName}!`);
    router.push('/dashboard');
  }
}
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="text-left space-y-2">
      <h1 class="text-2xl font-bold tracking-tight text-light-text-primary dark:text-dark-text-primary">
        Create an enterprise account
      </h1>
      <p class="text-xs sm:text-sm text-light-text-muted dark:text-dark-text-muted">
        Start provisioning your secure team workspace.
      </p>
    </div>

    <!-- Error Banner -->
    <div
      v-if="authStore.authError"
      class="p-3.5 rounded-lg border border-rose-200 dark:border-rose-900 bg-rose-50/80 dark:bg-rose-950/40 text-rose-800 dark:text-rose-200 text-xs flex items-start gap-2.5"
    >
      <AlertCircle class="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
      <span class="leading-relaxed">{{ authStore.authError }}</span>
    </div>

    <!-- Form -->
    <form class="space-y-4" @submit.prevent="handleRegister">
      <!-- Full Name -->
      <AppInput
        v-model="form.fullName"
        label="Full Name"
        placeholder="e.g. Rachel Chen"
        :error="errors.fullName"
        required
      >
        <template #prefix>
          <User class="w-4 h-4" />
        </template>
      </AppInput>

      <!-- Email -->
      <AppInput
        v-model="form.email"
        label="Work Email"
        type="email"
        placeholder="rachel.chen@company.com"
        :error="errors.email"
        required
      >
        <template #prefix>
          <Mail class="w-4 h-4" />
        </template>
      </AppInput>

      <!-- Company & Role Row -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <AppInput
          v-model="form.company"
          label="Organization (Optional)"
          placeholder="Acme Corp"
        >
          <template #prefix>
            <Building class="w-4 h-4" />
          </template>
        </AppInput>

        <AppSelect
          v-model="form.role"
          label="Primary Role"
          :options="roleOptions"
        />
      </div>

      <!-- Password -->
      <AppInput
        v-model="form.password"
        label="Password"
        :type="showPassword ? 'text' : 'password'"
        placeholder="••••••••••••"
        :error="errors.password"
        required
      >
        <template #prefix>
          <Lock class="w-4 h-4" />
        </template>
        <template #suffix>
          <button
            type="button"
            class="text-light-text-secondary hover:text-light-text-primary dark:text-dark-text-secondary dark:hover:text-dark-text-primary focus:outline-none"
            @click="showPassword = !showPassword"
          >
            <EyeOff v-if="showPassword" class="w-4 h-4" />
            <Eye v-else class="w-4 h-4" />
          </button>
        </template>
      </AppInput>

      <!-- Dynamic Password Requirements Checklist -->
      <div class="p-3 rounded-lg border border-light-border dark:border-dark-border bg-light-elevated/40 dark:bg-dark-elevated/40 text-xs space-y-1.5 text-left">
        <p class="font-medium text-light-text-secondary dark:text-dark-text-secondary mb-1">
          Password requirements
        </p>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-1 text-[11px]">
          <div class="flex items-center gap-1.5" :class="hasLength ? 'text-emerald-600 dark:text-emerald-400 font-medium' : 'text-light-text-muted dark:text-dark-text-muted'">
            <Check v-if="hasLength" class="w-3.5 h-3.5 shrink-0" />
            <X v-else class="w-3.5 h-3.5 shrink-0 opacity-40" />
            <span>At least 8 characters</span>
          </div>
          <div class="flex items-center gap-1.5" :class="hasUppercase ? 'text-emerald-600 dark:text-emerald-400 font-medium' : 'text-light-text-muted dark:text-dark-text-muted'">
            <Check v-if="hasUppercase" class="w-3.5 h-3.5 shrink-0" />
            <X v-else class="w-3.5 h-3.5 shrink-0 opacity-40" />
            <span>One uppercase letter</span>
          </div>
          <div class="flex items-center gap-1.5" :class="hasNumber ? 'text-emerald-600 dark:text-emerald-400 font-medium' : 'text-light-text-muted dark:text-dark-text-muted'">
            <Check v-if="hasNumber" class="w-3.5 h-3.5 shrink-0" />
            <X v-else class="w-3.5 h-3.5 shrink-0 opacity-40" />
            <span>One number</span>
          </div>
          <div class="flex items-center gap-1.5" :class="hasSpecial ? 'text-emerald-600 dark:text-emerald-400 font-medium' : 'text-light-text-muted dark:text-dark-text-muted'">
            <Check v-if="hasSpecial" class="w-3.5 h-3.5 shrink-0" />
            <X v-else class="w-3.5 h-3.5 shrink-0 opacity-40" />
            <span>One special character</span>
          </div>
        </div>
      </div>

      <!-- Confirm Password -->
      <AppInput
        v-model="form.confirmPassword"
        label="Confirm Password"
        type="password"
        placeholder="••••••••••••"
        :error="errors.confirmPassword"
        required
      >
        <template #prefix>
          <Lock class="w-4 h-4" />
        </template>
      </AppInput>

      <!-- Terms & Policy Checkbox -->
      <div class="space-y-1 text-left pt-1">
        <label class="flex items-start gap-2.5 cursor-pointer text-xs select-none">
          <input
            v-model="form.agreeTerms"
            type="checkbox"
            class="rounded border-light-border dark:border-dark-border text-brand-600 focus:ring-brand-500 dark:bg-dark-elevated mt-0.5"
          />
          <span class="text-light-text-secondary dark:text-dark-text-secondary leading-relaxed">
            I agree to the <a href="#" class="text-brand-600 dark:text-brand-400 hover:underline">Terms of Service</a> and <a href="#" class="text-brand-600 dark:text-brand-400 hover:underline">Privacy Policy</a>
          </span>
        </label>
        <p v-if="errors.terms" class="text-xs text-rose-500 font-medium pl-6">
          {{ errors.terms }}
        </p>
      </div>

      <!-- Submit Button -->
      <AppButton
        type="submit"
        variant="primary"
        size="md"
        class="w-full mt-2"
        :loading="authStore.isLoading"
      >
        Create Account
      </AppButton>
    </form>

    <!-- Sign In Link -->
    <div class="text-center text-xs text-light-text-secondary dark:text-dark-text-secondary">
      Already have an account?
      <RouterLink
        to="/login"
        class="font-semibold text-brand-600 dark:text-brand-400 hover:underline ml-1"
      >
        Sign in
      </RouterLink>
    </div>
  </div>
</template>
