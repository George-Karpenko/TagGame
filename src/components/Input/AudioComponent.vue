<script setup lang="ts">
import { PropType, ref } from "vue";
interface Option {
  value: string;
  text: string;
}
interface Setting {
  id: string;
  label: string;
  options: Option[];
}
const props = defineProps({
  setting: {
    type: Object as PropType<Setting>,
    required: true,
  },
  modelValue: {
    type: String,
    default: "",
  },
});
const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const checkedValue = ref(props.modelValue);
function updateInput(event: Event) {
  checkedValue.value = (<HTMLInputElement>event.target).value;
  emit("update:modelValue", (<HTMLInputElement>event.target).value);
}
</script>

<template>
  <div>
    <p v-if="setting.label">{{ setting.label }}:</p>
    <div id="grid">
      <template v-for="option in setting.options" :key="option.value">
        <input
          type="radio"
          name="value"
          :value="option.value"
          :id="'' + option.value"
          :checked="checkedValue === option.value"
          @input="updateInput"
        />
        <label :for="option.value">{{ option.text }}</label>
      </template>
    </div>
  </div>
</template>

<style scoped>
label {
  display: block;
  text-align: left;
  font-size: 100% !important;
  font-weight: 100 !important;
}
input {
  margin: 0;
}
#grid {
  display: grid;
  justify-content: center;
  gap: 10px 3.5%;
  grid-template-columns: min(3.5%, 13px) min(91.5%, 437px);
  align-items: center;
}
p {
  text-align: left;
}
</style>
