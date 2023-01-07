<template>
  <select class="select" v-model="selected" @change="selectSort">
    <option value="" selected disabled hidden>Choose here</option>
    <option v-for="(sort, i) in sortingArr" :key="i" :value="sort.value">
      {{ sort.text }}
    </option>
  </select>
</template>

<script>
import { reactive, ref } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'TheSelectComponent',
  setup() {
    const selected = ref('');
    const sortingArr = reactive([
      {
        text: 'Sort A > Z',
        value: 'order',
      },
      {
        text: 'Sort Z > A',
        value: 'reverse',
      },
      {
        text: 'Title length',
        value: 'length',
      },
    ]);

    const store = useStore();
    function selectSort() {
      store.commit('filterPosts', selected.value);
    }

    return { sortingArr, selected, selectSort };
  },
};
</script>

<style lang="scss" scoped>
.select {
  width: 10rem;
  margin: 0.3rem;
  padding: 0.3rem;
  font-size: 16px;
  line-height: 16px;
  color: $second-color;
  background-color: $first-color;
  border: 1px solid $second-color;
  border-radius: 0.3rem;
  transition: 0.3s border-color;
  &:hover,
  &:active,
  &:focus-within {
    border: 1px solid $fourth-color;
  }
  &__option {
    padding: 1rem;
  }
}
</style>