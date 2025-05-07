<template>
  <div class="form-config-container">
    <el-form label-position="top">
      <el-form-item :label="$t('fm.config.form.labelPosition.title')">
        <el-radio-group v-model="data.labelPosition">
          <el-radio value="left">{{$t('fm.config.form.labelPosition.left')}}</el-radio>
          <el-radio value="right">{{$t('fm.config.form.labelPosition.right')}}</el-radio>
          <el-radio value="top">{{$t('fm.config.form.labelPosition.top')}}</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item :label="$t('fm.config.form.labelWidth')">
        <el-input-number v-model="data.labelWidth" :min="0" :max="200" :step="10"></el-input-number>
      </el-form-item>

      <el-form-item :label="$t('fm.config.form.size')">
        <el-radio-group v-model="data.size">
          <el-radio value="medium">medium</el-radio>
          <el-radio value="small">small</el-radio>
          <el-radio value="mini">mini</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  data: {
    labelWidth: number,
    labelPosition: string,
    size: string
  }
}>();
</script>
