<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import { useGameStore } from './stores/gameStore.js';

import MatterTree from './components/MatterTree.vue';

import GameHeader from './components/GameHeader.vue';
import CurrentCategory from './components/CurrentCategory.vue';

import LanguageSwitcher from './components/LanguageSwitcher.vue';

const store = useGameStore();

const { matterTree, antimatterTree } = computed(() => store.treeState).value;

const UPDATE_INTERVAL = ref(1000);
const USE_REQUEST_ANIMATION_FRAME = ref(false);
const INTERVALS = [
  { value: 16, name: '≈ 60 FPS' },
  { value: 33, name: '≈ 30 FPS' },
  { value: 100, name: '≈ 10 FPS' },
  { value: 250, name: '≈ 4 FPS' },
  { value: 500, name: '≈ 2 FPS' },
  { value: 1000, name: '= 1 FPS' },
];

let lastUpdate = Date.now();
let accumulatedTime = 0;
let intervalId = null;
let rafId = null;

const currentMatterCategory = computed(() => {
  return store.currentCategory.matter;
});

const currentAntimatterCategory = computed(() => {
  return store.currentCategory.antimatter;
});

const gameLoop = () => {
  const now = Date.now();
  const deltaTime = (now - lastUpdate) / 1000;
  lastUpdate = now;

  if (USE_REQUEST_ANIMATION_FRAME.value) {
    accumulatedTime += deltaTime;
    if (accumulatedTime >= UPDATE_INTERVAL.value / 1000) {
      store.tick(accumulatedTime); // вызываем генерацию энергии
      accumulatedTime = 0;
    }
    rafId = requestAnimationFrame(gameLoop);
  } else {
    store.tick(deltaTime); // вызываем генерацию энергии
  }
};

watch(UPDATE_INTERVAL, () => {
  setGameLoopInterval();
});

const setGameLoopInterval = () => {
  if (intervalId) {
    clearInterval(intervalId);
  }
  intervalId = setInterval(gameLoop, UPDATE_INTERVAL.value);
};

onMounted(() => {
  lastUpdate = Date.now();
  if (USE_REQUEST_ANIMATION_FRAME.value) {
    rafId = requestAnimationFrame(gameLoop);
  } else {
    setGameLoopInterval();
  }
});

onUnmounted(() => {
  if (USE_REQUEST_ANIMATION_FRAME.value && rafId) {
    cancelAnimationFrame(rafId);
  } else if (intervalId) {
    clearInterval(intervalId);
  }
});
</script>

<template>
  <div class="game">
    <select
      class="update-interval"
      v-model="UPDATE_INTERVAL"
      @input="setGameLoopInterval"
    >
      <option
        v-for="interval in INTERVALS"
        :value="interval.value"
        :key="interval.value"
      >
        {{ interval.value }}мс {{ interval.name }}
      </option>
    </select>

    <MatterTree :tree="matterTree" />

    <div class="main-content">
      <GameHeader />

      <div class="category-container">
        <CurrentCategory
          :tree="matterTree"
          :currentCategory="currentMatterCategory"
        />

        <CurrentCategory
          :tree="matterTree"
          :currentCategory="currentAntimatterCategory"
        />
      </div>
    </div>

    <MatterTree
      title="antimatter"
      :tree="antimatterTree"
    />
  </div>

  <LanguageSwitcher class="language-switcher" />
</template>

<style>
#app {
  width: 100%;
  min-height: 100svh;
  background: linear-gradient(135deg, #1e1e2f, #2d2d42);
  margin: auto 100px;
}

.game {
  display: flex;
  min-height: 100%;
  border: 1px solid #4a4a6a;
  border-radius: 24px;
  overflow: hidden;
  margin: 50px auto;
}

.main-content {
  width: 100%;
  display: flex;
  flex-direction: column;
}

select {
  min-width: 200px;
}

.language-switcher {
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 10;
}

.update-interval {
  position: absolute;
  top: 60px;
  right: 20px;
  z-index: 10;
  font-size: 16px;
  padding: 8px 12px;
  border-radius: 4px;
  border: 1px solid #3d3d5c;
  background: #2d2d42;
  color: #e0e0e0;
}

.category-container {
  display: flex;
  flex-direction: row;
  flex-grow: 1;
}

.current-category {
  flex-grow: 1;
  &:last-child {
    border-left: #1e1e2f 10px solid;
  }
}
</style>
