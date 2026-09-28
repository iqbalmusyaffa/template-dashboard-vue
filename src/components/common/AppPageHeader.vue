<script setup lang="ts">
interface BreadcrumbItem {
  label: string;
  to?: string;
}

interface Props {
  title: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
}

withDefaults(defineProps<Props>(), {
  description: '',
  breadcrumbs: () => []
});
</script>

<template>
  <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 mb-6 border-b border-light-border dark:border-dark-border">
    <div>
      <nav v-if="breadcrumbs.length > 0" class="flex items-center gap-1.5 text-xs text-light-text-muted dark:text-dark-text-muted mb-1.5">
        <template v-for="(crumb, idx) in breadcrumbs" :key="crumb.label">
          <RouterLink
            v-if="crumb.to"
            :to="crumb.to"
            class="hover:text-light-text-primary dark:hover:text-dark-text-primary transition-colors"
          >
            {{ crumb.label }}
          </RouterLink>
          <span v-else class="text-light-text-secondary dark:text-dark-text-secondary font-medium">
            {{ crumb.label }}
          </span>
          <span v-if="idx < breadcrumbs.length - 1" class="text-slate-400">/</span>
        </template>
      </nav>

      <h1 class="text-xl sm:text-2xl font-bold tracking-tight text-light-text-primary dark:text-dark-text-primary">
        {{ title }}
      </h1>
      <p v-if="description" class="text-xs sm:text-sm text-light-text-muted dark:text-dark-text-muted mt-1">
        {{ description }}
      </p>
    </div>

    <div v-if="$slots.actions" class="flex items-center flex-wrap gap-2.5">
      <slot name="actions" />
    </div>
  </div>
</template>
