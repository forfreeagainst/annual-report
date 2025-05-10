import { ref, reactive } from 'vue';
import { defineStore } from 'pinia';

export const blocksRender = defineStore('useBlocksRender', () => {
  // TODO 类型定义
  const widgetFormSelect = ref<any>(null);
  const widgetForm = ref<any>({
    list: [],
    config: {
      labelWidth: 100,
      labelPosition: 'right',
      size: 'small',
    },
  });
  const clearRender = () => {
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
  // TODO 不清楚能不能用
  const handleBlockAdd = (newIndex: number) => {
    //为拖拽到容器的元素添加唯一 key
    const key = new Date().getTime() + '_' + Math.ceil(Math.random() * 99999);

    widgetForm.value.list[newIndex] = {
      ...widgetForm.value.list[newIndex],
      options: {
        ...widgetForm.value.list[newIndex].options,
        remoteFunc: 'func_' + key,
      },
      key,
      // 绑定键值
      model: widgetForm.value.list[newIndex].type + '_' + key,
      rules: [],
    };

    if (
      widgetForm.value.list[newIndex].type === 'radio' ||
      widgetForm.value.list[newIndex].type === 'checkbox' ||
      widgetForm.value.list[newIndex].type === 'select'
    ) {
      widgetForm.value.list[newIndex] = {
        ...widgetForm.value.list[newIndex],
        options: {
          ...widgetForm.value.list[newIndex].options,
          options: widgetForm.value.list[newIndex].options.options.map((item) => ({
            ...item,
          })),
        },
      };
    }

    if (widgetForm.value.list[newIndex].type === 'grid') {
      widgetForm.value.list[newIndex] = {
        ...widgetForm.value.list[newIndex],
        columns: widgetForm.value.list[newIndex].columns.map((item) => ({ ...item })),
      };
    }

    widgetFormSelect.value = widgetForm.value.list[newIndex];
  };
  const handleSelectBlock = (index: number) => {
    console.log(index, '#####');
    widgetFormSelect.value = widgetForm.value.list[index];
  };
  const handleBlockColAdd = (row: any, colIndex: number, newIndex: number, index: number) => {
    const key = new Date().getTime() + '_' + Math.ceil(Math.random() * 99999);

    widgetForm.value.list[index].columns.list[newIndex] = {
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
      widgetForm.value.list[index].columns[colIndex].list[newIndex] = {
        ...row.columns[colIndex].list[newIndex],
        options: {
          ...row.columns[colIndex].list[newIndex].options,
          options: row.columns[colIndex].list[newIndex].options.options.map((item) => ({
            ...item,
          })),
        },
      };
    }

    widgetFormSelect.value = row.columns[colIndex].list[newIndex];
  };
  const handleBlockDelete = (index: number) => {
    if (widgetForm.value.list.length - 1 === index) {
      if (index === 0) {
        widgetFormSelect.value = {};
      } else {
        widgetFormSelect.value = this.data.list[index - 1];
      }
    } else {
      widgetFormSelect.value = this.data.list[index + 1];
    }
    nextTick(() => {
      widgetForm.value.list.splice(index, 1);
    });
  };
  return {
    widgetFormSelect,
    widgetForm,
    clearRender,
    handleBlockAdd,
    handleSelectBlock,
    handleBlockColAdd,
    handleBlockDelete,
  };
});
