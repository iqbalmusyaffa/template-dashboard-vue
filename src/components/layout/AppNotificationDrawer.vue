<script setup lang="ts">
import { ref } from 'vue';
import AppDrawer from '../common/AppDrawer.vue';
import AppButton from '../common/AppButton.vue';
import { INITIAL_NOTIFICATIONS } from '../../data/dummyData';
import type { AppNotification } from '../../types';
import { Check, Bell, ShieldAlert, Cpu, CreditCard, UserPlus } from 'lucide-vue-next';

interface Props {
  modelValue: boolean;
}

defineProps<Props>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
}>();

const notifications = ref<AppNotification[]>([...INITIAL_NOTIFICATIONS]);

function markAllAsRead() {
  notifications.value.forEach(n => (n.unread = false));
}

function getIcon(category: AppNotification['category']) {
  switch (category) {
    case 'security': return ShieldAlert;
    case 'system': return Cpu;
    case 'billing': return CreditCard;
    case 'user':
    default: return UserPlus;
  }
}
</script>

<template>
  <AppDrawer
    :model-value="modelValue"
    title="Notifications"
    subtitle="Activity stream & critical alerts"
    @update:model-value="(val) => emit('update:modelValue', val)"
  >
    <div class="space-y-4">
      <div class="flex items-center justify-between pb-3 border-b border-light-border dark:border-dark-border text-xs">
        <span class="text-light-text-secondary dark:text-dark-text-secondary">
          {{ notifications.filter(n => n.unread).length }} unread alerts
        </span>
        <button
          type="button"
          class="text-brand-600 dark:text-brand-400 hover:underline font-medium inline-flex items-center gap-1"
          @click="markAllAsRead"
        >
          <Check class="w-3.5 h-3.5" /> Mark all read
        </button>
      </div>

      <div class="divide-y divide-light-border dark:divide-dark-border">
        <div
          v-for="item in notifications"
          :key="item.id"
          class="py-3.5 flex items-start gap-3 transition-colors rounded-md px-2 -mx-2 hover:bg-light-elevated/50 dark:hover:bg-dark-elevated/50"
          :class="item.unread ? 'bg-brand-50/30 dark:bg-brand-950/20' : ''"
        >
          <div
            class="p-2 rounded-md shrink-0 mt-0.5 border"
            :class="[
              item.category === 'security' ? 'bg-rose-50 text-rose-600 border-rose-200 dark:bg-rose-950/40 dark:text-rose-400 dark:border-rose-900' : '',
              item.category === 'system' ? 'bg-sky-50 text-sky-600 border-sky-200 dark:bg-sky-950/40 dark:text-sky-400 dark:border-sky-900' : '',
              item.category === 'billing' ? 'bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-900' : '',
              item.category === 'user' ? 'bg-indigo-50 text-indigo-600 border-indigo-200 dark:bg-indigo-950/40 dark:text-indigo-400 dark:border-indigo-900' : ''
            ]"
          >
            <component :is="getIcon(item.category)" class="w-4 h-4" />
          </div>

          <div class="flex-1 min-w-0 text-left">
            <div class="flex items-center justify-between gap-2">
              <h4 class="text-xs font-semibold text-light-text-primary dark:text-dark-text-primary truncate">
                {{ item.title }}
              </h4>
              <span class="text-[10px] text-light-text-muted dark:text-dark-text-muted shrink-0">
                {{ item.timestamp }}
              </span>
            </div>
            <p class="text-xs text-light-text-secondary dark:text-dark-text-secondary mt-1 leading-relaxed">
              {{ item.description }}
            </p>
          </div>

          <span
            v-if="item.unread"
            class="w-1.5 h-1.5 rounded-full bg-brand-500 shrink-0 mt-2"
          />
        </div>
      </div>
    </div>

    <template #footer>
      <div class="w-full flex items-center justify-between">
        <AppButton variant="ghost" size="sm" @click="emit('update:modelValue', false)">
          Close
        </AppButton>
        <span class="text-[11px] text-light-text-muted dark:text-dark-text-muted">
          Realtime feed active
        </span>
      </div>
    </template>
  </AppDrawer>
</template>
