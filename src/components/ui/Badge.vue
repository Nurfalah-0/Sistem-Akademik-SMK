<template>
  <span
    :class="[
      'inline-block px-3 py-1 rounded-full text-sm font-medium',
      variantClasses
    ]"
  >
    <slot />
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  variant?: 'success' | 'warning' | 'danger' | 'info' | 'default'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default'
})

const variantClasses = computed(() => {
  const variants = {
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    danger: 'bg-red-100 text-red-800',
    info: 'bg-blue-100 text-blue-800',
    default: 'bg-gray-100 text-gray-800'
  }
  return variants[props.variant]
})
</script>
