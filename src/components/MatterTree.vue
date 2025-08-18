<template>
  <div
    class="tree"
    :class="{ anti: title === 'antimatter' }"
  >
    <div class="timeline-header">
      <h3>{{ $t(`tree.${title}`) }}</h3>
    </div>

    <div class="timeline-container">
      <div
        v-for="(category, index) in tree"
        :key="category.id"
        class="timeline-item"
        :class="{
          unlocked: category.unlocked,
          current: index === store.currentTabIndex,
          completed: isCompleted(category),
        }"
      >
        <div
          class="timeline-line"
          v-if="index < tree.length - 1"
        >
          <div
            class="timeline-line-inner"
            :style="{ height: getEnergyPercentage(index) + '%' }"
          ></div>
        </div>

        <div class="timeline-circle">
          <span class="category-icon">{{ category.icon }}</span>
        </div>

        <div class="timeline-content">
          <h4 class="category-name">{{ $t(`categories.${category.id}`) }}</h4>

          <div
            v-if="category.unlocked"
            class="progress"
          >
            <div class="progress-bar">
              <div
                class="progress-fill"
                :style="{ width: getProgressPercentage(category) + '%' }"
              ></div>
            </div>
            <div class="progress-text">{{ getUnlockedElements(category) }}/{{ category.elements.length }}</div>
          </div>

          <div
            class="requirements"
            v-if="!category.unlocked"
          >
            <div class="requirement-item">
              <span class="requirement-label">{{ $t('tree.requirement') }}:</span>
              <span class="requirement-value"> {{ formatNumber(category.requirements) }} ⚡ </span>
            </div>
          </div>

          <!-- <div class="elements-preview" v-if="category.unlocked">
            <div class="elements-grid">
              <div 
                v-for="element in category.elements.slice(0, 3)" 
                :key="element.id"
                class="element-preview"
                :class="{ 'has-count': element.count && element.count.gt(0) }"
              >
                <span class="element-name">{{ $t(`elements.${element.id}`) }}</span>
                <span class="element-count" v-if="element.count && element.count.gt(0)">
                  {{ formatNumber(element.count) }}
                </span>
              </div>
              <div v-if="category.elements.length > 3" class="more-elements">
                +{{ category.elements.length - 3 }} {{ $t('cosmicTimeline.more') }}
              </div>
            </div>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useGameStore } from '../stores/gameStore.js';
import { formatNumber } from '../utils/formatNumber.js';

const props = defineProps({
  title: {
    type: String,
    default: 'matter',
  },
  tree: {
    type: Array,
    required: true,
  },
});

const store = useGameStore();

const getUnlockedElements = (category) => {
  return category.elements.filter((element) => element.unlocked).length;
};

const getEnergyPercentage = (index) => {
  const nextCategory = props.tree.length > index + 1 ? props.tree[index + 1] : null;

  return Math.min(nextCategory ? store.energy.div(nextCategory.requirements).mul(100) || 0 : 0, 100);
};

const getProgressPercentage = (category) => {
  if (!category.unlocked) return 0;
  const unlockedCount = getUnlockedElements(category);
  return Math.round((unlockedCount / category.elements.length) * 100);
};

const isCompleted = (category) => {
  return category.unlocked && getUnlockedElements(category) === category.elements.length;
};
</script>

<style scoped>
.tree {
  --diameter: 40px;
  min-width: 400px;
  height: 100%;
  background: linear-gradient(135deg, #1e3b5a 0%, #162a47 33%, #0d1a33 66%, #040b1a 100%);
  border-right: 1px solid #4a4a6a;
  border-left: 1px solid #4a4a6a;
  overflow-y: auto;
  padding: 20px 15px;
  box-sizing: border-box;

  &.anti {
    background: linear-gradient(135deg, #3a1d3e 0%, #2e1538 33%, #1e0c2a 66%, #0e0315 100%);
  }
}

.timeline-header {
  margin-bottom: 30px;
  text-align: center;
}

.timeline-header h3 {
  color: #ffffff;
  font-size: 18px;
  font-weight: 600;
  margin: 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.timeline-container {
  display: flex;
  flex-direction: column;
  row-gap: 2.5rem;
  position: relative;
}

.timeline-item {
  display: flex;
  width: 100%;
  position: relative;
  transition: all 0.3s ease;
}

.timeline-line {
  --width: 6px;
  position: absolute;
  left: calc(var(--diameter) / 2 - (var(--width) / 2));
  top: calc(50% + var(--diameter) / 2);
  height: calc(100% + 1px);
  width: var(--width);
  background-color: #4a4a6a;
}

.timeline-line-inner {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #0099cc;
}

.timeline-circle {
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: var(--diameter);
  height: var(--diameter);
  border-radius: 50%;
  background: #2d2d42;
  border: 3px solid #4a4a6a;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 2;
}

.timeline-item.unlocked .timeline-circle {
  border-color: #00d4ff;
  background: linear-gradient(135deg, #00d4ff, #0099cc);
  box-shadow: 0 0 15px rgba(0, 212, 255, 0.3);
}

.timeline-item.current .timeline-circle {
  border-color: #ffaa00;
  background: linear-gradient(135deg, #ffaa00, #ff8800);
  box-shadow: 0 0 20px rgba(255, 170, 0, 0.5);
  animation: pulse 2s infinite;
}

.timeline-item.completed .timeline-circle {
  border-color: #00ff88;
  background: linear-gradient(135deg, #00ff88, #00cc66);
  box-shadow: 0 0 15px rgba(0, 255, 136, 0.3);
}

@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

.category-icon {
  font-size: 16px;
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.5));
}

.timeline-content {
  display: flex;
  flex-direction: column;
  flex: 1;
  row-gap: 1rem;
  background: rgba(45, 45, 66, 0.8);
  border: 1px solid #4a4a6a;
  border-radius: 8px;
  padding: 15px;
  margin-left: calc(var(--diameter) + 10px);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.timeline-item:hover .timeline-content {
  transform: translateX(5px);
}

.timeline-item.unlocked .timeline-content {
  border-color: #00d4ff;
  background: rgba(0, 212, 255, 0.1);
}

.timeline-item.current .timeline-content {
  border-color: #ffaa00;
  background: rgba(255, 170, 0, 0.1);
}

.category-name {
  color: #ffffff;
  font-size: 14px;
  font-weight: 600;
  text-transform: capitalize;
}

.progress {
  display: flex;
  align-items: center;
  gap: 8px;
}

.progress-bar {
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 6px;
  background: rgba(74, 74, 106, 0.5);
  border-radius: 3px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #00d4ff, #0099cc);
  border-radius: 3px;
  transition: width 0.3s ease;
}

.progress-text {
  color: #cccccc;
  font-size: 11px;
  font-weight: 500;
  min-width: 35px;
}

.requirements {
}

.requirement-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.requirement-label {
  color: #cccccc;
  font-size: 11px;
  font-weight: 500;
}

.requirement-value {
  color: #ffaa00;
  font-size: 11px;
  font-weight: 600;
}

.elements-preview {
  margin-top: 10px;
}

.elements-grid {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.element-preview {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 8px;
  background: rgba(74, 74, 106, 0.3);
  border-radius: 4px;
  transition: all 0.2s ease;
}

.element-preview.has-count {
  background: rgba(0, 212, 255, 0.2);
  border-left: 2px solid #00d4ff;
}

.element-name {
  color: #cccccc;
  font-size: 10px;
  text-transform: capitalize;
}

.element-count {
  color: #00d4ff;
  font-size: 10px;
  font-weight: 600;
}

.more-elements {
  color: #888888;
  font-size: 10px;
  font-style: italic;
  text-align: center;
  padding: 4px;
}

/* Скроллбар */
.tree::-webkit-scrollbar {
  width: 6px;
}

.tree::-webkit-scrollbar-track {
  background: rgba(45, 45, 66, 0.3);
}

.tree::-webkit-scrollbar-thumb {
  background: #4a4a6a;
  border-radius: 3px;
}

.tree::-webkit-scrollbar-thumb:hover {
  background: #00d4ff;
}
</style>
