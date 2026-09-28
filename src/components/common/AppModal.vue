<script setup lang="ts">
import { watch, onMounted, onUnmounted } from 'vue';
import { X } from 'lucide-vue-next';

interface Props {
  modelValue: boolean;
  title?: string;
  description?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  description: '',
  size: 'md'
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
  (e: 'close'): void;
}>();

function close() {
  emit('update:modelValue', false);
  emit('close');
}

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && props.modelValue) {
    close();
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown);
});

watch(() => props.modelValue, (isOpen) => {
  if (typeof document !== 'undefined') {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }
});
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-150 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-100 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="props.modelValue"
        class="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
        @click.self="close"
      >
        <div
          class="relative w-full rounded-lg border border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface shadow-modal transition-all duration-150 flex flex-col max-h-[90vh]"
          :class="[
            props.size === 'sm' ? 'max-w-md' : '',
            props.size === 'md' ? 'max-w-lg' : '',
            props.size === 'lg' ? 'max-w-2xl' : '',
            props.size === 'xl' ? 'max-w-4xl' : ''
          ]"
        >
          <!-- Header -->
          <div class="px-6 py-4 border-b border-light-border dark:border-dark-border flex items-start justify-between gap-4">
            <div>
              <h3 v-if="props.title" class="text-base font-semibold text-light-text-primary dark:text-dark-text-primary">
                {{ props.title }}
              </h3>
              <p v-if="props.description" class="text-xs text-light-text-muted dark:text-dark-text-muted mt-1">
                {{ props.description }}
              </p>
            </div>
            <button
              type="button"
              class="rounded-md p-1 text-light-text-secondary hover:text-light-text-primary dark:text-dark-text-secondary dark:hover:text-dark-text-primary hover:bg-light-elevated dark:hover:bg-dark-elevated transition-colors"
              @click="close"
            >
              <X class="w-4 h-4" />
            </button>
          </div>

          <!-- Body -->
          <div class="px-6 py-5 overflow-y-auto flex-1">
            <slot />
          </div>

          <!-- Footer -->
          <div
            v-if="$slots.footer"
            class="px-6 py-3 border-t border-light-border dark:border-dark-border bg-light-elevated/40 dark:bg-dark-elevated/40 rounded-b-lg flex items-center justify-end gap-3"
          >
            <slot name="footer" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
