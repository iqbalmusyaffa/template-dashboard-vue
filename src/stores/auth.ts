import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { User } from '../types';

interface AuthSession {
  user: User;
  token: string;
  expiresAt: number;
}

const STORAGE_KEY = 'attendance_auth';

export const useAuthStore = defineStore('auth', () => {
  const session = ref<AuthSession | null>(null);
  const isLoading = ref<boolean>(false);
  const authError = ref<string | null>(null);

  // Restore stored session
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed: AuthSession = JSON.parse(raw);
      // Valid if not expired
      if (parsed.expiresAt > Date.now()) {
        session.value = parsed;
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  } catch {
    localStorage.removeItem(STORAGE_KEY);
  }

  const isAuthenticated = computed(() => {
    return !!session.value && session.value.expiresAt > Date.now();
  });

  const currentUser = computed<User | null>(() => {
    return session.value?.user ?? null;
  });

  async function login(email: string, pass: string, rememberMe = true): Promise<boolean> {
    isLoading.value = true;
    authError.value = null;

    // Simulate realistic asynchronous network auth check
    await new Promise(res => setTimeout(res, 600));

    const cleanEmail = email.trim().toLowerCase();

    // Check default demo credentials or general allowed demo
    if (cleanEmail === 'admin@example.com' && pass === 'Admin123!') {
      const adminUser: User = {
        id: 'usr-admin-01',
        name: 'Alex Henderson',
        email: 'admin@example.com',
        role: 'Administrator',
        department: 'Engineering',
        status: 'Active',
        lastActive: 'Just now',
        createdAt: '2024-01-15',
        phone: '+1 (555) 019-2834',
        location: 'San Francisco, CA',
        bio: 'Enterprise workspace root administrator and platform architect.',
        mfaEnabled: true
      };

      const duration = rememberMe ? 14 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000;
      const newSession: AuthSession = {
        user: adminUser,
        token: `nexus_tok_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
        expiresAt: Date.now() + duration
      };

      session.value = newSession;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newSession));
      isLoading.value = false;
      return true;
    }

    // Check if user was registered in local storage demo users
    const registeredUsersJson = localStorage.getItem('nexus_registered_users');
    if (registeredUsersJson) {
      try {
        const registeredUsers: Array<{ email: string; pass: string; user: User }> = JSON.parse(registeredUsersJson);
        const match = registeredUsers.find(u => u.email.toLowerCase() === cleanEmail && u.pass === pass);
        if (match) {
          const duration = rememberMe ? 14 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000;
          const newSession: AuthSession = {
            user: match.user,
            token: `nexus_tok_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
            expiresAt: Date.now() + duration
          };
          session.value = newSession;
          localStorage.setItem(STORAGE_KEY, JSON.stringify(newSession));
          isLoading.value = false;
          return true;
        }
      } catch {
        // ignore parse error
      }
    }

    isLoading.value = false;
    authError.value = 'Invalid email address or password. Try demo credentials.';
    return false;
  }

  async function register(
    fullName: string,
    email: string,
    pass: string,
    company?: string,
    roleTitle?: string
  ): Promise<boolean> {
    isLoading.value = true;
    authError.value = null;

    await new Promise(res => setTimeout(res, 750));

    const cleanEmail = email.trim().toLowerCase();

    // Check existing
    let registeredUsers: Array<{ email: string; pass: string; user: User }> = [];
    try {
      const raw = localStorage.getItem('nexus_registered_users');
      if (raw) registeredUsers = JSON.parse(raw);
    } catch {
      registeredUsers = [];
    }

    if (registeredUsers.some(u => u.email.toLowerCase() === cleanEmail) || cleanEmail === 'admin@example.com') {
      isLoading.value = false;
      authError.value = 'An account with this email address already exists.';
      return false;
    }

    const newUser: User = {
      id: `usr-${Date.now().toString().slice(-4)}`,
      name: fullName.trim(),
      email: cleanEmail,
      role: (roleTitle as any) || 'Engineering Lead',
      department: 'Engineering',
      status: 'Active',
      lastActive: 'Just now',
      createdAt: new Date().toISOString().split('T')[0],
      location: company ? `${company}` : 'Global HQ',
      bio: `Registered member on ${company || 'Nexus Workspace'}.`,
      mfaEnabled: false
    };

    registeredUsers.push({ email: cleanEmail, pass, user: newUser });
    localStorage.setItem('nexus_registered_users', JSON.stringify(registeredUsers));

    // Auto-login newly registered user
    const newSession: AuthSession = {
      user: newUser,
      token: `nexus_tok_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000
    };

    session.value = newSession;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newSession));

    isLoading.value = false;
    return true;
  }

  function logout() {
    session.value = null;
    localStorage.removeItem(STORAGE_KEY);
  }

  return {
    session,
    isAuthenticated,
    currentUser,
    isLoading,
    authError,
    login,
    register,
    logout
  };
});
