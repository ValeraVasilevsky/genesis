<template>
  <div ref="dropdown" class="dropdown">
    <div class="dropdown__field" @click="changeListVisible">
      {{ selectedItem }}
    </div>
    <div v-if="isOpen" class="dropdown__list">
      <div
        v-for="item of props.items"
        :key="item.value"
        class="dropdown__item"
        :class="getActiveClass(item.title)"
        @click="handleSelect(item)"
      >
        {{ item.title }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from "vue";
import { onClickOutside } from "@vueuse/core";

import { IDropdownItem } from "@/types/IDropdownItem";

interface ISelect {
  items: IDropdownItem[];
  modelValue: IDropdownItem | null;
}

const props = defineProps<ISelect>();
const emits = defineEmits(["update:modelValue"]);

const defaultItem = ref<IDropdownItem>({ title: "Не выбрано", value: "none" });
const isOpen = ref<boolean>(false);
const dropdown = ref<HTMLDivElement | null>(null);

const selectedItem = computed(
  () => (props.modelValue && props.modelValue.title) || defaultItem.value.title
);

const showList = () => (isOpen.value = true);
const hideList = () => (isOpen.value = false);
const changeListVisible = () => (isOpen.value ? hideList() : showList());

const handleSelect = (selectedItem: IDropdownItem) => {
  emits("update:modelValue", selectedItem);
  hideList();
};
const getActiveClass = (title: string) => {
  return title === selectedItem.value && "dropdown__item_active";
};

onMounted(() => {
  onClickOutside(dropdown.value, () => hideList());

  return () => {
    onClickOutside(dropdown.value, () => hideList());
  };
});
</script>

<style scoped lang="scss">
@import "@assets/styles/components/Dropdown.scss";
</style>
