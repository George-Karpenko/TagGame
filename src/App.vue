<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import store from "@/store";
import { SettingsActionTypes } from "@/store/settings/action-types";
import BaseModal from "@/components/BaseModal.vue";

const namespace: string = "settings/";
const music = computed(() => store.state.settings.musicSelection.value);
const musicVolun = computed(() => store.state.settings.musicVolume);
const loaded = ref(true);
Promise.all([
  store.dispatch(namespace + SettingsActionTypes.IMGS),
  store.dispatch(namespace + SettingsActionTypes.MUSIC_SELECTION),
]).then((values) => {
  loaded.value = false;
});

const triggerModal = ref(true);
const triggerAudio = ref(false);
const audio = ref<HTMLAudioElement>();
onMounted(() => {
  watch(
    () => triggerAudio.value,
    (triggerAudio) => {
      if (triggerAudio) {
        audio.value!.src = music.value;
        audio.value!.play();
        audio.value!.muted = false;
      }
    }
  );
  watch(
    () => music.value,
    () => {
      if (triggerAudio.value) {
        console.log(audio.value);
        audio.value!.src = music.value;
        audio.value!.currentTime = 0;
        audio.value!.play();
      } else {
        triggerModal.value = true;
      }
    }
  );
  watch(
    () => musicVolun.value.value,
    (musicVolume) => {
      audio.value!.volume = (1 / musicVolun.value.max) * musicVolume;
      if (!triggerAudio.value) {
        triggerModal.value = true;
      }
    }
  );
});
function musicStart(trigger: boolean = false) {
  triggerModal.value = false;
  triggerAudio.value = trigger;
  if (trigger) {
    audio.value!.muted = true;
  }
}
</script>

<template>
  <template v-if="!loaded">
    <audio ref="audio" loop></audio>
    <router-view />
    <base-modal :is-open="triggerModal" @close="musicStart" @ok="musicStart(true)">
      <template #header>
        <h3>Согласие на музыку в игре</h3>
      </template>
      <template #body>
        <p>Даёте ли вы согласие на музыку в этой игре?</p>
      </template>
      <template #footer="{ close, confirm }">
        <button @click="confirm">Да</button>
        <button @click="close">Нет</button>
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

.borderSelected {
  border: 2px solid #4caf50;
  box-sizing: border-box;
}
.border {
  border: 2px solid white;
  box-sizing: border-box;
}
button,
.button {
  background-color: white;
  color: black;
  border: 2px solid #4caf50;
  padding: 0px 7px;
  text-align: center;
  -webkit-transition-duration: 0.4s;
  transition-duration: 0.4s;
  margin: 16px 0 !important;
  text-decoration: none;
  font-size: 16px;
  cursor: pointer;
}
</style>
