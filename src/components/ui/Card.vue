<template>
  <div :class="['rounded-lg shadow-md p-6 bg-white', classOverride]">
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
