import { createI18n } from 'vue-i18n';
import enUS from './en-US.ts';
import zhCN from './zh-CN.ts';

export const i18n = createI18n({
  legacy: false, // <-- 必须设置为 false，legacy 遗留
  locale: 'zh-cn',
  fallbackLocale: 'en',
  messages: {
    en: enUS,
    ['zh-cn']: zhCN,
  },
});
export type langType = 'zh-cn' | 'en';

export const languages = [
  {
    label: '简体中文',
    value: 'zh-cn',
  },
  {
    label: 'English',
    value: 'en',
  },
];
