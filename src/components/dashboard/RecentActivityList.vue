<script setup lang="ts">
import { RECENT_ACTIVITIES } from '../../data/dummyData';
import AppAvatar from '../common/AppAvatar.vue';
import { ShieldAlert, CheckCircle2, Info } from 'lucide-vue-next';

function getStatusIcon(status: string) {
  switch (status) {
    case 'warning': return ShieldAlert;
    case 'info': return Info;
    case 'success':
    default: return CheckCircle2;
  }
}
</script>

<template>
  <div class="divide-y divide-light-border dark:divide-dark-border text-left">
    <div
      v-for="act in RECENT_ACTIVITIES"
      :key="act.id"
      class="py-3 flex items-center justify-between gap-3 text-xs"
    >
      <div class="flex items-center gap-3 min-w-0">
        <AppAvatar :name="act.actor" size="sm" />
        <div class="min-w-0">
          <p class="font-medium text-light-text-primary dark:text-dark-text-primary truncate">
            {{ act.action }}
          </p>
          <p class="text-light-text-muted dark:text-dark-text-muted text-[11px] truncate">
            by <span class="text-light-text-secondary dark:text-dark-text-secondary font-medium">{{ act.actor }}</span> &bull; {{ act.resource }}
          </p>
        </div>
      </div>

      <div class="flex items-center gap-2 shrink-0">
        <component
          :is="getStatusIcon(act.status)"
          class="w-3.5 h-3.5"
          :class="[
            act.status === 'warning' ? 'text-amber-500' : '',
            act.status === 'info' ? 'text-brand-500' : '',
            act.status === 'success' ? 'text-emerald-500' : ''
          ]"
        />
        <span class="text-[11px] text-light-text-muted dark:text-dark-text-muted">
          {{ act.timestamp }}
        </span>
      </div>
    </div>
  </div>
</template>
