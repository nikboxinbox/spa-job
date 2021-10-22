<template>
  <div>
    >
    <!-- ЭПИЗОДЫ сделать  -->
    <!-- СДелать Коммит -->
    <!-- <метод get прочитать> -->
    <!-- Доделать Пагинацию -->

    Rick and Morty

    <form @submit.prevent="fetchData">
      <div class="search-name">
        <input type="text" v-model="searchNameValue" />

        <button type="reset" @click="resetData">x</button>

        <button type="submit" class="search-btn">Поиск</button>
      </div>
      <div class="select-status">
        <select v-model="select" @click="fetchData">
          <option v-for="option of options" :key="option.id">
            {{ option }}
          </option>
        </select>
        <!-- <button type="reset" @click="fetchData">x</button> -->
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
            <router-link :to="`/character/${character.id}`">{{
              character.name
            }}</router-link>
          </td>
          <td>{{ character.species }}</td>
          <td><img :src="character.image" alt="" /></td>
          <td>
            <ul
              v-for="episode of EPISODES.results.slice(0, 4)"
              :key="episode.id"
            >
              <li>
                <router-link :to="`/episode/${episode.id}`">
                  {{ episode.name }}</router-link
                >
              </li>
            </ul>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="!searchNameValue" class="pagination-block">
      <paginate
        v-model="currentPage"
        :page-count="34"
        :page-range="3"
        :margin-pages="2"
        :click-handler="clickPagination"
        :prev-text="'Prev'"
        :next-text="'Next'"
        :container-class="'pagination'"
        :page-class="'page-item'"
      ></paginate>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Paginate from 'vuejs-paginate';

export default {
  components: {
    Paginate,
  },
  name: 'rick-and-morty-list',
  data: () => ({
    searchNameValue: '',
    options: ['alive', 'dead', 'unknown'],
    select: '',
    currentPage: 1,
  }),
  computed: {
    ...mapGetters(['DATA', 'EPISODES']),
    query() {
      return { searchNameValue: this.searchNameValue, select: this.select };
    },

    // pages() {
    //   return this.$store.state.pages;
    // },
  },

  async created() {
    await this.fetchData();
  },
  async mounted() {
    await this.$store.dispatch('fetchEpisodes');
  },
  methods: {
    // async selectOption() {
    //   const name = this.searchNameValue;
    //   const status = this.select;
    //   if (this.select & !this.searchNameValue) {
    //     await this.$store.dispatch('fetchDatabyStatus', status);
    //   } else {
    //     await this.$store.dispatch('searchSelect', { name, status });
    //   }
    // },
    async getSearchName() {
      const name = this.searchNameValue;
      const status = this.select;

      if (!this.select & this.searchNameValue) {
        await this.$store.dispatch('searchName', name);
      } else {
        await this.$store.dispatch('searchSelect', { name, status });
      }
    },

    async resetData() {
      this.searchNameValue = '';
      this.select = '';
      this.fetchData();
    },
    async fetchData() {
      const ass = await this.$store.dispatch('fetchData', this.query);
    },
    async clickPagination() {
      const currentPage = this.currentPage;
      await this.$store.dispatch('fetchDataByPage', currentPage);
    },
    // async characterPageId(character) {
    //   const id = character.id;
    //   const ass = await this.$store.dispatch('fetchDataById', id);
    // },
  },
};
</script>
<style scoped></style>
