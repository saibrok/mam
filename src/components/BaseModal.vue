<template>
  <div v-if="modelValue" class="modal-overlay" @click.self="$emit('update:modelValue', false)">
    <div class="modal-content">
      <slot />
    </div>
  </div>
</template>

<script setup>
defineProps({
  modelValue: Boolean
});
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(30, 30, 47, 0.7);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal-content {
  background: #23233a;
  border-radius: 16px;
  padding: 32px 24px;
  min-width: 320px;
  min-height: 120px;
  box-shadow: 0 4px 32px #0008;
}
</style>