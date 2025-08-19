<template>
  <header class="game-header">
    <!-- <h1 class="game-header-title">🌌 Quarks Idle</h1>
    <p class="game-header-description">От кварков до вселенных - эпическое путешествие через масштабы материи</p> -->

    <div class="store-display">
      <div class="energy-display">
        <div class="energy-text">⚡ {{ $t('energy') }}:</div>
        <div class="energy-count">
          {{ formatNumber(store.energy) }}
        </div>
      </div>

      <!-- Слайдер баланса массы -->
      <div class="balance-slider-container">
        <div class="balance-label">
          {{ $t('matter') }}: {{ formatNumber(store.matter) }} / {{ $t('antimatter') }}:
          {{ formatNumber(store.antimatter) }}
        </div>
        <div class="balance-slider">
          <div class="slider-track"></div>
          <!-- Левая риска -->
          <div
            class="slider-marker"
            :style="{ left: leftLimit + '%' }"
          ></div>
          <!-- Правая риска -->
          <div
            class="slider-marker"
            :style="{ left: rightLimit + '%' }"
          ></div>
          <!-- Бегунок -->
          <div
            class="slider-thumb"
            :style="{ left: matterRatio * 100 + '%' }"
          ></div>
        </div>
        <div
          class="balance-hint"
          :class="{ warning: !isBalanced }"
        >
          Баланс массы: разница не должна превышать {{ balanceMass }}!
          <br />
          Текущее отклонение: {{ formatNumber(balanceDiff) }}
        </div>
      </div>
      <!-- ...existing code... -->
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue';
import { Decimal, formatNumber } from '../utils/formatNumber.js';
import { useGameStore } from '../stores/gameStore.js';

const store = useGameStore();

const balanceMass = new Decimal(1);

const matterValue = computed(() => store.matter);
const antimatterValue = computed(() => store.antimatter);

const total = computed(() => matterValue.value.plus(antimatterValue.value));

const matterRatio = computed(() => (total.value.gt(0) ? matterValue.value.div(total.value).toNumber() : 0.5));

const balanceDiff = computed(() => matterValue.value.minus(antimatterValue.value).abs());
const isBalanced = computed(() => balanceDiff.value.lte(balanceMass));

const leftLimit = computed(() =>
  total.value.gt(0)
    ? new Decimal(total.value.div(2).minus(balanceMass).max(0).div(total.value).times(100)).toNumber()
    : 0,
);
const rightLimit = computed(() =>
  total.value.gt(0)
    ? new Decimal(Decimal.min(total.value, total.value.div(2).plus(balanceMass)).div(total.value).times(100)).toNumber()
    : 100,
);
</script>

<style scoped>
.game-header {
  text-align: center;
  padding: 30px 20px;
  background: linear-gradient(135deg, rgba(15, 15, 35, 0.9), rgba(26, 26, 46, 0.9));
  border-bottom: 2px solid #2d2d42;
}

.game-header-title {
  margin: 0;
  font-size: 3em;
  font-weight: 700;
  background: linear-gradient(135deg, #6366f1, #8b5cf6, #ec4899);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 30px rgba(99, 102, 241, 0.5);
}

.game-header-description {
  margin: 15px 0 0 0;
  font-size: 1.1em;
  opacity: 0.8;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.store-display {
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #e0e0e0;
  font-size: 1.2em;
  font-weight: 600;
  text-align: center;
  background: linear-gradient(135deg, #fbbf24, #f59e0b);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.energy-display {
  display: grid;
  grid-template-columns: 50% 50%;
  font-size: 1.2em;
  font-weight: 600;
}

.energy-text {
  text-align: right;
  padding: 0 10px;
}

.energy-count {
  text-align: left;
  padding: 0 10px;
}

.prestige-bonus {
  text-align: left;
}

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
  background: linear-gradient(90deg, #6366f1 0%, #34d399 50%, #ef4444 100%);
  border-radius: 4px;
  transform: translateY(-50%);
  z-index: 1;
}

.slider-range {
  position: absolute;
  top: 50%;
  left: 45%;
  width: 10%;
  height: 8px;
  background: rgba(52, 211, 153, 0.3);
  border-radius: 4px;
  transform: translateY(-50%);
  z-index: 2;
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
