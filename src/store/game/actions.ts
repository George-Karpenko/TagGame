import { ActionTree, ActionContext } from "vuex";

// eslint-disable-next-line import/no-cycle
import { RootState } from "../types";
import { State } from "./state";
import { Mutations } from "./mutations";
import { GameMutationTypes } from "./mutation-types";
import { GameActionTypes } from "./action-types";

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<State, RootState>, "commit">;

export interface Actions {
  [GameActionTypes.PAUSE](
    { commit }: AugmentedActionContext,
    payload: boolean
  ): boolean;
  [GameActionTypes.TRIGGER_GAME](
    { commit }: AugmentedActionContext,
    payload: boolean
  ): boolean;
  [GameActionTypes.SEC](
    { commit }: AugmentedActionContext,
    payload: number
  ): boolean;
  [GameActionTypes.COUNT_MOVE](
    { commit }: AugmentedActionContext,
    payload: number
  ): boolean;
}

export const actions: ActionTree<State, RootState> & Actions = {
  [GameActionTypes.PAUSE]({ commit }, pause: boolean) {
    commit(GameMutationTypes.SET_PAUSE, pause);
    return true;
  },
  [GameActionTypes.TRIGGER_GAME]({ commit }, triggerGame: boolean) {
    commit(GameMutationTypes.SET_TRIGGER_GAME, triggerGame);
    return true;
  },
  [GameActionTypes.SEC]({ commit }, sec: number) {
    commit(GameMutationTypes.SET_SEC, sec);
    return true;
  },
  [GameActionTypes.COUNT_MOVE]({ commit }, countMove: number) {
    commit(GameMutationTypes.SET_COUNT_MOVE, countMove);
    return true;
  },
};
