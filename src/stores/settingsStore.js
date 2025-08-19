import { defineStore } from 'pinia';

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    updateInterval: Number(localStorage.getItem('updateInterval')) || 1000,
    useRAF: localStorage.getItem('useRAF') === 'false' ? false : true,
  }),
  actions: {
    setUpdateInterval(val) {
      this.updateInterval = val;
      localStorage.setItem('updateInterval', val);
    },
    setUseRAF(val) {
      this.useRAF = val;
      localStorage.setItem('useRAF', val);
    },
    saveSettings() {
      localStorage.setItem('updateInterval', this.updateInterval);
      localStorage.setItem('useRAF', this.useRAF);
    },
  },
});