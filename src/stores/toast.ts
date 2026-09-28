import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { ToastMessage } from '../types';

export const useToastStore = defineStore('toast', () => {
  const toasts = ref<ToastMessage[]>([]);

  function showToast(
    type: ToastMessage['type'],
    title: string,
    message?: string,
    duration = 4000
  ) {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const newToast: ToastMessage = { id, type, title, message, duration };
    toasts.value.push(newToast);

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
    return id;
  }

  function removeToast(id: string) {
    const idx = toasts.value.findIndex(t => t.id === id);
    if (idx !== -1) {
      toasts.value.splice(idx, 1);
    }
  }

  function success(title: string, message?: string) {
    return showToast('success', title, message);
  }

  function error(title: string, message?: string) {
    return showToast('error', title, message);
  }

  function info(title: string, message?: string) {
    return showToast('info', title, message);
  }

  function warning(title: string, message?: string) {
    return showToast('warning', title, message);
  }

  return {
    toasts,
    showToast,
    removeToast,
    success,
    error,
    info,
    warning
  };
});
