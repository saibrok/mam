<template>
  <div
    class="element-card"
    :class="{ locked: !element.unlocked }"
  >
    <div class="element-info">
      <div class="element-name">{{ $t(`elements.${element.id}`) }}</div>
      <div
        v-if="element.unlocked"
        class="element-count"
      >
        {{ formatNumber(element.count) }}
      </div>
      <div
        v-if="element.unlocked"
        class="element-rate"
      >
        +{{ formatNumber(getElementRate(element)) }}/сек
      </div>
      <div
        v-else
        class="locked-text"
      >
        Заблокировано
      </div>
    </div>

    <div
      v-if="element.unlocked"
      class="element-actions"
    >
      <button
        class="upgrade-button"
        @click="upgradeElement"
        :disabled="!canUpgradeElement"
      >
        <div class="upgrade-level">Ур. {{ element.generator.level }}</div>
        <div class="upgrade-cost">{{ formatNumber(upgradeCost) }} ⚡</div>

        <div class="progress-bar">
          <div
            class="progress-fill"
            :style="{ width: progressPercentage + '%' }"
          ></div>
        </div>
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useGameStore } from '../stores/gameStore.js';
import { Decimal, formatNumber } from '../utils/formatNumber.js';
import { getUpgradeGeneratorCost, canAfford } from '../utils/gameFormulas.js';

const props = defineProps({
  categoryIndex: { type: Number, required: true },
  elementIndex: { type: Number, required: true },
  isMatter: { type: Boolean, default: true },
});

const store = useGameStore();

const tree = computed(() => (props.isMatter ? store.treeState.matterTree : store.treeState.antiMatterTree));
const element = computed(() => tree.value[props.categoryIndex].elements[props.elementIndex]);
const getElementRate = (el) => new Decimal(el.generator.level);
const upgradeCost = computed(() => getUpgradeGeneratorCost(props.isMatter, props.categoryIndex, props.elementIndex, element.value.generator.level));
const canUpgradeElement = computed(() => canAfford(upgradeCost.value, store.energy));

const levelsToUnlockNextElement = (index) => {
  return Math.floor(10 * 1.7 ** index);
};

const upgradeElement = () => {
  if (!canUpgradeElement.value) return;
  store.energy = store.energy.sub(upgradeCost.value);
  element.value.generator.level++;
  
  const nextElement = tree.value[props.categoryIndex].elements[props.elementIndex + 1];
  if (nextElement && element.value.generator.level >= levelsToUnlockNextElement(props.elementIndex)) {
    nextElement.unlocked = true;
  }
};

const progressPercentage = computed(() => Math.min((store.energy / upgradeCost.value) * 100, 100));

</script>

<style scoped>
/* Стили можно скопировать из CurrentCategory.vue */
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
