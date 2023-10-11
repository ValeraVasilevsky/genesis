<template>
  <div class="input__wrapper">
    <input
      type="text"
      class="input"
      :value="props.modelValue"
      :placeholder="props.placeholder"
      @input="handleInput"
    />
  </div>
</template>

<script setup lang="ts">
interface IInputProps {
  modelValue: string;
  placeholder: string;
}

const props = defineProps<IInputProps>();
const emits = defineEmits(["update:modelValue"]);

const handleInput = (e: Event) =>
  emits("update:modelValue", (e.target as HTMLInputElement).value);
</script>

<style scoped lang="scss">
@import '@assets/styles/components/Input.scss';
</style>
