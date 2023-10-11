<template>
  <div class="essence-table">
    <div class="essence-table__row essence-table__header">
      <div class="essence-table__title">ID</div>
      <div class="essence-table__title">Название</div>
    </div>

    <div class="essence-table__body">
      <div
        class="essence-table__row"
        v-for="essence of essences"
        :key="essence.id"
      >
        <div class="essence-table__value">{{ essence.id }}</div>
        <div class="essence-table__value">{{ essence.title }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useEssenceStore } from "@/store/essences";

import { computed, onMounted } from "vue";

const essenceStore = useEssenceStore();
const { getEssences } = essenceStore;

const essences = computed(() => essenceStore.essences);

onMounted(() => getEssences());
</script>

<style scoped lang="scss">
@import "@assets/styles/components/EssenceTable.scss";
</style>
