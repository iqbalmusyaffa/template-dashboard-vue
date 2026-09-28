<script setup lang="ts">
import { onMounted } from 'vue';
import { useThemeStore } from './stores/theme';

const themeStore = useThemeStore();

onMounted(() => {
  themeStore.applyTheme();
});
</script>

<template>
  <div class="h-full min-h-screen bg-light-bg dark:bg-dark-bg text-light-text-primary dark:text-dark-text-primary">
    <RouterView />
  </div>
</template>

<style>
/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
