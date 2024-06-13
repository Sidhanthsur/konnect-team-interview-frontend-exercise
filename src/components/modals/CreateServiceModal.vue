<script setup lang="ts">
import { computed } from "vue";
import Dialog from "@/components/modals/Dialog.vue";
defineEmits(["onClose"]);
</script>

<template>
  <Dialog @onClose="$emit('onClose')" title="Create a new service">
    <div class="create-service-modal">
      <label class="create-service-modal__label" for="name">Name</label>
      <input type="text" id="name" />

      <label class="create-service-modal__label" for="description"
        >Description</label
      >
      <textarea id="description"></textarea>

      <button @click="$emit('onClose')" class="create-service-modal__button">
        Create
      </button>
      <button @click="$emit('onClose')" class="create-service-modal__button">
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
  padding: 0.8rem;
  color: white;
  border-radius: 0.4rem;
  margin-top: 0.8rem;
}
.create-service-modal__label {
  margin-top: 1.6rem;
}
</style>
