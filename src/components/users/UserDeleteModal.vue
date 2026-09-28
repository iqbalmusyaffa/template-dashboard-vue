<script setup lang="ts">
import { ref } from 'vue';
import type { User } from '../../types';
import AppModal from '../common/AppModal.vue';
import AppButton from '../common/AppButton.vue';
import { AlertTriangle } from 'lucide-vue-next';

interface Props {
  modelValue: boolean;
  user: User | null;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
  (e: 'confirm', user: User): void;
}>();

const isDeleting = ref(false);

async function handleConfirm() {
  if (!props.user) return;
  isDeleting.value = true;
  await new Promise(r => setTimeout(r, 400));
  emit('confirm', props.user);
  isDeleting.value = false;
  emit('update:modelValue', false);
}
</script>

<template>
  <AppModal
    :model-value="props.modelValue"
    size="sm"
    title="Delete User"
    @update:model-value="(val) => emit('update:modelValue', val)"
  >
    <div class="space-y-4 text-left">
      <div class="flex items-start gap-3.5">
        <div class="w-10 h-10 rounded-full bg-rose-100 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400 flex items-center justify-center shrink-0">
          <AlertTriangle class="w-5 h-5" />
        </div>
        <div class="space-y-1">
          <h4 class="text-sm font-semibold text-light-text-primary dark:text-dark-text-primary">
            Are you sure you want to delete {{ user?.name }}?
          </h4>
          <p class="text-xs text-light-text-secondary dark:text-dark-text-secondary leading-relaxed">
            This action cannot be undone. All workspace permissions, audit links, and team memberships will be permanently revoked.
          </p>
        </div>
      </div>

      <div v-if="user" class="p-3 rounded-md bg-light-elevated dark:bg-dark-elevated border border-light-border dark:border-dark-border text-xs space-y-1">
        <div class="flex justify-between">
          <span class="text-light-text-muted dark:text-dark-text-muted">Account:</span>
          <span class="font-mono text-light-text-primary dark:text-dark-text-primary">{{ user.email }}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-light-text-muted dark:text-dark-text-muted">Role:</span>
          <span class="font-medium text-light-text-primary dark:text-dark-text-primary">{{ user.role }}</span>
        </div>
      </div>
    </div>

    <template #footer>
      <AppButton
        variant="ghost"
        size="sm"
        @click="emit('update:modelValue', false)"
      >
        Cancel
      </AppButton>
      <AppButton
        variant="danger"
        size="sm"
        :loading="isDeleting"
        @click="handleConfirm"
      >
        Delete User
      </AppButton>
    </template>
  </AppModal>
</template>
