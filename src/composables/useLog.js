import { getCurrentInstance } from 'vue';

export function useLog() {
  const instance = getCurrentInstance();
  return instance?.appContext.config.globalProperties.$log;
}