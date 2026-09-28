<script setup lang="ts">
import { ref } from 'vue';
import { useToastStore } from '../../stores/toast';
import AppPageHeader from '../../components/common/AppPageHeader.vue';
import AppButton from '../../components/common/AppButton.vue';
import AppCard from '../../components/common/AppCard.vue';
import RevenueChart from '../../components/dashboard/RevenueChart.vue';
import UserActivityChart from '../../components/dashboard/UserActivityChart.vue';
import { Download, FileText, Calendar, CheckCircle2, TrendingUp, DollarSign, Database } from 'lucide-vue-next';

const toast = useToastStore();
const selectedPeriod = ref('Q3-2026');

function triggerExport(format: string) {
  toast.success('Report Generation Initiated', `Your ${selectedPeriod.value} ${format.toUpperCase()} report is being compiled and will download shortly.`);
}
</script>

<template>
  <div class="space-y-6 text-left">
    <!-- Header -->
    <AppPageHeader
      title="Analytics & Financial Reports"
      description="Consolidated operational telemetry, cloud infrastructure expenses, and revenue growth trajectory."
      :breadcrumbs="[{ label: 'Dashboard', to: '/dashboard' }, { label: 'Reports & Analytics' }]"
    >
      <template #actions>
        <div class="flex items-center gap-2">
          <select
            v-model="selectedPeriod"
            class="h-9 px-3 rounded-md border border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface text-xs font-medium text-light-text-primary dark:text-dark-text-primary outline-none"
          >
            <option value="Q3-2026">Q3 2026 (Current)</option>
            <option value="Q2-2026">Q2 2026</option>
            <option value="Q1-2026">Q1 2026</option>
            <option value="FY-2025">Full Year 2025</option>
          </select>

          <AppButton variant="secondary" size="md" @click="triggerExport('csv')">
            <template #prefix>
              <Download class="w-4 h-4" />
            </template>
            Export CSV
          </AppButton>

          <AppButton variant="primary" size="md" @click="triggerExport('pdf')">
            <template #prefix>
              <FileText class="w-4 h-4" />
            </template>
            Generate PDF
          </AppButton>
        </div>
      </template>
    </AppPageHeader>

    <!-- Financial KPIs -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div class="p-5 rounded-lg border border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface shadow-card">
        <div class="flex items-center justify-between text-xs text-light-text-muted dark:text-dark-text-muted uppercase tracking-wider font-semibold">
          <span>Net Operating Margin</span>
          <TrendingUp class="w-4 h-4 text-emerald-500" />
        </div>
        <p class="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary mt-2">
          $37,190 <span class="text-xs text-emerald-600 dark:text-emerald-400 font-medium">+18.5%</span>
        </p>
        <p class="text-xs text-light-text-muted dark:text-dark-text-muted mt-1">44.1% operating margin efficiency</p>
      </div>

      <div class="p-5 rounded-lg border border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface shadow-card">
        <div class="flex items-center justify-between text-xs text-light-text-muted dark:text-dark-text-muted uppercase tracking-wider font-semibold">
          <span>Average Revenue Per Account</span>
          <DollarSign class="w-4 h-4 text-brand-600" />
        </div>
        <p class="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary mt-2">
          $1,420 <span class="text-xs text-emerald-600 dark:text-emerald-400 font-medium">+6.2%</span>
        </p>
        <p class="text-xs text-light-text-muted dark:text-dark-text-muted mt-1">Across 18 enterprise tier contracts</p>
      </div>

      <div class="p-5 rounded-lg border border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface shadow-card">
        <div class="flex items-center justify-between text-xs text-light-text-muted dark:text-dark-text-muted uppercase tracking-wider font-semibold">
          <span>Database & Cloud Compute</span>
          <Database class="w-4 h-4 text-indigo-500" />
        </div>
        <p class="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary mt-2">
          $47,100 <span class="text-xs text-amber-600 dark:text-amber-400 font-medium">+2.1%</span>
        </p>
        <p class="text-xs text-light-text-muted dark:text-dark-text-muted mt-1">AWS & Cloudflare edge nodes</p>
      </div>
    </div>

    <!-- Charts Breakdown -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <AppCard
        title="Revenue Trajectory & Expense Burn"
        subtitle="Audited trailing 9 months revenue growth curve"
      >
        <RevenueChart />
      </AppCard>

      <AppCard
        title="Network Ingestion & Active Traffic"
        subtitle="Throughput load across international edge clusters"
      >
        <UserActivityChart />
      </AppCard>
    </div>

    <!-- Audited Compliance Summary -->
    <AppCard
      title="Compliance & SLA Verification"
      subtitle="Third-party availability audits and uptime performance"
    >
      <div class="space-y-3">
        <div class="flex items-center justify-between p-3 rounded-md bg-light-elevated/40 dark:bg-dark-elevated/40 border border-light-border dark:border-dark-border text-xs">
          <div class="flex items-center gap-3">
            <CheckCircle2 class="w-4 h-4 text-emerald-500" />
            <div>
              <span class="font-semibold text-light-text-primary dark:text-dark-text-primary block">API Gateway Cluster Availability</span>
              <span class="text-light-text-muted dark:text-dark-text-muted">Global 99.994% actual uptime over 90 days</span>
            </div>
          </div>
          <span class="font-mono text-emerald-600 dark:text-emerald-400 font-bold">PASS</span>
        </div>

        <div class="flex items-center justify-between p-3 rounded-md bg-light-elevated/40 dark:bg-dark-elevated/40 border border-light-border dark:border-dark-border text-xs">
          <div class="flex items-center gap-3">
            <CheckCircle2 class="w-4 h-4 text-emerald-500" />
            <div>
              <span class="font-semibold text-light-text-primary dark:text-dark-text-primary block">SOC2 Type II Annual Audit Attestation</span>
              <span class="text-light-text-muted dark:text-dark-text-muted">Conducted by Ernst & Young LLP &bull; No material exceptions</span>
            </div>
          </div>
          <span class="font-mono text-emerald-600 dark:text-emerald-400 font-bold">VERIFIED</span>
        </div>
      </div>
    </AppCard>
  </div>
</template>
