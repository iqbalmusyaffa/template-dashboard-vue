<script setup lang="ts">
import { ref, computed } from 'vue';
import { useAuthStore } from '../../stores/auth';
import { useUsersStore } from '../../stores/users';
import { useToastStore } from '../../stores/toast';
import type { User } from '../../types';
import { KPI_METRICS } from '../../data/dummyData';
import DatePicker from 'primevue/datepicker';
import { Calendar } from 'lucide-vue-next';

import AppButton from '../../components/common/AppButton.vue';
import AppCard from '../../components/common/AppCard.vue';
import KpiCard from '../../components/dashboard/KpiCard.vue';
import RevenueChart from '../../components/dashboard/RevenueChart.vue';
import UserActivityChart from '../../components/dashboard/UserActivityChart.vue';
import UserDistributionChart from '../../components/dashboard/UserDistributionChart.vue';
import RecentActivityList from '../../components/dashboard/RecentActivityList.vue';
import UsersDataGrid from '../../components/users/UsersDataGrid.vue';
import UserModal from '../../components/users/UserModal.vue';
import UserDeleteModal from '../../components/users/UserDeleteModal.vue';
import UserViewDrawer from '../../components/users/UserViewDrawer.vue';

import { Download, Sparkles, Plus, ArrowRight } from 'lucide-vue-next';

const authStore = useAuthStore();
const usersStore = useUsersStore();
const toast = useToastStore();

// Default date range: current quarter
const startDate = new Date(2026, 0, 1);
const endDate = new Date(2026, 8, 30);
const dateRange = ref<[Date, Date]>([startDate, endDate]);

// Modals & Drawers state
const isUserModalOpen = ref(false);
const editingUser = ref<User | null>(null);

const isDeleteModalOpen = ref(false);
const deletingUser = ref<User | null>(null);

const isViewDrawerOpen = ref(false);
const viewingUser = ref<User | null>(null);

const greeting = computed(() => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
});

const adminName = computed(() => {
  return authStore.currentUser?.name ? authStore.currentUser.name.split(' ')[0] : 'Admin';
});

function handleOpenAddUser() {
  editingUser.value = null;
  isUserModalOpen.value = true;
}

function handleOpenEditUser(user: User) {
  editingUser.value = user;
  isUserModalOpen.value = true;
}

function handleOpenDeleteUser(user: User) {
  deletingUser.value = user;
  isDeleteModalOpen.value = true;
}

function handleOpenViewUser(user: User) {
  viewingUser.value = user;
  isViewDrawerOpen.value = true;
}

function handleSaveUser(userData: any) {
  if (userData.id) {
    usersStore.updateUser(userData.id, userData);
  } else {
    usersStore.addUser(userData);
  }
}

function handleConfirmDelete(user: User) {
  usersStore.deleteUser(user.id);
}

function handleToggleStatus(user: User) {
  usersStore.toggleStatus(user.id);
}

function handleExportDashboard() {
  toast.success('Report Exported', 'Executive platform summary PDF has been queued for download.');
}
</script>

<template>
  <div class="space-y-6 text-left">
    <!-- Dashboard Header Section -->
    <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-light-border dark:border-dark-border">
      <div>
        <div class="flex items-center gap-2">
          <h1 class="text-xl sm:text-2xl font-bold tracking-tight text-light-text-primary dark:text-dark-text-primary">
            Dashboard
          </h1>
          <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Live Cluster
          </span>
        </div>
        <p class="text-xs sm:text-sm text-light-text-muted dark:text-dark-text-muted mt-1">
          {{ greeting }}, {{ adminName }} &mdash; Here's what's happening with your workspace.
        </p>
      </div>

      <!-- Controls: Date Range & Export Button -->
      <div class="flex items-center gap-2.5 flex-wrap">
        <div class="relative flex items-center">
          <DatePicker
            v-model="dateRange"
            selection-mode="range"
            :manual-input="false"
            date-format="M d, yy"
            placeholder="Jan 1, 2026 - Sep 30, 2026"
            class="h-9 text-xs rounded-md border border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface w-56 sm:w-64"
          />
        </div>

        <AppButton
          variant="secondary"
          size="md"
          @click="handleExportDashboard"
        >
          <template #prefix>
            <Download class="w-3.5 h-3.5" />
          </template>
          Export
        </AppButton>
      </div>
    </div>

    <!-- 10. KPI Cards Section -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <KpiCard
        v-for="kpi in KPI_METRICS"
        :key="kpi.title"
        :title="kpi.title"
        :value="kpi.value"
        :change="kpi.change"
        :is-positive="kpi.isPositive"
        :comparison="kpi.comparison"
        :icon-name="kpi.iconName"
      />
    </div>

    <!-- 11. Analytics & Visualizations Section -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Revenue & Expense Chart (2 Cols) -->
      <div class="lg:col-span-2">
        <AppCard
          title="Revenue Overview"
          subtitle="Monthly Recurring Revenue (MRR) vs Infrastructure operating expenses"
        >
          <template #action>
            <div class="flex items-center gap-2">
              <span class="inline-flex items-center gap-1.5 text-xs text-light-text-muted dark:text-dark-text-muted">
                <span class="w-2.5 h-2.5 rounded-full bg-brand-600" /> Revenue
              </span>
              <span class="inline-flex items-center gap-1.5 text-xs text-light-text-muted dark:text-dark-text-muted">
                <span class="w-2.5 h-2.5 rounded-full bg-slate-400" /> Expenses
              </span>
            </div>
          </template>

          <RevenueChart />
        </AppCard>
      </div>

      <!-- User Distribution Donut Chart (1 Col) -->
      <div class="lg:col-span-1">
        <AppCard
          title="User Distribution"
          subtitle="Directory categorization by status"
        >
          <UserDistributionChart />
        </AppCard>
      </div>
    </div>

    <!-- Second Row Analytics: User Activity & Recent Events -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- User Activity Weekly Bar Chart (2 cols) -->
      <div class="lg:col-span-2">
        <AppCard
          title="User Activity & Ingestion"
          subtitle="Daily active members throughout the past 7 days"
        >
          <UserActivityChart />
        </AppCard>
      </div>

      <!-- Recent System Activity (1 col) -->
      <div class="lg:col-span-1">
        <AppCard
          title="Audit Trail Stream"
          subtitle="Real-time security and admin actions"
        >
          <template #action>
            <RouterLink
              to="/dashboard/activity"
              class="text-xs text-brand-600 dark:text-brand-400 font-semibold hover:underline inline-flex items-center gap-1"
            >
              View all <ArrowRight class="w-3 h-3" />
            </RouterLink>
          </template>

          <RecentActivityList />
        </AppCard>
      </div>
    </div>

    <!-- 12. DevExtreme DataGrid Section -->
    <div class="space-y-3">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-base font-bold text-light-text-primary dark:text-dark-text-primary">
            Workspace Users
          </h2>
          <p class="text-xs text-light-text-muted dark:text-dark-text-muted mt-0.5">
            Active directory managed through DevExtreme Vue DataGrid
          </p>
        </div>

        <RouterLink
          to="/dashboard/users"
          class="text-xs text-brand-600 dark:text-brand-400 font-semibold hover:underline inline-flex items-center gap-1"
        >
          Open Full Directory <ArrowRight class="w-3.5 h-3.5" />
        </RouterLink>
      </div>

      <UsersDataGrid
        :users="usersStore.users"
        :is-loading="usersStore.isLoading"
        @view="handleOpenViewUser"
        @edit="handleOpenEditUser"
        @delete="handleOpenDeleteUser"
        @toggle-status="handleToggleStatus"
        @add-user="handleOpenAddUser"
        @refresh="usersStore.fetchUsers(true)"
      />
    </div>

    <!-- Modals & Drawers -->
    <UserModal
      v-model="isUserModalOpen"
      :user="editingUser"
      @save="handleSaveUser"
    />

    <UserDeleteModal
      v-model="isDeleteModalOpen"
      :user="deletingUser"
      @confirm="handleConfirmDelete"
    />

    <UserViewDrawer
      v-model="isViewDrawerOpen"
      :user="viewingUser"
      @edit="(user) => { isViewDrawerOpen = false; handleOpenEditUser(user); }"
    />
  </div>
</template>
