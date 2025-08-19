<template>
  <div class="balance-slider-container">
    <div class="balance-label">
      {{ $t('matter') }}: {{ formatNumber(matter) }} / {{ $t('antimatter') }}: {{ formatNumber(antimatter) }}
    </div>
    <div class="balance-slider">
      <div class="slider-track"></div>
      <div
        class="slider-marker"
        :style="{ left: limit + '%' }"
      ></div>
      <div
        class="slider-marker"
        :style="{ right: limit + '%' }"
      ></div>
      <div
        class="slider-thumb"
        :style="{ left: matterRatio * 100 + '%' }"
      ></div>
    </div>
    <div
      class="balance-hint"
      :class="{ warning: !isBalanced }"
    >
      Баланс массы: разница не должна превышать {{ formatNumber(balanceMass) }}!<br />
      Текущее отклонение: {{ formatNumber(balanceDiff) }}
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { formatNumber } from '../utils/formatNumber.js';
import { useGameStore } from '../stores/gameStore.js';

const store = useGameStore();

const matter = computed(() => store.matter);
const antimatter = computed(() => store.antimatter);
const balanceMass = computed(() => store.balanceMass);

const total = computed(() => matter.value.plus(antimatter.value));
const matterRatio = computed(() => (total.value.gt(0) ? matter.value.div(total.value).toNumber() : 0.5));
const balanceDiff = computed(() => matter.value.minus(antimatter.value).abs());
const isBalanced = computed(() => balanceDiff.value.lte(balanceMass.value));

// Границы баланса ±balanceMass от центра
const limit = computed(() => {
  if (total.value.eq(0)) return 0;

  const center = total.value.div(2);
  const left = center.minus(balanceMass.value).max(0);

  return left.div(total.value).times(100).toNumber();
});
</script>

<style scoped>
/* Скопируйте стили balance-slider-container, balance-label, balance-slider, slider-track, slider-marker, slider-thumb, balance-hint из GameHeader.vue */
.balance-slider-container {
  margin-top: 18px;
  text-align: center;
}
.balance-label {
  font-size: 1em;
  margin-bottom: 4px;
  color: #fbbf24;
  font-weight: 500;
}
.balance-slider {
  position: relative;
  height: 28px;
  max-width: 340px;
  margin: 0 auto 4px auto;
}
.slider-track {
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: 8px;
  background: linear-gradient(90deg, #1d3a59 0%, #1d3a59 30%, #34d399 50%, #34193b 70%, #34193b 100%);
  border-radius: 4px;
  transform: translateY(-50%);
  z-index: 1;
}
.slider-marker {
  position: absolute;
  top: 0;
  width: 2px;
  height: 100%;
  background: #fbbf24;
  opacity: 0.8;
  z-index: 3;
}
.slider-thumb {
  position: absolute;
  top: 50%;
  width: 18px;
  height: 18px;
  background: #fff;
  border: 3px solid #6366f1;
  border-radius: 50%;
  box-shadow: 0 0 8px #6366f1;
  transform: translate(-50%, -50%);
  z-index: 4;
  transition: border-color 0.3s;
}
.balance-hint {
  font-size: 0.95em;
  color: #34d399;
  margin-top: 2px;
  transition: color 0.3s;
}
.balance-hint.warning {
  color: #ef4444;
  font-weight: 600;
}
</style>
