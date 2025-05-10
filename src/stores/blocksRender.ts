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

    widgetForm.value.list[index].columns[colIndex].list[newIndex] = {
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
        widgetFormSelect.value = widgetForm.value.list[index - 1];
      }
    } else {
      widgetFormSelect.value = widgetForm.value.list[index + 1];
    }
    nextTick(() => {
      widgetForm.value.list.splice(index, 1);
    });
  };
  // 跟handleSelectBlock有区别
  const handleSelectFormItem = (index: number, obj: any) => {
    if (obj.row) {
      widgetFormSelect.value = widgetForm.value.list[obj.row].columns[obj.colIndex].list[index];
    } else {
      widgetFormSelect.value = widgetForm.value.list[index];
    }
  };
  const handleFormItemDelete = (index: number, obj: any) => {
    let data = null;
    if (obj.row) {
      data = widgetForm.value.list[obj.row].columns[obj.colIndex].list;
    } else {
      widgetForm.value.list;
    }
    if (data.length - 1 === index) {
      if (index === 0) {
        widgetFormSelect.value = {};
      } else {
        widgetFormSelect.value = data[index - 1];
      }
    } else {
      widgetFormSelect.value = data[index + 1];
    }

    nextTick(() => {
      if (obj.row) {
        data = widgetForm.value.list[obj.row].columns[obj.colIndex].list.splict(index, 1);
      } else {
        widgetForm.value.list.splice(index, 1);
      }
    });
  };
  const handleFormItemClone = (index: number, obj: any) => {
    const key = new Date().getTime() + '_' + Math.ceil(Math.random() * 99999);
    let data = null;
    if (obj.row) {
      data = widgetForm.value.list[obj.row].columns[obj.colIndex].list;
    } else {
      widgetForm.value.list;
    }

    let cloneData = {
      ...data.list[index],
      options: {
        ...data.list[index].options,
        remoteFunc: 'func_' + key,
      },
      key,
      model: data.list[index].type + '_' + key,
      rules: data.list[index].rules || [],
    };

    if (
      data.list[index].type === 'radio' ||
      data.list[index].type === 'checkbox' ||
      data.list[index].type === 'select'
    ) {
      cloneData = {
        ...cloneData,
        options: {
          ...cloneData.options,
          options: cloneData.options.options.map((item) => ({ ...item })),
        },
      };
    }
    if (obj.row) {
      widgetForm.value.list[obj.row].columns[obj.colIndex].list.splice(index, 0, cloneData);
    } else {
      widgetForm.value.list.splice(index, 0, cloneData);
    }
    nextTick(() => {
      widgetFormSelect.value = data.list[index + 1];
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
    handleSelectFormItem,
    handleFormItemDelete,
    handleFormItemClone,
  };
});
