<template>
  <div class="posts" v-if="comments">
    <TheCard>
      <div class="posts__wrapper">
        <TheSelect />
        <TheCard v-for="(post, idx) in posts" :key="idx" :color="'#191b1d'">
          <h3 class="posts__wrapper__title">{{ post.title.toUpperCase() }}</h3>
          <p class="posts__wrapper__text">{{ post.body }}</p>
          <div class="posts__wrapper__btn">
            <TheButton>{{ countOfComments(post.id) }}</TheButton>
            <TheButton
              @click-btn="showChart(post.id, idx)"
              :disabled="isDisabled"
            >
              More
            </TheButton>
          </div>
          <div v-show="post.isShow">
            <canvas :class="`chart-${idx}`"></canvas>
          </div>
        </TheCard>
        <ThePagination
          :currentPage="currentPage"
          :total="100"
          :totalPages="10"
        />
      </div>
    </TheCard>
  </div>
</template>

<script>
import { ref, computed, onBeforeMount, watch } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';

import Chart from 'chart.js/auto';

import TheCard from '@/components/UI/TheCard.vue';
import TheButton from '@/components/UI/TheButton.vue';
import TheSelect from '@/components/UI/TheSelect.vue';
import ThePagination from '@/components/UI/ThePagination.vue';

export default {
  name: 'ThePostsPageComponent',
  components: {
    TheCard,
    TheButton,
    TheSelect,
    ThePagination,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    const posts = computed(() => store.getters.getPosts);
    const comments = computed(() => store.getters.getComments);
    const currentPage = computed(() => store.getters.getCurrentPage);

    const isShow = ref(false);
    const isDisabled = ref(false);
    function showChart(id, chartId) {
      if (isDisabled.value) {
        return 1;
      }
      isDisabled.value = true;
      setTimeout(() => {
        isDisabled.value = false;
      }, 700);

      posts.value.forEach((el) => {
        if (el.id === id) {
          if (el.isShow === false) {
            el.isShow = !el.isShow;
            createChart(chartId, countCharacters.value[chartId]);
          } else {
            chart.value = chart.value.filter((el) => {
              if (+el.ctx.canvas.className.slice(-1) === chartId) {
                el.destroy();
              } else {
                return el;
              }
            });
            el.isShow = false;
          }
        }
      });
    }

    const countCharacters = ref([]);
    function countOfComments(id) {
      const arr = comments.value.filter((el) => {
        if (el.postId === id) {
          return el;
        }
      });

      const count = arr.reduce((acc, el) => {
        acc.push(el.email.length);
        return acc;
      }, []);
      countCharacters.value.push(count);
      return arr.length;
    }

    const chart = ref([]);
    function createChart(id, data) {
      const chartObj = new Chart(document.querySelector('.' + `chart-${id}`), {
        type: 'line',
        data: {
          labels: data.map((_, idx) => idx + 1),
          datasets: [
            {
              label: 'Count of characters',
              data: data.map((row) => row),
              borderColor: '#0e8efe',
              backgroundColor: '#f3f6f4',
              borderWidth: 3,
              tension: 0.2,
            },
          ],
        },
        options: {
          maintainAspectRatio: false,
          scales: {
            x: {
              grid: {
                display: true,
                color: 'rgba(243, 246, 244, 0.1)',
              },
            },
            y: {
              grid: {
                display: true,
                color: 'rgba(243, 246, 244, 0.1)',
              },
            },
          },
        },
      });

      chart.value.push(chartObj);
    }

    watch(
      () => currentPage.value,
      (count, prevCount) => {
        if (count !== prevCount) {
          router.push({ name: 'Posts', params: { id: currentPage.value } });

          chart.value = chart.value.filter((el) => {
            el.destroy();
          });
        }
      }
    );

    onBeforeMount(() => {
      store.commit('setPagination', +route.params.id);
    });

    return {
      posts,
      isShow,
      comments,
      showChart,
      countOfComments,
      isDisabled,
      currentPage,
    };
  },
};
</script>

<style lang="scss" scoped>
.posts {
  padding-top: 2rem;
  padding-bottom: 2rem;
  &__wrapper {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    &__title {
      color: $second-color;
      font-size: 1.5rem;
      line-height: 1.5rem;
      font-weight: 500;
      margin: 0.3rem;
    }
    &__text {
      margin-top: 1rem;
      color: $second-color;
      font-size: 1rem;
      line-height: 1rem;
      font-weight: 300;
      margin: 0.3rem;
    }
    &__btn {
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>