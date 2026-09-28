<script setup lang="ts">
import { ref } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { FilterMatchMode } from '@primevue/core/api';
import type { User, UserStatus } from '../../types';
import { formatDate } from '../../utils/formatters';
import AppAvatar from '../common/AppAvatar.vue';
import AppBadge from '../common/AppBadge.vue';
import AppDropdown from '../common/AppDropdown.vue';
import AppButton from '../common/AppButton.vue';
import AppEmptyState from '../common/AppEmptyState.vue';
import {
  MoreVertical,
  Eye,
  Edit,
  Power,
  Trash2,
  FileSpreadsheet,
  RefreshCw,
  Plus,
  Search,
  SlidersHorizontal
} from 'lucide-vue-next';

interface Props {
  users: User[];
  isLoading?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isLoading: false
});

const emit = defineEmits<{
  (e: 'view', user: User): void;
  (e: 'edit', user: User): void;
  (e: 'delete', user: User): void;
  (e: 'toggle-status', user: User): void;
  (e: 'add-user'): void;
  (e: 'refresh'): void;
}>();

const selectedUsers = ref<User[]>([]);
const dt = ref();

// Global & Column Filters
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS }
});

// Column Visibility State
const visibleColumns = ref<{ [key: string]: boolean }>({
  email: true,
  role: true,
  department: true,
  status: true,
  lastActive: true,
  createdAt: true
});

function getBadgeVariant(status: UserStatus) {
  switch (status) {
    case 'Active': return 'active';
    case 'Pending': return 'pending';
    case 'Inactive': return 'inactive';
    case 'Suspended': return 'suspended';
    default: return 'default';
  }
}

function exportToCsv() {
  if (dt.value) {
    dt.value.exportCSV();
  } else {
    const headers = ['Name', 'Email', 'Role', 'Department', 'Status', 'Last Active', 'Created At'];
    const rows = props.users.map(u => [
      `"${u.name}"`,
      `"${u.email}"`,
      `"${u.role}"`,
      `"${u.department}"`,
      `"${u.status}"`,
      `"${u.lastActive}"`,
      `"${u.createdAt}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `nexus_users_directory_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
</script>

<template>
  <div class="space-y-3">
    <!-- Quick Controls Toolbar Above Grid -->
    <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 px-1">
      <div class="flex items-center gap-2">
        <span class="text-xs text-light-text-muted dark:text-dark-text-muted font-medium">
          {{ users.length }} Total Members
        </span>
        <span v-if="selectedUsers.length > 0" class="text-xs px-2 py-0.5 rounded-full bg-brand-50 text-brand-700 dark:bg-brand-950/60 dark:text-brand-300 border border-brand-200 dark:border-brand-800 font-medium">
          {{ selectedUsers.length }} selected
        </span>
      </div>

      <div class="flex items-center gap-2 flex-wrap">
        <!-- Search Input -->
        <div class="relative flex items-center">
          <Search class="w-3.5 h-3.5 absolute left-2.5 text-slate-400 pointer-events-none" />
          <input
            v-model="filters['global'].value"
            type="text"
            placeholder="Search records..."
            class="h-8 pl-8 pr-3 text-xs rounded-md border border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface text-light-text-primary dark:text-dark-text-primary placeholder:text-light-text-muted outline-none focus:border-brand-500 w-44 sm:w-52"
          />
        </div>

        <!-- Column Visibility Dropdown -->
        <AppDropdown align="right" width-class="w-48">
          <template #trigger="{ isOpen }">
            <AppButton variant="secondary" size="sm" title="Toggle columns">
              <template #prefix>
                <SlidersHorizontal class="w-3.5 h-3.5" />
              </template>
              Columns
            </AppButton>
          </template>

          <div class="p-2 space-y-1.5 text-xs text-left">
            <label
              v-for="(val, colKey) in visibleColumns"
              :key="colKey"
              class="flex items-center gap-2 px-2 py-1 rounded hover:bg-light-elevated dark:hover:bg-dark-elevated cursor-pointer capitalize"
            >
              <input
                v-model="visibleColumns[colKey]"
                type="checkbox"
                class="rounded border-light-border text-brand-600 focus:ring-brand-500 w-3.5 h-3.5"
              />
              <span class="text-light-text-primary dark:text-dark-text-primary">{{ colKey }}</span>
            </label>
          </div>
        </AppDropdown>

        <!-- Export CSV Button -->
        <AppButton
          variant="secondary"
          size="sm"
          @click="exportToCsv"
        >
          <template #prefix>
            <FileSpreadsheet class="w-3.5 h-3.5" />
          </template>
          Export CSV
        </AppButton>

        <!-- Refresh Button -->
        <AppButton
          variant="outline"
          size="sm"
          title="Refresh table"
          @click="emit('refresh')"
        >
          <RefreshCw class="w-3.5 h-3.5" :class="props.isLoading ? 'animate-spin' : ''" />
        </AppButton>

        <!-- Add User CTA -->
        <AppButton
          variant="primary"
          size="sm"
          @click="emit('add-user')"
        >
          <template #prefix>
            <Plus class="w-3.5 h-3.5" />
          </template>
          Add User
        </AppButton>
      </div>
    </div>

    <!-- PrimeVue DataTable Container -->
    <div class="overflow-hidden rounded-lg">
      <DataTable
        ref="dt"
        v-model:selection="selectedUsers"
        v-model:filters="filters"
        :value="props.users"
        data-key="id"
        :paginator="true"
        :rows="10"
        :rows-per-page-options="[10, 25, 50, 100]"
        sort-mode="multiple"
        removable-sort
        responsive-layout="scroll"
        :global-filter-fields="['name', 'email', 'role', 'department', 'status']"
        paginator-template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown CurrentPageReport"
        current-page-report-template="Showing {first} to {last} of {totalRecords} users"
        class="p-datatable-sm w-full text-left"
      >
        <!-- Selection Checkbox Column -->
        <Column selection-mode="multiple" header-style="width: 3rem" />

        <!-- 1. Name & Avatar -->
        <Column field="name" header="Name" sortable :style="{ minWidth: '14rem' }">
          <template #body="{ data }">
            <div class="flex items-center gap-3 py-1">
              <AppAvatar :name="data.name" size="sm" />
              <div class="truncate">
                <span
                  class="font-semibold text-light-text-primary dark:text-dark-text-primary block truncate hover:text-brand-600 dark:hover:text-brand-400 cursor-pointer"
                  @click="emit('view', data)"
                >
                  {{ data.name }}
                </span>
                <span class="text-[11px] text-light-text-muted dark:text-dark-text-muted font-mono block truncate">
                  {{ data.id }}
                </span>
              </div>
            </div>
          </template>
        </Column>

        <!-- 2. Email -->
        <Column
          v-if="visibleColumns.email"
          field="email"
          header="Email Address"
          sortable
          :style="{ minWidth: '13rem' }"
        >
          <template #body="{ data }">
            <span class="font-mono text-xs text-light-text-secondary dark:text-dark-text-secondary truncate">
              {{ data.email }}
            </span>
          </template>
        </Column>

        <!-- 3. Role -->
        <Column
          v-if="visibleColumns.role"
          field="role"
          header="Role"
          sortable
          :style="{ minWidth: '11rem' }"
        >
          <template #body="{ data }">
            <span class="text-xs font-medium text-light-text-primary dark:text-dark-text-primary truncate">
              {{ data.role }}
            </span>
          </template>
        </Column>

        <!-- 4. Department -->
        <Column
          v-if="visibleColumns.department"
          field="department"
          header="Department"
          sortable
          :style="{ minWidth: '11rem' }"
        />

        <!-- 5. Status -->
        <Column
          v-if="visibleColumns.status"
          field="status"
          header="Status"
          sortable
          :style="{ width: '8.5rem', textAlign: 'center' }"
        >
          <template #body="{ data }">
            <AppBadge :variant="getBadgeVariant(data.status)" size="sm">
              {{ data.status }}
            </AppBadge>
          </template>
        </Column>

        <!-- 6. Last Active -->
        <Column
          v-if="visibleColumns.lastActive"
          field="lastActive"
          header="Last Active"
          sortable
          :style="{ width: '9rem', textAlign: 'right' }"
        >
          <template #body="{ data }">
            <span class="text-xs text-light-text-muted dark:text-dark-text-muted">
              {{ data.lastActive }}
            </span>
          </template>
        </Column>

        <!-- 7. Created At -->
        <Column
          v-if="visibleColumns.createdAt"
          field="createdAt"
          header="Created"
          sortable
          :style="{ width: '8rem', textAlign: 'right' }"
        >
          <template #body="{ data }">
            <span class="text-xs text-light-text-muted dark:text-dark-text-muted">
              {{ formatDate(data.createdAt) }}
            </span>
          </template>
        </Column>

        <!-- 8. Actions Menu -->
        <Column :style="{ width: '5rem', textAlign: 'center' }">
          <template #body="{ data }">
            <AppDropdown align="right" width-class="w-40">
              <template #trigger="{ isOpen }">
                <button
                  type="button"
                  class="p-1.5 rounded text-light-text-secondary hover:text-light-text-primary dark:text-dark-text-secondary dark:hover:text-dark-text-primary hover:bg-light-elevated dark:hover:bg-dark-elevated transition-colors"
                  title="Row actions"
                >
                  <MoreVertical class="w-4 h-4" />
                </button>
              </template>

              <div class="py-1 text-xs">
                <button
                  type="button"
                  class="w-full flex items-center gap-2.5 px-3 py-1.5 text-light-text-secondary hover:text-light-text-primary dark:text-dark-text-secondary dark:hover:text-dark-text-primary hover:bg-light-elevated dark:hover:bg-dark-elevated transition-colors"
                  @click="emit('view', data)"
                >
                  <Eye class="w-3.5 h-3.5 text-slate-400" /> View Details
                </button>

                <button
                  type="button"
                  class="w-full flex items-center gap-2.5 px-3 py-1.5 text-light-text-secondary hover:text-light-text-primary dark:text-dark-text-secondary dark:hover:text-dark-text-primary hover:bg-light-elevated dark:hover:bg-dark-elevated transition-colors"
                  @click="emit('edit', data)"
                >
                  <Edit class="w-3.5 h-3.5 text-slate-400" /> Edit User
                </button>

                <button
                  type="button"
                  class="w-full flex items-center gap-2.5 px-3 py-1.5 text-light-text-secondary hover:text-light-text-primary dark:text-dark-text-secondary dark:hover:text-dark-text-primary hover:bg-light-elevated dark:hover:bg-dark-elevated transition-colors"
                  @click="emit('toggle-status', data)"
                >
                  <Power class="w-3.5 h-3.5 text-amber-500" />
                  {{ data.status === 'Active' ? 'Deactivate' : 'Activate' }}
                </button>

                <div class="border-t border-light-border dark:border-dark-border my-1" />

                <button
                  type="button"
                  class="w-full flex items-center gap-2.5 px-3 py-1.5 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                  @click="emit('delete', data)"
                >
                  <Trash2 class="w-3.5 h-3.5" /> Delete User
                </button>
              </div>
            </AppDropdown>
          </template>
        </Column>

        <!-- Empty State Slot -->
        <template #empty>
          <div class="p-6 text-center text-xs text-light-text-muted dark:text-dark-text-muted">
            No users match current filters or search keywords.
          </div>
        </template>
      </DataTable>
    </div>

    <!-- Empty State Fallback if zero items -->
    <div v-if="props.users.length === 0 && !props.isLoading" class="mt-4">
      <AppEmptyState
        title="No users found"
        description="Try adjusting your filters or inviting a new member."
      >
        <template #action>
          <AppButton variant="primary" size="sm" @click="emit('add-user')">
            Add New User
          </AppButton>
        </template>
      </AppEmptyState>
    </div>
  </div>
</template>
