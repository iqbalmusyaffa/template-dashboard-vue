import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { ThemeMode } from '../types';

export const useThemeStore = defineStore('theme', () => {
  const mode = ref<ThemeMode>('system');
  const systemPrefersDark = ref<boolean>(false);

  // Initialize theme from localStorage if available
  const stored = localStorage.getItem('nexus_theme_preference') as ThemeMode | null;
  if (stored && ['light', 'dark', 'system'].includes(stored)) {
    mode.value = stored;
  }

  // System listener
  if (typeof window !== 'undefined' && window.matchMedia) {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    systemPrefersDark.value = mq.matches;
    mq.addEventListener('change', (e) => {
      systemPrefersDark.value = e.matches;
      applyTheme();
    });
  }

  const isDark = computed(() => {
    if (mode.value === 'dark') return true;
    if (mode.value === 'light') return false;
    return systemPrefersDark.value;
  });

  function applyTheme() {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;
    if (isDark.value) {
      root.classList.add('dark');
      root.classList.remove('light');
      root.setAttribute('data-theme', 'dark');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
      root.setAttribute('data-theme', 'light');
    }
  }

  function setTheme(newMode: ThemeMode) {
    mode.value = newMode;
    localStorage.setItem('nexus_theme_preference', newMode);
    applyTheme();
  }

  function toggleTheme() {
    if (mode.value === 'light') {
      setTheme('dark');
    } else if (mode.value === 'dark') {
      setTheme('system');
    } else {
      setTheme('light');
    }
  }

  // Initial application
  applyTheme();

  return {
    mode,
    isDark,
    setTheme,
    toggleTheme,
    applyTheme
  };
});
