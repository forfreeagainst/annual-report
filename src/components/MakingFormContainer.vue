<template>
  <el-container class="main-container">
    <el-aside width="250px" class="left-aside">
      <div class="components-list">
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
                    <!--添加后，才有name-->
                    <span>{{ item.name }}</span>
                  </a>
                </li>
              </template>
            </draggable>
        </template>
      </div>
    </el-aside>
    <el-container class="center-container" direction="vertical">
      <el-header class="btn-bar" style="height: 45px">
        <slot name="action"></slot>
        <el-button v-if="upload" link type="primary" :icon="Upload" @click="handleUpload">{{
          $t('fm.actions.import')
        }}</el-button>
        <el-button v-if="clearable" link type="primary" :icon="Delete" @click="handleClear">{{
          $t('fm.actions.clear')
        }}</el-button>
        <el-button v-if="preview" link type="primary" :icon="View" @click="handlePreview">{{
          $t('fm.actions.preview')
        }}</el-button>
        <el-button
          v-if="generateJson"
          link
          type="primary"
          :icon="Tickets"
          @click="handleGenerateJson"
          >{{ $t('fm.actions.json') }}</el-button
        >
        <el-button
          v-if="generateCode"
          link
          type="primary"
          :icon="Document"
          @click="handleGenerateCode"
          >{{ $t('fm.actions.code') }}</el-button
        >
      </el-header>
      <el-main :class="{ 'widget-empty': widgetForm.list.length == 0 }">
        <MateriasLayout
          v-if="!resetJson"
          ref="widgetFormRef"
          :data="widgetForm"
          v-model:select="widgetFormSelect"
        ></MateriasLayout>
      </el-main>
    </el-container>

    <el-aside class="widget-config-container">
      <div class="config-tabs-box">
        <div
          class="config-tab"
          :class="{ active: configTab == 'widget' }"
          @click="handleConfigSelect('widget')"
        >
          {{ $t('fm.config.widget.title') }}
        </div>
        <div
          class="config-tab"
          :class="{ active: configTab == 'form' }"
          @click="handleConfigSelect('form')"
        >
          {{ $t('fm.config.form.title') }}
        </div>
      </div>
      <el-main class="config-content">
        <!-- <widget-config
          v-show="configTab == 'widget'"
          :data="widgetFormSelect"
        ></widget-config> -->
        <form-config v-show="configTab == 'form'" :data="widgetForm.config"></form-config>
      </el-main>
    </el-aside>

    <cus-dialog
      :visible="previewVisible"
      @on-close="previewVisible = false"
      ref="widgetPreviewRef"
      width="1000px"
      form
    >
      <generate-form
        :edit="formEdit"
        @on-change="handleDataChange"
        v-if="previewVisible"
        :data="widgetForm"
        :value="widgetModels"
        :remote="remoteFuncs"
        ref="generateFormRef"
      >
        <template v-slot:blank="scope">
          Width
          <el-input v-model="scope.model.blank.width" style="width: 100px"></el-input> Height
          <el-input v-model="scope.model.blank.height" style="width: 100px"></el-input>
        </template>
      </generate-form>

      <template slot="action">
        <el-button type="primary" @click="handleTest">{{ $t('fm.actions.getData') }}</el-button>
        <el-button @click="formEdit = false" v-if="formEdit">{{
          $t('fm.actions.disabledEdit')
        }}</el-button>
        <el-button @click="formEdit = true" v-else>{{ $t('fm.actions.enabledEdit') }}</el-button>
        <el-button @click="handleReset">{{ $t('fm.actions.reset') }}</el-button>
      </template>
    </cus-dialog>

    <cus-dialog
      :visible="uploadVisible"
      @on-close="uploadVisible = false"
      @on-submit="handleUploadJson"
      ref="uploadJsonRef"
      width="800px"
      form
    >
      <el-alert type="info" :title="$t('fm.description.uploadJsonInfo')"></el-alert>
      <div id="uploadeditor" style="height: 400px; width: 100%">{{ jsonEg }}</div>
    </cus-dialog>

    <cus-dialog
      :visible="jsonVisible"
      @on-close="jsonVisible = false"
      ref="jsonPreview"
      width="800px"
      form
    >
      <div id="jsoneditor" style="height: 400px; width: 100%">{{ jsonTemplate }}</div>

      <template slot="action">
        <el-button type="primary" class="json-btn" :data-clipboard-text="jsonCopyValue">{{
          $t('fm.actions.copyData')
        }}</el-button>
      </template>
    </cus-dialog>

    <cus-dialog
      :visible="codeVisible"
      @on-close="codeVisible = false"
      ref="codePreview"
      width="800px"
      form
      :action="false"
    >
      <!-- <div id="codeeditor" style="height: 500px; width: 100%;">{{htmlTemplate}}</div> -->
      <el-tabs type="border-card" style="box-shadow: none" v-model="codeActiveName">
        <el-tab-pane label="Vue Component" name="vue">
          <div id="vuecodeeditor" style="height: 500px; width: 100%">{{ vueTemplate }}</div>
        </el-tab-pane>
        <el-tab-pane label="HTML" name="html">
          <div id="codeeditor" style="height: 500px; width: 100%">{{ htmlTemplate }}</div>
        </el-tab-pane>
      </el-tabs>
    </cus-dialog>
  </el-container>
  <el-footer class="footer-box"> Powered by：友情链接 </el-footer>
</template>

<script lang="ts" setup>
import { Upload, Delete, View, Tickets, Document } from '@element-plus/icons-vue';
import { VueDraggableNext as draggable } from 'vue-draggable-next';
import WidgetConfig from './WidgetConfig.vue';
import FormConfig from './FormConfig.vue';
import MateriasLayout from './MateriasLayout.vue';
import CusDialog from './CusDialog.vue';
import GenerateForm from './GenerateForm.vue';
// import Clipboard from 'clipboard';
import {
  basicComponents as basicConfig,
  layoutComponents as layoutConfig,
  advanceComponents as advanceConfig,
} from './componentsConfig.ts';
// import request from '../util/request.js';
import generateCodeFn from './generateCode.ts';
import { useI18n } from 'vue-i18n';
const { t: $t, locale } = useI18n();
const props = defineProps({
  preview: {
    type: Boolean,
    default: false,
  },
  generateCode: {
    type: Boolean,
    default: false,
  },
  generateJson: {
    type: Boolean,
    default: false,
  },
  upload: {
    type: Boolean,
    default: false,
  },
  clearable: {
    type: Boolean,
    default: false,
  },
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
    default: () => ['blank', 'imgupload', 'editor', 'cascader'],
  },
  layoutFields: {
    type: Array<string>,
    default: () => ['grid'],
  },
});

const basicComponents = ref(basicConfig);
const layoutComponents = ref(layoutConfig);
const advanceComponents = ref(advanceConfig);
const resetJson = ref(false);
const widgetForm = ref({
  list: [],
  config: {
    labelWidth: 100,
    labelPosition: 'right',
    size: 'small',
  },
});

const configTab = ref('widget');
// ???
const widgetFormSelect = ref(null);
const previewVisible = ref(false);
const jsonVisible = ref(false);
const codeVisible = false;
const uploadVisible = ref(false);
const remoteFuncs = ref({
  func_test(resolve) {
    setTimeout(() => {
      const options = [
        { id: '1', name: '1111' },
        { id: '2', name: '2222' },
        { id: '3', name: '3333' },
      ];

      resolve(options);
    }, 2000);
  },
  funcGetToken(resolve) {
    // request.get('http://tools-server.making.link/api/uptoken').then((res) => {
    //   resolve(res.uptoken);
    // });
  },
  upload_callback(response, file, fileList) {
    console.log('callback', response, file, fileList);
  },
});
const widgetModels = ref(null);
const blank = ref('');
const htmlTemplate = ref('');
const vueTemplate = '';
const jsonTemplate = ref('');
const uploadEditor = null;
const jsonCopyValue = ref('');
const jsonClipboard = ref(null);
const jsonEg = ref(`{
    "list": [],
    "config": {
      "labelWidth": 100,
      "labelPosition": "top",
      "size": "small"
    }
  }`);
const codeActiveName = ref('vue');
const formEdit = true;
// ref
const generateFormRef = ref(null);
const widgetPreviewRef = ref(null);
const uploadJsonRef = ref(null);

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

const handleConfigSelect = (value: string) => {
  configTab.value = value;
};
const handleMoveEnd = (evt) => {
  console.log('end', evt);
};
const handleMoveStart = ({ oldIndex }) => {
  console.log('start', oldIndex, basicComponents.value);
};
const handleMove = () => {
  return true;
};
const handlePreview = () => {
  console.log(widgetForm.value);
  previewVisible.value = true;
};
const handleTest = () => {
  generateFormRef.value &&
    generateFormRef.value
      .getData()
      .then((data) => {
        alert(data).catch((e) => {});
        widgetPreviewRef.value.end();
      })
      .catch((e) => {
        widgetPreviewRef.value.end();
      });
};
const handleReset = () => {
  generateFormRef.value.reset();
};
const handleGenerateJson = () => {
  jsonVisible.value = true;
  jsonTemplate.value = widgetForm.value;
  console.log(JSON.stringify(widgetForm.value));
  nextTick(() => {
    const editor = ace.edit('jsoneditor');
    editor.session.setMode('ace/mode/json');

    if (!jsonClipboard.value) {
      // jsonClipboard.value = new Clipboard('.json-btn');
      // jsonClipboard.value.on('success', (e) => {
      //   ElMessage.success($t('fm.message.copySuccess'));
      // });
    }
    jsonCopyValue.value = JSON.stringify(widgetForm.value);
  });
};

const handleGenerateCode = () => {
  codeVisible.value = true;
  htmlTemplate.value = generateCodeFn(JSON.stringify(widgetForm.value), 'html');
  vueTemplate.value = generateCodeFn(JSON.stringify(widgetForm.value), 'vue');
  nextTick(() => {
    const editor = ace.edit('codeeditor');
    editor.session.setMode('ace/mode/html');

    const vueeditor = ace.edit('vuecodeeditor');
    vueeditor.session.setMode('ace/mode/html');
  });
};
const handleUpload = () => {
  console.log('asdfasd');
  return;
  uploadVisible.value = true;
  nextTick(() => {
    uploadEditor.value = ace.edit('uploadeditor');
    uploadEditor.value.session.setMode('ace/mode/json');
  });
};

const handleUploadJson = () => {
  try {
    setJSON(JSON.parse(uploadEditor.value.getValue()));
    uploadVisible.value = false;
  } catch (e) {
    ElMessage.error(e.message);
    uploadJsonRef.value.end();
  }
};
const handleClear = () => {
  widgetForm.value = {
    list: [],
    config: {
      labelWidth: 100,
      labelPosition: 'right',
      size: 'small',
      customClass: '',
    },
  };

  widgetFormSelect.value = {};
};
const clear = () => {
  handleClear();
};
const getJSON = () => {
  return widgetForm.value;
};
const getHtml = () => {
  return generateCodeFn(JSON.stringify(widgetForm.value));
};

const setJSON = (json) => {
  widgetForm.value = json;

  if (json.list.length > 0) {
    widgetFormSelect.value = json.list[0];
  }
};
const handleInput = (val) => {
  console.log(val);
  blank.value = val;
};
const handleDataChange = (field, value, data) => {
  console.log(field, value, data);
};
// watch(widgetForm.value, (val) {
//   // console.log(this.$refs.widgetForm)
// }, {
//   deep: true
// })
watch(
  () => locale.value,
  (val) => {
    console.log('🚀 ~ watch ~ val:', val);
    _loadComponents();
  },
);

onMounted(() => {
  _loadComponents();
});
</script>

<style lang="scss" scoped>
.footer-box {
  font-weight: 600px;
  height: 30px;
  display: flex;
  justify-content: right;
  align-items: center;
  background-color: #eee;
}
.main-container {
  height: calc(100% - 30px);
  display: flex;
  border: solid 2px gray;
  .center-container {
    border: solid 2px gray;
    .btn-bar {
      border: solid 2px gray;
      display: flex;
      justify-content: flex-end;
    }
  }
  .widget-config-container {
    border: solid 2px gray;
    .config-tabs-box {
      display: flex;
      height: 45px;
      .config-tab {
        display: flex;
        flex: 1;
        justify-content: center;
        align-items: center;
        border-bottom: solid 2px gray;
      }
      .config-tab.active {
        border-bottom: solid 2px rgb(121.3, 187.1, 255);
      }
    }
  }
}
.left-aside{
  overflow: hidden;
}
.components-list{
    padding: 8px 0;
    width: 100%;
    height: 100%;
  
    .widget-cate{
      padding: 8px 12px;
      font-size: 13px;
    }
  
    ul{
      position: relative;
      overflow: hidden;
      padding: 0 10px 10px;
      margin: 0;
    }
  
    .form-edit-widget-label{
      font-size: 12px;
      display: block;
      // width: 48%;
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
      border: 1px solid #F4F6FC;
  
      &:hover{
        color: skyblue;
        border: 1px dashed skyblue;
      }
  
      &>a{
        display: block;
        cursor: move;
        background: #F4F6FC;
        border: 1px solid #F4F6FC;
  
        .icon{
          margin-right: 6px;
          margin-left: 8px;
          font-size: 14px;
          display: inline-block;
          vertical-align: middle;
        }
  
        span{
          display: inline-block;
          vertical-align: middle;
        }
      }
    }
  }
</style>
