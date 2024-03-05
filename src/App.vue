<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import store from "@/store";
import { SettingsActionTypes } from "@/store/settings/action-types";
import BaseModal from "@/components/BaseModal.vue";

const namespace: string = "settings/";
const music = computed(() => store.state.settings.musicSelection.value);
const musicVolume = computed(() => store.state.settings.musicVolume);
const gameVolume = computed(() => store.state.settings.gameVolume);
const loaded = ref(true);
Promise.all([
  store.dispatch(namespace + SettingsActionTypes.IMGS),
  store.dispatch(namespace + SettingsActionTypes.MUSIC_SELECTION),
]).then((values) => {
  loaded.value = false;
});

const triggerModal = ref(true);
const triggerAudio = ref(false);
const audioMusic = ref<HTMLAudioElement>();
const audioGame = ref<HTMLAudioElement>();

const audioSrc = "/src/assets/music/Звук_Игры.mp3";
onMounted(() => {
  watch(
    () => triggerAudio.value,
    (triggerAudio) => {
      if (triggerAudio) {
        audioMusic.value!.src = music.value;
        audioMusic.value!.play();
        audioMusic.value!.muted = false;
      }
    }
  );
  watch(
    () => music.value,
    () => {
      if (triggerAudio.value) {
        audioMusic.value!.src = music.value;
        audioMusic.value!.currentTime = 0;
        audioMusic.value!.play();
      } else {
        triggerModal.value = true;
      }
    }
  );
  watch(
    () => musicVolume.value.value,
    (volume) => {
      audioMusic.value!.volume = (1 / musicVolume.value.max) * volume;
      if (!triggerAudio.value) {
        triggerModal.value = true;
      }
    }
  );
  watch(
    () => gameVolume.value.value,
    (volume) => {
      if (triggerAudio.value) {
        audioGame.value!.volume = (1 / gameVolume.value.max) * volume;
        audioGame.value!.pause();
        audioGame.value!.currentTime = 0.0;
        audioGame.value!.play();
      }
    }
  );
});
function musicStart(trigger: boolean = false) {
  triggerModal.value = false;
  triggerAudio.value = trigger;
  if (trigger) {
    audioMusic.value!.muted = true;
  }
}
</script>

<template>
  <template v-if="!loaded">
    <audio ref="audioMusic" loop></audio>
    <audio ref="audioGame" :src="audioSrc"></audio>
    <router-view />
    <base-modal
      :is-open="triggerModal"
      @close="musicStart"
      @ok="musicStart(true)"
    >
      <template #header>
        <h3>Согласие на музыку в игре</h3>
      </template>
      <template #body>
        <p>Даёте ли вы согласие на музыку в этой игре?</p>
      </template>
      <template #footer="{ close, confirm }">
        <button class="button button-red" @click="close">Нет</button>
        <button class="button" @click="confirm">Да</button>
      </template>
    </base-modal>
  </template>
</template>

<style>
body {
  margin: 0;
}
#app {
  text-align: center;
}

.button {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  color: black;
  border: 2px solid var(--green);
  padding: 1em 2em;
  text-align: center;
  transition-duration: 0.4s;
  text-decoration: none;
  font-size: 1em;
  cursor: pointer;
}

.button-red {
  border: 2px solid var(--red);
}

.button:hover {
  background-color: var(--green);
  color: white;
}

.button-red:hover {
  background-color: var(--red);
}
</style>
