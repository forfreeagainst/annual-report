<template>
  <div class="fm-style">
    <el-form
      ref="generateForm"
      label-suffix=":"
      :size="data.config.size"
      :model="models"
      :rules="rules"
      :label-position="data.config.labelPosition"
      :label-width="data.config.labelWidth + 'px'"
    >
      <template v-for="item in data.list">
        <template v-if="item.type == 'grid'">
          <el-row
            :key="item.key"
            type="flex"
            :gutter="item.options.gutter ? item.options.gutter : 0"
            :justify="item.options.justify"
            :align="item.options.align"
          >
            <el-col v-for="(col, colIndex) in item.columns" :key="colIndex" :span="col.span">
              <template v-for="citem in col.list">
                <el-form-item
                  v-if="citem.type == 'blank'"
                  :label="citem.name"
                  :prop="citem.model"
                  :key="citem.key"
                >
                  <slot :name="citem.model" :model="models"></slot>
                </el-form-item>
                <genetate-form-item
                  v-else
                  :key="citem.key"
                  v-model:models="models"
                  :remote="remote"
                  :rules="rules"
                  :widget="citem"
                  :edit="edit"
                  @input-change="onInputChange"
                >
                </genetate-form-item>
              </template>
            </el-col>
          </el-row>
        </template>

        <template v-else-if="item.type == 'blank'">
          <el-form-item :label="item.name" :prop="item.model" :key="item.key">
            <slot :name="item.model" :model="models"></slot>
          </el-form-item>
        </template>

        <template v-else>
          <genetate-form-item
            :key="item.key"
            :v-model:models="models"
            :rules="rules"
            :widget="item"
            :edit="edit"
            @input-change="onInputChange"
            :remote="remote"
          >
          </genetate-form-item>
        </template>
      </template>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
const { t: $t } = useI18n();
import GenetateFormItem from './GenerateFormItem.vue';
import { loadJs } from '@/util/index.ts';
const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
  remote: {
    type: Object,
    default: () => ({}),
  },
  value: {
    type: Object,
    default: () => ({}),
  },
  edit: {
    type: Boolean,
    default: true,
  },
});
const models = ref<any>({});
const rules = ref<any>({});

const generateModle = (genList) => {
  for (let i = 0; i < genList.length; i++) {
    if (genList[i].type === 'grid') {
      genList[i].columns.forEach((item) => {
        generateModle(item.list);
      });
    } else {
      if (props.value && Object.keys(props.value).indexOf(genList[i].model) >= 0) {
        models.value[genList[i].model] = props.value[genList[i].model];
      } else {
        if (genList[i].type === 'blank') {
          models.value[genList[i].model] =
            genList[i].options.defaultType === 'String'
              ? ''
              : genList[i].options.defaultType === 'Object'
                ? {}
                : [];
        } else {
          models.value[genList[i].model] = genList[i].options.defaultValue;
        }
      }

      if (rules.value[genList[i].model]) {
        rules.value[genList[i].model] = [
          ...rules.value[genList[i].model],
          ...genList[i].rules.map((item) => {
            if (item.pattern) {
              return { ...item, pattern: new RegExp(item.pattern) };
            } else {
              return { ...item };
            }
          }),
        ];
      } else {
        rules.value[genList[i].model] = [
          ...genList[i].rules.map((item) => {
            if (item.pattern) {
              return { ...item, pattern: new RegExp(item.pattern) };
            } else {
              return { ...item };
            }
          }),
        ];
      }
    }
  }
};
generateModle(props.data.list);
const generateForm = ref();
const getData = () => {
  return new Promise((resolve, reject) => {
    generateForm.validate((valid) => {
      if (valid) {
        resolve(models.value);
      } else {
        reject(new Error($t('fm.message.validError')).message);
      }
    });
  });
};
const reset = () => {
  generateForm.resetFields();
};
const emit = defineEmits(['on-change']);
const onInputChange = (value, field) => {
  emit('on-change', field, value, models.value);
};
const disabled = (fields, disabled) => {
  if (typeof fields === 'string') {
    fields = [fields];
  }
  _setDisabled(props.data.list, fields, disabled);
};
const _setDisabled = (genList, fields, disabled) => {
  for (let i = 0; i < genList.length; i++) {
    if (genList[i].type === 'grid') {
      genList[i].columns.forEach((item) => {
        _setDisabled(item.list, fields, disabled);
      });
    } else {
      if (fields.indexOf(genList[i].model) >= 0) {
        genList[i].options.disabled = disabled;
      }
    }
  }
};
watch(
  props.data,
  (val) => {
    generateModle(val.list);
  },
  {
    deep: true,
  },
);
watch(
  props.value,
  (val) => {
    console.log(JSON.stringify(val));
    models.value = { ...models.value, ...val };
  },
  {
    deep: true,
  },
);
</script>

<style lang="scss">
// @import '../styles/cover.scss';
</style>
