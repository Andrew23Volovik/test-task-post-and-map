<template>
  <div class="modal-backdrop">
    <div class="modal">
      <div class="modal__header" :class="{ error: error }">
        <slot name="header"></slot>
      </div>
      <div class="modal__main">
        <slot name="main"></slot>
      </div>
      <div class="modal__footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TheModalComponent',
  props: {
    error: {
      type: Boolean,
    },
  },
};
</script>

<style lang="scss" scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99;

  .modal {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem 1rem;
    width: 32rem;
    background-color: $third-color;
    border-radius: 1rem;
    border: 1px solid rgba($second-color, 0.05);
    box-shadow: 2px 2px 5px rgba(243, 246, 244, 0.1);
    z-index: 100;
    &__header {
      color: $second-color;
      font-size: 16px;
      line-height: 16px;
      font-weight: 300;
      margin-bottom: 0.3rem;
      text-align: center;
    }
    &__main {
      flex: 1;
      width: 100%;
      align-self: start;
    }
  }
  .error {
    color: $danger-color;
    font-size: 1.25rem;
    line-height: 1.25rem;
    font-weight: 500;
  }
}
</style>