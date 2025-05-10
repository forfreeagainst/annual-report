<template>
  <div class="main-container">
    <el-main class="main-panel">
      <el-aside class="components-list">
        <template v-if="basicFields.length">
          <div class="widget-cate">{{ $t('fm.components.basic.title') }}</div>
          <draggable
            tag="ul"
            :list="basicComponents"
            v-bind="{
              group: { name: 'people', pull: 'clone', put: false },
              sort: false,
              ghostClass: 'ghost',
            }"
            @end="handleMoveEnd"
            @start="handleMoveStart"
            :move="handleMove"
          >
            <template v-for="(item, index) in basicComponents">
              <li
                v-if="basicFields.indexOf(item.type) >= 0"
                class="form-edit-widget-label"
                :class="{ 'no-put': item.type == 'divider' }"
                :key="index"
              >
                <a>
                  <i class="icon iconfont" :class="item.icon"></i>
                  <span>{{ item.name }}</span>
                </a>
              </li>
            </template>
          </draggable>
        </template>
        <template v-if="advanceFields.length">
          <div class="widget-cate">{{ $t('fm.components.advance.title') }}</div>
          <draggable
            tag="ul"
            :list="advanceComponents"
            v-bind="{
              group: { name: 'people', pull: 'clone', put: false },
              sort: false,
              ghostClass: 'ghost',
            }"
            @end="handleMoveEnd"
            @start="handleMoveStart"
            :move="handleMove"
          >
            <template v-for="(item, index) in advanceComponents">
              <li
                v-if="advanceFields.indexOf(item.type) >= 0"
                class="form-edit-widget-label"
                :class="{ 'no-put': item.type == 'table' }"
                :key="index"
              >
                <a>
                  <i class="icon iconfont" :class="item.icon"></i>
                  <span>{{ item.name }}</span>
                </a>
              </li>
            </template>
          </draggable>
        </template>
        <template v-if="layoutFields.length">
          <div class="widget-cate">{{ $t('fm.components.layout.title') }}</div>
          <draggable
            tag="ul"
            :list="layoutComponents"
            v-bind="{
              group: { name: 'people', pull: 'clone', put: false },
              sort: false,
              ghostClass: 'ghost',
            }"
            @end="handleMoveEnd"
            @start="handleMoveStart"
            :move="handleMove"
          >
            <template v-for="(item, index) in layoutComponents">
              <li
                v-if="layoutFields.indexOf(item.type) >= 0"
                class="form-edit-widget-label no-put"
                :key="index"
              >
                <a>
                  <i class="icon iconfont" :class="item.icon"></i>
                  <span>{{ item.name }}</span>
                </a>
              </li>
            </template>
          </draggable>
        </template>
      </el-aside>
      <el-main class="center-panel">
        <div class="btn-bar">
          <slot name="action"></slot>
          <el-button link type="primary" :icon="Delete" @click="handleClear">
            {{ $t('fm.actions.clear') }}
          </el-button>
        </div>
        <div class="render-panel">
          <FormRender></FormRender>
        </div>
      </el-main>
      <el-aside class="config-panel">asdf</el-aside>
    </el-main>
    <el-footer class="footer-panel"> 低代码，编排引擎 </el-footer>
  </div>
</template>

<script lang="ts" setup>
import { Upload, Delete, View, Tickets, Document } from '@element-plus/icons-vue';
import {
  basicComponents as basicConfig,
  layoutComponents as layoutConfig,
  advanceComponents as advanceConfig,
} from './componentsConfig.ts';
import { VueDraggableNext as draggable } from 'vue-draggable-next';
import FormRender from './FormRender.vue';
import { useI18n } from 'vue-i18n';
const { t: $t, locale } = useI18n();
const props = defineProps({
  basicFields: {
    type: Array<string>,
    default: () => [
      'input',
      'textarea',
      'number',
      'radio',
      'checkbox',
      'time',
      'date',
      'rate',
      'color',
      'select',
      'switch',
      'slider',
      'text',
    ],
  },
  advanceFields: {
    type: Array<string>,
    default: () => ['blank', 'cascader'],
  },
  layoutFields: {
    type: Array<string>,
    default: () => ['grid'],
  },
});
const _loadComponents = () => {
  basicComponents.value = basicComponents.value.map((item) => {
    return {
      ...item,
      name: $t(`fm.components.fields.${item.type}`),
    };
  });
  advanceComponents.value = advanceComponents.value.map((item) => {
    return {
      ...item,
      name: $t(`fm.components.fields.${item.type}`),
    };
  });
  layoutComponents.value = layoutComponents.value.map((item) => {
    return {
      ...item,
      name: $t(`fm.components.fields.${item.type}`),
    };
  });
  console.log(basicComponents.value);
  console.log(advanceComponents.value);
  console.log(layoutComponents.value);
};

const basicComponents = ref(basicConfig);
const layoutComponents = ref(layoutConfig);
const advanceComponents = ref(advanceConfig);
const handleMoveEnd = (evt) => {
  console.log('end', evt);
};
const handleMoveStart = ({ oldIndex }) => {
  console.log('start', oldIndex, basicComponents.value);
};
const handleMove = () => {
  return true;
};
// 按钮组的事件
const handleClear = () => {};

watch(
  () => locale.value,
  (val) => {
    _loadComponents();
  },
);

onMounted(() => {
  _loadComponents();
});
</script>

<style lang="scss" scoped>
.main-container {
  background-color: pink;
  height: 100%;
  box-sizing: border-box;
  border: 1px solid #e0e0e0;
  .main-panel {
    height: calc(100% - var(--footer-height));
    padding: 0;
    display: flex;
  }
  .footer-panel {
    height: var(--footer-height);
    line-height: var(--footer-height);
    border-top: 1px solid #e0e0e0;
    text-align: right;
    color: var(--primary-color);
    background-color: #fafafa;
    font-size: 12px;
    font-weight: 500;
  }
}
.components-list {
  width: 250px;
  padding: 8px 0;
  height: 100%;
  background-color: skyblue;
  .widget-cate {
    padding: 8px 12px;
    font-size: 13px;
  }

  ul {
    position: relative;
    overflow: hidden;
    padding: 0 10px 10px;
    margin: 0;
  }

  .form-edit-widget-label {
    font-size: 12px;
    display: block;
    width: 47%;
    line-height: 26px;
    position: relative;
    float: left;
    left: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin: 1%;
    color: #333;
    border: 1px solid #f4f6fc;

    &:hover {
      color: var(--primary-color);
      border: 1px dashed var(--primary-color);
    }

    & > a {
      display: block;
      cursor: move;
      background: #f4f6fc;
      border: 1px solid #f4f6fc;

      .icon {
        margin-right: 6px;
        margin-left: 8px;
        font-size: 14px;
        display: inline-block;
        vertical-align: middle;
      }

      span {
        display: inline-block;
        vertical-align: middle;
      }
    }
  }
}
.center-panel {
  flex: 1;
  background-color: yellow;
  padding: 0;
  border-left: 1px solid #e0e0e0;
  border-right: 1px solid #e0e0e0;
  .btn-bar {
    box-sizing: border-box;
    padding: 0 20px;
    height: var(--btn-bar-height);
    display: flex;
    justify-content: flex-end;
    align-items: center;
    border-bottom: solid 2px #e4e7ed;
    background-color: pink;
  }
  .render-panel {
    height: calc(100% - var(--btn-bar-height));
    background: #fafafa;
    padding: 10px;
    box-sizing: border-box;
  }
}
.config-panel {
  width: 250px;
  background-color: sandybrown;
}
</style>
