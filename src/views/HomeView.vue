<template>
  {{ $t('message.hello') }}
  <el-table mb-1 :data="[]" />
  <el-pagination :total="100" />
  <dd></dd>
</template>

<script lang="ts" setup>
import dd from '@/components/WidgetForm.vue';
</script>

<style scoped></style>
