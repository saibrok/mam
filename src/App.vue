<script setup>
import { computed, onMounted, onUnmounted, watch } from 'vue';

import { useLog } from './composables/useLog';

import { useGameStore } from './stores/gameStore.js';
import { useSettingsStore } from './stores/settingsStore.js';

import MatterTree from './components/MatterTree.vue';
import GameHeader from './components/GameHeader.vue';
import CurrentCategory from './components/CurrentCategory.vue';
import SettingsModal from './components/SettingsModal.vue';

const $log = useLog();

const store = useGameStore();
const settings = useSettingsStore();

const matterTree = computed(() => store.treeState.matterTree);
const antimatterTree = computed(() => store.treeState.antimatterTree);

let lastUpdate = Date.now();
let accumulatedTime = 0;
let intervalId = null;
let rafId = null;

const currentMatterCategory = computed(() => store.currentCategory.matter);
const currentAntimatterCategory = computed(() => store.currentCategory.antimatter);

const gameLoop = () => {
  const now = Date.now();
  const deltaTime = (now - lastUpdate) / 1000;
  lastUpdate = now;

  if (settings.useRAF) {
    accumulatedTime += deltaTime;

    if (accumulatedTime >= settings.updateInterval / 1000) {
      // $log('LOG ::: App.vue : accumulatedTime: RAF', accumulatedTime);
      store.tick(accumulatedTime);
      accumulatedTime = 0;
    }
    rafId = requestAnimationFrame(gameLoop);
  } else {
    // $log('LOG ::: App.vue : deltaTime: SL', deltaTime);
    store.tick(deltaTime);
  }
};

watch(
  () => [settings.updateInterval, settings.useRAF],
  () => {
    accumulatedTime = 0;
    lastUpdate = Date.now();

    settings.saveSettings();

    if (settings.useRAF) {
      if (intervalId) clearInterval(intervalId);
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(gameLoop);
    } else {
      if (rafId) cancelAnimationFrame(rafId);
      if (intervalId) clearInterval(intervalId);
      intervalId = setInterval(gameLoop, settings.updateInterval);
    }
  },
);

onMounted(() => {
  lastUpdate = Date.now();
  if (settings.useRAF) {
    rafId = requestAnimationFrame(gameLoop);
  } else {
    intervalId = setInterval(gameLoop, settings.updateInterval);
  }
});

onUnmounted(() => {
  if (rafId) cancelAnimationFrame(rafId);
  if (intervalId) clearInterval(intervalId);
});
</script>

<template>
  <div class="game">
    <MatterTree :tree="matterTree" />

    <div class="main-content">
      <GameHeader />

      <div class="category-container">
        <CurrentCategory
          :tree="matterTree"
          :currentCategory="currentMatterCategory"
          isMatter
        />

        <CurrentCategory
          :tree="antimatterTree"
          :currentCategory="currentAntimatterCategory"
        />
      </div>
    </div>

    <MatterTree
      title="antimatter"
      :tree="antimatterTree"
    />
  </div>

  <SettingsModal />
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

.category-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  flex-grow: 1;
}

.current-category {
  flex-grow: 1;
  position: relative;

  &:last-child::before {
    content: '';
    position: absolute;
    top: 10px;
    bottom: 10px;
    left: -5px;
    width: 10px;
    background: linear-gradient(135deg, #3d3d5c, #2d2d42);
    border-radius: 5px;
    box-shadow: 0 0 10px #3d3d5c;
    /* border-left: #1e1e2f 10px solid; */
  }
}
</style>
