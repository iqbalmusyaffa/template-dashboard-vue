<script setup lang="ts">
import { computed } from 'vue';
import { Loader2 } from 'lucide-vue-next';

interface Props {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  loading?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  type: 'button',
  disabled: false,
  loading: false
});

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void;
}>();

const variantClasses = computed(() => {
  switch (props.variant) {
    case 'primary':
      return 'bg-brand-600 hover:bg-brand-700 text-white shadow-sm focus-visible:ring-brand-500 border border-brand-700/20';
    case 'secondary':
      return 'bg-light-elevated hover:bg-slate-200/80 text-light-text-primary dark:bg-dark-elevated dark:hover:bg-dark-border dark:text-dark-text-primary border border-light-border dark:border-dark-border shadow-subtle';
    case 'danger':
      return 'bg-rose-600 hover:bg-rose-700 text-white shadow-sm focus-visible:ring-rose-500 border border-rose-700/20';
    case 'outline':
      return 'border border-light-border dark:border-dark-border bg-transparent hover:bg-light-elevated dark:hover:bg-dark-elevated text-light-text-primary dark:text-dark-text-primary';
    case 'ghost':
      return 'bg-transparent hover:bg-light-elevated dark:hover:bg-dark-elevated text-light-text-secondary dark:text-dark-text-secondary hover:text-light-text-primary dark:hover:text-dark-text-primary';
    default:
      return '';
  }
});

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'h-8 px-2.5 text-xs rounded-md gap-1.5 font-medium';
    case 'lg':
      return 'h-11 px-5 text-base rounded-md gap-2.5 font-semibold';
    case 'md':
    default:
      return 'h-9 px-3.5 text-sm rounded-md gap-2 font-medium';
  }
});
</script>

<template>
  <button
    :type="props.type"
    :disabled="props.disabled || props.loading"
    class="inline-flex items-center justify-center transition-all duration-150 select-none outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-offset-transparent disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
    :class="[variantClasses, sizeClasses]"
    @click="(e) => emit('click', e)"
  >
    <Loader2 v-if="props.loading" class="w-4 h-4 animate-spin shrink-0" />
    <slot name="prefix" />
    <slot />
    <slot name="suffix" />
  </button>
</template>
