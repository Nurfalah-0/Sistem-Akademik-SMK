<template>
  <div class="w-full">
    <label v-if="label" :for="id" class="block text-sm font-medium text-gray-700 mb-2">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>
    <input
      :id="id"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :class="[
        'w-full px-3 py-2 border rounded-lg',
        'focus:outline-none focus:ring-2 focus:ring-blue-500',
        {
          'border-red-500 focus:ring-red-500': error,
          'border-gray-300': !error,
          'bg-gray-50 cursor-not-allowed': disabled
        }
      ]"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
    <p v-if="error" class="mt-1 text-sm text-red-500">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue: string | number
  type?: string
  label?: string
  placeholder?: string
  error?: string
  required?: boolean
  disabled?: boolean
  id?: string
}

withDefaults(defineProps<Props>(), {
  type: 'text',
  id: 'input-field'
})

defineEmits<{
  'update:modelValue': [value: string | number]
}>()
</script>
