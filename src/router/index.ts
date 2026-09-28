import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/dashboard'
    },
    {
      path: '/auth',
      component: () => import('../layouts/AuthLayout.vue'),
      children: [
        {
          path: '/login',
          name: 'login',
          component: () => import('../views/auth/LoginView.vue'),
          meta: { guestOnly: true, title: 'Sign In' }
        },
        {
          path: '/register',
          name: 'register',
          component: () => import('../views/auth/RegisterView.vue'),
          meta: { guestOnly: true, title: 'Create Account' }
        }
      ]
    },
    {
      path: '/dashboard',
      component: () => import('../layouts/DashboardLayout.vue'),
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          redirect: '/dashboard/overview'
        },
        {
          path: 'overview',
          name: 'dashboard-overview',
          component: () => import('../views/dashboard/DashboardView.vue'),
          meta: { title: 'Workspace Overview' }
        },
        {
          path: 'users',
          name: 'dashboard-users',
          component: () => import('../views/dashboard/UsersView.vue'),
          meta: { title: 'Users Directory' }
        },
        {
          path: 'teams',
          name: 'dashboard-teams',
          component: () => import('../views/dashboard/TeamsView.vue'),
          meta: { title: 'Teams & Org' }
        },
        {
          path: 'reports',
          name: 'dashboard-reports',
          component: () => import('../views/dashboard/ReportsView.vue'),
          meta: { title: 'Analytics & Reports' }
        },
        {
          path: 'activity',
          name: 'dashboard-activity',
          component: () => import('../views/dashboard/ActivityView.vue'),
          meta: { title: 'System Activity' }
        },
        {
          path: 'settings',
          name: 'dashboard-settings',
          component: () => import('../views/dashboard/SettingsView.vue'),
          meta: { title: 'Workspace Settings' }
        }
      ]
    },
    // Catch-all
    {
      path: '/:pathMatch(.*)*',
      redirect: '/dashboard'
    }
  ],
  scrollBehavior() {
    return { top: 0 };
  }
});

router.beforeEach((to) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return { name: 'login', query: { redirect: to.fullPath } };
  }
  if (to.meta.guestOnly && authStore.isAuthenticated) {
    return { path: '/dashboard' };
  }
});

router.afterEach((to) => {
  const pageTitle = to.meta?.title as string | undefined;
  document.title = pageTitle ? `${pageTitle} — NexusAdmin` : 'Nexus — Modern Enterprise Dashboard';
});

export default router;
