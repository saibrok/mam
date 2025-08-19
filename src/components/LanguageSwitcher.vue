<template>
  <div class="language-switcher">
    <select v-model="currentLocale">
      <option
        v-for="locale in locales"
        :key="locale.code"
        :value="locale.code"
      >
        {{ locale.name }}
      </option>
    </select>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { locale } = useI18n();

const locales = [
  { code: 'ru', name: '🇷🇺  -  Русский' },
  { code: 'en', name: '🇺🇸  -  English' },
  { code: 'zh', name: '🇨🇳  -  简体中文' },
  { code: 'zh_tw', name: '🇹🇼  -  繁體中文' },
  { code: 'es', name: '🇪🇸  -  Español' },
  { code: 'fr', name: '🇫🇷  -  Français' },
  { code: 'de', name: '🇩🇪  -  Deutsch' },
  { code: 'ja', name: '🇯🇵  -  日本語' },
  { code: 'ko', name: '🇰🇷  -  한국어' },
  { code: 'pt_br', name: '🇧🇷  -  Português (Brasil)' },
  { code: 'it', name: '🇮🇹  -  Italiano' },
  { code: 'pl', name: '🇵🇱  -  Polski' },
]
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
  width: 100%;
  padding: 8px 12px;
  border-radius: 4px;
  border: 1px solid #3d3d5c;
  background: #2d2d42;
  color: #e0e0e0;
}
</style>