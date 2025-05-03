<template>
  <div id="app">
    <div class="fm-header">
      <div class="fm-title">vue3+ElementPlus 代码生成工具</div>
      <div class="fm-link">
        <div class="action-item">
          <!-- <el-button mb-2 @click="toggle">Switch Language</el-button> -->
          <el-dropdown @command="handleLangCommand">
            <span class="el-dropdown-link">
              {{ langLabel }}
              <el-icon class="el-icon--right">
                <arrow-down />
              </el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item v-for="v in languages" :key="v.value" :command="v.value">
                  {{ v.label }}
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </div>
    <div class="fm-container">
      <el-config-provider :locale="locale">
        <router-view />
      </el-config-provider>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ArrowDown } from '@element-plus/icons-vue';
import { useRouter, useRoute } from 'vue-router';
const router = useRouter();
const route = useRoute();

import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
import en from 'element-plus/dist/locale/en.mjs';
import { languages, i18n } from '@/I18n/index.ts';
import type { langType } from '@/I18n/index.ts'; // ✅ 正确：显式声明仅导入类型

// 当前语言
const langEn = ref(languages[0].value);
const langLabel = computed(() => {
  return languages.find((v) => v.value === langEn.value)?.label;
});
const handleLangCommand = (command: langType) => {
  langEn.value = command;
  i18n.global.locale.value = langEn.value as langType;
};
// ElementPlus 自带的国际化 注入
const locale = computed(() => (langEn.value === 'zh-cn' ? zhCn : en));
</script>

<style lang="scss" scoped>
.fm-header {
  height: 50px;
  box-shadow: 0 2px 10px rgba(70, 160, 252, 0.6);
  padding: 0 10px;
  background-image: linear-gradient(to right, #1278f6, #00b4aa);
  position: relative;

  .fm-title {
    display: inline-block;
    line-height: 50px;
    vertical-align: middle;
    color: #fff;
    font-size: 20px;
    font-weight: 600;
    opacity: 0.8;
    margin-left: 6px;
    cursor: pointer;
  }
  .fm-link {
    height: 50px;
    float: right;
    display: flex;
    align-items: center;
  }
  .action-item {
    display: flex;
  }
}
.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: red;
  display: flex;
  align-items: center;
}
.fm-container {
  height: calc(100% - 50px);
}
*,
:after,
:before {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
html,
body {
  height: 100%;
}
#app {
  font-family: 'Source Sans Pro', 'Helvetica Neue', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100%;
  height: 100%;
}
</style>
