<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '../../stores/auth';
import AppAvatar from '../common/AppAvatar.vue';
import {
  LayoutDashboard,
  Users,
  Network,
  BarChart3,
  Activity,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Layers,
  X
} from 'lucide-vue-next';

interface Props {
  collapsed: boolean;
  mobileOpen: boolean;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: 'update:collapsed', value: boolean): void;
  (e: 'update:mobileOpen', value: boolean): void;
}>();

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();

interface NavItem {
  name: string;
  to: string;
  icon: any;
  badge?: string;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

const navSections: NavSection[] = [
  {
    title: 'Overview',
    items: [
      { name: 'Dashboard', to: '/dashboard/overview', icon: LayoutDashboard }
    ]
  },
  {
    title: 'Management',
    items: [
      { name: 'Users Directory', to: '/dashboard/users', icon: Users, badge: '24' },
      { name: 'Teams & Org', to: '/dashboard/teams', icon: Network }
    ]
  },
  {
    title: 'Analytics',
    items: [
      { name: 'Reports', to: '/dashboard/reports', icon: BarChart3 },
      { name: 'System Activity', to: '/dashboard/activity', icon: Activity }
    ]
  },
  {
    title: 'System',
    items: [
      { name: 'Settings', to: '/dashboard/settings', icon: Settings }
    ]
  }
];

function isRouteActive(path: string): boolean {
  if (path === '/dashboard/overview') {
    return route.path === '/dashboard' || route.path === '/dashboard/overview';
  }
  return route.path.startsWith(path);
}

function handleLogout() {
  authStore.logout();
  router.push('/login');
}
</script>

<template>
  <!-- Mobile Backdrop -->
  <div
    v-if="props.mobileOpen"
    class="fixed inset-0 z-40 bg-black/50 backdrop-blur-xs lg:hidden"
    @click="emit('update:mobileOpen', false)"
  />

  <!-- Sidebar Container -->
  <aside
    class="fixed top-0 bottom-0 left-0 z-40 flex flex-col border-r border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface transition-all duration-200 ease-in-out select-none
           lg:static lg:translate-x-0"
    :class="[
      props.collapsed ? 'lg:w-[72px]' : 'lg:w-64',
      props.mobileOpen ? 'w-64 translate-x-0' : '-translate-x-full lg:translate-x-0'
    ]"
  >
    <!-- Brand Header -->
    <div class="h-16 flex items-center justify-between px-4 border-b border-light-border dark:border-dark-border shrink-0">
      <RouterLink to="/dashboard" class="flex items-center gap-3 overflow-hidden group">
        <div class="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center text-white shrink-0 shadow-sm">
          <Layers class="w-5 h-5 transition-transform group-hover:scale-105" />
        </div>
        <div v-show="!props.collapsed || props.mobileOpen" class="flex flex-col text-left">
          <span class="font-bold text-sm tracking-tight text-light-text-primary dark:text-dark-text-primary leading-tight">
            NEXUS<span class="text-brand-600">.</span>IO
          </span>
          <span class="text-[10px] text-light-text-muted dark:text-dark-text-muted tracking-wider uppercase">
            Enterprise Admin
          </span>
        </div>
      </RouterLink>

      <!-- Mobile Close Button -->
      <button
        type="button"
        class="lg:hidden p-1.5 rounded-md text-light-text-secondary dark:text-dark-text-secondary hover:bg-light-elevated dark:hover:bg-dark-elevated"
        @click="emit('update:mobileOpen', false)"
      >
        <X class="w-4 h-4" />
      </button>

      <!-- Desktop Collapse Toggle -->
      <button
        type="button"
        class="hidden lg:flex p-1.5 rounded-md text-light-text-secondary hover:text-light-text-primary dark:text-dark-text-secondary dark:hover:text-dark-text-primary hover:bg-light-elevated dark:hover:bg-dark-elevated transition-colors"
        :title="props.collapsed ? 'Expand sidebar' : 'Collapse sidebar'"
        @click="emit('update:collapsed', !props.collapsed)"
      >
        <ChevronLeft v-if="!props.collapsed" class="w-4 h-4" />
        <ChevronRight v-else class="w-4 h-4" />
      </button>
    </div>

    <!-- Navigation List -->
    <div class="flex-1 overflow-y-auto py-4 px-3 space-y-6">
      <div v-for="section in navSections" :key="section.title" class="space-y-1">
        <div
          v-show="!props.collapsed || props.mobileOpen"
          class="px-2.5 text-[11px] font-semibold text-light-text-muted dark:text-dark-text-muted uppercase tracking-wider mb-2"
        >
          {{ section.title }}
        </div>

        <div class="space-y-0.5">
          <RouterLink
            v-for="item in section.items"
            :key="item.to"
            :to="item.to"
            class="flex items-center gap-3 px-2.5 py-2 rounded-md text-sm font-medium transition-colors group relative"
            :class="[
              isRouteActive(item.to)
                ? 'bg-brand-50 text-brand-700 dark:bg-brand-950/40 dark:text-brand-300 font-semibold'
                : 'text-light-text-secondary dark:text-dark-text-secondary hover:text-light-text-primary dark:hover:text-dark-text-primary hover:bg-light-elevated dark:hover:bg-dark-elevated'
            ]"
            @click="emit('update:mobileOpen', false)"
          >
            <!-- Active indicator stripe -->
            <span
              v-if="isRouteActive(item.to)"
              class="absolute left-0 top-1.5 bottom-1.5 w-1 rounded-r-md bg-brand-600"
            />

            <component
              :is="item.icon"
              class="w-4 h-4 shrink-0"
              :class="isRouteActive(item.to) ? 'text-brand-600 dark:text-brand-400' : 'text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200'"
            />

            <span
              v-show="!props.collapsed || props.mobileOpen"
              class="truncate text-left flex-1"
            >
              {{ item.name }}
            </span>

            <span
              v-if="item.badge && (!props.collapsed || props.mobileOpen)"
              class="px-1.5 py-0.2 text-[10px] rounded-full bg-light-elevated dark:bg-dark-elevated border border-light-border dark:border-dark-border text-light-text-secondary dark:text-dark-text-secondary font-mono"
            >
              {{ item.badge }}
            </span>

            <!-- Tooltip for collapsed mode -->
            <div
              v-if="props.collapsed && !props.mobileOpen"
              class="hidden lg:group-hover:block absolute left-full ml-3 px-2.5 py-1 rounded-md bg-dark-bg text-white text-xs font-medium whitespace-nowrap shadow-popover z-50 pointer-events-none"
            >
              {{ item.name }}
            </div>
          </RouterLink>
        </div>
      </div>
    </div>

    <!-- Bottom User Section -->
    <div class="p-3 border-t border-light-border dark:border-dark-border shrink-0">
      <div
        class="flex items-center gap-3 p-2 rounded-lg bg-light-elevated/40 dark:bg-dark-elevated/40 border border-light-border/60 dark:border-dark-border/60"
        :class="props.collapsed && !props.mobileOpen ? 'justify-center p-1.5' : ''"
      >
        <AppAvatar
          :name="authStore.currentUser?.name || 'Administrator'"
          size="sm"
          status="online"
        />

        <div v-show="!props.collapsed || props.mobileOpen" class="flex-1 min-w-0 text-left">
          <p class="text-xs font-semibold text-light-text-primary dark:text-dark-text-primary truncate">
            {{ authStore.currentUser?.name || 'Alex Henderson' }}
          </p>
          <p class="text-[11px] text-light-text-muted dark:text-dark-text-muted truncate">
            {{ authStore.currentUser?.role || 'Administrator' }}
          </p>
        </div>

        <button
          v-show="!props.collapsed || props.mobileOpen"
          type="button"
          class="p-1 rounded-md text-light-text-secondary hover:text-rose-600 dark:text-dark-text-secondary dark:hover:text-rose-400 hover:bg-light-surface dark:hover:bg-dark-surface transition-colors"
          title="Sign Out"
          @click="handleLogout"
        >
          <LogOut class="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  </aside>
</template>
