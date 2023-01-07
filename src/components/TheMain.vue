<template>
  <main class="main">
    <router-view class="container"></router-view>
  </main>
</template>

<script>
import { useStore } from 'vuex';

export default {
  name: 'TheMainComponent',
  setup() {
    const store = useStore();
    store.dispatch('requestGetPosts');
    store.dispatch('requestGetComments');
    return {};
  },
};
</script>

<style lang="scss" scoped>
.main {
  display: flex;
  align-items: center;
  background: linear-gradient(0deg, $second-color 60%, $first-color 40%);
}
</style>
