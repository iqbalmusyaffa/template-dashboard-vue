<script setup lang="ts">
import { watch, onMounted, onUnmounted } from 'vue';
import { X } from 'lucide-vue-next';

interface Props {
  modelValue: boolean;
  title?: string;
  subtitle?: string;
  position?: 'left' | 'right';
  widthClass?: string;
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  subtitle: '',
  position: 'right',
  widthClass: 'max-w-md'
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
    <div
      v-if="props.modelValue"
      class="fixed inset-0 z-50 overflow-hidden"
    >
      <!-- Backdrop -->
      <Transition
        enter-active-class="transition-opacity duration-200 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity duration-150 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
        appear
      >
        <div
          class="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
          @click="close"
        />
      </Transition>

      <!-- Slide Panel -->
      <div
        class="fixed inset-y-0 flex max-w-full"
        :class="props.position === 'left' ? 'left-0 pr-10' : 'right-0 pl-10'"
      >
        <Transition
          enter-active-class="transform transition ease-out duration-200"
          :enter-from-class="props.position === 'left' ? '-translate-x-full' : 'translate-x-full'"
          enter-to-class="translate-x-0"
          leave-active-class="transform transition ease-in duration-150"
          leave-from-class="translate-x-0"
          :leave-to-class="props.position === 'left' ? '-translate-x-full' : 'translate-x-full'"
          appear
        >
          <div
            class="w-screen flex flex-col bg-light-surface dark:bg-dark-surface border-light-border dark:border-dark-border shadow-modal"
            :class="[
              props.widthClass,
              props.position === 'left' ? 'border-r' : 'border-l'
            ]"
          >
            <!-- Header -->
            <div class="px-6 py-4 border-b border-light-border dark:border-dark-border flex items-center justify-between gap-4">
              <div>
                <h3 v-if="props.title" class="text-sm font-semibold text-light-text-primary dark:text-dark-text-primary">
                  {{ props.title }}
                </h3>
                <p v-if="props.subtitle" class="text-xs text-light-text-muted dark:text-dark-text-muted mt-0.5">
                  {{ props.subtitle }}
                </p>
              </div>
              <button
                type="button"
                class="rounded-md p-1.5 text-light-text-secondary hover:text-light-text-primary dark:text-dark-text-secondary dark:hover:text-dark-text-primary hover:bg-light-elevated dark:hover:bg-dark-elevated transition-colors"
                @click="close"
              >
                <X class="w-4 h-4" />
              </button>
            </div>

            <!-- Body -->
            <div class="flex-1 overflow-y-auto p-6">
              <slot />
            </div>

            <!-- Footer -->
            <div
              v-if="$slots.footer"
              class="px-6 py-4 border-t border-light-border dark:border-dark-border bg-light-elevated/40 dark:bg-dark-elevated/40"
            >
              <slot name="footer" />
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </Teleport>
</template>
