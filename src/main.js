import { createApp } from 'vue';
import { createPinia } from 'pinia';
import './style.css';
import App from './App.vue';
import i18n from './i18n';

const app = createApp(App);
app.use(createPinia());
app.use(i18n);

const isDev = import.meta.env.MODE === 'development';

app.config.globalProperties.$log = (...args) => {
  if (isDev) {
    console.log(...args);
  }
};

app.mount('#app');
