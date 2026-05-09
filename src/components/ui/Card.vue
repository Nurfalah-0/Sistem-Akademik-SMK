<template>
  <div :class="['rounded-lg p-6 bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow', classOverride]">
    <slot />
  </div>
</template>

<script setup lang="ts">
interface Props {
  classOverride?: string
}

withDefaults(defineProps<Props>(), {
  classOverride: ''
})
</script>
