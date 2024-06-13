<!-- Create a re usable modal component that has slots for the content -->
<template>
  <div class="dialog">
    <div class="dialog__content">
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
}

.dialog__content {
  position: relative;
  background: white;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  min-width: 24rem;
}
</style>
