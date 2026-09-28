<script setup lang="ts">
interface Props {
  modelValue?: string | number;
  label?: string;
  id?: string;
  type?: string;
  placeholder?: string;
  error?: string | null;
  hint?: string;
  disabled?: boolean;
  required?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  type: 'text',
  placeholder: '',
  error: null,
  hint: '',
  disabled: false,
  required: false
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'blur', event: FocusEvent): void;
  (e: 'focus', event: FocusEvent): void;
}>();

const inputId = props.id || `input-${Math.random().toString(36).substring(2, 9)}`;

function onInput(e: Event) {
  emit('update:modelValue', (e.target as HTMLInputElement).value);
}
</script>

<template>
  <div class="w-full flex flex-col gap-1.5 text-left">
    <div v-if="props.label" class="flex items-center justify-between">
      <label
        :for="inputId"
        class="text-xs font-semibold tracking-wide text-light-text-primary dark:text-dark-text-primary uppercase"
      >
        {{ props.label }}
        <span v-if="props.required" class="text-rose-500 ml-0.5">*</span>
      </label>
      <slot name="label-extra" />
    </div>

    <div class="relative flex items-center">
      <div v-if="$slots.prefix" class="absolute left-3 flex items-center pointer-events-none text-light-text-secondary dark:text-dark-text-secondary">
        <slot name="prefix" />
      </div>

      <input
        :id="inputId"
        :type="props.type"
        :value="props.modelValue"
        :placeholder="props.placeholder"
        :disabled="props.disabled"
        :required="props.required"
        class="w-full h-9 rounded-md border text-sm transition-all duration-150 outline-none
               bg-light-surface text-light-text-primary placeholder:text-light-text-muted
               dark:bg-dark-elevated dark:text-dark-text-primary dark:placeholder:text-dark-text-muted
               disabled:opacity-50 disabled:cursor-not-allowed"
        :class="[
          $slots.prefix ? 'pl-9' : 'pl-3',
          $slots.suffix ? 'pr-9' : 'pr-3',
          props.error
            ? 'border-rose-500 focus:border-rose-500 focus:ring-1 focus:ring-rose-500'
            : 'border-light-border dark:border-dark-border focus:border-brand-500 focus:ring-1 focus:ring-brand-500'
        ]"
        @input="onInput"
        @blur="(e) => emit('blur', e)"
        @focus="(e) => emit('focus', e)"
      />

      <div v-if="$slots.suffix" class="absolute right-3 flex items-center text-light-text-secondary dark:text-dark-text-secondary">
        <slot name="suffix" />
      </div>
    </div>

    <p v-if="props.error" class="text-xs text-rose-500 font-medium">
      {{ props.error }}
    </p>
    <p v-else-if="props.hint" class="text-xs text-light-text-muted dark:text-dark-text-muted">
      {{ props.hint }}
    </p>
  </div>
</template>
