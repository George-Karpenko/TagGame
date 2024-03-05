<script setup lang="ts">
import { Cell, Tag } from "@/js/games/Class/Cell";
const props = defineProps({
  cell: { type: Cell, required: true },
  emptyTag: { type: Tag, required: true },
});
const styles = {
  "--x": props.cell.tag.x,
  "--y": props.cell.tag.y,
  "--opacity": props.cell.tag === props.emptyTag ? 0 : 1,
};
</script>

<template>
  <button :style="styles"></button>
</template>

<style scoped>
button {
  border: 0;
}
</style>
