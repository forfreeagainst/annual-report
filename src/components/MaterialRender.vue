<template>
  <el-form-item
    class="widget-view"
    v-if="element && element.key"
    :class="{ active: selectWidget.key == element.key, is_req: element.options.required }"
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

    <template v-if="element.type == 'imgupload'">
      <!-- <fm-upload
        v-model="element.options.defaultValue"
        :disabled="element.options.disabled"
        :style="{ width: element.options.width }"
        :width="element.options.size.width"
        :height="element.options.size.height"
        token="xxx"
        domain="xxx"
      >
      </fm-upload> -->
      imgupload
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

    <template v-if="element.type == 'editor'">
      <!-- <vue-editor v-model="element.options.defaultValue" :style="{ width: element.options.width }">
      </vue-editor> -->
      vue-editor
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

    <div class="widget-view-action" v-if="selectWidget.key == element.key">
      <div class="iconfont icon-icon_clone" @click.stop="handleWidgetClone(index)">copy</div>
      <div class="iconfont icon-trash" @click.stop="handleWidgetDelete(index)">delete</div>
      <!-- <i class="iconfont icon-icon_clone" @click.stop="handleWidgetClone(index)"></i>
      <i class="iconfont icon-trash" @click.stop="handleWidgetDelete(index)"></i> -->
    </div>

    <div class="widget-view-drag" v-if="selectWidget.key == element.key">
      <div class="iconfont icon-drag drag-widget">drag</div>
      <!-- <i class="iconfont icon-drag drag-widget"></i> -->
    </div>
  </el-form-item>
</template>

<script lang="ts" setup>
// import FmUpload from './Upload.vue'
const props = defineProps<{
  element: any;
  select: any;
  index: any;
  data: any;
}>();

const selectWidget = ref(props.select);
const handleSelectWidget = (index) => {
  selectWidget.value = props.data.list[index];
};

const handleWidgetDelete = (index) => {
  if (props.data.list.length - 1 === index) {
    if (index === 0) {
      selectWidget.value = {};
    } else {
      selectWidget.value = props.data.list[index - 1];
    }
  } else {
    selectWidget.value = props.data.list[index + 1];
  }

  nextTick(() => {
    props.data.list.splice(index, 1);
  });
};
const handleWidgetClone = (index) => {
  const key = Date.parse(new Date().toString()) + '_' + Math.ceil(Math.random() * 99999);
  let cloneData = {
    ...props.data.list[index],
    options: {
      ...props.data.list[index].options,
      remoteFunc: 'func_' + key,
    },
    key,
    model: props.data.list[index].type + '_' + key,
    rules: props.data.list[index].rules || [],
  };

  if (
    props.data.list[index].type === 'radio' ||
    props.data.list[index].type === 'checkbox' ||
    props.data.list[index].type === 'select'
  ) {
    cloneData = {
      ...cloneData,
      options: {
        ...cloneData.options,
        options: cloneData.options.options.map((item) => ({ ...item })),
      },
    };
  }

  props.data.list.splice(index, 0, cloneData);

  nextTick(() => {
    selectWidget.value = props.data.list[index + 1];
  });
};
const emit = defineEmits(['update:select']);
watch(
  () => props.select,
  (val) => {
    selectWidget.value = val;
  },
);
watch(
  () => selectWidget.value,
  (val) => {
    emit('update:select', val);
  },
  {
    deep: true,
  },
);
</script>

<style lang="scss" scoped>
$primary-color: #409eff;
.widget-view-action {
  position: absolute;
  right: 0;
  bottom: 0;
  height: 28px;
  line-height: 28px;
  background: $primary-color;
  z-index: 9;
  display: flex;
}
</style>
