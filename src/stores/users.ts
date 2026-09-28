import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { User, UserStatus } from '../types';
import { INITIAL_USERS } from '../data/dummyData';
import { useToastStore } from './toast';

const USERS_STORAGE_KEY = 'nexus_users_data';

export const useUsersStore = defineStore('users', () => {
  const toast = useToastStore();
  const users = ref<User[]>([]);
  const isLoading = ref<boolean>(false);
  const error = ref<string | null>(null);
  const selectedUser = ref<User | null>(null);

  // Initialize from storage or dummy data
  function initUsers() {
    try {
      const stored = localStorage.getItem(USERS_STORAGE_KEY);
      if (stored) {
        users.value = JSON.parse(stored);
      } else {
        users.value = [...INITIAL_USERS];
        saveUsers();
      }
    } catch {
      users.value = [...INITIAL_USERS];
    }
  }

  function saveUsers() {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users.value));
  }

  async function fetchUsers(forceRefresh = false) {
    if (users.value.length > 0 && !forceRefresh) return;
    isLoading.value = true;
    error.value = null;
    try {
      await new Promise(res => setTimeout(res, 400));
      initUsers();
    } catch (e: any) {
      error.value = 'Failed to load user directory. Please retry.';
    } finally {
      isLoading.value = false;
    }
  }

  function addUser(userData: Omit<User, 'id' | 'createdAt' | 'lastActive'>): User {
    const id = `usr-${Math.floor(1000 + Math.random() * 9000)}`;
    const newUser: User = {
      ...userData,
      id,
      createdAt: new Date().toISOString().split('T')[0],
      lastActive: 'Just added'
    };
    users.value.unshift(newUser);
    saveUsers();
    toast.success('User created', `${newUser.name} was successfully invited to the workspace.`);
    return newUser;
  }

  function updateUser(id: string, updates: Partial<User>): boolean {
    const index = users.value.findIndex(u => u.id === id);
    if (index === -1) return false;

    users.value[index] = {
      ...users.value[index],
      ...updates
    };

    if (selectedUser.value && selectedUser.value.id === id) {
      selectedUser.value = { ...users.value[index] };
    }

    saveUsers();
    toast.success('User updated', `${users.value[index].name}'s details were updated.`);
    return true;
  }

  function deleteUser(id: string): boolean {
    const index = users.value.findIndex(u => u.id === id);
    if (index === -1) return false;

    const deletedName = users.value[index].name;
    users.value.splice(index, 1);
    if (selectedUser.value && selectedUser.value.id === id) {
      selectedUser.value = null;
    }
    saveUsers();
    toast.success('User deleted', `${deletedName} was removed from the organization.`);
    return true;
  }

  function toggleStatus(id: string): boolean {
    const user = users.value.find(u => u.id === id);
    if (!user) return false;

    const newStatus: UserStatus = user.status === 'Active' ? 'Inactive' : 'Active';
    user.status = newStatus;
    saveUsers();
    toast.info('Status updated', `${user.name} is now ${newStatus}.`);
    return true;
  }

  function setSelectedUser(user: User | null) {
    selectedUser.value = user;
  }

  const activeUsersCount = computed(() => users.value.filter(u => u.status === 'Active').length);
  const totalCount = computed(() => users.value.length);

  // Initialize immediately
  initUsers();

  return {
    users,
    isLoading,
    error,
    selectedUser,
    activeUsersCount,
    totalCount,
    fetchUsers,
    addUser,
    updateUser,
    deleteUser,
    toggleStatus,
    setSelectedUser
  };
});
