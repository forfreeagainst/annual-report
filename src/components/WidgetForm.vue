<template>
  <div class="widget-form-container">
    <div v-if="data.list.length == 0" class="form-empty">
      {{ $t('fm.description.containerEmpty') }}
    </div>
    <el-form
      :size="data.config.size"
      label-suffix=":"
      :label-position="data.config.labelPosition"
      :label-width="data.config.labelWidth + 'px'"
    >
      <draggable
        class=""
        v-model="data.list"
        v-bind="{ group: 'people', ghostClass: 'ghost', animation: 200, handle: '.drag-widget' }"
        @end="handleMoveEnd"
        @add="handleWidgetAdd"
      >
        <transition-group name="fade" tag="div" class="widget-form-list">
          <template v-for="(element, index) in data.list">
            <template v-if="element.type == 'grid'">
              <el-row
                class="widget-col widget-view"
                v-if="element && element.key"
                :key="element.key"
                type="flex"
                :class="{ active: selectWidget.key == element.key }"
                :gutter="element.options.gutter ? element.options.gutter : 0"
                :justify="element.options.justify"
                :align="element.options.align"
                @click.native="handleSelectWidget(index)"
              >
                <el-col
                  v-for="(col, colIndex) in element.columns"
                  :key="colIndex"
                  :span="col.span ? col.span : 0"
                >
                  <draggable
                    v-model="col.list"
                    :no-transition-on-drag="true"
                    v-bind="{
                      group: { name: 'people', put: handlePut },
                      ghostClass: 'ghost',
                      animation: 200,
                      handle: '.drag-widget',
                    }"
                    @end="handleMoveEnd"
                    @add="handleWidgetColAdd($event, element, colIndex)"
                  >
                    <transition-group name="fade" tag="div" class="widget-col-list">
                      <template v-for="(el, i) in col.list">
                        <widget-form-item
                          :key="el.key"
                          v-if="el.key"
                          :element="el"
                          :select.sync="selectWidget"
                          :index="i"
                          :data="col"
                        >
                        </widget-form-item>
                      </template>
                    </transition-group>
                  </draggable>
                </el-col>
                <div
                  class="widget-view-action widget-col-action"
                  v-if="selectWidget.key == element.key"
                >
                  <i class="iconfont icon-trash" @click.stop="handleWidgetDelete(index)"></i>
                </div>

                <div
                  class="widget-view-drag widget-col-drag"
                  v-if="selectWidget.key == element.key"
                >
                  <i class="iconfont icon-drag drag-widget"></i>
                </div>
              </el-row>
            </template>
            <template v-else>
              <widget-form-item
                v-if="element && element.key"
                :key="element.key"
                :element="element"
                :select.sync="selectWidget"
                :index="index"
                :data="data"
              ></widget-form-item>
            </template>
          </template>
        </transition-group>
      </draggable>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { VueDraggableNext as draggable } from 'vue-draggable-next';
import WidgetFormItem from './WidgetFormItem.vue';
const props = defineProps<{
  data: any;
  select: any;
}>();
const selectWidget = ref(props.select);
onMounted(() => {
  document.body.ondrop = function (event) {
    let isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
    if (isFirefox) {
      event.preventDefault();
      event.stopPropagation();
    }
  };
});
const handleMoveEnd = ({ newIndex, oldIndex }) => {
  console.log('index', newIndex, oldIndex);
};
const handleSelectWidget = (index) => {
  console.log(index, '#####');
  selectWidget.value = props.data.list[index];
};
const handleWidgetAdd = (evt) => {
  console.log('add', evt);
  console.log('end', evt);
  const newIndex = evt.newIndex;
  const to = evt.to;
  console.log(to);

  //为拖拽到容器的元素添加唯一 key
  const key = new Date().getTime() + '_' + Math.ceil(Math.random() * 99999);
  props.data.list[newIndex] = {
    ...props.data.list[newIndex],
    options: {
      ...props.data.list[newIndex].options,
      remoteFunc: 'func_' + key,
    },
    key,
    // 绑定键值
    model: props.data.list[newIndex].type + '_' + key,
    rules: [],
  };

  if (
    props.data.list[newIndex].type === 'radio' ||
    props.data.list[newIndex].type === 'checkbox' ||
    props.data.list[newIndex].type === 'select'
  ) {
    props.data.list[newIndex] = {
      ...props.data.list[newIndex],
      options: {
        ...props.data.list[newIndex].options,
        options: props.data.list[newIndex].options.options.map((item) => ({
          ...item,
        })),
      },
    };
  }

  if (props.data.list[newIndex].type === 'grid') {
    props.data.list[newIndex] = {
      ...props.data.list[newIndex],
      columns: props.data.list[newIndex].columns.map((item) => ({ ...item })),
    };
  }

  selectWidget.value = props.data.list[newIndex];
};

const handleWidgetColAdd = ($event, row, colIndex) => {
  console.log('coladd', $event, row, colIndex);
  const newIndex = $event.newIndex;
  const oldIndex = $event.oldIndex;
  const item = $event.item;

  const key = new Date().getTime() + '_' + Math.ceil(Math.random() * 99999);
  row.columns[colIndex].list[newIndex] = {
    ...row.columns[colIndex].list[newIndex],
    options: {
      ...row.columns[colIndex].list[newIndex].options,
      remoteFunc: 'func_' + key,
    },
    key,
    // 绑定键值
    model: row.columns[colIndex].list[newIndex].type + '_' + key,
    rules: [],
  };

  if (
    row.columns[colIndex].list[newIndex].type === 'radio' ||
    row.columns[colIndex].list[newIndex].type === 'checkbox' ||
    row.columns[colIndex].list[newIndex].type === 'select'
  ) {
    row.columns[colIndex].list[newIndex] = {
      ...row.columns[colIndex].list[newIndex],
      options: {
        ...row.columns[colIndex].list[newIndex].options,
        options: row.columns[colIndex].list[newIndex].options.options.map((item) => ({
          ...item,
        })),
      },
    };
  }

  selectWidget.value = row.columns[colIndex].list[newIndex];
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
const handlePut = (a, b, c) => {
  if (
    c.className.split(' ').indexOf('widget-col') >= 0 ||
    c.className.split(' ').indexOf('no-put') >= 0
  ) {
    return false;
  }
  return true;
};

const emit = defineEmits(['update:select']);

watch(props.select, (val) => {
  selectWidget.value = val;
});
watch(
  selectWidget,
  (val) => {
    emit('update:select', val);
  },
  {
    deep: true,
  },
);
</script>
