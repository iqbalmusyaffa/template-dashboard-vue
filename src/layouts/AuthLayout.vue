<script setup lang="ts">
import { useThemeStore } from '../stores/theme';
import AppToast from '../components/common/AppToast.vue';
import { Layers, Sun, Moon, CheckCircle2, ShieldCheck, Zap } from 'lucide-vue-next';

const themeStore = useThemeStore();
</script>

<template>
  <div class="min-h-screen flex flex-col lg:flex-row bg-light-bg dark:bg-dark-bg text-light-text-primary dark:text-dark-text-primary transition-colors">
    <!-- Left Hero/Branding Column (Desktop only, minimal and professional) -->
    <div class="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 border-r border-light-border dark:border-dark-border bg-light-surface/60 dark:bg-dark-surface/60 relative overflow-hidden select-none">
      <!-- Subtle architectural grid lines (not messy blobs) -->
      <div class="absolute inset-0 bg-[radial-gradient(#4f46e5_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

      <!-- Top Branding -->
      <div class="flex items-center gap-3 z-10">
        <div class="w-10 h-10 rounded-xl bg-brand-600 flex items-center justify-center text-white shadow-sm">
          <Layers class="w-5 h-5" />
        </div>
        <div>
          <span class="font-bold text-base tracking-tight text-light-text-primary dark:text-dark-text-primary">
            NEXUS<span class="text-brand-600">.</span>IO
          </span>
          <p class="text-xs text-light-text-muted dark:text-dark-text-muted">Enterprise Cloud Platform</p>
        </div>
      </div>

      <!-- Center Value Proposition -->
      <div class="my-auto max-w-lg z-10 space-y-6">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-200 dark:border-brand-900 bg-brand-50/60 dark:bg-brand-950/40 text-brand-700 dark:text-brand-300 text-xs font-semibold">
          <Zap class="w-3.5 h-3.5" /> Next-Generation SaaS Architecture
        </div>

        <h2 class="text-3xl font-extrabold tracking-tight text-light-text-primary dark:text-dark-text-primary leading-tight">
          Unified control plane for modern enterprise infrastructure.
        </h2>

        <p class="text-sm text-light-text-secondary dark:text-dark-text-secondary leading-relaxed">
          Monitor distributed services, orchestrate access permissions with precision, and extract actionable telemetry with DevExtreme high-throughput data grids.
        </p>

        <!-- Feature Points -->
        <div class="space-y-3 pt-2">
          <div class="flex items-center gap-3 text-xs text-light-text-secondary dark:text-dark-text-secondary">
            <CheckCircle2 class="w-4 h-4 text-emerald-500 shrink-0" />
            <span>SOC2 Type II & ISO 27001 certified security baseline</span>
          </div>
          <div class="flex items-center gap-3 text-xs text-light-text-secondary dark:text-dark-text-secondary">
            <CheckCircle2 class="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Integrated DevExtreme DataGrid with multi-column sorting</span>
          </div>
          <div class="flex items-center gap-3 text-xs text-light-text-secondary dark:text-dark-text-secondary">
            <CheckCircle2 class="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Strict role-based governance and audit trail logs</span>
          </div>
        </div>
      </div>

      <!-- Bottom Statement -->
      <div class="flex items-center justify-between z-10 text-xs text-light-text-muted dark:text-dark-text-muted pt-6 border-t border-light-border dark:border-dark-border">
        <span>© 2026 Nexus Systems Inc.</span>
        <span class="flex items-center gap-1.5 font-medium text-emerald-600 dark:text-emerald-400">
          <ShieldCheck class="w-4 h-4" /> Systems Operational (99.99%)
        </span>
      </div>
    </div>

    <!-- Right Form Column -->
    <div class="flex-1 flex flex-col justify-between p-6 sm:p-10 lg:p-12 relative">
      <!-- Top Bar: Theme switcher in auth layout -->
      <div class="flex items-center justify-between sm:justify-end gap-3 pb-6">
        <!-- Mobile Logo -->
        <div class="flex items-center gap-2 lg:hidden">
          <div class="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center text-white">
            <Layers class="w-4 h-4" />
          </div>
          <span class="font-bold text-sm tracking-tight">NEXUS.IO</span>
        </div>

        <button
          type="button"
          class="p-2 rounded-md text-light-text-secondary hover:text-light-text-primary dark:text-dark-text-secondary dark:hover:text-dark-text-primary hover:bg-light-elevated dark:hover:bg-dark-elevated transition-colors border border-light-border dark:border-dark-border"
          title="Toggle theme"
          @click="themeStore.toggleTheme"
        >
          <Sun v-if="themeStore.isDark" class="w-4 h-4 text-amber-500" />
          <Moon v-else class="w-4 h-4 text-indigo-500" />
        </button>
      </div>

      <!-- Form Center Area -->
      <div class="w-full max-w-md mx-auto my-auto py-6">
        <RouterView />
      </div>

      <!-- Footer Links -->
      <div class="text-center text-xs text-light-text-muted dark:text-dark-text-muted pt-6">
        <p>Enterprise Grade Security &bullet; Privacy Policy &bullet; Terms of Service</p>
      </div>
    </div>

    <!-- Global Toasts -->
    <AppToast />
  </div>
</template>
