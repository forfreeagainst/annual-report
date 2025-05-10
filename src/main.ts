import './assets/global.scss';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import { i18n } from '@/I18n/index';

import App from './App.vue';
import router from './router';
// import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App);
// for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
//     app.component(key, component)
//     console.log(key);
// }

app.use(createPinia());
app.use(router);
app.use(i18n);

app.mount('#app');
