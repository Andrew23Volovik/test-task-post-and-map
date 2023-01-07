<template>
  <div class="card" :style="styleObj">
    <slot></slot>
  </div>
</template>

<script>
import { reactive } from 'vue';

export default {
  name: 'TheCardComponent',
  props: {
    color: {
      type: String,
    },
  },
  setup(props) {
    const styleObj = reactive({
      backgroundColor: props.color,
    });
    return { styleObj };
  },
};
</script>

<style lang="scss" scoped>
.card {
  padding: 2rem;
  background-color: $third-color;
  border-radius: 1rem;
  border: 1px solid rgba($second-color, 0.05);
  box-shadow: 2px 2px 5px rgba(243, 246, 244, 0.1);
}
</style>