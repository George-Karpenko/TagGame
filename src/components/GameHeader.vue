<script setup lang="ts">
import store from "@/store";
import { ref, watch, onMounted } from "vue";

const props = defineProps({
  countMove: { type: Number, required: true },
  time: { type: String, required: true },
  audioSrc: { type: String, required: true },
  isPause: { type: Boolean, required: true },
});

const emit = defineEmits<{
  (e: "isPause", value: boolean): void;
}>();

const triggerPause = () => {
  emit("isPause", !props.isPause);
};

const gameVolume = store.state.settings.gameVolume;
const audio = ref<HTMLAudioElement>();

onMounted(() => {
  audio.value!.volume = (1 / gameVolume.max) * gameVolume.value;
  watch(
    () => props.countMove,
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
      <div @click="triggerPause()">
        <span class="icon-Play" v-show="isPause"></span>
        <span class="icon-Pause" v-show="!isPause"></span>
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
