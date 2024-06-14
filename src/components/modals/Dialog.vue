<script setup lang="ts">
defineProps<{ title: string }>();
defineEmits(["onClose"]);
</script>
<template>
  <div class="dialog">
    <div class="dialog__content">
      <div class="dialog__header">
        <h4>{{ title }}</h4>
        <button class="dialog__close" @click="$emit('onClose')">X</button>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.dialog {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.1);
  cursor: auto;
}

.dialog__content {
  position: relative;
  background: white;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  min-width: 24rem;
  border-radius: 1.2rem;
}

.dialog__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dialog__close {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.6rem;
  color: rgba(0, 0, 0, 0.5);
  padding: 0.4rem;
}
</style>
