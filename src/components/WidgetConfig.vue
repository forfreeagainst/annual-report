<template>
  <div v-if="show">
    <el-form label-position="top">
      <el-form-item :label="$t('fm.config.widget.model')" v-if="data.type != 'grid'">
        <el-input v-model="data.model"></el-input>
      </el-form-item>
      <el-form-item :label="$t('fm.config.widget.name')" v-if="data.type != 'grid'">
        <el-input v-model="data.name"></el-input>
      </el-form-item>
      <el-form-item
        :label="$t('fm.config.widget.width')"
        v-if="Object.keys(data.options).indexOf('width') >= 0"
      >
        <el-input v-model="data.options.width"></el-input>
      </el-form-item>

      <el-form-item
        :label="$t('fm.config.widget.height')"
        v-if="Object.keys(data.options).indexOf('height') >= 0"
      >
        <el-input v-model="data.options.height"></el-input>
      </el-form-item>

      <el-form-item
        :label="$t('fm.config.widget.size')"
        v-if="Object.keys(data.options).indexOf('size') >= 0"
      >
        {{ $t('fm.config.widget.width') }}
        <el-input
          style="width: 90px"
          type="number"
          v-model.number="data.options.size.width"
        ></el-input>
        {{ $t('fm.config.widget.height') }}
        <el-input
          style="width: 90px"
          type="number"
          v-model.number="data.options.size.height"
        ></el-input>
      </el-form-item>

      <el-form-item
        :label="$t('fm.config.widget.placeholder')"
        v-if="
          Object.keys(data.options).indexOf('placeholder') >= 0 &&
          (data.type != 'time' || data.type != 'date')
        "
      >
        <el-input v-model="data.options.placeholder"></el-input>
      </el-form-item>
      <el-form-item
        :label="$t('fm.config.widget.layout')"
        v-if="Object.keys(data.options).indexOf('inline') >= 0"
      >
        <el-radio-group v-model="data.options.inline">
          <el-radio-button :label="false">{{ $t('fm.config.widget.block') }}</el-radio-button>
          <el-radio-button :label="true">{{ $t('fm.config.widget.inline') }}</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item
        :label="$t('fm.config.widget.showInput')"
        v-if="Object.keys(data.options).indexOf('showInput') >= 0"
      >
        <el-switch v-model="data.options.showInput"></el-switch>
      </el-form-item>
      <el-form-item
        :label="$t('fm.config.widget.min')"
        v-if="Object.keys(data.options).indexOf('min') >= 0"
      >
        <el-input-number v-model="data.options.min" :min="0" :max="100" :step="1"></el-input-number>
      </el-form-item>
      <el-form-item
        :label="$t('fm.config.widget.max')"
        v-if="Object.keys(data.options).indexOf('max') >= 0"
      >
        <el-input-number v-model="data.options.max" :min="0" :max="100" :step="1"></el-input-number>
      </el-form-item>
      <el-form-item
        :label="$t('fm.config.widget.step')"
        v-if="Object.keys(data.options).indexOf('step') >= 0"
      >
        <el-input-number
          v-model="data.options.step"
          :min="0"
          :max="100"
          :step="1"
        ></el-input-number>
      </el-form-item>
      <el-form-item
        :label="$t('fm.config.widget.multiple')"
        v-if="data.type == 'select' || data.type == 'imgupload'"
      >
        <el-switch v-model="data.options.multiple" @change="handleSelectMuliple"></el-switch>
      </el-form-item>
      <el-form-item :label="$t('fm.config.widget.filterable')" v-if="data.type == 'select'">
        <el-switch v-model="data.options.filterable"></el-switch>
      </el-form-item>
      <el-form-item
        :label="$t('fm.config.widget.allowHalf')"
        v-if="Object.keys(data.options).indexOf('allowHalf') >= 0"
      >
        <el-switch v-model="data.options.allowHalf"> </el-switch>
      </el-form-item>
      <el-form-item
        :label="$t('fm.config.widget.showAlpha')"
        v-if="Object.keys(data.options).indexOf('showAlpha') >= 0"
      >
        <el-switch v-model="data.options.showAlpha"> </el-switch>
      </el-form-item>
      <el-form-item
        :label="$t('fm.config.widget.showLabel')"
        v-if="Object.keys(data.options).indexOf('showLabel') >= 0"
      >
        <el-switch v-model="data.options.showLabel"> </el-switch>
      </el-form-item>
      <el-form-item
        :label="$t('fm.config.widget.option')"
        v-if="Object.keys(data.options).indexOf('options') >= 0"
      >
        <el-radio-group v-model="data.options.remote" size="mini" style="margin-bottom: 10px">
          <el-radio-button :label="false">{{ $t('fm.config.widget.staticData') }}</el-radio-button>
          <el-radio-button :label="true">{{ $t('fm.config.widget.remoteData') }}</el-radio-button>
        </el-radio-group>
        <template v-if="data.options.remote">
          <div>
            <el-input size="mini" style="" v-model="data.options.remoteFunc">
              <template slot="prepend">{{ $t('fm.config.widget.remoteFunc') }}</template>
            </el-input>
            <el-input size="mini" style="" v-model="data.options.props.value">
              <template slot="prepend">{{ $t('fm.config.widget.value') }}</template>
            </el-input>
            <el-input size="mini" style="" v-model="data.options.props.label">
              <template slot="prepend">{{ $t('fm.config.widget.label') }}</template>
            </el-input>
          </div>
        </template>
        <template v-else>
          <template
            v-if="data.type == 'radio' || (data.type == 'select' && !data.options.multiple)"
          >
            <el-radio-group v-model="data.options.defaultValue">
              <draggable
                tag="ul"
                :list="data.options.options"
                v-bind="{ group: { name: 'options' }, ghostClass: 'ghost', handle: '.drag-item' }"
                handle=".drag-item"
              >
                <li v-for="(item, index) in data.options.options" :key="index">
                  <el-radio :label="item.value" style="margin-right: 5px">
                    <el-input
                      :style="{ width: data.options.showLabel ? '90px' : '180px' }"
                      size="mini"
                      v-model="item.value"
                    ></el-input>
                    <el-input
                      style="width: 90px"
                      size="mini"
                      v-if="data.options.showLabel"
                      v-model="item.label"
                    ></el-input>
                    <!-- <input v-model="item.value"/> -->
                  </el-radio>
                  <i class="drag-item" style="font-size: 16px; margin: 0 5px; cursor: move"
                    ><i class="iconfont icon-icon_bars"></i
                  ></i>
                  <el-button
                    @click="handleOptionsRemove(index)"
                    circle
                    plain
                    type="danger"
                    size="mini"
                    icon="el-icon-minus"
                    style="padding: 4px; margin-left: 5px"
                  ></el-button>
                </li>
              </draggable>
            </el-radio-group>
          </template>

          <template
            v-if="data.type == 'checkbox' || (data.type == 'select' && data.options.multiple)"
          >
            <el-checkbox-group v-model="data.options.defaultValue">
              <draggable
                tag="ul"
                :list="data.options.options"
                v-bind="{ group: { name: 'options' }, ghostClass: 'ghost', handle: '.drag-item' }"
                handle=".drag-item"
              >
                <li v-for="(item, index) in data.options.options" :key="index">
                  <el-checkbox :label="item.value" style="margin-right: 5px">
                    <el-input
                      :style="{ width: data.options.showLabel ? '90px' : '180px' }"
                      size="mini"
                      v-model="item.value"
                    ></el-input>
                    <el-input
                      style="width: 90px"
                      size="mini"
                      v-if="data.options.showLabel"
                      v-model="item.label"
                    ></el-input>
                  </el-checkbox>
                  <i class="drag-item" style="font-size: 16px; margin: 0 5px; cursor: move"
                    ><i class="iconfont icon-icon_bars"></i
                  ></i>
                  <el-button
                    @click="handleOptionsRemove(index)"
                    circle
                    plain
                    type="danger"
                    size="mini"
                    icon="el-icon-minus"
                    style="padding: 4px; margin-left: 5px"
                  ></el-button>
                </li>
              </draggable>
            </el-checkbox-group>
          </template>
          <div style="margin-left: 22px">
            <el-button type="text" @click="handleAddOption">{{
              $t('fm.actions.addOption')
            }}</el-button>
          </div>
        </template>
      </el-form-item>

      <el-form-item :label="$t('fm.config.widget.remoteData')" v-if="data.type == 'cascader'">
        <div>
          <el-input size="mini" style="" v-model="data.options.remoteFunc">
            <template slot="prepend">{{ $t('fm.config.widget.remoteFunc') }}</template>
          </el-input>
          <el-input size="mini" style="" v-model="data.options.props.value">
            <template slot="prepend">{{ $t('fm.config.widget.value') }}</template>
          </el-input>
          <el-input size="mini" style="" v-model="data.options.props.label">
            <template slot="prepend">{{ $t('fm.config.widget.label') }}</template>
          </el-input>
          <el-input size="mini" style="" v-model="data.options.props.children">
            <template slot="prepend">{{ $t('fm.config.widget.childrenOption') }}</template>
          </el-input>
        </div>
      </el-form-item>

      <el-form-item
        :label="$t('fm.config.widget.defaultValue')"
        v-if="
          Object.keys(data.options).indexOf('defaultValue') >= 0 &&
          (data.type == 'textarea' ||
            data.type == 'input' ||
            data.type == 'rate' ||
            data.type == 'color' ||
            data.type == 'switch' ||
            data.type == 'text')
        "
      >
        <el-input
          v-if="data.type == 'textarea'"
          type="textarea"
          :rows="5"
          v-model="data.options.defaultValue"
        ></el-input>
        <el-input v-if="data.type == 'input'" v-model="data.options.defaultValue"></el-input>
        <el-rate
          v-if="data.type == 'rate'"
          style="display: inline-block; vertical-align: middle"
          :max="data.options.max"
          :allow-half="data.options.allowHalf"
          v-model="data.options.defaultValue"
        ></el-rate>
        <el-button
          type="text"
          v-if="data.type == 'rate'"
          style="display: inline-block; vertical-align: middle; margin-left: 10px"
          @click="data.options.defaultValue = 0"
          >{{ $t('fm.actions.clear') }}</el-button
        >
        <el-color-picker
          v-if="data.type == 'color'"
          v-model="data.options.defaultValue"
          :show-alpha="data.options.showAlpha"
        ></el-color-picker>
        <el-switch v-if="data.type == 'switch'" v-model="data.options.defaultValue"></el-switch>
        <el-input v-if="data.type == 'text'" v-model="data.options.defaultValue"></el-input>
      </el-form-item>

      <el-form-item
        :label="$t('fm.config.widget.maxlength')"
        v-if="data.type == 'textarea' || data.type == 'input'"
      >
        <el-input-number v-model="data.options.maxlength" :min="-1"></el-input-number>
      </el-form-item>
      <el-form-item
        :label="$t('fm.config.widget.showWordLimit')"
        v-if="data.type == 'textarea' || data.type == 'input'"
      >
        <el-switch v-model="data.options.showWordLimit"></el-switch>
      </el-form-item>

      <template v-if="data.type == 'time' || data.type == 'date'">
        <el-form-item :label="$t('fm.config.widget.showType')" v-if="data.type == 'date'">
          <el-select v-model="data.options.type">
            <el-option value="year"></el-option>
            <el-option value="month"></el-option>
            <el-option value="date"></el-option>
            <el-option value="dates"></el-option>
            <!-- <el-option value="week"></el-option> -->
            <el-option value="datetime"></el-option>
            <el-option value="datetimerange"></el-option>
            <el-option value="daterange"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('fm.config.widget.isRange')" v-if="data.type == 'time'">
          <el-switch v-model="data.options.isRange"> </el-switch>
        </el-form-item>
        <el-form-item :label="$t('fm.config.widget.isTimestamp')" v-if="data.type == 'date'">
          <el-switch v-model="data.options.timestamp"> </el-switch>
        </el-form-item>
        <el-form-item
          :label="$t('fm.config.widget.placeholder')"
          v-if="
            (!data.options.isRange && data.type == 'time') ||
            (data.type != 'time' &&
              data.options.type != 'datetimerange' &&
              data.options.type != 'daterange')
          "
        >
          <el-input v-model="data.options.placeholder"></el-input>
        </el-form-item>
        <el-form-item
          :label="$t('fm.config.widget.startPlaceholder')"
          v-if="
            data.options.isRange ||
            data.options.type == 'datetimerange' ||
            data.options.type == 'daterange'
          "
        >
          <el-input v-model="data.options.startPlaceholder"></el-input>
        </el-form-item>
        <el-form-item
          :label="$t('fm.config.widget.endPlaceholder')"
          v-if="
            data.options.isRange ||
            data.options.type == 'datetimerange' ||
            data.options.type == 'daterange'
          "
        >
          <el-input v-model="data.options.endPlaceholder"></el-input>
        </el-form-item>
        <el-form-item :label="$t('fm.config.widget.format')">
          <el-input v-model="data.options.format"></el-input>
        </el-form-item>
        <el-form-item
          :label="$t('fm.config.widget.defaultValue')"
          v-if="data.type == 'time' && Object.keys(data.options).indexOf('isRange') >= 0"
        >
          <el-time-picker
            key="1"
            style="width: 100%"
            v-if="!data.options.isRange"
            v-model="data.options.defaultValue"
            :arrowControl="data.options.arrowControl"
            :value-format="data.options.format"
          >
          </el-time-picker>
          <el-time-picker
            key="2"
            v-if="data.options.isRange"
            style="width: 100%"
            v-model="data.options.defaultValue"
            is-range
            :arrowControl="data.options.arrowControl"
            :value-format="data.options.format"
          >
          </el-time-picker>
        </el-form-item>
      </template>

      <template v-if="data.type == 'imgupload'">
        <el-form-item :label="$t('fm.config.widget.limit')">
          <el-input type="number" v-model.number="data.options.length"></el-input>
        </el-form-item>
        <el-form-item :label="$t('fm.config.widget.isQiniu')">
          <el-switch v-model="data.options.isQiniu"></el-switch>
        </el-form-item>
        <template v-if="data.options.isQiniu">
          <el-form-item label="Domain" :required="true">
            <el-input v-model="data.options.domain"></el-input>
          </el-form-item>
          <el-form-item :label="$t('fm.config.widget.tokenFunc')" :required="true">
            <el-input v-model="data.options.tokenFunc"></el-input>
          </el-form-item>
        </template>
        <template v-else>
          <el-form-item :label="$t('fm.config.widget.imageAction')" :required="true">
            <el-input v-model="data.options.action"></el-input>
          </el-form-item>
        </template>
      </template>

      <template v-if="data.type == 'blank'">
        <el-form-item :label="$t('fm.config.widget.defaultType')">
          <el-select v-model="data.options.defaultType">
            <el-option value="String" :label="$t('fm.config.widget.string')"></el-option>
            <el-option value="Object" :label="$t('fm.config.widget.object')"></el-option>
            <el-option value="Array" :label="$t('fm.config.widget.array')"></el-option>
          </el-select>
        </el-form-item>
      </template>

      <template v-if="data.type == 'grid'">
        <el-form-item :label="$t('fm.config.widget.gutter')">
          <el-input type="number" v-model.number="data.options.gutter"></el-input>
        </el-form-item>
        <el-form-item :label="$t('fm.config.widget.columnOption')">
          <draggable
            tag="ul"
            :list="data.columns"
            v-bind="{ group: { name: 'options' }, ghostClass: 'ghost', handle: '.drag-item' }"
            handle=".drag-item"
          >
            <li v-for="(item, index) in data.columns" :key="index">
              <i class="drag-item" style="font-size: 16px; margin: 0 5px; cursor: move"
                ><i class="iconfont icon-icon_bars"></i
              ></i>
              <el-input
                :placeholder="$t('fm.config.widget.span')"
                size="mini"
                style="width: 100px"
                type="number"
                v-model.number="item.span"
              ></el-input>

              <el-button
                @click="handleOptionsRemove(index)"
                circle
                plain
                type="danger"
                size="mini"
                icon="el-icon-minus"
                style="padding: 4px; margin-left: 5px"
              ></el-button>
            </li>
          </draggable>
          <div style="margin-left: 22px">
            <el-button type="text" @click="handleAddColumn">{{
              $t('fm.actions.addColumn')
            }}</el-button>
          </div>
        </el-form-item>
        <el-form-item :label="$t('fm.config.widget.justify')">
          <el-select v-model="data.options.justify">
            <el-option value="start" :label="$t('fm.config.widget.justifyStart')"></el-option>
            <el-option value="end" :label="$t('fm.config.widget.justifyEnd')"></el-option>
            <el-option value="center" :label="$t('fm.config.widget.justifyCenter')"></el-option>
            <el-option
              value="space-around"
              :label="$t('fm.config.widget.justifySpaceAround')"
            ></el-option>
            <el-option
              value="space-between"
              :label="$t('fm.config.widget.justifySpaceBetween')"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('fm.config.widget.align')">
          <el-select v-model="data.options.align">
            <el-option value="top" :label="$t('fm.config.widget.alignTop')"></el-option>
            <el-option value="middle" :label="$t('fm.config.widget.alignMiddle')"></el-option>
            <el-option value="bottom" :label="$t('fm.config.widget.alignBottom')"></el-option>
          </el-select>
        </el-form-item>
      </template>

      <template v-if="data.type != 'grid'">
        <el-form-item :label="$t('fm.config.widget.attribute')">
          <el-checkbox
            v-model="data.options.readonly"
            v-if="Object.keys(data.options).indexOf('readonly') >= 0"
            >{{ $t('fm.config.widget.readonly') }}</el-checkbox
          >
          <el-checkbox
            v-model="data.options.disabled"
            v-if="Object.keys(data.options).indexOf('disabled') >= 0"
            >{{ $t('fm.config.widget.disabled') }}
          </el-checkbox>
          <el-checkbox
            v-model="data.options.editable"
            v-if="Object.keys(data.options).indexOf('editable') >= 0"
            >{{ $t('fm.config.widget.editable') }}</el-checkbox
          >
          <el-checkbox
            v-model="data.options.clearable"
            v-if="Object.keys(data.options).indexOf('clearable') >= 0"
            >{{ $t('fm.config.widget.clearable') }}
          </el-checkbox>
          <el-checkbox
            v-model="data.options.arrowControl"
            v-if="Object.keys(data.options).indexOf('arrowControl') >= 0"
            >{{ $t('fm.config.widget.arrowControl') }}</el-checkbox
          >
          <el-checkbox
            v-model="data.options.isDelete"
            v-if="Object.keys(data.options).indexOf('isDelete') >= 0"
            >{{ $t('fm.config.widget.isDelete') }}</el-checkbox
          >
          <el-checkbox
            v-model="data.options.isEdit"
            v-if="Object.keys(data.options).indexOf('isEdit') >= 0"
            >{{ $t('fm.config.widget.isEdit') }}</el-checkbox
          >
        </el-form-item>
        <el-form-item :label="$t('fm.config.widget.validate')">
          <div v-if="Object.keys(data.options).indexOf('required') >= 0">
            <el-checkbox v-model="data.options.required">{{
              $t('fm.config.widget.required')
            }}</el-checkbox>
          </div>
          <el-select
            v-if="Object.keys(data.options).indexOf('dataType') >= 0"
            v-model="data.options.dataType"
            size="mini"
          >
            <el-option value="string" :label="$t('fm.config.widget.string')"></el-option>
            <el-option value="number" :label="$t('fm.config.widget.number')"></el-option>
            <el-option value="boolean" :label="$t('fm.config.widget.boolean')"></el-option>
            <el-option value="integer" :label="$t('fm.config.widget.integer')"></el-option>
            <el-option value="float" :label="$t('fm.config.widget.float')"></el-option>
            <el-option value="url" :label="$t('fm.config.widget.url')"></el-option>
            <el-option value="email" :label="$t('fm.config.widget.email')"></el-option>
            <el-option value="hex" :label="$t('fm.config.widget.hex')"></el-option>
          </el-select>

          <div v-if="Object.keys(data.options).indexOf('pattern') >= 0">
            <el-input
              size="mini"
              class="config-pattern-input"
              v-model.lazy="data.options.pattern"
              style="width: 240px"
              :placeholder="$t('fm.config.widget.patternPlaceholder')"
            >
              <template slot="prepend">/</template>
              <template slot="append">/</template>
            </el-input>
          </div>
        </el-form-item>
      </template>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { VueDraggableNext as draggable } from 'vue-draggable-next';
import { useI18n } from 'vue-i18n';
const { t: $t } = useI18n(); //
const props = defineProps<{
  data: any;
}>();
const validator = reactive<Record<string, any>>({
  type: null,
  required: null,
  pattern: null,
  range: null,
  length: null,
});
const show = computed(() => {
  if (props.data && Object.keys(props.data).length > 0) {
    return true;
  }
  return false;
});

const handleOptionsRemove = (index) => {
  if (props.data.type === 'grid') {
    props.data.columns.splice(index, 1);
  } else {
    props.data.options.options.splice(index, 1);
  }
};
const handleAddOption = () => {
  if (props.data.options.showLabel) {
    props.data.options.options.push({
      value: $t('fm.config.widget.newOption'),
      label: $t('fm.config.widget.newOption'),
    });
  } else {
    props.data.options.options.push({
      value: $t('fm.config.widget.newOption'),
    });
  }
};
const handleAddColumn = () => {
  props.data.columns.push({
    span: '',
    list: [],
  });
};

const generateRule = () => {
  props.data.rules = [];
  Object.keys(validator).forEach((key) => {
    if (validator[key]) {
      props.data.rules.push(validator[key]);
    }
  });
};
const handleSelectMuliple = (value) => {
  if (value) {
    if (props.data.options.defaultValue) {
      props.data.options.defaultValue = [props.data.options.defaultValue];
    } else {
      props.data.options.defaultValue = [];
    }
  } else {
    if (props.data.options.defaultValue.length > 0) {
      props.data.options.defaultValue = props.data.options.defaultValue[0];
    } else {
      props.data.options.defaultValue = '';
    }
  }
};

const validateRequired = (val: boolean) => {
  if (val) {
    validator.required = {
      required: true,
      message: `${props.data.name}${$t('fm.config.widget.validatorRequired')}`,
    };
  } else {
    validator.required = null;
  }

  nextTick(() => {
    generateRule();
  });
};

const validateDataType = (val) => {
  if (!show.value) {
    return false;
  }

  if (val) {
    validator.type = {
      type: val,
      message: props.data.name + $t('fm.config.widget.validatorType'),
    };
  } else {
    validator.type = null;
  }

  generateRule();
};

const valiatePattern = (val) => {
  if (!show.value) {
    return false;
  }

  if (val) {
    validator.pattern = {
      pattern: val,
      message: props.data.name + $t('fm.config.widget.validatorPattern'),
    };
  } else {
    validator.pattern = null;
  }
  generateRule();
};
watch(props.data.options.isRange, (val) => {
  if (typeof val !== 'undefined') {
    if (val) {
      props.data.options.defaultValue = null;
    } else {
      if (Object.keys(props.data.options).indexOf('defaultValue') >= 0)
        props.data.options.defaultValue = '';
    }
  }
});
watch(props.data.options.required, (val) => {
  validateRequired(val);
});
watch(props.data.options.dataType, (val) => {
  validateDataType(val);
});
watch(props.data.options.pattern, (val) => {
  valiatePattern(val);
});
watch(props.data.name, (val) => {
  if (props.data.options) {
    validateRequired(props.data.options.required);
    validateDataType(props.data.options.dataType);
    valiatePattern(props.data.options.pattern);
  }
});
</script>
