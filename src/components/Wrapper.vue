<template>
  <div class="wrapper">
    <Form class="wrapper__form" />
    <EssenceTable class="wrapper__table" />
  </div>
</template>

<script setup lang="ts">
import EssenceTable from "@components/EssenceTable.vue";
import Form from "@components/Form.vue";
</script>

<style scoped lang="scss">
@import "@assets/styles/components/Wrapper.scss";
</style>
