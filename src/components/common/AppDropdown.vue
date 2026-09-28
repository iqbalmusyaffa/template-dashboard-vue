<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

interface Props {
  align?: 'left' | 'right';
  widthClass?: string;
}

const props = withDefaults(defineProps<Props>(), {
  align: 'right',
  widthClass: 'w-48'
});

const isOpen = ref(false);
const dropdownRef = ref<HTMLElement | null>(null);

function toggle() {
  isOpen.value = !isOpen.value;
}

function close() {
  isOpen.value = false;
}

function handleClickOutside(event: MouseEvent) {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    close();
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});

defineExpose({ close, toggle, isOpen });
</script>

<template>
  <div ref="dropdownRef" class="relative inline-block text-left">
    <div @click="toggle">
      <slot name="trigger" :is-open="isOpen" />
    </div>

    <Transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <div
        v-if="isOpen"
        class="absolute z-40 mt-1.5 rounded-lg border border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface shadow-popover py-1 focus:outline-none transition-colors"
        :class="[
          props.widthClass,
          props.align === 'right' ? 'right-0' : 'left-0'
        ]"
        @click="close"
      >
        <slot />
      </div>
    </Transition>
  </div>
</template>
