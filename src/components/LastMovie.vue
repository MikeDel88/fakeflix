<template>
  <div id="LastMovies">
    <h2>Les plus populaires</h2>
    <carousel
      :per-page="1"
      :autoplay="true"
      :paginationEnabled="false"
      :navigate-to="someLocalProperty"
      :mouse-drag="false"
      :speed="100"
      :center-mode="true"
      :loop="true"
    >
      <slide v-for="movie of LastMovie.results" :key="movie.id" :id="`${movie.id}`" class="slide">
        <img v-on:click="movieInfo(movie)" v-bind:src="imagePath(movie.poster_path)" />
      </slide>
    </carousel>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  name: "lastMovies",
  data: function () {
    return {
      someLocalProperty: 0,
    };
  },
  computed: {
    ...mapGetters(["LastMovie"]),
  },
  created: function () {
    this.$store.dispatch("loadLastMoviesList");
  },
  methods: {
    imagePath: function (poster_path) {
      return poster_path == null
        ? this.$noImagePath
        : `https://image.tmdb.org/t/p/w500/${poster_path}`;
    },
    movieInfo: function (movie) {
      this.$store.dispatch("loadMovieVideo", movie.id);
      this.$store.commit("MovieSelect", movie);
      this.$router.push(`/movie/${movie.id}`)
    },
  },
};
</script>
<style scoped>
img {
  display: inline-block;
  width: 100%;
}
#LastMovies {
  width: 20%;
  margin: 0 20px;
}
.slide {
  cursor: pointer;
}
</style>