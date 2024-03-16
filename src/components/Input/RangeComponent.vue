<script setup lang="ts">
import { PropType, ref } from "vue";
interface Setting {
  id: string;
  label: string;
  min: number;
  max: number;
}
const props = defineProps({
  setting: {
    type: Object as PropType<Setting>,
    required: true,
  },
  modelValue: {
    type: Number,
    default: "",
  },
});
const emit = defineEmits<{
  (e: "update:modelValue", value: number): void;
}>();

const checkedValue = ref(props.modelValue);
function updateInput(event: Event) {
  checkedValue.value = parseInt((<HTMLInputElement>event.target).value);
  emit("update:modelValue", parseInt((<HTMLInputElement>event.target).value));
}
</script>

<template>
  <div>
    <label v-if="setting.label" :for="setting.id">
      {{ setting.label }}
    </label>
    <input
      :id="setting.id"
      :min="setting.min"
      :max="setting.max"
      :value="modelValue"
      @input="updateInput"
      type="range"
    />
  </div>
</template>

<style scoped>
div {
  display: flex;
  align-items: center;
}
label {
  width: calc(100% - 137px);
  display: inline-block;
  text-align: left;
}
input {
  width: 133px;
  margin: 2px;
}
</style>
