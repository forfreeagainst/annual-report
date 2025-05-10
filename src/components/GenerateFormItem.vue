<template>
  <el-form-item :label="widget.name" :prop="widget.model">
    <template v-if="widget.type == 'input'">
      <el-input
        v-if="
          widget.options.dataType == 'number' ||
          widget.options.dataType == 'integer' ||
          widget.options.dataType == 'float'
        "
        type="number"
        v-model.number="dataModel"
        :placeholder="widget.options.placeholder"
        :style="{ width: widget.options.width }"
        :disabled="elementDisabled"
      ></el-input>
      <el-input
        v-else
        type="text"
        v-model="dataModel"
        :disabled="elementDisabled"
        :placeholder="widget.options.placeholder"
        :style="{ width: widget.options.width }"
        :maxlength="widget.options.maxlength"
        :show-word-limit="widget.options.showWordLimit"
      ></el-input>
    </template>

    <template v-if="widget.type == 'textarea'">
      <el-input
        type="textarea"
        :rows="5"
        v-model="dataModel"
        :disabled="elementDisabled"
        :placeholder="widget.options.placeholder"
        :style="{ width: widget.options.width }"
        :maxlength="widget.options.maxlength"
        :show-word-limit="widget.options.showWordLimit"
      ></el-input>
    </template>

    <template v-if="widget.type == 'number'">
      <el-input-number
        v-model="dataModel"
        :style="{ width: widget.options.width }"
        :step="widget.options.step"
        controls-position="right"
        :disabled="elementDisabled"
        :min="widget.options.min"
        :max="widget.options.max"
      ></el-input-number>
    </template>

    <template v-if="widget.type == 'radio'">
      <el-radio-group
        v-model="dataModel"
        :style="{ width: widget.options.width }"
        :disabled="elementDisabled"
      >
        <el-radio
          :style="{ display: widget.options.inline ? 'inline-block' : 'block' }"
          :label="item.value"
          v-for="(item, index) in widget.options.remote
            ? widget.options.remoteOptions
            : widget.options.options"
          :key="index"
        >
          <template v-if="widget.options.remote">{{ item.label }}</template>
          <template v-else>{{ widget.options.showLabel ? item.label : item.value }}</template>
        </el-radio>
      </el-radio-group>
    </template>

    <template v-if="widget.type == 'checkbox'">
      <el-checkbox-group
        v-model="dataModel"
        :style="{ width: widget.options.width }"
        :disabled="elementDisabled"
      >
        <el-checkbox
          :style="{ display: widget.options.inline ? 'inline-block' : 'block' }"
          :label="item.value"
          v-for="(item, index) in widget.options.remote
            ? widget.options.remoteOptions
            : widget.options.options"
          :key="index"
        >
          <template v-if="widget.options.remote">{{ item.label }}</template>
          <template v-else>{{ widget.options.showLabel ? item.label : item.value }}</template>
        </el-checkbox>
      </el-checkbox-group>
    </template>

    <template v-if="widget.type == 'time'">
      <el-time-picker
        v-model="dataModel"
        :is-range="widget.options.isRange"
        :placeholder="widget.options.placeholder"
        :start-placeholder="widget.options.startPlaceholder"
        :end-placeholder="widget.options.endPlaceholder"
        :readonly="widget.options.readonly"
        :disabled="elementDisabled"
        :editable="widget.options.editable"
        :clearable="widget.options.clearable"
        :arrowControl="widget.options.arrowControl"
        :value-format="widget.options.format"
        :style="{ width: widget.options.width }"
      >
      </el-time-picker>
    </template>

    <template v-if="widget.type == 'date'">
      <el-date-picker
        v-model="dataModel"
        :type="widget.options.type"
        :placeholder="widget.options.placeholder"
        :start-placeholder="widget.options.startPlaceholder"
        :end-placeholder="widget.options.endPlaceholder"
        :readonly="widget.options.readonly"
        :disabled="elementDisabled"
        :editable="widget.options.editable"
        :clearable="widget.options.clearable"
        :value-format="widget.options.timestamp ? 'timestamp' : widget.options.format"
        :format="widget.options.format"
        :style="{ width: widget.options.width }"
      >
      </el-date-picker>
    </template>

    <template v-if="widget.type == 'rate'">
      <el-rate
        v-model="dataModel"
        :max="widget.options.max"
        :disabled="elementDisabled"
        :allow-half="widget.options.allowHalf"
      ></el-rate>
    </template>

    <template v-if="widget.type == 'color'">
      <el-color-picker
        v-model="dataModel"
        :disabled="elementDisabled"
        :show-alpha="widget.options.showAlpha"
      ></el-color-picker>
    </template>

    <template v-if="widget.type == 'select'">
      <el-select
        v-model="dataModel"
        :disabled="elementDisabled"
        :multiple="widget.options.multiple"
        :clearable="widget.options.clearable"
        :placeholder="widget.options.placeholder"
        :style="{ width: widget.options.width }"
        :filterable="widget.options.filterable"
      >
        <el-option
          v-for="item in widget.options.remote
            ? widget.options.remoteOptions
            : widget.options.options"
          :key="item.value"
          :value="item.value"
          :label="widget.options.showLabel || widget.options.remote ? item.label : item.value"
        ></el-option>
      </el-select>
    </template>

    <template v-if="widget.type == 'switch'">
      <el-switch v-model="dataModel" :disabled="elementDisabled"> </el-switch>
    </template>

    <template v-if="widget.type == 'slider'">
      <el-slider
        v-model="dataModel"
        :min="widget.options.min"
        :max="widget.options.max"
        :disabled="elementDisabled"
        :step="widget.options.step"
        :show-input="widget.options.showInput"
        :range="widget.options.range"
        :style="{ width: widget.options.width }"
      ></el-slider>
    </template>

    <template v-if="widget.type == 'cascader'">
      <el-cascader
        v-model="dataModel"
        :disabled="elementDisabled"
        :clearable="widget.options.clearable"
        :placeholder="widget.options.placeholder"
        :style="{ width: widget.options.width }"
        :options="widget.options.remoteOptions"
      >
      </el-cascader>
    </template>

    <template v-if="widget.type == 'text'">
      <span>{{ dataModel }}</span>
    </template>
  </el-form-item>
</template>

<script lang="ts" setup>
// import FmUpload from './Upload'
const props = defineProps<{
  widget: any;
  models: any;
  rules: any;
  remote: any;
  edit: any;
}>();
const dataModel = ref(props.widget.model);
const elementDisabled = computed(() => {
  return !props.edit || props.widget.options.disabled;
});

if (props.widget.options.remote && props.remote[props.widget.options.remoteFunc]) {
  props.remote[props.widget.options.remoteFunc]((data) => {
    props.widget.options.remoteOptions = data.map((item) => {
      return {
        value: item[props.widget.options.props.value],
        label: item[props.widget.options.props.label],
        children: item[props.widget.options.props.children],
      };
    });
  });
}

const emit = defineEmits(['update:models', 'input-change']);
watch(
  dataModel.value,
  (val) => {
    props.models[props.widget.model] = val;
    emit('update:models', {
      ...props.models,
      [props.widget.model]: val,
    });
    emit('input-change', val, props.widget.model);
  },
  {
    deep: true,
  },
);
watch(
  props.models,
  (val) => {
    dataModel.value = val[props.widget.model];
  },
  {
    deep: true,
  },
);
</script>
