<script setup lang="ts">
import AppPageHeader from '../../components/common/AppPageHeader.vue';
import AppCard from '../../components/common/AppCard.vue';
import AppAvatar from '../../components/common/AppAvatar.vue';
import { RECENT_ACTIVITIES } from '../../data/dummyData';
import { ShieldAlert, CheckCircle2, Info, Filter } from 'lucide-vue-next';

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
  <div class="space-y-6 text-left">
    <AppPageHeader
      title="System Activity & Audit Log"
      description="Immutable telemetry records of administrative interactions, security changes, and service deployments."
      :breadcrumbs="[{ label: 'Dashboard', to: '/dashboard' }, { label: 'Audit Activity' }]"
    />

    <AppCard no-padding>
      <div class="p-4 border-b border-light-border dark:border-dark-border flex items-center justify-between text-xs">
        <span class="font-semibold text-light-text-primary dark:text-dark-text-primary">
          Recent Security Audit Events
        </span>
        <span class="text-light-text-muted dark:text-dark-text-muted">
          Showing 5 recent verified transactions
        </span>
      </div>

      <div class="divide-y divide-light-border dark:divide-dark-border">
        <div
          v-for="act in RECENT_ACTIVITIES"
          :key="act.id"
          class="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs hover:bg-light-elevated/40 dark:hover:bg-dark-elevated/40 transition-colors"
        >
          <div class="flex items-center gap-3">
            <AppAvatar :name="act.actor" size="sm" />
            <div>
              <p class="font-semibold text-light-text-primary dark:text-dark-text-primary">
                {{ act.action }}
              </p>
              <p class="text-light-text-muted dark:text-dark-text-muted text-[11px] mt-0.5">
                Initiated by <span class="font-mono text-light-text-secondary dark:text-dark-text-secondary">{{ act.actorEmail }}</span>
              </p>
            </div>
          </div>

          <div class="flex items-center justify-between sm:justify-end gap-4 pl-11 sm:pl-0">
            <span class="font-mono text-[11px] px-2 py-0.5 rounded bg-light-elevated dark:bg-dark-elevated border border-light-border dark:border-dark-border text-light-text-secondary dark:text-dark-text-secondary">
              {{ act.resource }}
            </span>

            <div class="flex items-center gap-1.5 shrink-0 text-light-text-muted dark:text-dark-text-muted text-[11px]">
              <component
                :is="getStatusIcon(act.status)"
                class="w-3.5 h-3.5"
                :class="[
                  act.status === 'warning' ? 'text-amber-500' : '',
                  act.status === 'info' ? 'text-brand-500' : '',
                  act.status === 'success' ? 'text-emerald-500' : ''
                ]"
              />
              <span>{{ act.timestamp }}</span>
            </div>
          </div>
        </div>
      </div>
    </AppCard>
  </div>
</template>
