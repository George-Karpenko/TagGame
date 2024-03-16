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
    <label v-if="setting.label" :for="setting.id"> {{ setting.label }}: </label>
    <div id="grid">
      <img
        v-for="option in setting.options"
        :key="option.value"
        :src="option.value"
        @click="updateInput"
        :class="checkedValue == option.value ? 'active' : ''"
      />
    </div>
  </div>
</template>

<style scoped>
label {
  display: block;
  text-align: left;
  margin-bottom: 6px;
}
#grid {
  display: grid;
  gap: 10px 2.5%;
  grid-template-columns: repeat(3, min(31.666666%, 150px));
  justify-content: center;
}
img {
  box-sizing: border-box;
  border: 2px solid #fff;
  width: 100%;
}
img.active {
  border: 2px solid #4caf50;
}
</style>
