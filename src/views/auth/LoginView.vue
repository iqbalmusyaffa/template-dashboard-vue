<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../stores/auth';
import { useToastStore } from '../../stores/toast';
import AppButton from '../../components/common/AppButton.vue';
import AppInput from '../../components/common/AppInput.vue';
import { Eye, EyeOff, Lock, Mail, AlertCircle, Sparkles } from 'lucide-vue-next';

const router = useRouter();
const authStore = useAuthStore();
const toast = useToastStore();

const form = reactive({
  email: 'admin@example.com',
  password: 'Admin123!',
  rememberMe: true
});

const errors = reactive({
  email: '',
  password: ''
});

const showPassword = ref(false);

function validate(): boolean {
  let valid = true;
  errors.email = '';
  errors.password = '';

  if (!form.email.trim()) {
    errors.email = 'Email is required.';
    valid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
    errors.email = 'Please enter a valid email address.';
    valid = false;
  }

  if (!form.password) {
    errors.password = 'Password is required.';
    valid = false;
  } else if (form.password.length < 8) {
    errors.password = 'Password must contain at least 8 characters.';
    valid = false;
  }

  return valid;
}

async function handleLogin() {
  if (!validate()) return;

  const success = await authStore.login(form.email, form.password, form.rememberMe);
  if (success) {
    toast.success('Signed in', `Welcome back, ${authStore.currentUser?.name}!`);
    router.push('/dashboard');
  }
}

function fillDemoCredentials() {
  form.email = 'admin@example.com';
  form.password = 'Admin123!';
  errors.email = '';
  errors.password = '';
  toast.info('Demo Filled', 'Default administrator credentials loaded.');
}

function handleForgotPassword() {
  toast.info('Password Reset', 'In this preview demo, please use the demo credentials provided below.');
}
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="text-left space-y-2">
      <h1 class="text-2xl font-bold tracking-tight text-light-text-primary dark:text-dark-text-primary">
        Welcome back
      </h1>
      <p class="text-xs sm:text-sm text-light-text-muted dark:text-dark-text-muted">
        Sign in to continue to your enterprise workspace.
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
    <form class="space-y-4" @submit.prevent="handleLogin">
      <!-- Email Field -->
      <AppInput
        v-model="form.email"
        label="Email"
        type="email"
        placeholder="name@company.com"
        :error="errors.email"
        required
      >
        <template #prefix>
          <Mail class="w-4 h-4" />
        </template>
      </AppInput>

      <!-- Password Field -->
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

      <!-- Remember & Forgot Password -->
      <div class="flex items-center justify-between text-xs pt-1">
        <label class="flex items-center gap-2 cursor-pointer select-none">
          <input
            v-model="form.rememberMe"
            type="checkbox"
            class="rounded border-light-border dark:border-dark-border text-brand-600 focus:ring-brand-500 dark:bg-dark-elevated"
          />
          <span class="text-light-text-secondary dark:text-dark-text-secondary">Remember me</span>
        </label>

        <button
          type="button"
          class="font-medium text-brand-600 dark:text-brand-400 hover:underline"
          @click="handleForgotPassword"
        >
          Forgot password?
        </button>
      </div>

      <!-- Submit Button -->
      <AppButton
        type="submit"
        variant="primary"
        size="md"
        class="w-full"
        :loading="authStore.isLoading"
      >
        Sign In
      </AppButton>
    </form>

    <!-- Divider -->
    <div class="relative flex items-center justify-center">
      <div class="border-t border-light-border dark:border-dark-border w-full" />
      <span class="bg-light-bg dark:bg-dark-bg px-3 text-[11px] text-light-text-muted dark:text-dark-text-muted uppercase tracking-wider relative">
        Demo Access
      </span>
    </div>

    <!-- Quick Demo Box -->
    <div class="p-3.5 rounded-lg border border-light-border dark:border-dark-border bg-light-elevated/50 dark:bg-dark-elevated/50 flex items-center justify-between gap-3 text-left">
      <div class="text-xs space-y-0.5">
        <p class="font-semibold text-light-text-primary dark:text-dark-text-primary flex items-center gap-1.5">
          <Sparkles class="w-3.5 h-3.5 text-amber-500" /> Default Credentials
        </p>
        <p class="text-[11px] text-light-text-muted dark:text-dark-text-muted font-mono">
          admin@example.com / Admin123!
        </p>
      </div>
      <button
        type="button"
        class="px-2.5 py-1 text-xs font-medium rounded border border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface hover:bg-light-elevated dark:hover:bg-dark-border transition-colors text-light-text-primary dark:text-dark-text-primary shrink-0"
        @click="fillDemoCredentials"
      >
        Load Demo
      </button>
    </div>

    <!-- Register Link -->
    <div class="text-center text-xs text-light-text-secondary dark:text-dark-text-secondary">
      Don't have an account?
      <RouterLink
        to="/register"
        class="font-semibold text-brand-600 dark:text-brand-400 hover:underline ml-1"
      >
        Create account
      </RouterLink>
    </div>
  </div>
</template>
