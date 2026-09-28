<script setup lang="ts">
import { computed } from 'vue';
import { Users, UserCheck, TrendingUp, CheckSquare, ArrowUpRight, ArrowDownRight } from 'lucide-vue-next';

interface Props {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  comparison: string;
  iconName?: string;
}

const props = withDefaults(defineProps<Props>(), {
  iconName: 'Users'
});

const iconComponent = computed(() => {
  switch (props.iconName) {
    case 'UserCheck': return UserCheck;
    case 'TrendingUp': return TrendingUp;
    case 'CheckSquare': return CheckSquare;
    case 'Users':
    default: return Users;
  }
});
</script>

<template>
  <div class="p-5 rounded-lg border border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface shadow-card transition-all duration-150 hover:border-slate-300 dark:hover:border-slate-700 text-left">
    <div class="flex items-center justify-between gap-3">
      <span class="text-xs font-semibold uppercase tracking-wider text-light-text-muted dark:text-dark-text-muted truncate">
        {{ title }}
      </span>
      <div class="w-8 h-8 rounded-md bg-light-elevated dark:bg-dark-elevated border border-light-border dark:border-dark-border flex items-center justify-center text-light-text-secondary dark:text-dark-text-secondary shrink-0">
        <component :is="iconComponent" class="w-4 h-4 text-brand-600 dark:text-brand-400" />
      </div>
    </div>

    <div class="mt-3 flex items-baseline justify-between gap-2">
      <div class="text-2xl font-bold tracking-tight text-light-text-primary dark:text-dark-text-primary font-sans">
        {{ value }}
      </div>

      <div
        class="inline-flex items-center gap-0.5 text-xs font-semibold px-2 py-0.5 rounded-full"
        :class="[
          isPositive
            ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60'
            : 'bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-400 border border-rose-200 dark:border-rose-800/60'
        ]"
      >
        <ArrowUpRight v-if="isPositive" class="w-3.5 h-3.5" />
        <ArrowDownRight v-else class="w-3.5 h-3.5" />
        <span>{{ change }}</span>
      </div>
    </div>

    <p class="mt-2 text-xs text-light-text-muted dark:text-dark-text-muted truncate">
      {{ comparison }}
    </p>
  </div>
</template>
