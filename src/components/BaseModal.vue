<script setup lang="ts">
const props = defineProps({
  isOpen: { type: Boolean, required: true },
});

const emit = defineEmits<{
  (e: "close"): void;
  (e: "ok"): void;
}>();
const close = () => {
  emit("close");
};
const confirm = () => {
  emit("ok");
};
</script>

<template>
  <div class="modal-mask" v-if="isOpen">
    <div class="modal-wrapper" @click.self="close">
      <div class="modal-container">
        <div class="modal-header">
          <slot name="header"></slot>
        </div>

        <div class="modal-body">
          <slot name="body"></slot>
        </div>

        <div class="modal-footer">
          <slot name="footer" :close="close" :confirm="confirm">
            <button class="modal-default-button" @click="close">Close</button>
            <button class="modal-default-button" @click="confirm">OK</button>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-footer {
  display: flex;
  justify-content: space-between;
  gap: 1em;
}
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 320px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-default-button {
  display: block;
  margin-top: 1rem;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.5s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
