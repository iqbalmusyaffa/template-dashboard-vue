<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useAuthStore } from '../../stores/auth';
import { useThemeStore } from '../../stores/theme';
import { useToastStore } from '../../stores/toast';
import AppPageHeader from '../../components/common/AppPageHeader.vue';
import AppCard from '../../components/common/AppCard.vue';
import AppButton from '../../components/common/AppButton.vue';
import AppInput from '../../components/common/AppInput.vue';
import AppAvatar from '../../components/common/AppAvatar.vue';
import { Sun, Moon, Monitor, Shield, Bell, User, Key, Check } from 'lucide-vue-next';

const authStore = useAuthStore();
const themeStore = useThemeStore();
const toast = useToastStore();

const activeTab = ref<'profile' | 'security' | 'appearance' | 'notifications'>('appearance');

const profileForm = reactive({
  name: authStore.currentUser?.name || 'Alex Henderson',
  email: authStore.currentUser?.email || 'admin@example.com',
  title: 'Platform Infrastructure Lead',
  department: 'Engineering',
  phone: '+1 (555) 234-8910',
  timezone: 'America/Los_Angeles (UTC-7)'
});

const securityForm = reactive({
  mfaEnforced: true,
  sessionTimeout: '14',
  ipWhitelist: '192.168.1.0/24, 10.0.0.0/16',
  auditLogging: true
});

function handleSaveProfile() {
  toast.success('Settings Saved', 'Your user profile information was successfully updated.');
}

function handleSaveSecurity() {
  toast.success('Security Policy Updated', 'Global workspace security policies have been deployed to all cluster nodes.');
}
</script>

<template>
  <div class="space-y-6 text-left">
    <!-- Header -->
    <AppPageHeader
      title="Settings & Preferences"
      description="Manage your enterprise profile, security enforcement, and appearance preferences."
      :breadcrumbs="[{ label: 'Dashboard', to: '/dashboard' }, { label: 'Settings' }]"
    />

    <!-- Navigation Tabs -->
    <div class="flex items-center gap-1 border-b border-light-border dark:border-dark-border pb-px overflow-x-auto">
      <button
        type="button"
        class="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold border-b-2 transition-colors shrink-0"
        :class="activeTab === 'appearance' ? 'border-brand-600 text-brand-600 dark:text-brand-400' : 'border-transparent text-light-text-secondary dark:text-dark-text-secondary hover:text-light-text-primary dark:hover:text-dark-text-primary'"
        @click="activeTab = 'appearance'"
      >
        <Sun class="w-3.5 h-3.5" /> Appearance & Theme
      </button>

      <button
        type="button"
        class="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold border-b-2 transition-colors shrink-0"
        :class="activeTab === 'profile' ? 'border-brand-600 text-brand-600 dark:text-brand-400' : 'border-transparent text-light-text-secondary dark:text-dark-text-secondary hover:text-light-text-primary dark:hover:text-dark-text-primary'"
        @click="activeTab = 'profile'"
      >
        <User class="w-3.5 h-3.5" /> Profile & Identity
      </button>

      <button
        type="button"
        class="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold border-b-2 transition-colors shrink-0"
        :class="activeTab === 'security' ? 'border-brand-600 text-brand-600 dark:text-brand-400' : 'border-transparent text-light-text-secondary dark:text-dark-text-secondary hover:text-light-text-primary dark:hover:text-dark-text-primary'"
        @click="activeTab = 'security'"
      >
        <Shield class="w-3.5 h-3.5" /> Access & Security
      </button>

      <button
        type="button"
        class="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold border-b-2 transition-colors shrink-0"
        :class="activeTab === 'notifications' ? 'border-brand-600 text-brand-600 dark:text-brand-400' : 'border-transparent text-light-text-secondary dark:text-dark-text-secondary hover:text-light-text-primary dark:hover:text-dark-text-primary'"
        @click="activeTab = 'notifications'"
      >
        <Bell class="w-3.5 h-3.5" /> Alerts & Webhooks
      </button>
    </div>

    <!-- Appearance Tab Content -->
    <div v-if="activeTab === 'appearance'" class="space-y-6 max-w-3xl">
      <AppCard
        title="Interface Theme"
        subtitle="Customize how NexusAdmin looks on your device. Choice is persisted across sessions."
      >
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <!-- Light Theme Option -->
          <div
            class="relative rounded-lg border-2 p-4 cursor-pointer transition-all flex flex-col justify-between h-40"
            :class="themeStore.mode === 'light' ? 'border-brand-600 bg-brand-50/20 dark:bg-brand-950/20 ring-1 ring-brand-600' : 'border-light-border dark:border-dark-border hover:border-slate-300 dark:hover:border-slate-700'"
            @click="themeStore.setTheme('light')"
          >
            <div class="flex items-center justify-between">
              <div class="w-8 h-8 rounded-full bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center">
                <Sun class="w-4 h-4" />
              </div>
              <span v-if="themeStore.mode === 'light'" class="w-5 h-5 rounded-full bg-brand-600 text-white flex items-center justify-center">
                <Check class="w-3 h-3" />
              </span>
            </div>

            <div>
              <p class="text-sm font-semibold text-light-text-primary dark:text-dark-text-primary">Light Mode</p>
              <p class="text-xs text-light-text-muted dark:text-dark-text-muted mt-0.5">High clarity, crisp slate borders</p>
            </div>
          </div>

          <!-- Dark Theme Option -->
          <div
            class="relative rounded-lg border-2 p-4 cursor-pointer transition-all flex flex-col justify-between h-40"
            :class="themeStore.mode === 'dark' ? 'border-brand-600 bg-brand-50/20 dark:bg-brand-950/20 ring-1 ring-brand-600' : 'border-light-border dark:border-dark-border hover:border-slate-300 dark:hover:border-slate-700'"
            @click="themeStore.setTheme('dark')"
          >
            <div class="flex items-center justify-between">
              <div class="w-8 h-8 rounded-full bg-indigo-950 border border-indigo-800 text-indigo-300 flex items-center justify-center">
                <Moon class="w-4 h-4" />
              </div>
              <span v-if="themeStore.mode === 'dark'" class="w-5 h-5 rounded-full bg-brand-600 text-white flex items-center justify-center">
                <Check class="w-3 h-3" />
              </span>
            </div>

            <div>
              <p class="text-sm font-semibold text-light-text-primary dark:text-dark-text-primary">Dark Mode</p>
              <p class="text-xs text-light-text-muted dark:text-dark-text-muted mt-0.5">Engineered dark slate surfaces (#0f1115)</p>
            </div>
          </div>

          <!-- System Theme Option -->
          <div
            class="relative rounded-lg border-2 p-4 cursor-pointer transition-all flex flex-col justify-between h-40"
            :class="themeStore.mode === 'system' ? 'border-brand-600 bg-brand-50/20 dark:bg-brand-950/20 ring-1 ring-brand-600' : 'border-light-border dark:border-dark-border hover:border-slate-300 dark:hover:border-slate-700'"
            @click="themeStore.setTheme('system')"
          >
            <div class="flex items-center justify-between">
              <div class="w-8 h-8 rounded-full bg-slate-100 dark:bg-dark-elevated border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center">
                <Monitor class="w-4 h-4" />
              </div>
              <span v-if="themeStore.mode === 'system'" class="w-5 h-5 rounded-full bg-brand-600 text-white flex items-center justify-center">
                <Check class="w-3 h-3" />
              </span>
            </div>

            <div>
              <p class="text-sm font-semibold text-light-text-primary dark:text-dark-text-primary">System Match</p>
              <p class="text-xs text-light-text-muted dark:text-dark-text-muted mt-0.5">Syncs with OS display settings</p>
            </div>
          </div>
        </div>
      </AppCard>
    </div>

    <!-- Profile Tab Content -->
    <div v-else-if="activeTab === 'profile'" class="space-y-6 max-w-3xl">
      <AppCard
        title="Admin Profile"
        subtitle="Manage your personal account credentials and email alerts."
      >
        <div class="flex items-center gap-4 pb-6 border-b border-light-border dark:border-dark-border">
          <AppAvatar :name="profileForm.name" size="lg" />
          <div>
            <p class="text-sm font-semibold text-light-text-primary dark:text-dark-text-primary">{{ profileForm.name }}</p>
            <p class="text-xs text-light-text-muted dark:text-dark-text-muted font-mono">{{ profileForm.email }}</p>
          </div>
        </div>

        <form class="space-y-4 pt-4" @submit.prevent="handleSaveProfile">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <AppInput v-model="profileForm.name" label="Display Name" required />
            <AppInput v-model="profileForm.email" label="Work Email" required />
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <AppInput v-model="profileForm.title" label="Job Title" />
            <AppInput v-model="profileForm.phone" label="Phone" />
          </div>

          <div class="pt-2">
            <AppButton type="submit" variant="primary" size="md">
              Save Profile
            </AppButton>
          </div>
        </form>
      </AppCard>
    </div>

    <!-- Security Tab Content -->
    <div v-else-if="activeTab === 'security'" class="space-y-6 max-w-3xl">
      <AppCard
        title="Authentication Policies"
        subtitle="Configure organization-wide encryption and session lifecycles."
      >
        <form class="space-y-4" @submit.prevent="handleSaveSecurity">
          <div class="p-3.5 rounded-lg border border-light-border dark:border-dark-border bg-light-elevated/40 dark:bg-dark-elevated/40 flex items-center justify-between">
            <div>
              <p class="text-xs font-semibold text-light-text-primary dark:text-dark-text-primary">Enforce Mandatory Hardware MFA</p>
              <p class="text-[11px] text-light-text-muted dark:text-dark-text-muted">Requires WebAuthn / FIDO2 security keys for all admin access.</p>
            </div>
            <input v-model="securityForm.mfaEnforced" type="checkbox" class="w-4 h-4 rounded text-brand-600 focus:ring-brand-500" />
          </div>

          <div class="p-3.5 rounded-lg border border-light-border dark:border-dark-border bg-light-elevated/40 dark:bg-dark-elevated/40 flex items-center justify-between">
            <div>
              <p class="text-xs font-semibold text-light-text-primary dark:text-dark-text-primary">Real-time Security Telemetry & Audit Trails</p>
              <p class="text-[11px] text-light-text-muted dark:text-dark-text-muted">Export immutable logs to external SIEM tools (Splunk / Datadog).</p>
            </div>
            <input v-model="securityForm.auditLogging" type="checkbox" class="w-4 h-4 rounded text-brand-600 focus:ring-brand-500" />
          </div>

          <AppInput
            v-model="securityForm.ipWhitelist"
            label="Corporate CIDR IP Whitelist"
            hint="Comma-separated IP ranges allowed to connect to administrative endpoints."
          />

          <div class="pt-2">
            <AppButton type="submit" variant="primary" size="md">
              Save Security Policies
            </AppButton>
          </div>
        </form>
      </AppCard>
    </div>

    <!-- Notifications Tab -->
    <div v-else class="space-y-6 max-w-3xl">
      <AppCard
        title="Alert Channels"
        subtitle="Manage where deployment failures and compliance warnings are routed."
      >
        <div class="space-y-3">
          <div class="flex items-center justify-between p-3 rounded-lg border border-light-border dark:border-dark-border">
            <div>
              <p class="text-xs font-semibold text-light-text-primary dark:text-dark-text-primary">Slack Incident Channel Webhook</p>
              <p class="text-[11px] text-light-text-muted dark:text-dark-text-muted">#infra-alerts-prod</p>
            </div>
            <span class="text-xs font-medium text-emerald-600 dark:text-emerald-400">Connected</span>
          </div>

          <div class="flex items-center justify-between p-3 rounded-lg border border-light-border dark:border-dark-border">
            <div>
              <p class="text-xs font-semibold text-light-text-primary dark:text-dark-text-primary">PagerDuty High-Severity Escalation</p>
              <p class="text-[11px] text-light-text-muted dark:text-dark-text-muted">Service ID: PD-9941-CORE</p>
            </div>
            <span class="text-xs font-medium text-emerald-600 dark:text-emerald-400">Connected</span>
          </div>
        </div>
      </AppCard>
    </div>
  </div>
</template>
