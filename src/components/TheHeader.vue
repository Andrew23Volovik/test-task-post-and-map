<template>
  <header class="header">
    <nav class="nav container">
      <router-link
        class="nav__link"
        :to="{ name: 'Posts', params: { id: currentPage } }"
        >Posts</router-link
      >
      <router-link class="nav__link" :to="{ name: 'Map' }">Map</router-link>
    </nav>
  </header>
</template>

<script >
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'TheHeaderComponent',

  setup() {
    const store = useStore();
    const currentPage = computed(() => store.getters.getCurrentPage);

    return {
      currentPage,
    };
  },
};
</script>

<style lang="scss" scoped>
.header {
  padding: 1.25rem;
  display: flex;
  height: 4rem;
  background-color: $first-color;

  .nav {
    display: flex;
    align-items: center;
    a {
      text-decoration: none;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: -1px;
      padding: 0 1rem 0.5rem 1rem;
      color: $second-color;
      font-size: 1.25rem;
      line-height: 1.25rem;
      font-weight: 700;
      border-bottom: 1px solid $second-color;
      transition: 0.4s all ease;
      &:hover {
        color: darken($fourth-color, 20%);
        border-bottom-color: darken($fourth-color, 20%);
      }
    }
    a.router-link-active {
      color: $fourth-color;
      border-bottom-color: $fourth-color;
    }
  }
}
</style>