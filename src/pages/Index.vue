<template>
  <nav>
    <router-link class="button" to="/play">Играть</router-link>
    <router-link class="button" to="/settings">Настройки</router-link>
  </nav>
</template>

<style scoped>
nav {
  display: flex;
  flex-direction: column;
  gap: 1em;
  max-width: 500px;
  margin: auto;
  padding: 30px;
}
.button {
  font-size: 1.5em;
}
.button:hover {
  background-color: #4caf50;
  color: white;
}
</style>
