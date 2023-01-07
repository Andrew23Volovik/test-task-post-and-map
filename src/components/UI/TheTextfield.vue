<template>
  <div class="wrapper">
    <label for="input" :class="{ error: errorMsg }">{{ label }}</label>
    <div class="textfield" :class="{ error: errorMsg }">
      <input
        id="input"
        :value="modelValue"
        @input="updateValue"
        type="text"
        class="textfield__input"
        :class="{ error: errorMsg }"
      />
    </div>
    <span
      v-if="errorMsg"
      class="textfield__error"
      :class="{ error: errorMsg }"
      >{{ errorMsg }}</span
    >
  </div>
</template>

<script>
export default {
  name: 'TheTextfieldComponent',
  props: {
    modelValue: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    errorMsg: {
      type: String,
      default: '',
    },
  },
  setup(_, { emit }) {
    function updateValue(e) {
      emit('update:modelValue', e.target.value);
    }
    return { updateValue };
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  label {
    margin: 0.3rem;
    color: $second-color;
    font-size: 1rem;
    line-height: 1rem;
    font-weight: 500;
  }

  .textfield {
    display: flex;
    align-items: center;
    margin: 0.3rem;
    font-size: 16px;
    line-height: 16px;
    background-color: $first-color;
    border: 1px solid $second-color;
    border-radius: 0.3rem;
    transition: 0.3s border-color;
    &:hover,
    &:active,
    &:focus-within {
      border: 1px solid $fourth-color;
    }
    &__input {
      padding: 0.3rem;
      font-size: 16px;
      line-height: 16px;
      width: 100%;
      border: none;
      color: $second-color;
      border-radius: 0.3rem;
      background-color: $first-color;
      &:focus {
        outline: none;
      }
    }
    &__error {
      padding: 0.3rem;
    }
  }

  label.error {
    color: $danger-color;
  }
  .textfield.error {
    border: 1px solid $danger-color;
  }
  span.error {
    color: $danger-color;
  }
}
</style>