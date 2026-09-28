<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  name: string;
  src?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  status?: 'online' | 'offline' | 'busy' | 'away';
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  src: ''
});

const initials = computed(() => {
  if (!props.name) return '??';
  const parts = props.name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }
  return parts[0].slice(0, 2).toUpperCase();
});

// Deterministic pastel-ish background color based on name string
const bgHue = computed(() => {
  let hash = 0;
  for (let i = 0; i < props.name.length; i++) {
    hash = props.name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hues = [
    'bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300',
    'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300',
    'bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
    'bg-teal-100 text-teal-700 dark:bg-teal-950 dark:text-teal-300',
    'bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300',
    'bg-cyan-100 text-cyan-700 dark:bg-cyan-950 dark:text-cyan-300'
  ];
  return hues[Math.abs(hash) % hues.length];
});

const sizeStyles = computed(() => {
  switch (props.size) {
    case 'xs':
      return { container: 'w-6 h-6 text-[10px]', dot: 'w-1.5 h-1.5 bottom-0 right-0' };
    case 'sm':
      return { container: 'w-8 h-8 text-xs', dot: 'w-2 h-2 bottom-0 right-0' };
    case 'lg':
      return { container: 'w-12 h-12 text-base', dot: 'w-3 h-3 bottom-0 right-0' };
    case 'md':
    default:
      return { container: 'w-9 h-9 text-xs', dot: 'w-2.5 h-2.5 bottom-0 right-0' };
  }
});

const statusColor = computed(() => {
  switch (props.status) {
    case 'online': return 'bg-emerald-500';
    case 'busy': return 'bg-rose-500';
    case 'away': return 'bg-amber-500';
    case 'offline':
    default: return 'bg-slate-400';
  }
});
</script>

<template>
  <div class="relative inline-flex shrink-0 select-none">
    <div
      class="rounded-full flex items-center justify-center font-semibold overflow-hidden border border-light-border dark:border-dark-border"
      :class="[sizeStyles.container, bgHue]"
    >
      <img
        v-if="props.src"
        :src="props.src"
        :alt="props.name"
        class="w-full h-full object-cover"
      />
      <span v-else>
        {{ initials }}
      </span>
    </div>

    <span
      v-if="props.status"
      class="absolute rounded-full ring-2 ring-light-surface dark:ring-dark-surface"
      :class="[sizeStyles.dot, statusColor]"
    />
  </div>
</template>
