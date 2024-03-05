import { computed, ref, watch } from "vue";
import { Cell } from "@/js/games/Class/Cell";
import Grid from "@/js/games/Class/Grid";

export default function useTurnBasedGame(grid: Grid) {
  // let start!: ReturnType<typeof setTimeout>;

  const sec = ref(0);
  const isPause = ref(false);
  const isGameEnd = ref(false);
  const countMove = ref(0);
  const audioSrc = "/src/assets/music/Звук_Игры.mp3";

  const time = computed(() => {
    const minuteStr = () => String(Math.trunc(sec.value / 60)).padStart(2, "0");
    const secStr = () => String(sec.value % 60).padStart(2, "0");
    return minuteStr() + ":" + secStr();
  });

  const timer = () =>
    setInterval(() => {
      sec.value++;
    }, 1000);

  let start = timer();

  watch(
    () => isPause.value,
    (isPause: boolean) => {
      if (!isPause) {
        start = timer();
      } else {
        clearInterval(start);
      }
    }
  );
  watch(
    () => isGameEnd.value,
    (isGameEnd: boolean) => {
      if (isGameEnd) {
        isPause.value = true;
      }
    }
  );

  return {
    isPause,
    isGameEnd,
    countMove,
    audioSrc,
    time,
    defaultVariables,
    basicMoveLogic,
  };

  function defaultVariables() {
    isPause.value = false;
    isGameEnd.value = false;
    countMove.value = 0;
    sec.value = 0;
    // this.moves = []
  }

  function basicMoveLogic(cell: Cell) {
    console.log(!grid.moveCheck(cell) || isPause.value || isGameEnd.value);
    if (!grid.moveCheck(cell) || isPause.value || isGameEnd.value) return;

    grid.move(cell);
    countMove.value++;
    isGameEnd.value = grid.gameEndCheck;
  }
}
