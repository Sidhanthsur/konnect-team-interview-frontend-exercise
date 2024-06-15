<script setup lang="ts">
import Dialog from '@/components/modals/DialogComponent.vue'
defineEmits(['onClose'])
</script>

<template>
  <Dialog
    title="Create a new service"
    @on-close="$emit('onClose')"
  >
    <div class="create-service-modal">
      <label
        class="create-service-modal__label"
        for="name"
      >
        Name
      </label>
      <input
        id="name"
        type="text"
      >

      <label
        class="create-service-modal__label"
        for="description"
      >
        Description
      </label>
      <textarea id="description" />

      <button
        class="create-service-modal__button"
        @click="$emit('onClose')"
      >
        Create
      </button>
      <button
        class="create-service-modal__button"
        @click="$emit('onClose')"
      >
        Cancel
      </button>
    </div>
  </Dialog>
</template>
<style scoped>
.create-service-modal {
  display: flex;
  flex-direction: column;
}

.create-service-modal__button {
  background: #07a88d;
  border: none;
  border-radius: 0.4rem;
  color: white;
  margin-top: 0.8rem;
  padding: 0.8rem;
}
.create-service-modal__label {
  margin-top: 1.6rem;
}
</style>
