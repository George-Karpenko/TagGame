<script setup lang="ts">
defineProps({
  label: { type: String, required: true },
  classes: { type: Array<String> || String },
});
</script>

<template>
  <button>{{ label }}</button>
</template>

<style scoped>
button {
  color: black;
  border: 2px solid #4caf50;
  text-align: center;
  text-decoration: none;
  font-size: 16px;
  cursor: pointer;
  padding: 15px 20px;
  transition-duration: 0.4s;
}
button.cancel {
  border: 2px solid #f44336;
}

button:hover {
  background-color: #4caf50;
  color: white;
}

button.cancel:hover {
  background-color: #f44336;
}

button {
  min-width: 130px;
}
</style>
