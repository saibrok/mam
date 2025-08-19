<template>
  <div class="balance-slider-container">
    <div class="balance-label">
      <div class="matter-value">
        {{ $t('matter') }}<br />
        {{ formatNumber(matter) }}
      </div>
      <div class="matter-value antimatter-value">
        {{ $t('antimatter') }}<br />
        {{ formatNumber(antimatter) }}
      </div>
    </div>
    <div class="balance-slider">
      <div class="slider-track"></div>
      <div
        class="slider-marker left-marker"
        :style="{ left: '-8px', right: `calc( 100% - ${limit}%)` }"
      ></div>
      <div
        class="slider-marker right-marker"
        :style="{ right: '-8px', left: `calc( 100% - ${limit}%)` }"
      ></div>
      <div
        class="slider-thumb"
        :style="{ left: matterRatio * 100 + '%' }"
      >
        <div class="slider-thumb-current">{{ formatNumber(balanceDiff) }}</div>
      </div>
    </div>
    <div
      class="balance-hint"
      :class="{ warning: !isBalanced }"
    >
      Баланс массы: <br />{{ balanceMass }}
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

const limit = computed(() => {
  if (total.value.eq(0)) return 0;
  const center = 0.5;
  const maxDeviation = balanceMass.value.div(total.value).toNumber();

  return Math.max(0, Math.min(100, (center - maxDeviation / 2) * 100));
});
</script>

<style scoped>
.balance-slider-container {
  margin-top: 18px;
  text-align: center;
}

.balance-label {
  display: flex;
  justify-content: space-around;
  margin-bottom: 4px;
  color: #fbbf24;
  font-weight: 500;
  margin-bottom: 18px;
}

.matter-value {
  color: #34d399;
  padding: 6px 12px;
  border-radius: 8px;
  background: rgba(52, 211, 153, 0.1);
  min-width: 200px;
}

.antimatter-value {
  color: #a78bfa;
  padding: 6px 12px;
  border-radius: 8px;
  background: rgba(167, 139, 250, 0.1);
}

.balance-slider {
  position: relative;
  height: 18px;
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
  height: 100%;
  opacity: 0.8;
  z-index: 3;
  transition-duration: 0.3s;
  transition-property: left, right;
}

.slider-marker.left-marker {
  border-bottom-left-radius: 8px;
  border-top-left-radius: 8px;
  background: linear-gradient(90deg, transparent 0%, transparent 50%, #fb3d24 100%);
}

.slider-marker.right-marker {
  background: linear-gradient(90deg, #fb3d24 0%, transparent 50%, transparent 100%);
  border-bottom-right-radius: 8px;
  border-top-right-radius: 8px;
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

.slider-thumb-current {
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 0.8em;
  color: white;
  -webkit-text-fill-color: initial;
  font-weight: bold;
  border-radius: 4px;
  background: #0009;
  padding: 2px 4px;
  z-index: 5;

  &::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid #0009;
  }
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
