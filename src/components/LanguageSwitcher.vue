<template>
  <div class="language-switcher">
    <select v-model="currentLocale">
      <option value="ru">🇷🇺 Русский</option>
      <option value="en">🇺🇸 English</option>
      <option value="zh">🇨🇳 简体中文</option>
      <option value="zh_tw">🇹🇼 繁體中文</option>
      <option value="es">🇪🇸 Español</option>
      <option value="fr">🇫🇷 Français</option>
      <option value="de">🇩🇪 Deutsch</option>
      <option value="ja">🇯🇵 日本語</option>
      <option value="ko">🇰🇷 한국어</option>
      <option value="pt_br">🇧🇷 Português (Brasil)</option>
      <option value="it">🇮🇹 Italiano</option>
      <option value="pl">🇵🇱 Polski</option>
    </select>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { locale } = useI18n();

const currentLocale = computed({
  get: () => locale.value,
  set: (value) => {
    locale.value = value;
    localStorage.setItem('locale', value);
  },
});

const savedLocale = localStorage.getItem('locale');
if (savedLocale) {
  currentLocale.value = savedLocale;
}
</script>

<style scoped>
.language-switcher select {
  padding: 8px 12px;
  border-radius: 4px;
  border: 1px solid #3d3d5c;
  background: #2d2d42;
  color: #e0e0e0;
}
</style>