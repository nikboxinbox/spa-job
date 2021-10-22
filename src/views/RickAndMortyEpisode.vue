<template>
  <div class="episode-page">
    <router-link to="/">Home</router-link>
    <h1>Episode</h1>
    {{ episode }}
    <div class="episode-name">{{ episode.name }}</div>
    <div class="episode-date">{{ episode.air_date }}</div>
    <div class="episode-image-characters">
      <ul class="image-characters-list">
        <li><episode class="characters"></episode></li>
      </ul>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'rick-and-morty-episode',
  data: () => ({
    episodeId: 0,
    episode: null,
  }),
  computed: {
    ...mapGetters(['DATA', 'EPISODES']),
  },
  mounted() {
    this.episodeId = parseInt(this.$route.params.id);
    const episodes = this.EPISODES.results;
    this.episode = episodes.find((c) => c.id === this.episodeId);
    debugger;
  },
};
</script>
