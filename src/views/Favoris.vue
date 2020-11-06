<template>
  <div id="favoris" v-if="this.$store.getters.Status == true">
    <Menu></Menu>
    <div class="display">
    <div id="fav">
        <ul>
      <li
        v-for="movie of FavorisMovies.results"
        :key="movie.id"
        :id="`${movie.id}`"
        class="md-elevation-10"
        v-on:click="movieInfo(movie)"
      >
        <img v-bind:src="imagePath(movie.poster_path)" />
        <span>{{movie.title}}</span>
      </li>
    </ul>
    </div>
      <LastMovie></LastMovie>
    </div>
    <Copyright></Copyright>
  </div>
</template>
<script>
import Menu from "@/components/Menu.vue";
import LastMovie from "@/components/LastMovie.vue";
import Copyright from "@/components/Copyright.vue";

import { mapGetters } from "vuex";

export default {
  name: "Favoris",
  components: {
    Menu,
    LastMovie,
    Copyright,
  },
  computed:{
        ...mapGetters(["FavorisMovies"]),
  },
  created:function(){
    this.$store.dispatch("loadFavorisMovies");
  },
  methods:{
        imagePath: function (poster_path) {
      return poster_path == null
        ? this.$noImagePath
        : `https://image.tmdb.org/t/p/w500/${poster_path}`;
    },
    movieInfo: function (movie) {
      this.$store.commit("MovieSelect", movie);
      this.$router.push(`/movie/${movie.id}`)
    },
  }
};
</script>
<style scoped>
li {
  display: block;
  width: 250px;
}
#fav {
  width: 80%;
  margin: auto;
  padding: 50px 0;
}
span {
  display: inline-block;
  margin: 20px 0;
}
</style>