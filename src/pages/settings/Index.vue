<script setup lang="ts">
import { computed, onMounted, watch } from "vue";
import { router } from "@/router";
import store from "@/store";
import type { State } from "@/store/settings/state";
import { SettingsActionTypes } from "@/store/settings/action-types";
import InputsComponent from "@/components/Input/InputsComponent.vue";

const namespace: string = "settings/";
const settings = computed<State>({
  get() {
    return store.state.settings;
  },
  set(value) {
    return store.dispatch(namespace + SettingsActionTypes.UP_DATA, value);
  },
});
const initialSettings = JSON.parse(JSON.stringify(settings.value));

function exitInMain(save = false) {
  if (!save) {
    settings.value = initialSettings;
  }
  router.push({ name: "Main" });
}
</script>

<template>
  <div class="container">
    <inputs-component v-model="settings" name="Настройки"></inputs-component>
    <div class="upSetting">
      <button class="button button-red" @click="exitInMain()">Отмена</button>
      <button class="button" @click="exitInMain(true)">Сохранить</button>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: calc(450px + 1vmin);
  min-width: 280px;
  margin: auto;
  padding: 0 20px;
  display: grid;
  gap: 13px;
}

.upSetting {
  margin: auto;
  display: flex;
  gap: 1em;
  margin-top: 15px;
}
</style>
