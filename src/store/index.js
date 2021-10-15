import Vue from 'vue';
import Vuex from 'vuex';
import axiosInstance from '@/appi/index.js'; // исправить ошибку в слове api
import {
  CHARACTERS_BY_PAGE,
  CHARACTERS,
  CHARACTERS_BY_NAME,
  CHARACTERS_BY_STATUS,
  CHARACTERS_BY_NAME_STATUS,
} from '@/appi/routes.js'; // в фигурных скобках можем указывать несколько констант для импорта
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    data: {},
    searchNameValue: '',
  },
  mutations: {
    setData(state, data) {
      state.data = data;
    },
    setSearchValue(state, searchValue) {
      state.searchNameValue = searchValue;
    },
  },
  actions: {
    async fetchData({ dispatch, commit }) {
      const { data } = await axiosInstance.get(CHARACTERS());
      commit('setData', data);
    },
    async searchName({ dispatch, commit }, name) {
      const { data } = await axiosInstance.get(CHARACTERS_BY_NAME(name));
      commit('setData', data);
    },
    async fetchDatabyStatus({ dispatch, commit }, status) {
      const { data } = await axiosInstance.get(CHARACTERS_BY_STATUS(status));

      commit('setData', data);
    },
    async searchSelect({ dispatch, commit }, { name, status }) {
      const { data } = await axiosInstance.get(
        CHARACTERS_BY_NAME_STATUS(name, status)
      );

      commit('setData', data);
    },
  },
  getters: {
    DATA: (state) => state.data,
    SEARCH_NAME_VALUE: (state) => state.searchNameValue,
  },
});
