<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="isOpen"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      >
        <div class="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 max-h-[80vh] overflow-y-auto">
          <!-- Header -->
          <div class="flex justify-between items-center p-6 border-b border-gray-100">
            <h2 class="text-lg font-semibold text-gray-900">{{ title }}</h2>
            <button
              class="text-gray-400 hover:text-gray-600 transition-colors"
              @click="emit('close')"
            >
              ✕
            </button>
          </div>

          <!-- Content -->
          <div class="p-6">
            <slot />
          </div>

          <!-- Footer -->
          <div class="flex justify-end gap-3 p-6 border-t border-gray-100 bg-gray-50 rounded-b-xl">
            <Button variant="secondary" size="sm" @click="emit('close')">
              Batal
            </Button>
            <Button variant="primary" size="sm" @click="emit('confirm')">
              {{ confirmText }}
            </Button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import Button from './Button.vue'

interface Props {
  isOpen: boolean
  title?: string
  confirmText?: string
}

withDefaults(defineProps<Props>(), {
  title: 'Confirm',
  confirmText: 'Confirm'
})

const emit = defineEmits<{
  close: []
  confirm: []
}>()
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-to,
.modal-leave-from {
  opacity: 1;
}
</style>
