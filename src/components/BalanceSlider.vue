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
        :style="{ left: '-8px', right: `calc(100% - ${limit}%)` }"
      ></div>
      <div
        class="slider-marker right-marker"
        :style="{ right: '-8px', left: `calc(100% - ${limit}%)` }"
      ></div>
      <div
        class="slider-thumb"
        :style="{ left: matterRatio * 100 + '%' }"
      >
        <div class="slider-thumb-current">{{ formatNumber(balanceDiff) }}</div>
      </div>
    </div>
    <div
      v-if="showTimer"
      class="timer-container"
    >
      <div class="siren-button left-siren">🚨</div>
      <div class="timer-slider">
        <div
          class="timer-progress"
          :style="{ width:(timerRemaining / timerDuration) * 100 + '%' }"
        ></div>
      </div>
      <div class="siren-button right-siren">🚨</div>
    </div>
    <div
      class="balance-hint"
      :class="{ warning: !isBalanced }"
    >
      Баланс массы: <br />
      {{ balanceMass }}
    </div>
    <BaseModal v-model="showModal">
      <div class="game-over">МЫ ПРОИГРАЛИ! ! ААА-АА-ААА-ААА-А!! !!! ! ! - {{ store.isGameOver }}</div>
    </BaseModal>
  </div>
</template>

<script setup>
import { computed, ref, watch, onUnmounted } from 'vue';
import { formatNumber } from '../utils/formatNumber.js';
import { useGameStore } from '../stores/gameStore.js';
import BaseModal from './BaseModal.vue';

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

// Таймер
const showTimer = ref(false);
const timerDuration = computed(() => store.timerDuration);
const timerRemaining = ref(timerDuration.value);
const showModal = ref(false);
let timerId = null;

watch(isBalanced, (newValue, oldValue) => {
  if (!newValue && oldValue) {
    // Баланс нарушен, запускаем таймер
    showTimer.value = true;
    timerRemaining.value = timerDuration.value; // Используем значение из store
    timerId = setInterval(() => {
      timerRemaining.value -= 0.1;
      if (timerRemaining.value <= 0) {
        clearInterval(timerId);
        showTimer.value = false;
        showModal.value = true; // Показываем модалку
        store.isGameOver = true; // Устанавливаем флаг окончания игры
      }
    }, 100);
  } else if (newValue && !oldValue) {
    // Баланс восстановлен
    clearInterval(timerId);
    showTimer.value = false;
  }
});

// Очистка таймера при уничтожении компонента
onUnmounted(() => {
  if (timerId) clearInterval(timerId);
});
</script>

<style scoped>
.balance-slider-container {
  -webkit-text-fill-color: initial;
  margin: 20px auto;
  padding: 16px;
  width: 100%;
  background: linear-gradient(180deg, rgba(30, 41, 59, 0.95), rgba(17, 24, 39, 0.95));
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  text-align: center;
}

.balance-label {
  display: flex;
  justify-content: space-around;
  margin-bottom: 18px;
  color: #fbbf24;
  font-weight: 500;
}

.matter-value {
  color: #34d399;
  padding: 6px 12px;
  border-radius: 8px;
  background: rgba(52, 211, 153, 0.1);
  min-width: 160px;
  font-size: 0.95em;
}

.antimatter-value {
  color: #a78bfa;
  background: rgba(167, 139, 250, 0.1);
}

.balance-slider {
  position: relative;
  height: 18px;
  max-width: 360px;
  margin: 0 auto 12px auto;
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
  font-weight: bold;
  border-radius: 4px;
  background: rgba(0, 0, 0, 0.6);
  padding: 2px 4px;
  z-index: 5;
}

.slider-thumb-current::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid rgba(0, 0, 0, 0.6);
}

.balance-hint {
  font-size: 0.95em;
  color: #34d399;
  margin-top: 8px;
  line-height: 1.5;
  transition: color 0.3s;
}

.balance-hint.warning {
  color: #ef4444;
  font-weight: 600;
}

.timer-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 8px auto;
}

.siren-button {
  font-size: 1.2em;
  animation: siren-flash 0.5s infinite alternate;
}

.timer-slider {
  flex: 1;
  height: 8px;
  background: rgba(239, 68, 68, 0.3);
  border-radius: 4px;
  overflow: hidden;
  margin: 0 8px;
  display: flex;
  justify-content: center;
}

.timer-progress {
  height: 100%;
  background: #ef4444;
  border-radius: 4px;
  transition: width 0.1s linear;
  animation: siren-glow 0.5s infinite alternate;
}

.game-over {
  font-size: 1.5em;
  font-weight: 700;
  color: #ef4444;
  text-align: center;
  animation: pulse 0.5s infinite alternate;
}

@keyframes siren-flash {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0.5;
  }
}

@keyframes siren-glow {
  0% {
    box-shadow: 0 0 8px rgba(239, 68, 68, 0.7);
  }
  100% {
    box-shadow: 0 0 12px rgba(239, 68, 68, 1);
  }
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0.95);
  }
}

/* Адаптивность */
@media (max-width: 480px) {
  .balance-slider-container {
    padding: 12px;
    max-width: 300px;
  }

  .balance-slider {
    max-width: 260px;
  }

  .matter-value {
    min-width: 120px;
    font-size: 0.9em;
  }

  .balance-hint {
    font-size: 0.9em;
  }

  .timer-container {
    max-width: 260px;
  }
}
</style>
