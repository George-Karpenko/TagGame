import { GetterTree } from "vuex";

import { RootState } from "../types";

import { State } from "./state";

export type Getters = {
  getPause(state: State): boolean;
  getTriggerGame(state: State): boolean;
  getSec(state: State): number;
  getTime(state: State): string;
  getCountMove(state: State): number;
};

export const getters: GetterTree<State, RootState> & Getters = {
  getPause: (state) => state.pause,
  getTriggerGame: (state) => state.triggerGame,
  getSec: (state) => state.sec,
  getTime: function (state) {
    const minuteStr = () => String(Math.trunc(state.sec / 60)).padStart(2, "0");
    const secStr = () => String(state.sec % 60).padStart(2, "0");
    return minuteStr() + ":" + secStr();
  },
  getCountMove: (state) => state.countMove,
};
