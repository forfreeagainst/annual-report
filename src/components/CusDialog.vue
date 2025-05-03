<template>
  <el-dialog
    class="cus-dialog-container"
    :title="title"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    append-to-body
    center
    :width="width"
    ref="elDialog"
    :id="id"
  >
    <span v-if="show">
      <slot></slot>
    </span>

    <span
      v-if="action"
      slot="footer"
      class="dialog-footer"
      v-loading="loading"
      :element-loading-text="loadingText"
    >
      <slot name="action">
        <el-button @click="close">{{ $t('fm.actions.cancel') }}</el-button>
        <el-button type="primary" @click="submit">{{ $t('fm.actions.confirm') }}</el-button>
      </slot>
    </span>
  </el-dialog>
</template>

<script lang="ts" setup>
const props = defineProps({
  visible: Boolean,
  loadingText: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    default: '',
  },
  width: {
    type: String,
    default: '600px',
  },
  form: {
    type: Boolean,
    default: true,
  },
  action: {
    type: Boolean,
    default: true,
  },
});
const show = computed(() => {
  if (props.form) {
    return showForm.value;
  } else {
    return true;
  }
});
const loading = ref(false);
const dialogVisible = ref(props.visible);
const id = ref('dialog_' + new Date().getTime());
const showForm = ref(false);
const close = () => {
  dialogVisible.value = false;
};
const emit = defineEmits(['on-submit', 'on-close']);
const submit = () => {
  loading.value = true;

  emit('on-submit');
};
const end = () => {
  loading.value = false;
};
watch(
  () => dialogVisible.value,
  (val) => {
    if (!val) {
      loading.value = false;
      emit('on-close');
      setTimeout(() => {
        showForm.value = false;
      }, 300);
    } else {
      showForm.value = true;
    }
  },
);
watch(
  () => props.visible,
  (val) => {
    dialogVisible.value = val;
  },
);
</script>

<style lang="scss">
.cus-dialog-container {
  .el-dialog__footer {
    margin: 0 20px;
    // border-top: 1px dashed #ccc;
    padding: 15px 0 16px;
    text-align: center;
    position: relative;

    .dialog-footer {
      display: block;

      .circular {
        display: inline-block;
        vertical-align: middle;
        margin-right: 5px;
        width: 24px;
        height: 24px;
      }

      .el-loading-text {
        display: inline-block;
        vertical-align: middle;
      }

      .el-loading-spinner {
        margin-top: -12px;
      }
    }
  }
}
</style>
