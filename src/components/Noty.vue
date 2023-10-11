<template>
  <TransitionGroup name="fade" tag="div" class="noty">
    <div
      v-for="noty of notyList"
      :key="noty.id"
      class="noty__item"
      :class="getTypeClass(noty.type)"
    >
      <p class="noty__message">{{ noty.message }}</p>
    </div>
  </TransitionGroup>
</template>

<script setup lang="ts">
import { useNotyStore } from "@/store/noty";

import { TNoty } from "@/store/types/INoty";

import { computed } from "vue";

const notyStore = useNotyStore();

const notyList = computed(() => notyStore.notifications);

const getTypeClass = (type: TNoty) => `noty__item_${type}`;
</script>

<style scoped lang="scss">
@import "@assets/styles/components/Noty.scss";
</style>
