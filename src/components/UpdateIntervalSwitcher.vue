<template>
  <select
    class="update-interval"
    :value="modelValue"
    @input="$emit('update:modelValue', Number($event.target.value))"
  >
    <option
      v-for="interval in INTERVALS"
      :value="interval.value"
      :key="interval.value"
    >
      {{ interval.value }}мс {{ interval.name }}
    </option>
  </select>
</template>

<script setup>
defineProps({
  modelValue: Number,
});

const INTERVALS = [
  { value: 16, name: '≈ 60 FPS' },
  { value: 33, name: '≈ 30 FPS' },
  { value: 100, name: '≈ 10 FPS' },
  { value: 250, name: '≈ 4 FPS' },
  { value: 500, name: '≈ 2 FPS' },
  { value: 1000, name: '≈ 1 FPS' },
];
</script>

<style scoped>
.update-interval {
  min-width: 200px;
  font-size: 16px;
  padding: 8px 12px;
  border-radius: 4px;
  border: 1px solid #3d3d5c;
  background: #2d2d42;
  color: #e0e0e0;
}
</style>