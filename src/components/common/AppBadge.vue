<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  variant?: 'active' | 'pending' | 'inactive' | 'suspended' | 'brand' | 'danger' | 'default';
  size?: 'sm' | 'md';
  dot?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  size: 'md',
  dot: true
});

const variantStyles = computed(() => {
  switch (props.variant) {
    case 'active':
      return {
        bg: 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800/60',
        text: 'text-emerald-700 dark:text-emerald-300',
        dot: 'bg-emerald-500'
      };
    case 'pending':
      return {
        bg: 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800/60',
        text: 'text-amber-700 dark:text-amber-300',
        dot: 'bg-amber-500'
      };
    case 'inactive':
      return {
        bg: 'bg-slate-100 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700',
        text: 'text-slate-600 dark:text-slate-300',
        dot: 'bg-slate-400'
      };
    case 'suspended':
      return {
        bg: 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800/60',
        text: 'text-rose-700 dark:text-rose-300',
        dot: 'bg-rose-500'
      };
    case 'brand':
      return {
        bg: 'bg-brand-50 dark:bg-brand-950/40 border-brand-200 dark:border-brand-800/60',
        text: 'text-brand-700 dark:text-brand-300',
        dot: 'bg-brand-500'
      };
    case 'danger':
      return {
        bg: 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800/60',
        text: 'text-rose-700 dark:text-rose-300',
        dot: 'bg-rose-500'
      };
    case 'default':
    default:
      return {
        bg: 'bg-light-elevated dark:bg-dark-elevated border-light-border dark:border-dark-border',
        text: 'text-light-text-secondary dark:text-dark-text-secondary',
        dot: 'bg-slate-400'
      };
  }
});

const sizeStyles = computed(() => {
  return props.size === 'sm'
    ? 'text-[11px] px-2 py-0.5 gap-1'
    : 'text-xs px-2.5 py-0.5 gap-1.5';
});
</script>

<template>
  <span
    class="inline-flex items-center font-medium rounded-full border tracking-wide select-none"
    :class="[variantStyles.bg, variantStyles.text, sizeStyles]"
  >
    <span
      v-if="props.dot"
      class="w-1.5 h-1.5 rounded-full shrink-0"
      :class="variantStyles.dot"
    />
    <slot />
  </span>
</template>
