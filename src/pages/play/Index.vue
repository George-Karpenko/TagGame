<script setup lang="ts">
import { ref, watch, onMounted, computed, ComputedRef } from "vue";
import store from "@/store";
import Grid from "@/js/games/Class/Grid";
import GameModal from "@/components/GameModal.vue";
import GameHeader from "@/components/GameHeader.vue";
import GameCell from "@/components/Game/GameCell.vue";
import useCells from "@/composables/useCells";
import useTurnBasedGame from "@/composables/useTurnBasedGame";

const tagsColumns: ComputedRef<number> = computed(
  () => store.state.settings.tagsColumns.value
);
const tagsRows: ComputedRef<number> = computed(
  () => store.state.settings.tagsRows.value
);
const { cells } = useCells(tagsColumns.value, tagsRows.value);
const grid = new Grid({
  tagsColumns: tagsColumns.value,
  tagsRows: tagsRows.value,
  cells: cells.value,
});
const {
  isPause,
  isGameEnd,
  countMove,
  audioSrc,
  time,
  defaultVariables,
  basicMoveLogic,
} = useTurnBasedGame(grid);

const img = computed(() => store.state.settings.imgs.value);

const styles = ref({
  "--tags-columns": tagsColumns.value,
  "--tags-rows": tagsRows.value,
  "--aside-x": grid.tagOpacity.x + 1,
  "--aside-y": grid.tagOpacity.y + 1,
  "--background-image": `url(${img.value})`,
  "--no-full-image-opacity": 1,
});

watch(
  () => isGameEnd.value,
  (isGameEnd) => {
    if (isGameEnd) {
      styles.value["--no-full-image-opacity"] = 0;
    } else {
      styles.value["--no-full-image-opacity"] = 1;
      grid.shuffleCells();
    }
  }
);

function startGame() {
  defaultVariables();
}

function triggerPause(value: boolean) {
  isPause.value = value;
}
</script>

<template>
  <div :style="styles" class="game">
    <game-header
      @isPause="triggerPause"
      :isPause="isPause"
      :time="time"
      :countMove="countMove"
      :audioSrc="audioSrc"
    />
    <aside></aside>
    <main>
      <div id="game-board">
        <transition-group name="moving">
          <game-cell
            v-for="cell in cells"
            @click="basicMoveLogic(cell)"
            :key="cell.tag.value"
            :cell="cell"
            :empty-tag="grid.tagOpacity"
            class="tag"
          ></game-cell>
        </transition-group>
      </div>
    </main>
  </div>
  <game-modal
    @startGame="startGame"
    :time="time"
    :countMove="countMove"
    :isGameEnd="isGameEnd"
  />
</template>

<style scoped>
.game {
  --no-full-image-opacity: 1;
  --header-height: 50px;
  --size-foto-and-game-board: min(98vw, calc(45vmax - var(--header-height)));
  --tag-gap: max(0.5vmin, 3px);
  --tag-border-radius: max(1vmin, 5px);
  display: flex;
  flex-wrap: wrap;
  gap: 2vmin;
  height: 100vh;
  align-content: flex-start;
  justify-content: center;
}

main {
  background-image: var(--background-image);
  background-size: 100%;
  background-repeat: no-repeat;
  border-radius: var(--tag-border-radius);
}

#game-board {
  --tag-size-columns: calc(
    (var(--size-foto-and-game-board) + var(--tag-gap)) / var(--tags-columns) -
      var(--tag-gap)
  );
  --tag-size-rows: calc(
    (var(--size-foto-and-game-board) + var(--tag-gap)) / var(--tags-rows) -
      var(--tag-gap)
  );
  display: grid;
  grid-template-columns: repeat(var(--tags-columns), var(--tag-size-columns));
  grid-template-rows: repeat(var(--tags-rows), var(--tag-size-rows));
  gap: var(--tag-gap);
  background-color: #fff;
  opacity: var(--no-full-image-opacity);
  transition: opacity 0.3s;
  height: 100%;
  width: 100%;
}

.tag {
  --tag-background-position-left: calc(
    100% / (var(--tags-columns) - 1) * var(--x)
  );
  --tag-background-position-top: calc(100% / (var(--tags-rows) - 1) * var(--y));
  background-image: var(--background-image);
  border-radius: var(--tag-border-radius);
  background-size: var(--size-foto-and-game-board)
    var(--size-foto-and-game-board);
  background-position: var(--tag-background-position-left)
    var(--tag-background-position-top);
  opacity: var(--opacity);
}

aside {
  width: var(--size-foto-and-game-board);
  height: var(--size-foto-and-game-board);
  background-image: var(--background-image);
  background-size: 100%;
  background-repeat: no-repeat;
  border-radius: var(--tag-border-radius);
}

aside::before {
  --width: calc(100% / var(--tags-columns));
  --height: calc(100% / var(--tags-rows));
  content: "";
  display: block;
  height: var(--height);
  width: var(--width);
  margin-top: calc(var(--height) * (var(--aside-y) - 1) + 1px);
  margin-left: calc(var(--width) * (var(--aside-x) - 1) + 1px);
  background: #fff;
  opacity: var(--no-full-image-opacity);
  transition: opacity 0.3s;
}
.moving-move {
  transition: transform 0.3s;
}
</style>
