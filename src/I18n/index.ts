import { createI18n } from 'vue-i18n';

export const i18n = createI18n({
  legacy: false, // <-- 必须设置为 false，legacy 遗留
  locale: 'zh-cn',
  fallbackLocale: 'en',
  messages: {
    en: {
      message: {
        hello: 'hello world',
      },
    },
    ['zh-cn']: {
      message: {
        hello: '你好，世界',
      },
    },
  },
});
export type langType = 'zh-cn' | 'en';

export const languages = [
    {
        label: "简体中文",
        value: "zh-cn"
    },
    {
        label: "English",
        value: "en"
    }
]