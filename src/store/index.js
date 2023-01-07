import { createStore } from 'vuex';
import { HTTP } from '@/services/axios';

export default createStore({
  state: {
    posts: [],
    comments: null,
    currentPage: 1,
    totalItemsOnPages: 10,
    postArrPos: 10,
  },
  getters: {
    getPosts(state) {
      if (state.currentPage === 1) {
        return state.posts.slice(state.currentPage - 1, state.postArrPos);
      } else if (state.currentPage === 10) {
        return state.posts.slice(90, state.postArrPos);
      } else {
        return state.posts.slice(
          state.postArrPos - state.totalItemsOnPages,
          state.postArrPos
        );
      }
    },
    getComments(state) {
      return state.comments;
    },
    getCurrentPage(state) {
      return state.currentPage;
    },
  },
  mutations: {
    setPosts(state, payload) {
      state.posts = payload;
    },
    setComments(state, payload) {
      state.comments = payload;
    },
    filterPosts(state, payload) {
      function order(a, b) {
        if (a.title < b.title) return -1;
        if (a.title > b.title) return 1;
        return 0;
      }
      function reverse(a, b) {
        if (a.title < b.title) return 1;
        if (a.title > b.title) return -1;
        return 0;
      }
      function stringLength(a, b) {
        return b.title.length - a.title.length;
      }

      if (payload === 'order') {
        state.posts = state.posts.sort(order);
      } else if (payload === 'reverse') {
        state.posts = state.posts.sort(reverse);
      } else {
        state.posts = state.posts.sort(stringLength);
      }
    },
    setPagination(state, payload) {
      const arrPos = payload * state.totalItemsOnPages;
      state.currentPage = payload;
      state.postArrPos = arrPos;
    },
  },
  actions: {
    async requestGetPosts({ commit }) {
      try {
        const res = await HTTP.get(`posts`);

        const newArr = res.data.map((el) => ({ ...el, isShow: false }));

        commit('setPosts', newArr);
      } catch (error) {
        console.log(error.message);
      }
    },
    async requestGetComments({ commit }) {
      try {
        const res = await HTTP.get(`comments`);

        commit('setComments', res.data);
      } catch (error) {
        console.log(error.message);
      }
    },
  },
  modules: {},
});
