<script setup lang="ts">
import { ExternalLink, ShieldCheck } from 'lucide-vue-next';

interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

const footerLinks: FooterLink[] = [
  { label: 'Documentation', href: '#' },
  { label: 'API Reference', href: '#' },
  { label: 'Support & Helpdesk', href: '#' },
  { label: 'Privacy Policy', href: '#' },
  { label: 'Security & Compliance', href: '#' }
];

const currentYear = new Date().getFullYear();
const appVersion = 'v1.4.2-prod';
</script>

<template>
  <footer class="border-t border-light-border dark:border-dark-border pt-6 pb-4 transition-colors select-none">
    <div class="flex flex-col md:flex-row items-center justify-between gap-4">
      <!-- Left: Copyright & System Status -->
      <div class="flex flex-wrap items-center gap-3 text-xs text-light-text-muted dark:text-dark-text-muted">
        <div class="flex items-center gap-1.5 font-medium text-light-text-primary dark:text-dark-text-primary">
          <span class="font-bold tracking-tight">NEXUS<span class="text-brand-600">.</span>IO</span>
          <span>&copy; {{ currentYear }}</span>
        </div>

        <span class="text-light-border dark:text-dark-border">&bull;</span>

        <!-- System Status Indicator Badge -->
        <div
          class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
          title="All cloud clusters operating normally (99.98% uptime)"
        >
          <span class="relative flex h-2 w-2">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>All systems operational</span>
        </div>

        <span class="text-light-border dark:text-dark-border hidden sm:inline">&bull;</span>

        <!-- SOC2 / Security indicator -->
        <span class="hidden sm:inline-flex items-center gap-1 text-[11px] text-light-text-muted dark:text-dark-text-muted">
          <ShieldCheck class="w-3.5 h-3.5 text-brand-600 dark:text-brand-400" />
          SOC-2 Certified
        </span>
      </div>

      <!-- Right: Links & Version Badge -->
      <div class="flex flex-wrap items-center gap-4 text-xs text-light-text-muted dark:text-dark-text-muted">
        <nav class="flex items-center gap-4">
          <a
            v-for="link in footerLinks"
            :key="link.label"
            :href="link.href"
            class="hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
          >
            {{ link.label }}
          </a>
        </nav>

        <!-- App Version Badge -->
        <span
          class="text-[11px] font-mono px-2 py-0.5 rounded bg-light-elevated dark:bg-dark-elevated text-light-text-secondary dark:text-dark-text-secondary border border-light-border dark:border-dark-border"
          title="Production Build"
        >
          {{ appVersion }}
        </span>
      </div>
    </div>
  </footer>
</template>
