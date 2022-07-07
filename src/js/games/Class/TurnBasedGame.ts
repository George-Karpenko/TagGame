import { computed, watch } from "vue";
import { Cell } from "./Cell";
import store from "@/store";
import { GameActionTypes } from "@/store/game/action-types";

const namespace: string = "game/";
// TODO Название переменных
let start!: ReturnType<typeof setTimeout>;
const sec = computed<number>({
  get() {
    return store.state.game.sec;
  },
  set(value) {
    return store.dispatch(namespace + GameActionTypes.SEC, value);
  },
});
const isPause = computed<boolean>({
  get() {
    return store.state.game.pause;
  },
  set(value) {
    return store.dispatch(namespace + GameActionTypes.PAUSE, value);
  },
});

const countMove = computed<number>({
  get() {
    return store.state.game.countMove;
  },
  set(value: number) {
    return store.dispatch(namespace + GameActionTypes.COUNT_MOVE, value);
  },
});

const triggerGame = computed<boolean>({
  get() {
    return store.state.game.triggerGame;
  },
  set(value: boolean) {
    return store.dispatch(namespace + GameActionTypes.TRIGGER_GAME, value);
  },
});
watch(
  () => isPause.value,
  (isPause: boolean) => {
    if (!isPause) {
      start = setInterval(() => {
        sec.value++;
      }, 1000);
    } else {
      clearInterval(start);
    }
  }
);
watch(
  () => triggerGame.value,
  (triggerGame: boolean) => {
    isPause.value = !triggerGame;
  }
);

export default abstract class TurnBasedGame {
  // TODO
  // private moves!: object[]

  protected abstract move(cell: Cell): void;
  protected abstract moveCheck(cell: Cell): boolean;
  protected abstract get gameEndCheck(): boolean;

  defaultVariables() {
    isPause.value = false;
    triggerGame.value = true;
    countMove.value = 0;
    sec.value = 0;
    // this.moves = []
  }

  basicMoveLogic(cell: Cell) {
    if (!this.moveCheck(cell) || isPause.value || !triggerGame.value) return;

    this.move(cell);
    countMove.value++;
    triggerGame.value = !this.gameEndCheck;
  }
}
