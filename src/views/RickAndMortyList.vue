<template>
  <div>
    <!-- <метод get прочитать> -->

    Rick and Morty

    <form @submit.prevent="getSearchName">
      <div class="search-name">
        <input type="text" v-model="searchNameValue" />

        <button type="reset" @click="updateDate">x</button>

        <button type="submit" class="search-btn">Поиск</button>
      </div>
      <div class="select-status">
        <select v-model="select" @click="selectOption">
          <option v-for="option of options" :key="option.id">
            {{ option }}
          </option>
        </select>
        <button type="reset" @click="updateDate">x</button>
      </div>
    </form>
    <table>
      <thead>
        <th>Имя</th>
        <th>Разновидность</th>
        <th>Картинка</th>
        <th>Эпизоды</th>
      </thead>

      <tbody>
        <tr v-for="character of DATA.results" :key="character.id">
          <td>
            <a :href="character.url">{{ character.name }}</a>
          </td>
          <td>{{ character.species }}</td>
          <td><img :src="character.image" alt="" /></td>
          <td>
            <ul
              v-for="episode of character.episode.slice(0, 4)"
              :key="episode.id"
            >
              <li>{{ episode }}</li>
            </ul>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axiosInstance from '@/appi/index.js'; // исправить ошибку в слове api
import { CHARACTERS_BY_PAGE } from '@/appi/routes.js';
import { mapGetters, mapActions } from 'vuex';
export default {
  name: 'rick-and-morty-list',
  data: () => ({
    searchNameValue: '',
    resultSearchName: '',
    options: ['alive', 'dead', 'unknown'],
    select: '',
  }),
  computed: {
    ...mapGetters(['DATA', 'SEARCH_NAME_VALUE']),
  },

  async created() {
    await this.$store.dispatch('fetchData');
  },
  mounted() {},
  methods: {
    async selectOption() {
      const name = this.searchNameValue;
      const status = this.select;
      if (this.select & !this.searchNameValue) {
        await this.$store.dispatch('fetchDatabyStatus', status);
      } else {
        await this.$store.dispatch('searchSelect', { name, status });
      }
    },
    async getSearchName() {
      const name = this.searchNameValue;
      const status = this.select;
      if (!this.select & this.searchNameValue) {
        await this.$store.dispatch('searchName', name);
      } else {
        await this.$store.dispatch('searchSelect', { name, status });
      }
    },

    async updateDate() {
      await this.$store.dispatch('fetchData');
      this.searchNameValue = '';
      this.select = '';
    },
  },
};
</script>
