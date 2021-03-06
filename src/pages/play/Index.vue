<script setup lang="ts">
import { ref, watch, onMounted, computed } from "vue";
import store from "@/store";
import Grid from "@/js/games/Class/Grid";
import GameModal from "@/components/GameModal.vue";
import GameHeader from "@/components/GameHeader.vue";

const grid = new Grid();
const triggerGame = computed(() => store.state.game.triggerGame);

const tagsColumns = computed(() => store.state.settings.tagsColumns.value);
const tagsRows = computed(() => store.state.settings.tagsRows.value);
const img = computed(() => store.state.settings.imgs.value);

const game = ref<HTMLElement>();

onMounted(() => {
  game.value!.style.setProperty("--tags-columns", `${tagsColumns.value}`);
  game.value!.style.setProperty("--tags-rows", `${tagsRows.value}`);
  game.value!.style.setProperty("--aside-x", `${grid.tagOpacity.x + 1}`);
  game.value!.style.setProperty("--aside-y", `${grid.tagOpacity.y + 1}`);
  game.value!.style.setProperty("--background-image", `url(${img.value})`);
  game.value!.style.setProperty("--no-full-image-opacity", "1");

  watch(
    () => triggerGame.value,
    (triggerGame) => {
      if (triggerGame) {
        grid.defaultVariables();
        game.value!.style.setProperty("--aside-x", `${grid.tagOpacity.x + 1}`);
        game.value!.style.setProperty("--aside-y", `${grid.tagOpacity.y + 1}`);
        game.value!.style.setProperty("--no-full-image-opacity", "1");
        grid.shuffleCells();
      } else {
        game.value!.style.setProperty("--no-full-image-opacity", "0");
      }
    }
  );
});
</script>

<template>
  <div ref="game" class="game">
    <game-header />
    <aside></aside>
    <main>
      <div id="game-board">
        <transition-group name="moving">
          <div
            v-for="cell in grid.cells"
            @click="grid.basicMoveLogic(cell)"
            :key="cell.tag.value"
            :style="`
              --x: ${cell.tag.x};
              --y: ${cell.tag.y};
              --opacity: ${cell.tag.value === grid.tagOpacity.value ? 0 : 1}
            `"
            class="tag"
          ></div>
        </transition-group>
      </div>
    </main>
  </div>
  <game-modal />
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
