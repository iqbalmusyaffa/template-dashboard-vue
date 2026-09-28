<script setup lang="ts">
import type { User } from '../../types';
import AppDrawer from '../common/AppDrawer.vue';
import AppAvatar from '../common/AppAvatar.vue';
import AppBadge from '../common/AppBadge.vue';
import AppButton from '../common/AppButton.vue';
import { formatDate } from '../../utils/formatters';
import { Mail, Phone, MapPin, ShieldCheck, ShieldAlert, Calendar, Clock, Edit2 } from 'lucide-vue-next';

interface Props {
  modelValue: boolean;
  user: User | null;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
  (e: 'edit', user: User): void;
}>();

function getBadgeVariant(status: User['status']) {
  switch (status) {
    case 'Active': return 'active';
    case 'Pending': return 'pending';
    case 'Inactive': return 'inactive';
    case 'Suspended': return 'suspended';
    default: return 'default';
  }
}
</script>

<template>
  <AppDrawer
    :model-value="props.modelValue"
    title="User Profile"
    subtitle="Account details & access policy"
    @update:model-value="(val) => emit('update:modelValue', val)"
  >
    <div v-if="user" class="space-y-6 text-left">
      <!-- Profile Header Card -->
      <div class="flex items-start gap-4 p-4 rounded-lg bg-light-elevated/40 dark:bg-dark-elevated/40 border border-light-border dark:border-dark-border">
        <AppAvatar :name="user.name" size="lg" />
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-2 flex-wrap">
            <h4 class="text-base font-bold text-light-text-primary dark:text-dark-text-primary truncate">
              {{ user.name }}
            </h4>
            <AppBadge :variant="getBadgeVariant(user.status)" size="sm">
              {{ user.status }}
            </AppBadge>
          </div>
          <p class="text-xs text-light-text-secondary dark:text-dark-text-secondary mt-0.5 font-medium">
            {{ user.role }} &bull; {{ user.department }}
          </p>
          <p class="text-[11px] text-light-text-muted dark:text-dark-text-muted mt-1 font-mono">
            ID: {{ user.id }}
          </p>
        </div>
      </div>

      <!-- Contact Info Section -->
      <div class="space-y-3">
        <h5 class="text-xs font-semibold text-light-text-muted dark:text-dark-text-muted uppercase tracking-wider">
          Contact & Location
        </h5>
        <div class="space-y-2 text-xs">
          <div class="flex items-center gap-3 p-2.5 rounded-md border border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface">
            <Mail class="w-4 h-4 text-slate-400 shrink-0" />
            <div class="flex-1 truncate">
              <span class="text-light-text-muted dark:text-dark-text-muted text-[11px] block">Email</span>
              <span class="font-mono text-light-text-primary dark:text-dark-text-primary font-medium">{{ user.email }}</span>
            </div>
          </div>

          <div class="flex items-center gap-3 p-2.5 rounded-md border border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface">
            <Phone class="w-4 h-4 text-slate-400 shrink-0" />
            <div class="flex-1 truncate">
              <span class="text-light-text-muted dark:text-dark-text-muted text-[11px] block">Phone</span>
              <span class="text-light-text-primary dark:text-dark-text-primary font-medium">{{ user.phone || 'Not configured' }}</span>
            </div>
          </div>

          <div class="flex items-center gap-3 p-2.5 rounded-md border border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface">
            <MapPin class="w-4 h-4 text-slate-400 shrink-0" />
            <div class="flex-1 truncate">
              <span class="text-light-text-muted dark:text-dark-text-muted text-[11px] block">Location</span>
              <span class="text-light-text-primary dark:text-dark-text-primary font-medium">{{ user.location || 'Remote' }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Security & Timestamps -->
      <div class="space-y-3">
        <h5 class="text-xs font-semibold text-light-text-muted dark:text-dark-text-muted uppercase tracking-wider">
          Security & Access Telemetry
        </h5>
        <div class="grid grid-cols-2 gap-3 text-xs">
          <div class="p-3 rounded-md border border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface space-y-1">
            <div class="flex items-center gap-1.5 text-light-text-muted dark:text-dark-text-muted text-[11px]">
              <Clock class="w-3.5 h-3.5" /> Last Active
            </div>
            <p class="font-semibold text-light-text-primary dark:text-dark-text-primary">
              {{ user.lastActive }}
            </p>
          </div>

          <div class="p-3 rounded-md border border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface space-y-1">
            <div class="flex items-center gap-1.5 text-light-text-muted dark:text-dark-text-muted text-[11px]">
              <Calendar class="w-3.5 h-3.5" /> Provisioned
            </div>
            <p class="font-semibold text-light-text-primary dark:text-dark-text-primary">
              {{ formatDate(user.createdAt) }}
            </p>
          </div>
        </div>

        <div class="p-3 rounded-md border border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface flex items-center justify-between">
          <div class="flex items-center gap-2.5">
            <ShieldCheck v-if="user.mfaEnabled" class="w-4 h-4 text-emerald-500" />
            <ShieldAlert v-else class="w-4 h-4 text-amber-500" />
            <span class="text-xs font-medium text-light-text-primary dark:text-dark-text-primary">
              Multi-Factor Authentication
            </span>
          </div>
          <span
            class="text-[11px] font-semibold px-2 py-0.5 rounded"
            :class="user.mfaEnabled ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400' : 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400'"
          >
            {{ user.mfaEnabled ? 'Enforced' : 'Disabled' }}
          </span>
        </div>
      </div>

      <!-- Bio / Notes -->
      <div v-if="user.bio" class="space-y-1.5">
        <h5 class="text-xs font-semibold text-light-text-muted dark:text-dark-text-muted uppercase tracking-wider">
          Workspace Responsibilities
        </h5>
        <p class="text-xs text-light-text-secondary dark:text-dark-text-secondary p-3 rounded-md bg-light-elevated/30 dark:bg-dark-elevated/30 border border-light-border dark:border-dark-border leading-relaxed">
          {{ user.bio }}
        </p>
      </div>
    </div>

    <template #footer>
      <div v-if="user" class="w-full flex items-center justify-between">
        <AppButton variant="ghost" size="sm" @click="emit('update:modelValue', false)">
          Close
        </AppButton>
        <AppButton variant="primary" size="sm" @click="emit('edit', user)">
          <template #prefix>
            <Edit2 class="w-3.5 h-3.5" />
          </template>
          Edit Profile
        </AppButton>
      </div>
    </template>
  </AppDrawer>
</template>
