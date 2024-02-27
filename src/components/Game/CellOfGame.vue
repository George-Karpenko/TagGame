<script setup lang="ts">
import { Cell } from "@/Classes/Cell";
const props = defineProps({
  cell: { type: Cell, required: true },
  emptyCell: { type: Cell, required: true },
});
const styles = {
  "--x": props.cell.tag.imgX,
  "--y": props.cell.tag.imgY,
  "--opacity": props.cell === props.emptyCell ? 0 : 1,
};
</script>

<template>
  <button :style="styles">{{ cell.x }}{{ cell.y }}</button>
</template>

<style scoped>
button {
  border: 0;
}
</style>
