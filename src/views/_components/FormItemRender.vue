<template>
  <el-form-item
    class="widget-view"
    v-if="element && element.key"
    :class="{ active: widgetFormSelect.key == element.key, is_req: element.options.required }"
    :label="element.name"
    @click.native.stop="handleSelectWidget(index)"
  >
    <template v-if="element.type == 'input'">
      <el-input
        v-model="element.options.defaultValue"
        :style="{ width: element.options.width }"
        :placeholder="element.options.placeholder"
        :disabled="element.options.disabled"
        :maxlength="element.options.maxlength"
        :show-word-limit="element.options.showWordLimit"
      ></el-input>
    </template>

    <template v-if="element.type == 'textarea'">
      <el-input
        type="textarea"
        :rows="5"
        v-model="element.options.defaultValue"
        :style="{ width: element.options.width }"
        :disabled="element.options.disabled"
        :placeholder="element.options.placeholder"
        :maxlength="element.options.maxlength"
        :show-word-limit="element.options.showWordLimit"
      ></el-input>
    </template>

    <template v-if="element.type == 'number'">
      <el-input-number
        v-model="element.options.defaultValue"
        :disabled="element.options.disabled"
        :controls-position="element.options.controlsPosition"
        :style="{ width: element.options.width }"
      ></el-input-number>
    </template>

    <template v-if="element.type == 'radio'">
      <el-radio-group
        v-model="element.options.defaultValue"
        :style="{ width: element.options.width }"
        :disabled="element.options.disabled"
      >
        <el-radio
          :style="{ display: element.options.inline ? 'inline-block' : 'block' }"
          :label="item.value"
          v-for="(item, index) in element.options.options"
          :key="item.value + index"
        >
          {{ element.options.showLabel ? item.label : item.value }}
        </el-radio>
      </el-radio-group>
    </template>

    <template v-if="element.type == 'checkbox'">
      <el-checkbox-group
        v-model="element.options.defaultValue"
        :style="{ width: element.options.width }"
        :disabled="element.options.disabled"
      >
        <el-checkbox
          :style="{ display: element.options.inline ? 'inline-block' : 'block' }"
          :label="item.value"
          v-for="(item, index) in element.options.options"
          :key="item.value + index"
        >
          {{ element.options.showLabel ? item.label : item.value }}
        </el-checkbox>
      </el-checkbox-group>
    </template>

    <template v-if="element.type == 'time'">
      <el-time-picker
        v-model="element.options.defaultValue"
        :is-range="element.options.isRange"
        :placeholder="element.options.placeholder"
        :start-placeholder="element.options.startPlaceholder"
        :end-placeholder="element.options.endPlaceholder"
        :readonly="element.options.readonly"
        :disabled="element.options.disabled"
        :editable="element.options.editable"
        :clearable="element.options.clearable"
        :arrowControl="element.options.arrowControl"
        :style="{ width: element.options.width }"
      >
      </el-time-picker>
    </template>

    <template v-if="element.type == 'date'">
      <el-date-picker
        v-model="element.options.defaultValue"
        :type="element.options.type"
        :is-range="element.options.isRange"
        :placeholder="element.options.placeholder"
        :start-placeholder="element.options.startPlaceholder"
        :end-placeholder="element.options.endPlaceholder"
        :readonly="element.options.readonly"
        :disabled="element.options.disabled"
        :editable="element.options.editable"
        :clearable="element.options.clearable"
        :style="{ width: element.options.width }"
      >
      </el-date-picker>
    </template>

    <template v-if="element.type == 'rate'">
      <el-rate
        v-model="element.options.defaultValue"
        :max="element.options.max"
        :disabled="element.options.disabled"
        :allow-half="element.options.allowHalf"
      ></el-rate>
    </template>

    <template v-if="element.type == 'color'">
      <el-color-picker
        v-model="element.options.defaultValue"
        :disabled="element.options.disabled"
        :show-alpha="element.options.showAlpha"
      ></el-color-picker>
    </template>

    <template v-if="element.type == 'select'">
      <el-select
        v-model="element.options.defaultValue"
        :disabled="element.options.disabled"
        :multiple="element.options.multiple"
        :clearable="element.options.clearable"
        :placeholder="element.options.placeholder"
        :style="{ width: element.options.width }"
      >
        <el-option
          v-for="item in element.options.options"
          :key="item.value"
          :value="item.value"
          :label="element.options.showLabel ? item.label : item.value"
        ></el-option>
      </el-select>
    </template>

    <template v-if="element.type == 'switch'">
      <el-switch v-model="element.options.defaultValue" :disabled="element.options.disabled">
      </el-switch>
    </template>

    <template v-if="element.type == 'slider'">
      <el-slider
        v-model="element.options.defaultValue"
        :min="element.options.min"
        :max="element.options.max"
        :disabled="element.options.disabled"
        :step="element.options.step"
        :show-input="element.options.showInput"
        :range="element.options.range"
        :style="{ width: element.options.width }"
      ></el-slider>
    </template>

    <template v-if="element.type == 'cascader'">
      <el-cascader
        v-model="element.options.defaultValue"
        :disabled="element.options.disabled"
        :clearable="element.options.clearable"
        :placeholder="element.options.placeholder"
        :style="{ width: element.options.width }"
        :options="element.options.remoteOptions"
      >
      </el-cascader>
    </template>

    <template v-if="element.type == 'blank'">
      <div
        style="height: 50px; color: #999; background: #eee; line-height: 50px; text-align: center"
      >
        {{ $t('fm.components.fields.blank') }}
      </div>
    </template>

    <template v-if="element.type == 'text'">
      <span>{{ element.options.defaultValue }}</span>
    </template>

    <div class="widget-view-action" v-if="widgetFormSelect.key == element.key">
      <i class="iconfont icon-icon_clone" @click.stop="handleWidgetClone(index)"> Clone </i>
      <i class="iconfont icon-trash" @click.stop="handleWidgetDelete(index)"> Delete </i>
    </div>

    <div class="widget-view-drag" v-if="widgetFormSelect.key == element.key">
      <i class="iconfont icon-drag drag-widget">Drag</i>
    </div>
  </el-form-item>
</template>

<script lang="ts" setup>
import { blocksRender } from '@/stores/blocksRender';
import { storeToRefs } from 'pinia';
const useBlockRender = blocksRender();
const { widgetFormSelect } = storeToRefs(useBlockRender);
const props = defineProps<{
  element: any;
  row?: number;
  col?: number;
  index: number;
  data: any;
}>();
const handleSelectWidget = (index: number) => {
  useBlockRender.handleSelectFormItem(index, {
    row: props.row,
    col: props.col,
  });
};
const handleWidgetDelete = (index: number) => {
  useBlockRender.handleFormItemDelete(index, {
    row: props.row,
    col: props.col,
  });
};
const handleWidgetClone = (index: number) => {
  useBlockRender.handleFormItemClone(index, {
    row: props.row,
    col: props.col,
  });
};
</script>

<style lang="scss" scoped>
.widget-view {
  padding-bottom: 18px;
  position: relative;
  border: 1px dashed rgba(170, 170, 170, 0.7);
  background-color: rgba(236, 245, 255, 0.3);
  margin: 2px;

  .el-form-item__content {
    position: unset;
  }

  &.is_req {
    .el-form-item__label::before {
      content: '*';
      color: #f56c6c;
      margin-right: 4px;
    }
  }

  .widget-view-description {
    height: 15px;
    line-height: 15px;
    font-size: 13px;
    margin-top: 6px;
    color: #909399;
  }

  .widget-view-action {
    position: absolute;
    right: 0;
    bottom: 0;
    height: 28px;
    line-height: 28px;
    background: var(--primary-color);
    z-index: 9;

    i {
      font-size: 14px;
      color: #fff;
      margin: 0 5px;
      cursor: pointer;
    }
  }

  .widget-view-drag {
    position: absolute;
    left: -2px;
    top: -2px;
    bottom: -18px;
    height: 28px;
    line-height: 28px;
    background: var(--primary-color);
    z-index: 9;
    // display: none;

    i {
      font-size: 14px;
      color: #fff;
      margin: 0 5px;
      cursor: move;
    }
  }

  &:after {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    display: block;
  }

  &:hover {
    background: var(--primary-background-color);
    outline: 1px solid var(--primary-color);
    outline-offset: 0px;

    &.active {
      outline: 2px solid var(--primary-color);
      border: 1px solid var(--primary-color);
      outline-offset: 0;
    }

    .widget-view-drag {
      display: block;
    }
  }

  &.active {
    outline: 2px solid var(--primary-color);
    border: 1px solid var(--primary-color);
  }

  &.ghost {
    background: #f56c6c;
    border: 2px solid #f56c6c;
    outline-width: 0;
    height: 3px;
    box-sizing: border-box;
    font-size: 0;
    content: '';
    overflow: hidden;
    padding: 0;
  }
}
</style>
