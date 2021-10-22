import Vue from 'vue';
import VueRouter from 'vue-router';
import RickAndMortyList from '../views/RickAndMortyList.vue';
import RickAndMortyCharacter from '../views/RickAndMortyCharacter.vue';
import RickAndMortyEpisode from '../views/RickAndMortyEpisode.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'RickAndMortyList',
    component: RickAndMortyList,
  },
  {
    path: '/character/:id',
    name: 'RickAndMortyCharacter',
    component: RickAndMortyCharacter,
    props: true,
  },
  {
    path: '/episode/:id',
    name: 'RickAndMortyEpisode',
    component: RickAndMortyEpisode,
    props: true,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
