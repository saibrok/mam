import { createI18n } from 'vue-i18n';
import messages from '../locales/index.js';

const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem('locale') || 'en',
  fallbackLocale: 'en',
  messages,
});

export default i18n;