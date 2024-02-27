<script setup lang="ts">
import { ref, watch, onMounted, computed } from "vue";
import store from "@/store";
import { GameActionTypes } from "@/store/game/action-types";

const namespace: string = "game/";
const countMove = computed(() => store.state.game.countMove);
// const sec = computed(() => store.state.game.sec);
const time = computed<string>(() => store.getters[namespace + "getTime"]);
const audioSrc = computed(() => store.state.game.audioSrc);
const pause = computed<boolean>({
  get() {
    return store.state.game.pause;
  },
  set(value) {
    return store.dispatch(namespace + GameActionTypes.PAUSE, value);
  },
});

const gameVolume = store.state.settings.gameVolume;
const audio = ref<HTMLAudioElement>();

onMounted(() => {
  audio.value!.volume = (1 / gameVolume.max) * gameVolume.value;
  watch(
    () => countMove.value,
    () => {
      audio.value!.pause();
      audio.value!.currentTime = 0.0;
      audio.value!.play();
    }
  );
});
</script>

<template>
  <audio ref="audio" :src="audioSrc"></audio>
  <header>
    <nav>
      <p>Время: {{ time }}</p>
      <div @click="pause = !pause">
        <span class="icon-Play" v-show="pause"></span>
        <span class="icon-Pause" v-show="!pause"></span>
      </div>
      <p>Количество ходов: {{ countMove }}</p>
      <router-link :to="{ name: 'Main' }"
        ><span class="icon-Menu"></span
      ></router-link>
    </nav>
  </header>
</template>

<style scoped>
[class^="icon-"],
[class*=" icon-"] {
  font-size: 2em;
  cursor: pointer;
}
a {
  text-decoration: none;
  color: inherit;
}
nav {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}
header {
  height: var(--header-height);
  width: 100%;
}
</style>
