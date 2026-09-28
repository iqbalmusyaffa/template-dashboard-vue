<script setup lang="ts">
interface Props {
  title?: string;
  subtitle?: string;
  noPadding?: boolean;
}

defineProps<Props>();
</script>

<template>
  <div class="rounded-lg border border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface shadow-card transition-colors duration-150">
    <div
      v-if="$slots.header || title"
      class="px-5 py-4 border-b border-light-border dark:border-dark-border flex items-center justify-between gap-4"
    >
      <div>
        <slot name="header">
          <h3 v-if="title" class="text-sm font-semibold text-light-text-primary dark:text-dark-text-primary">
            {{ title }}
          </h3>
          <p v-if="subtitle" class="text-xs text-light-text-muted dark:text-dark-text-muted mt-0.5">
            {{ subtitle }}
          </p>
        </slot>
      </div>
      <div v-if="$slots.action" class="flex items-center gap-2">
        <slot name="action" />
      </div>
    </div>

    <div :class="noPadding ? '' : 'p-5'">
      <slot />
    </div>

    <div
      v-if="$slots.footer"
      class="px-5 py-3 border-t border-light-border dark:border-dark-border bg-light-elevated/40 dark:bg-dark-elevated/40 rounded-b-lg"
    >
      <slot name="footer" />
    </div>
  </div>
</template>
