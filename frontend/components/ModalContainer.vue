<template>
  <div class="modal-container">
    <div class="overlay" @click="onClose"></div>
    <div class="modal-inner">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    onClose: Function,
  },
}
</script>

<style scoped>
.modal-container {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 50;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-container .overlay {
  background: rgba(0, 0, 0, 0.7);
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}

.modal-container .modal-inner {
  padding: 2rem;
  background-color: var(--theme-color-2);
  max-width: 600px;
  width: 100%;
  border-radius: 5px;
  z-index: 1;
  overflow: auto;
}
</style>
