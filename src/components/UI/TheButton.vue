<template>
  <button
    :disabled="disabled"
    class="button"
    :class="{ round: icon, disabled: disabled }"
    @click="$emit('clickBtn', $event)"
  >
    <mdicon v-if="icon" :name="iconName" class="button__icon" />
    <div v-else class="button__name">
      <mdicon
        v-if="prependIcon"
        :name="prependIcon"
        class="button__name__prepend"
      />
      <slot></slot>
    </div>
  </button>
</template>

<script>
export default {
  name: 'TheButtonComponent',
  props: {
    icon: {
      type: Boolean,
      required: false,
    },
    iconName: {
      type: String,
      required: false,
    },
    prependIcon: {
      type: String,
      required: false,
    },
    disabled: {
      type: Boolean,
      required: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.button {
  position: relative;
  overflow: hidden;
  border: none;
  padding: 0.3rem;
  margin: 0.5rem 0.3rem;
  background-color: $fourth-color;
  border-radius: 0.3rem;

  transition: 0.1s all ease-out;
  cursor: pointer;
  svg {
    width: 24px;
    height: 24px;
    transform: rotateZ(-90deg);
  }
  &__icon {
    color: $second-color;
  }
  &__name {
    display: flex;
    align-items: center;
    color: $second-color;
    font-size: 16px;
    line-height: 16px;
    padding: 0.2rem 1rem;
    svg {
      width: 16px;
      height: 16px;
      transform: rotateZ(90deg);

      path {
        fill: $second-color;
      }
    }
    &__prepend {
      margin-right: 0.5rem;
    }
  }
}

.button::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 5px;
  height: 5px;
  background: rgba(255, 255, 255, 0.5);
  opacity: 0;
  border-radius: 100%;
  transform: scale(1, 1) translate(-50%);
  transform-origin: 50% 50%;
}

@keyframes ripple {
  0% {
    transform: scale(0, 0);
    opacity: 1;
  }
  20% {
    transform: scale(25, 25);
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: scale(40, 40);
  }
}

button:focus:not(:active)::after {
  animation: ripple 0.7s ease-out;
}

.button.round {
  border-radius: 50%;
}

.button.disabled {
  background-color: darken($fourth-color, 30%);
}
</style>