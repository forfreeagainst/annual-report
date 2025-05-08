<template>
  <MakingFormContainer
    ref="makingForm"
    :upload="true"
    :preview="true"
    :generate-code="true"
    :generate-json="true"
    :clearable="true"
  >
    <template v-slot:action> </template>
  </MakingFormContainer>
</template>

<script lang="ts" setup>
import MakingFormContainer from '@/components/MakingFormContainer.vue';
const temp = ref({
  a: {
    b:{
      c: 33
    }
  }
})
console.log(temp.value.a);
console.log(temp.value.a.b);
</script>

<style scoped></style>
