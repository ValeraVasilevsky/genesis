<template>
  <div class="form">
    <Input v-model="essenceTitle" placeholder="Название" />
    <Dropdown v-model="selectedEssence" :items="ESSENCES" />

    <Button
      text="Создать"
      @click="handleCreateEssence"
      :disabled="isDisabled"
      :loading="isLoading"
    />
  </div>
</template>

<script setup lang="ts">
import Button from "@components/Button.vue";
import Dropdown from "@components/Dropdown.vue";
import Input from "@components/Input.vue";

import { IEssence, TEssence } from "@/store/types/IEssence";

import { ESSENCES } from "@/constants/essences";

import { useEssenceStore } from "@/store/essences";
import { useNotyStore } from "@/store/noty";

import { ref, Ref, computed } from "vue";

const essencesStore = useEssenceStore();
const notyStore = useNotyStore();
const { createEssence } = essencesStore;
const { msgTemp } = notyStore;

const essenceTitle = ref<string>("");
const selectedEssence = ref(null) as Ref<IEssence | null>;
const isLoading = ref<boolean>(false);

const isDisabled = computed(
  () => !selectedEssence.value || !essenceTitle.value
);

const handleCreateEssence = async () => {
  try {
    isLoading.value = true;

    selectedEssence.value &&
      (await createEssence({
        title: `${essenceTitle.value} - ${selectedEssence.value.title}`,
        type: selectedEssence.value.value as TEssence,
        value: selectedEssence.value.value,
      }));

    msgTemp({ type: "success", message: "Сущность успешно создана" });
  } catch (error) {
    error instanceof Error &&
      msgTemp({ type: "error", message: error.message });
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped lang="scss">
@import "@assets/styles/components/Form.scss";
</style>
