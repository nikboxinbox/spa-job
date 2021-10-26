import Vue from 'vue';
import Vuex from 'vuex';
import axiosInstance from '@/appi/index.js'; // исправить ошибку в слове api
import {
  CHARACTERS_BY_PAGE,
  // CHARACTERS,
  CHARACTERS_BY_NAME,
  CHARACTERS_BY_STATUS,
  CHARACTERS_BY_NAME_STATUS,
  CHARACTERS_BY_ID,
  EPISODES,
} from '@/appi/routes.js'; // в фигурных скобках можем указывать несколько констант для импорта
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    data: {},
    episodes: {},
  },
  mutations: {
    setData(state, data) {
      state.data = data;
    },

    setEpisodes(state, data) {
      state.episodes = data;
    },
  },
  actions: {
    async fetchData({ commit }, query) {
      if (!query) {
        throw new Error('query is required');
      }
      const page = query.currentPage;
      const queryArray = [];

      if (query.searchNameValue && query.searchNameValue !== '') {
        queryArray.push(`name=${query.searchNameValue}`);
      }
      if (query.select && query.select !== '') {
        queryArray.push(`status=${query.select}`);
      }
      if (query.currentPage) {
        queryArray.push(`page=${query.currentPage}`);
      }

      const ass = queryArray.join('&');

      const queryString = `character${queryArray.length ? '?' : ''}${ass}`;

      const { data } = await axiosInstance.get(queryString);
      commit('setData', data);
    },
    async searchName({ dispatch, commit }, name, currentPage) {
      const { data } = await axiosInstance.get(CHARACTERS_BY_NAME(name));
      commit('setData', data);
    },
    async fetchDatabyStatus({ commit }, status) {
      const { data } = await axiosInstance.get(CHARACTERS_BY_STATUS(status));

      commit('setData', data);
    },
    async searchSelect({ commit }, { name, status }) {
      const { data } = await axiosInstance.get(
        CHARACTERS_BY_NAME_STATUS(name, status)
      );

      commit('setData', data);
    },
    async fetchDataByPage({ commit }, currentPage) {
      const { data } = await axiosInstance.get(CHARACTERS_BY_PAGE(currentPage));

      commit('setData', data);
    },
    // async fetchDataById({ commit }, id) {
    //   const { data } = await axiosInstance.get(CHARACTERS_BY_ID(id));

    //   commit('setData', data);
    // },
    async fetchEpisodes({ commit }) {
      const { data } = await axiosInstance.get(EPISODES());
      commit('setEpisodes', data);
    },
  },

  getters: {
    DATA: (state) => state.data,
    EPISODES: (state) => state.episodes,
  },
});
