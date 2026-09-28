<script setup lang="ts">
interface Props {
  className?: string;
  width?: string;
  height?: string;
  rounded?: string;
}

withDefaults(defineProps<Props>(), {
  className: '',
  width: 'w-full',
  height: 'h-4',
  rounded: 'rounded'
});
</script>

<template>
  <div
    class="animate-pulse bg-slate-200/80 dark:bg-dark-border"
    :class="[width, height, rounded, className]"
  />
</template>
