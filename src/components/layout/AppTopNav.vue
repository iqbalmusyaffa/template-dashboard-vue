<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../stores/auth';
import { useThemeStore } from '../../stores/theme';
import AppAvatar from '../common/AppAvatar.vue';
import AppDropdown from '../common/AppDropdown.vue';
import AppNotificationDrawer from './AppNotificationDrawer.vue';
import {
  Menu,
  Search,
  Bell,
  Sun,
  Moon,
  Monitor,
  User,
  Settings,
  HelpCircle,
  LogOut,
  Check
} from 'lucide-vue-next';

interface Props {
  title?: string;
}

defineProps<Props>();

const emit = defineEmits<{
  (e: 'toggle-mobile-sidebar'): void;
}>();

const router = useRouter();
const authStore = useAuthStore();
const themeStore = useThemeStore();

const isNotificationOpen = ref(false);
const searchQuery = ref('');

function handleLogout() {
  authStore.logout();
  router.push('/login');
}
</script>

<template>
  <header class="h-16 border-b border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface sticky top-0 z-30 flex items-center justify-between px-4 sm:px-6 transition-colors select-none">
    <!-- Left Section: Mobile Toggle & Page Context -->
    <div class="flex items-center gap-3">
      <button
        type="button"
        class="lg:hidden p-2 rounded-md text-light-text-secondary hover:text-light-text-primary dark:text-dark-text-secondary dark:hover:text-dark-text-primary hover:bg-light-elevated dark:hover:bg-dark-elevated"
        aria-label="Open sidebar"
        @click="emit('toggle-mobile-sidebar')"
      >
        <Menu class="w-5 h-5" />
      </button>

      <div class="hidden sm:flex items-center gap-2 text-xs text-light-text-muted dark:text-dark-text-muted">
        <span class="font-medium text-light-text-primary dark:text-dark-text-primary">Nexus Platform</span>
        <span>/</span>
        <span class="text-light-text-secondary dark:text-dark-text-secondary">{{ title || 'Workspace' }}</span>
      </div>
    </div>

    <!-- Right Section: Search, Notifications, Theme, User Menu -->
    <div class="flex items-center gap-2 sm:gap-3">
      <!-- Quick Search Input -->
      <div class="relative hidden md:flex items-center">
        <Search class="w-4 h-4 absolute left-3 text-slate-400 pointer-events-none" />
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search records, users, logs..."
          class="w-64 h-9 pl-9 pr-9 text-xs rounded-md border border-light-border dark:border-dark-border bg-light-elevated/60 dark:bg-dark-elevated/60 text-light-text-primary dark:text-dark-text-primary placeholder:text-light-text-muted focus:outline-none focus:border-brand-500 focus:bg-light-surface dark:focus:bg-dark-surface transition-all"
        />
        <kbd class="absolute right-2.5 px-1.5 py-0.5 text-[10px] font-mono text-light-text-muted dark:text-dark-text-muted bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border rounded">
          ⌘K
        </kbd>
      </div>

      <!-- Theme Switcher Dropdown -->
      <AppDropdown align="right" width-class="w-36">
        <template #trigger="{ isOpen }">
          <button
            type="button"
            class="p-2 rounded-md text-light-text-secondary hover:text-light-text-primary dark:text-dark-text-secondary dark:hover:text-dark-text-primary hover:bg-light-elevated dark:hover:bg-dark-elevated transition-colors"
            title="Switch theme"
          >
            <Sun v-if="themeStore.mode === 'light'" class="w-4 h-4 text-amber-500" />
            <Moon v-else-if="themeStore.mode === 'dark'" class="w-4 h-4 text-indigo-400" />
            <Monitor v-else class="w-4 h-4 text-light-text-secondary dark:text-dark-text-secondary" />
          </button>
        </template>

        <div class="py-1 text-xs">
          <button
            type="button"
            class="w-full flex items-center justify-between px-3 py-1.5 text-light-text-secondary hover:text-light-text-primary dark:text-dark-text-secondary dark:hover:text-dark-text-primary hover:bg-light-elevated dark:hover:bg-dark-elevated transition-colors"
            @click="themeStore.setTheme('light')"
          >
            <span class="flex items-center gap-2">
              <Sun class="w-3.5 h-3.5 text-amber-500" /> Light
            </span>
            <Check v-if="themeStore.mode === 'light'" class="w-3 h-3 text-brand-600" />
          </button>
          <button
            type="button"
            class="w-full flex items-center justify-between px-3 py-1.5 text-light-text-secondary hover:text-light-text-primary dark:text-dark-text-secondary dark:hover:text-dark-text-primary hover:bg-light-elevated dark:hover:bg-dark-elevated transition-colors"
            @click="themeStore.setTheme('dark')"
          >
            <span class="flex items-center gap-2">
              <Moon class="w-3.5 h-3.5 text-indigo-400" /> Dark
            </span>
            <Check v-if="themeStore.mode === 'dark'" class="w-3 h-3 text-brand-600" />
          </button>
          <button
            type="button"
            class="w-full flex items-center justify-between px-3 py-1.5 text-light-text-secondary hover:text-light-text-primary dark:text-dark-text-secondary dark:hover:text-dark-text-primary hover:bg-light-elevated dark:hover:bg-dark-elevated transition-colors"
            @click="themeStore.setTheme('system')"
          >
            <span class="flex items-center gap-2">
              <Monitor class="w-3.5 h-3.5 text-slate-400" /> System
            </span>
            <Check v-if="themeStore.mode === 'system'" class="w-3 h-3 text-brand-600" />
          </button>
        </div>
      </AppDropdown>

      <!-- Notifications Button -->
      <button
        type="button"
        class="relative p-2 rounded-md text-light-text-secondary hover:text-light-text-primary dark:text-dark-text-secondary dark:hover:text-dark-text-primary hover:bg-light-elevated dark:hover:bg-dark-elevated transition-colors"
        title="View Notifications"
        @click="isNotificationOpen = true"
      >
        <Bell class="w-4 h-4" />
        <span class="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-brand-600 ring-2 ring-light-surface dark:ring-dark-surface" />
      </button>

      <!-- Divider -->
      <div class="h-6 w-px bg-light-border dark:bg-dark-border" />

      <!-- User Dropdown Menu -->
      <AppDropdown align="right" width-class="w-56">
        <template #trigger="{ isOpen }">
          <button
            type="button"
            class="flex items-center gap-2 p-1 rounded-full hover:ring-2 hover:ring-light-border dark:hover:ring-dark-border transition-all"
          >
            <AppAvatar
              :name="authStore.currentUser?.name || 'Administrator'"
              size="sm"
            />
          </button>
        </template>

        <!-- User Dropdown Content -->
        <div class="px-3.5 py-2.5 border-b border-light-border dark:border-dark-border">
          <p class="text-xs font-semibold text-light-text-primary dark:text-dark-text-primary truncate">
            {{ authStore.currentUser?.name || 'Alex Henderson' }}
          </p>
          <p class="text-[11px] text-light-text-muted dark:text-dark-text-muted truncate mt-0.5 font-mono">
            {{ authStore.currentUser?.email || 'admin@example.com' }}
          </p>
        </div>

        <div class="py-1 text-xs">
          <RouterLink
            to="/dashboard/settings"
            class="flex items-center gap-2.5 px-3.5 py-2 text-light-text-secondary hover:text-light-text-primary dark:text-dark-text-secondary dark:hover:text-dark-text-primary hover:bg-light-elevated dark:hover:bg-dark-elevated transition-colors"
          >
            <User class="w-3.5 h-3.5 text-slate-400" /> My Profile
          </RouterLink>

          <RouterLink
            to="/dashboard/settings"
            class="flex items-center gap-2.5 px-3.5 py-2 text-light-text-secondary hover:text-light-text-primary dark:text-dark-text-secondary dark:hover:text-dark-text-primary hover:bg-light-elevated dark:hover:bg-dark-elevated transition-colors"
          >
            <Settings class="w-3.5 h-3.5 text-slate-400" /> Workspace Settings
          </RouterLink>

          <a
            href="https://js.devexpress.com/Documentation/"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-2.5 px-3.5 py-2 text-light-text-secondary hover:text-light-text-primary dark:text-dark-text-secondary dark:hover:text-dark-text-primary hover:bg-light-elevated dark:hover:bg-dark-elevated transition-colors"
          >
            <HelpCircle class="w-3.5 h-3.5 text-slate-400" /> Help Center & Docs
          </a>
        </div>

        <div class="pt-1 border-t border-light-border dark:border-dark-border">
          <button
            type="button"
            class="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
            @click="handleLogout"
          >
            <LogOut class="w-3.5 h-3.5" /> Sign Out
          </button>
        </div>
      </AppDropdown>
    </div>

    <!-- Notification Drawer Component -->
    <AppNotificationDrawer v-model="isNotificationOpen" />
  </header>
</template>
