<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import AppSidebar from '../components/layout/AppSidebar.vue';
import AppTopNav from '../components/layout/AppTopNav.vue';
import AppFooter from '../components/layout/AppFooter.vue';
import AppToast from '../components/common/AppToast.vue';

const route = useRoute();
const isSidebarCollapsed = ref(false);
const isMobileSidebarOpen = ref(false);

const pageTitle = computed(() => {
  return (route.meta?.title as string) || 'Dashboard';
});
</script>

<template>
  <div class="h-screen w-full flex bg-light-bg dark:bg-dark-bg text-light-text-primary dark:text-dark-text-primary transition-colors overflow-hidden">
    <!-- Sidebar -->
    <AppSidebar
      v-model:collapsed="isSidebarCollapsed"
      v-model:mobile-open="isMobileSidebarOpen"
    />

    <!-- Main Content Area -->
    <div class="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
      <!-- Top Navigation -->
      <AppTopNav
        :title="pageTitle"
        class="shrink-0"
        @toggle-mobile-sidebar="isMobileSidebarOpen = !isMobileSidebarOpen"
      />

      <!-- Page Outlet & Footer -->
      <main class="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 flex flex-col justify-between">
        <div class="max-w-7xl w-full mx-auto flex-1">
          <RouterView />
        </div>

        <div class="max-w-7xl w-full mx-auto mt-12 shrink-0">
          <AppFooter />
        </div>
      </main>
    </div>

    <!-- Global Toasts -->
    <AppToast />
  </div>
</template>
