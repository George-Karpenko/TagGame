<script setup lang="ts">
import { ref, watch, onMounted, computed } from "vue";
import store from "@/store";
import GameModal from "@/components/GameModal.vue";
import GameHeader from "@/components/GameHeader.vue";
import CellOfGame from "@/components/Game/CellOfGame.vue";
import useStartingPositionOfCells from "@/composables/useStartingPositionOfCells";

const tagsColumns = computed(() => store.state.settings.tagsColumns.value);
const tagsRows = computed(() => store.state.settings.tagsRows.value);
const { emptyCell, gridCells } = useStartingPositionOfCells(
  tagsRows.value,
  tagsColumns.value
);
const img = computed(() => store.state.settings.imgs.value);

const styles = {
  "--tags-columns": `${tagsColumns.value}`,
  "--tags-rows": `${tagsRows.value}`,
  "--background-image": `url(${img.value})`,
  "--no-full-image-opacity": "1",
  "--aside-x": `${emptyCell.tag.imgX + 1}`,
  "--aside-y": `${emptyCell.tag.imgY + 1}`,
};

function move(cell) {
  if (
    (cell.x === emptyCell.x && cell.y === emptyCell.y) ||
    (cell.y !== emptyCell.y && cell.x !== emptyCell.x)
  ) {
    return;
  }
  // TODO я не тупой, у клетки должен быть свой x и y
  [gridCells.value[emptyCell.x][emptyCell.y], gridCells.value[cell.x][cell.y]] =
    [
      gridCells.value[cell.x][cell.y],
      gridCells.value[emptyCell.x][emptyCell.y],
    ];
  const { x, y } = emptyCell;
  emptyCell.x = cell.x;
  emptyCell.y = cell.y;
  cell.x = x;
  cell.y = y;
}

// onMounted(() => {
//   game.value!.style.setProperty("--tags-columns", `${tagsColumns.value}`);
//   game.value!.style.setProperty("--tags-rows", `${tagsRows.value}`);
//   // game.value!.style.setProperty("--aside-x", `${grid.tagOpacity.x + 1}`);
//   // game.value!.style.setProperty("--aside-y", `${grid.tagOpacity.y + 1}`);
//   game.value!.style.setProperty("--background-image", `url(${img.value})`);
//   game.value!.style.setProperty("--no-full-image-opacity", "1");

//   // watch(
//   //   () => triggerGame.value,
//   //   (triggerGame) => {
//   //     if (triggerGame) {
//   //       grid.defaultVariables();
//   //       // game.value!.style.setProperty("--aside-x", `${grid.tagOpacity.x + 1}`);
//   //       // game.value!.style.setProperty("--aside-y", `${grid.tagOpacity.y + 1}`);
//   //       game.value!.style.setProperty("--no-full-image-opacity", "1");
//   //       grid.shuffleCells();
//   //     } else {
//   //       game.value!.style.setProperty("--no-full-image-opacity", "0");
//   //     }
//   //   }
//   // );
// });
</script>

<template>
  <div class="game" :style="styles">
    <game-header />
    <aside></aside>
    <main>
      <div id="game-board">
        <transition-group name="moving">
          <template v-for="cells in gridCells">
            <cell-of-game
              v-for="cell in cells"
              @click="move(cell)"
              :key="cell.index"
              :cell="cell"
              :emptyCell="emptyCell"
              class="tag"
            ></cell-of-game>
            <!-- <div
              @click="move(cell)"
              v-for="cell in cells"
              :key="cell.index"
              :style="`
              --x: ${cell.x};
              --y: ${cell.y};
              --opacity: ${cell.index === indexEmptyCell ? 0 : 1}
            `"
              class="tag"
            ></div> -->
          </template>
        </transition-group>
      </div>
    </main>
  </div>
  <!-- <game-modal /> -->
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
