<template>
  <div id="listMovies">
    <ul>
      <li
        v-for="movie of MoviesList.results"
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
</template>
<script>
import { mapGetters } from "vuex";

export default {
  name: "listMovie",
  computed: {
    ...mapGetters(["MoviesList"]),
  },
  methods: {
    imagePath: function (poster_path) {
      return poster_path == null
        ? this.$noImagePath
        : `https://image.tmdb.org/t/p/w500/${poster_path}`;
    },
    movieInfo: function (movie) {
      this.$store.commit("MovieSelect", movie);
      this.$router.push(`/movie/${movie.id}`)
    },
  },
};
</script>
<style>
ul {
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
li {
  margin: 10px;
  cursor: pointer;
}
</style>
<style scoped>
li {
  display: block;
  width: 250px;
}
#listMovies {
  width: 80%;
  margin: auto;
  padding: 50px 0;
}
span {
  display: inline-block;
  margin: 20px 0;
}
</style>