<script setup lang="ts">
import BaseModal from "@/components/BaseModal.vue";

defineProps({
  countMove: { type: Number, required: true },
  time: { type: String, required: true },
  isGameEnd: { type: Boolean, required: true },
});

const emit = defineEmits<{
  (e: "startGame"): void;
}>();

const startGame = () => {
  emit("startGame");
};
</script>

<template>
  <base-modal :isOpen="isGameEnd" @close="startGame">
    <template #header>
      <h3>Вы выиграли!</h3>
    </template>
    <template #body>
      <p>Количество ходов: {{ countMove }}</p>
      <p>Время: {{ time }}</p>
    </template>
    <template #footer="{ close }">
      <router-link class="button button-red" :to="{ name: 'Main' }"
        >Назад</router-link
      >
      <button class="button" @click="close">Начать с начала</button>
    </template>
  </base-modal>
</template>

<style scoped></style>
