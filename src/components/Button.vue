<template>
  <button
    type="button"
    class="button"
    :class="[buttonColorClass, buttonDisabledClass]"
    :disabled="props.disabled || props.loading"
    @click="emits('click')"
  >
    <span v-if="props.loading" class="button__loader"></span>
    <p v-else class="button__text">{{ props.text }}</p>
  </button>
</template>

<script setup lang="ts">
import { computed } from "vue";

type TButtonColor = "primary" | "secondary";

interface IButton {
  text: string;
  color?: TButtonColor;
  disabled?: boolean;
  loading?: boolean;
}

const props = withDefaults(defineProps<IButton>(), {
  disabled: false,
  loading: false,
  color: "primary",
});
const emits = defineEmits(["click"]);

const buttonColorClass = computed(
  () => props.color === "secondary" && `button_${props.color}`
);
const buttonDisabledClass = computed(() => props.disabled && "button_disabled");
</script>

<style scoped lang="scss">
@import "@assets/styles/components/Button.scss";
</style>
