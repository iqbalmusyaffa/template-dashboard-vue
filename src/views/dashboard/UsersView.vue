<script setup lang="ts">
import { ref, computed } from 'vue';
import { useUsersStore } from '../../stores/users';
import type { User, UserDepartment, UserStatus } from '../../types';
import AppPageHeader from '../../components/common/AppPageHeader.vue';
import AppButton from '../../components/common/AppButton.vue';
import UsersDataGrid from '../../components/users/UsersDataGrid.vue';
import UserModal from '../../components/users/UserModal.vue';
import UserDeleteModal from '../../components/users/UserDeleteModal.vue';
import UserViewDrawer from '../../components/users/UserViewDrawer.vue';
import { Plus, Users, UserCheck, Clock, ShieldAlert } from 'lucide-vue-next';

const usersStore = useUsersStore();

const isUserModalOpen = ref(false);
const editingUser = ref<User | null>(null);

const isDeleteModalOpen = ref(false);
const deletingUser = ref<User | null>(null);

const isViewDrawerOpen = ref(false);
const viewingUser = ref<User | null>(null);

// Status filter pill
const selectedStatusFilter = ref<string>('All');
const selectedDeptFilter = ref<string>('All');

const statusTabs = ['All', 'Active', 'Pending', 'Inactive', 'Suspended'];
const departmentTabs = [
  'All',
  'Engineering',
  'Product & Design',
  'Operations & Cloud',
  'Security & Compliance',
  'Finance'
];

const filteredUsers = computed(() => {
  return usersStore.users.filter(user => {
    const matchesStatus = selectedStatusFilter.value === 'All' || user.status === selectedStatusFilter.value;
    const matchesDept = selectedDeptFilter.value === 'All' || user.department === selectedDeptFilter.value;
    return matchesStatus && matchesDept;
  });
});

const metrics = computed(() => {
  const all = usersStore.users;
  return {
    total: all.length,
    active: all.filter(u => u.status === 'Active').length,
    pending: all.filter(u => u.status === 'Pending').length,
    suspended: all.filter(u => u.status === 'Suspended').length
  };
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
</script>

<template>
  <div class="space-y-6 text-left">
    <!-- Header -->
    <AppPageHeader
      title="User Management"
      description="Provision access roles, enforce authentication policies, and govern workspace permissions."
      :breadcrumbs="[{ label: 'Dashboard', to: '/dashboard' }, { label: 'Users Directory' }]"
    >
      <template #actions>
        <AppButton variant="primary" size="md" @click="handleOpenAddUser">
          <template #prefix>
            <Plus class="w-4 h-4" />
          </template>
          Invite Member
        </AppButton>
      </template>
    </AppPageHeader>

    <!-- Quick Stats Cards Row -->
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
      <div class="p-4 rounded-lg border border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface shadow-card flex items-center justify-between">
        <div>
          <span class="text-xs text-light-text-muted dark:text-dark-text-muted font-medium uppercase tracking-wider block">Total Members</span>
          <span class="text-xl font-bold text-light-text-primary dark:text-dark-text-primary mt-1 block">{{ metrics.total }}</span>
        </div>
        <div class="w-8 h-8 rounded-md bg-light-elevated dark:bg-dark-elevated flex items-center justify-center text-light-text-secondary dark:text-dark-text-secondary">
          <Users class="w-4 h-4 text-brand-600" />
        </div>
      </div>

      <div class="p-4 rounded-lg border border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface shadow-card flex items-center justify-between">
        <div>
          <span class="text-xs text-light-text-muted dark:text-dark-text-muted font-medium uppercase tracking-wider block">Active Accounts</span>
          <span class="text-xl font-bold text-emerald-600 dark:text-emerald-400 mt-1 block">{{ metrics.active }}</span>
        </div>
        <div class="w-8 h-8 rounded-md bg-emerald-50 dark:bg-emerald-950/40 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
          <UserCheck class="w-4 h-4" />
        </div>
      </div>

      <div class="p-4 rounded-lg border border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface shadow-card flex items-center justify-between">
        <div>
          <span class="text-xs text-light-text-muted dark:text-dark-text-muted font-medium uppercase tracking-wider block">Pending Invites</span>
          <span class="text-xl font-bold text-amber-600 dark:text-amber-400 mt-1 block">{{ metrics.pending }}</span>
        </div>
        <div class="w-8 h-8 rounded-md bg-amber-50 dark:bg-amber-950/40 flex items-center justify-center text-amber-600 dark:text-amber-400">
          <Clock class="w-4 h-4" />
        </div>
      </div>

      <div class="p-4 rounded-lg border border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface shadow-card flex items-center justify-between">
        <div>
          <span class="text-xs text-light-text-muted dark:text-dark-text-muted font-medium uppercase tracking-wider block">Suspended / Locked</span>
          <span class="text-xl font-bold text-rose-600 dark:text-rose-400 mt-1 block">{{ metrics.suspended }}</span>
        </div>
        <div class="w-8 h-8 rounded-md bg-rose-50 dark:bg-rose-950/40 flex items-center justify-center text-rose-600 dark:text-rose-400">
          <ShieldAlert class="w-4 h-4" />
        </div>
      </div>
    </div>

    <!-- Filter Pills Row -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-lg border border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface">
      <!-- Status Tabs -->
      <div class="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
        <button
          v-for="status in statusTabs"
          :key="status"
          type="button"
          class="px-3 py-1.5 rounded-md text-xs font-medium transition-colors shrink-0 select-none"
          :class="[
            selectedStatusFilter === status
              ? 'bg-brand-600 text-white shadow-xs'
              : 'text-light-text-secondary hover:text-light-text-primary dark:text-dark-text-secondary dark:hover:text-dark-text-primary hover:bg-light-elevated dark:hover:bg-dark-elevated'
          ]"
          @click="selectedStatusFilter = status"
        >
          {{ status }}
        </button>
      </div>

      <!-- Department Filter -->
      <div class="flex items-center gap-2">
        <span class="text-xs text-light-text-muted dark:text-dark-text-muted shrink-0">Department:</span>
        <select
          v-model="selectedDeptFilter"
          class="h-8 pl-2.5 pr-8 text-xs rounded-md border border-light-border dark:border-dark-border bg-light-elevated dark:bg-dark-elevated text-light-text-primary dark:text-dark-text-primary outline-none focus:border-brand-500"
        >
          <option v-for="dept in departmentTabs" :key="dept" :value="dept">
            {{ dept }}
          </option>
        </select>
      </div>
    </div>

    <!-- DevExtreme DataGrid -->
    <UsersDataGrid
      :users="filteredUsers"
      :is-loading="usersStore.isLoading"
      @view="handleOpenViewUser"
      @edit="handleOpenEditUser"
      @delete="handleOpenDeleteUser"
      @toggle-status="handleToggleStatus"
      @add-user="handleOpenAddUser"
      @refresh="usersStore.fetchUsers(true)"
    />

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
