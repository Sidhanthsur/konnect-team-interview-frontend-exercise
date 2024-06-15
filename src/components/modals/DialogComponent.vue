<script setup lang="ts">
defineProps<{ title: string }>()
defineEmits<{
  onClose: [];
}>()
</script>
<template>
  <div class="dialog">
    <div class="dialog__content">
      <div class="dialog__header">
        <h4>{{ title }}</h4>
        <button
          class="dialog__close"
          @click="$emit('onClose')"
        >
          X
        </button>
      </div>
      <slot />
    </div>
  </div>
</template>

<style scoped>
.dialog {
  align-items: center;
  background-color: rgba(0, 0, 0, 0.1);
  cursor: auto;
  display: flex;
  height: 100%;
  justify-content: center;
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
}

.dialog__content {
  background: white;
  border-radius: 1.2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  min-width: 24rem;
  padding: 2rem;
  padding-top: 0;
  position: relative;

  @media (max-width: 768px) {
    border-radius: 0;
    height: 60%;
    width: 100%;
  }
}

.dialog__header {
  align-items: center;
  display: flex;
  justify-content: space-between;
}

.dialog__close {
  background: none;
  border: none;
  color: rgba(0, 0, 0, 0.5);
  cursor: pointer;
  font-size: 1.6rem;
  padding: 0.4rem;
}
</style>
