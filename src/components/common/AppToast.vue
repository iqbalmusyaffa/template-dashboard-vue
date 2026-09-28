<script setup lang="ts">
import { useToastStore } from '../../stores/toast';
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from 'lucide-vue-next';

const toastStore = useToastStore();
</script>

<template>
  <Teleport to="body">
    <div
      class="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none p-2"
    >
      <TransitionGroup
        enter-active-class="transform ease-out duration-200 transition"
        enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
        enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
        leave-active-class="transition ease-in duration-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-for="toast in toastStore.toasts"
          :key="toast.id"
          class="pointer-events-auto flex items-start gap-3 p-3.5 rounded-lg border shadow-modal bg-light-surface dark:bg-dark-surface transition-colors"
          :class="[
            toast.type === 'success' ? 'border-emerald-500/30 text-emerald-950 dark:text-emerald-50' : '',
            toast.type === 'error' ? 'border-rose-500/30 text-rose-950 dark:text-rose-50' : '',
            toast.type === 'warning' ? 'border-amber-500/30 text-amber-950 dark:text-amber-50' : '',
            toast.type === 'info' ? 'border-brand-500/30 text-slate-900 dark:text-slate-100' : ''
          ]"
        >
          <!-- Icon -->
          <div class="shrink-0 mt-0.5">
            <CheckCircle2 v-if="toast.type === 'success'" class="w-4 h-4 text-emerald-500" />
            <AlertCircle v-else-if="toast.type === 'error'" class="w-4 h-4 text-rose-500" />
            <AlertTriangle v-else-if="toast.type === 'warning'" class="w-4 h-4 text-amber-500" />
            <Info v-else class="w-4 h-4 text-brand-500" />
          </div>

          <!-- Content -->
          <div class="flex-1 text-left">
            <p class="text-xs font-semibold text-light-text-primary dark:text-dark-text-primary">
              {{ toast.title }}
            </p>
            <p v-if="toast.message" class="text-xs text-light-text-secondary dark:text-dark-text-secondary mt-0.5 leading-relaxed">
              {{ toast.message }}
            </p>
          </div>

          <!-- Close -->
          <button
            type="button"
            class="shrink-0 rounded p-1 text-light-text-secondary hover:text-light-text-primary dark:text-dark-text-secondary dark:hover:text-dark-text-primary"
            @click="toastStore.removeToast(toast.id)"
          >
            <X class="w-3.5 h-3.5" />
          </button>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>
