<template>
  <div>
    <router-link to="/">Home</router-link>
    <h1>One Character</h1>

    <div class="oneCahracter">
      <div class="name">{{ character.name }}</div>
      <div class="species">{{ character.species }}</div>
      <div class="image"><img :src="character.image" alt="" /></div>
      <div class="location">{{ character.location.name }}</div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'rick-and-morty-character',
  data: () => ({
    characterId: 0,
    character: null,
  }),
  computed: {
    ...mapGetters(['DATA']),
  },
  mounted() {
    this.characterId = parseInt(this.$route.params.id);
    const characters = this.DATA.results;
    this.character = characters.find((c) => c.id === this.characterId);
  },
  // categoryName: categoires.find((c) => c.id === record.categoryId),
};
</script>
