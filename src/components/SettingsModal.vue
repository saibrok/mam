<template>
  <div>
    <button
      class="settings-btn"
      @click="showModal = true"
    >
      <span>⚙️</span>
    </button>

    <BaseModal v-model="showModal">
      <div class="settings-content">
        <h2>Настройки</h2>
        
        <div>Язык:</div>
        <LanguageSwitcher class="language-switcher" />

        <div>Интервал обновления:</div>
        <UpdateIntervalSwitcher
          :modelValue="settings.updateInterval"
          @update:modelValue="onUpdateInterval"
        />
        <div class="raf-switch">
          <label class="raf-label">
            <input
              type="checkbox"
              :checked="settings.useRAF"
              @change="onChangeRAF"
            />
            Использовать альтернативный метод обновления (RAF)
          </label>
        </div>
      </div>
    </BaseModal>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useSettingsStore } from '../stores/settingsStore.js';
import BaseModal from './BaseModal.vue';
import LanguageSwitcher from './LanguageSwitcher.vue';
import UpdateIntervalSwitcher from './UpdateIntervalSwitcher.vue';

const settings = useSettingsStore();
const showModal = ref(false);

function onUpdateInterval(val) {
  settings.setUpdateInterval(val);
}
function onChangeRAF(e) {
  settings.setUseRAF(e.target.checked);
}
</script>

<style scoped>
.settings-btn {
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 20;
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
}

.settings-content {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.language-switcher {
  position: static;
}

.raf-switch {
  font-size: 16px;
}

.raf-label {
    cursor: pointer;
}
</style>
