<template>
  <div class="current-category">
    {{ tree[currentCategory] }}

    <div class="category-header">
      <h2>{{ tree[currentCategory].icon }} {{ $t(`categories.${tree[currentCategory].id}`) }}</h2>
    </div>

    <!-- <div class="elements-grid">
      <div
        v-for="(element, index) in currentCategory.elements"
        :key="element.id"
        class="element-card"
        :class="{ locked: !element.unlocked }"
      >
        <div class="element-info">
          <div class="element-name">{{ $t(`elements.${element.id}`) }}</div>
          <div
            class="element-count"
            v-if="element.unlocked"
          >
            {{ formatNumber(element.count) }}
          </div>

          <div
            class="element-rate"
            v-if="element.unlocked"
          >
            +{{ formatNumber(getElementRate(element)) }}/сек
          </div>

          <div
            class="locked-text"
            v-else
          >
            Заблокировано
          </div>
        </div>

        <div
          class="element-actions"
          v-if="element.unlocked"
        >
          <button
            class="upgrade-button"
            @click="upgradeElement(index)"
            :disabled="!canUpgradeElement(index)"
          >
            <div class="upgrade-level">Ур. {{ element.generator.level }}</div>
            <div class="upgrade-cost">{{ formatNumber(getUpgradeCost(index)) }} ⚡</div>

            <div class="progress-bar">
              <div
                class="progress-fill"
                :style="{
                  width: progressPercentage(index) + '%',
                }"
              ></div>
            </div>
          </button>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useGameStore } from '../stores/gameStore.js';
import { formatNumber } from '../utils/formatNumber.js';
import { Decimal } from '../utils/formatNumber.js';

const props = defineProps({
  tree: {
    type: Array,
    required: true,
  },
  currentCategory: {
    type: Number,
    required: true,
  },
});

const store = useGameStore();

// const getElementRate = (element) => {
//   return new Decimal(element.generator.level);
// };

// const getUpgradeCost = (index) => {
//   return store.getUpgradeCost(index);
// };

// const canUpgradeElement = (index) => {
//   const cost = getUpgradeCost(index);
//   return store.canAfford(cost);
// };

// const getLevelsToUnlockNextElement = (index) => {
//   return Math.floor(10 * 1.7 ** index);
// };

// const upgradeElement = (index) => {
//   const element = currentCategory.value.elements[index];

//   const cost = getUpgradeCost(index);
//   if (store.canAfford(cost)) {
//     store.energy = store.energy.sub(cost);
//     element.generator.level++;
//   }

//   if (element.generator.level >= getLevelsToUnlockNextElement(index) && currentCategory.value.elements[index + 1]) {
//     currentCategory.value.elements[index + 1].unlocked = true;
//   }
// };

// const progressPercentage = (index) => {
//   return Math.min((store.energy / store.getUpgradeCost(index)) * 100);
// };
</script>

<style scoped>
.current-category {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.category-header {
  text-align: center;
  margin-bottom: 30px;
  color: #e0e0e0;
}

.category-header h2 {
  margin: 0;
  font-size: 2em;
  background: linear-gradient(135deg, #8b5cf6, #ec4899);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.category-header p {
  opacity: 0.8;
  margin: 10px 0 0 0;
}

.elements-grid {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.element-card {
  background: linear-gradient(135deg, #2a2a3e, #35354a);
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #4a4a6a;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s ease;
}

.element-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(139, 92, 246, 0.15);
}

.element-card.locked {
  opacity: 0.5;
  border: 1px dashed #4a4a6a;
}

.element-card.locked:hover {
  transform: none;
  box-shadow: none;
}

.element-info {
  color: #e0e0e0;
}

.element-name {
  font-weight: 600;
  font-size: 1.1em;
  margin-bottom: 8px;
}

.element-count {
  font-size: 1.3em;
  color: #8b5cf6;
  margin-bottom: 4px;
  font-weight: 600;
}

.element-rate {
  font-size: 0.9em;
  opacity: 0.7;
  color: #00d4ff;
}

.locked-text {
  font-size: 0.9em;
  color: #666;
  font-style: italic;
}

.element-actions {
  display: flex;
  gap: 10px;
  min-width: 200px;
  width: 50%;
}

.upgrade-button {
  flex: 1;
  position: relative;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  border: none;
  border-radius: 8px;
  padding: 12px 16px;
  color: white;
  cursor: pointer;
  text-align: center;
  overflow: hidden;
  transition: all 0.3s ease;
}

.upgrade-button:hover:not(:disabled) {
  background: linear-gradient(135deg, #4f46e5, #7c3aed);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4);
}

.upgrade-button:disabled {
  background: linear-gradient(135deg, #4b5563, #374151);
  cursor: not-allowed;
  opacity: 0.6;
}

.upgrade-level {
  font-weight: 600;
  margin-bottom: 4px;
}

.upgrade-cost {
  font-size: 0.85em;
  opacity: 0.9;
}

@media (max-width: 768px) {
  .elements-grid {
    grid-template-columns: 1fr;
  }

  .element-card {
    flex-direction: column;
    text-align: center;
    gap: 16px;
  }
}

.progress-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 6px;
  background: rgba(255, 255, 255, 0.1);
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #10b981, #6366f1);
  transition: width 0.3s ease;
}
</style>
