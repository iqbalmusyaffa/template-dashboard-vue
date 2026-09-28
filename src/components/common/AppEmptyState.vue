<script setup lang="ts">
import { Inbox } from 'lucide-vue-next';

interface Props {
  title?: string;
  description?: string;
}

withDefaults(defineProps<Props>(), {
  title: 'No data found',
  description: 'Try adjusting your filters or search terms.'
});
</script>

<template>
  <div class="flex flex-col items-center justify-center p-8 text-center rounded-lg border border-dashed border-light-border dark:border-dark-border bg-light-surface/50 dark:bg-dark-surface/50">
    <div class="w-10 h-10 rounded-full bg-light-elevated dark:bg-dark-elevated flex items-center justify-center text-light-text-secondary dark:text-dark-text-secondary mb-3">
      <slot name="icon">
        <Inbox class="w-5 h-5" />
      </slot>
    </div>

    <h4 class="text-sm font-semibold text-light-text-primary dark:text-dark-text-primary">
      {{ title }}
    </h4>
    <p class="text-xs text-light-text-muted dark:text-dark-text-muted max-w-sm mt-1 leading-relaxed">
      {{ description }}
    </p>

    <div v-if="$slots.action" class="mt-4">
      <slot name="action" />
    </div>
  </div>
</template>
