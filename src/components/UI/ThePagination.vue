<template>
  <div class="wrapper">
    <nav>
      <ul class="pagination">
        <li class="page-item" @click="onFirstPage">
          <span>First</span>
        </li>
        <li class="page-item" @click="onPreviousPage">
          <a class="page-link">
            <span>&#8656;</span>
          </a>
        </li>
        <li
          class="page-item"
          v-for="(page, idx) in pages"
          :key="idx"
          :class="{ active: isPageActive(page) }"
          @click="onCurrentPage(page)"
        >
          <a class="page-link">{{ page }}</a>
        </li>
        <li class="page-item" @click="onNextPage">
          <a class="page-link">
            <span>&#8658;</span>
          </a>
        </li>
        <li class="page-item" @click="onLastPage">
          <a class="page-link">
            <span>Last</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'ThePaginationComponent',
  props: {
    currentPage: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    totalPages: {
      type: Number,
      required: true,
    },
    maxViewPage: {
      type: Number,
      default: 3,
      required: false,
    },
  },
  setup(props) {
    const store = useStore();

    const startPage = computed(() => {
      if (props.currentPage === 1) {
        return 1;
      }
      if (props.currentPage === props.totalPages) {
        return props.totalPages - props.maxViewPage + 1;
      }
      return props.currentPage - 1;
    });

    const endPage = computed(() =>
      Math.min(startPage.value + props.maxViewPage - 1, props.totalPages)
    );

    const pages = computed(() => {
      const pageArr = [];
      for (let i = startPage.value; i <= endPage.value; i += 1) {
        pageArr.push(i);
      }
      return pageArr;
    });

    function onFirstPage() {
      store.commit('setPagination', 1);
    }

    function onPreviousPage() {
      if (props.currentPage > 1) {
        store.commit('setPagination', props.currentPage - 1);
      }
    }

    function onCurrentPage(page) {
      store.commit('setPagination', page);
    }

    function onNextPage() {
      if (props.currentPage < props.totalPages) {
        store.commit('setPagination', props.currentPage + 1);
      }
    }

    function onLastPage() {
      store.commit('setPagination', props.totalPages);
    }

    function isPageActive(page) {
      return props.currentPage === page;
    }
    return {
      onFirstPage,
      onPreviousPage,
      onCurrentPage,
      onNextPage,
      onLastPage,
      isPageActive,
      pages,
    };
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;

  ul {
    display: flex;
    list-style: none;

    li {
      padding: 0.5rem 1rem;
      color: $second-color;
      font-size: 1rem;
      line-height: 1rem;
      font-weight: 500;
      border: 1px solid $second-color;
      background-color: $first-color;
      transition: 0.3s all linear;
      cursor: pointer;
      &:first-child {
        border-radius: 0.3rem 0 0 0.3rem;
      }
      &:last-child {
        border-radius: 0 0.3rem 0.3rem 0;
      }
      &:hover {
        transform: scale(1.05);
        background-color: $fourth-color;
      }
    }
    li.active {
      background-color: $fourth-color;
    }
  }
}
</style>