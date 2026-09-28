<script setup lang="ts">
interface SelectOption {
  label: string;
  value: string;
}

interface Props {
  modelValue?: string;
  label?: string;
  id?: string;
  options: (SelectOption | string)[];
  placeholder?: string;
  error?: string | null;
  disabled?: boolean;
  required?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  label: '',
  placeholder: 'Select an option',
  error: null,
  disabled: false,
  required: false
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const selectId = props.id || `select-${Math.random().toString(36).substring(2, 9)}`;

function normalizeOption(opt: SelectOption | string): SelectOption {
  if (typeof opt === 'string') {
    return { label: opt, value: opt };
  }
  return opt;
}
</script>

<template>
  <div class="w-full flex flex-col gap-1.5 text-left">
    <div v-if="props.label" class="flex items-center justify-between">
      <label
        :for="selectId"
        class="text-xs font-semibold tracking-wide text-light-text-primary dark:text-dark-text-primary uppercase"
      >
        {{ props.label }}
        <span v-if="props.required" class="text-rose-500 ml-0.5">*</span>
      </label>
    </div>

    <div class="relative">
      <select
        :id="selectId"
        :value="props.modelValue"
        :disabled="props.disabled"
        :required="props.required"
        class="w-full h-9 pl-3 pr-8 rounded-md border text-sm transition-all duration-150 outline-none appearance-none cursor-pointer
               bg-light-surface text-light-text-primary
               dark:bg-dark-elevated dark:text-dark-text-primary
               disabled:opacity-50 disabled:cursor-not-allowed"
        :class="[
          props.error
            ? 'border-rose-500 focus:border-rose-500 focus:ring-1 focus:ring-rose-500'
            : 'border-light-border dark:border-dark-border focus:border-brand-500 focus:ring-1 focus:ring-brand-500'
        ]"
        @change="(e) => emit('update:modelValue', (e.target as HTMLSelectElement).value)"
      >
        <option v-if="props.placeholder" value="" disabled :selected="!props.modelValue">
          {{ props.placeholder }}
        </option>
        <option
          v-for="opt in props.options"
          :key="normalizeOption(opt).value"
          :value="normalizeOption(opt).value"
          class="bg-light-surface text-light-text-primary dark:bg-dark-surface dark:text-dark-text-primary"
        >
          {{ normalizeOption(opt).label }}
        </option>
      </select>

      <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-light-text-secondary dark:text-dark-text-secondary">
        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>

    <p v-if="props.error" class="text-xs text-rose-500 font-medium">
      {{ props.error }}
    </p>
  </div>
</template>
