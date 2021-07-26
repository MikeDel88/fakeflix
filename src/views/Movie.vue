<template>
  <div id="movie" v-if="this.$store.getters.Status == true">
    <Menu></Menu>
    <h2>{{ MovieSelect.title }}</h2>
    <iframe v-if="VideoMovie.videoId != ''" v-bind:src="video(VideoMovie.videoId)"></iframe>
    <img v-else v-bind:src="imagePath(MovieSelect.poster_path)" />
    <p>{{ MovieSelect.overview }}</p>
    <div>
      <span>Popularité : {{ MovieSelect.popularity }}</span>
      <span>Date de réalisation : {{ formatDate(MovieSelect.release_date) }}</span>
      <span>Nombre de vote : {{ MovieSelect.vote_count }}</span>
    </div>
    <div>
      <md-button
        v-if="favorite == false"
        v-bind="verifFavorite(FavorisMovies.results)"
        v-on:click="addFavoris"
        class="md-accent"
      >Ajouter Favoris</md-button>
      <md-button
        v-if="favorite == true"
        v-on:click="removeFavoris"
        class="md-primary"
      >Retirer des favoris</md-button>
      <md-button
        v-if="watch == false"
        v-bind="verifWatch(WatchMovies.results)"
        v-on:click="addSee"
        class="md-accent"
      >A voir</md-button>
      <md-button
        v-if="watch == true"
        v-on:click="removeSee"
        class="md-primary"
      >Retirer des films à voir</md-button>
    </div>
    <Copyright></Copyright>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import Menu from "@/components/Menu.vue";
import Copyright from "@/components/Copyright.vue";

export default {
  props: ["width", "height"],
  data: function () {
    return {
      movieId: 0,
      favorite: false,
      watch: false,
    };
  },
  components: {
    Menu,
    Copyright,
  },
  computed: {
    ...mapGetters([
      "VideoMovie",
      "MovieSelect",
      "AccountId",
      "FavorisMovies",
      "WatchMovies",
    ]),
  },
  created: function () {
    this.$store.dispatch("loadFavorisMovies");
    this.$store.dispatch("loadWatchMovies");
    this.movieId = this.$route.params.id;
    this.$store.dispatch("loadMovieVideo", this.movieId);
  },
  methods: {
    formatDate: function (dateUS) {
      return new Date(dateUS).toLocaleDateString();
    },
    imagePath: function (poster_path) {
      return poster_path == null
        ? this.$noImagePath
        : `https://image.tmdb.org/t/p/w500/${poster_path}`;
    },
    addFavoris: async function () {
      let infoMovie = {
        media_type: "movie",
        media_id: this.movieId,
        favorite: true,
      };
      let postFavoris = await fetch(
        `${this.$store.getters.siteWebAPI}/account/${this.AccountId}/favorite?session_id=${this.$store.getters.SessionId}&api_key=${this.$store.getters.keyAPI}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(infoMovie),
        }
      );
      await postFavoris.json();
      this.favorite = true;
    },
    removeFavoris: async function () {
      let infoMovie = {
        media_type: "movie",
        media_id: this.movieId,
        favorite: false,
      };
      let postFavoris = await fetch(
        `${this.$store.getters.siteWebAPI}/account/${this.AccountId}/favorite?session_id=${this.$store.getters.SessionId}&api_key=${this.$store.getters.keyAPI}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(infoMovie),
        }
      );
      await postFavoris.json();
      this.$store.dispatch("loadFavorisMovies");
      this.favorite = false;
    },
    addSee: async function () {
      let infoMovie = {
        media_type: "movie",
        media_id: this.movieId,
        watchlist: true,
      };
      let postSee = await fetch(
        `${this.$store.getters.siteWebAPI}/account/${this.AccountId}/watchlist?session_id=${this.$store.getters.SessionId}&api_key=${this.$store.getters.keyAPI}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(infoMovie),
        }
      );
      await postSee.json();
      this.watch = true;
    },
    removeSee: async function () {
      this.watch = false;
      let infoMovie = {
        media_type: "movie",
        media_id: this.movieId,
        watchlist: false,
      };
      let postSee = await fetch(
        `${this.$store.getters.siteWebAPI}/account/${this.AccountId}/watchlist?session_id=${this.$store.getters.SessionId}&api_key=${this.$store.getters.keyAPI}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(infoMovie),
        }
      );
      await postSee.json();
      this.$store.dispatch("loadWatchMovies");
      this.watch = false;
    },
    video: function (id) {
      return `https://www.youtube.com/embed/${id}?controls=1`;
    },
    verifFavorite: function (fav) {
      if (fav != undefined) {
        for (let info of fav) {
          if (info.id == this.MovieSelect.id) {
            this.favorite = true;
          }
        }
      }
    },
    verifWatch: function (fav) {
      if (fav != undefined) {
        for (let info of fav) {
          if (info.id == this.MovieSelect.id) {
            this.watch = true;
          }
        }
      }
    },
  },
};
</script>
<style scoped>
span {
  display: inline-block;
  margin: 0 10px;
}
p {
  width: 50%;
  margin: 10px auto;
  text-align: justify;
  hyphens: auto;
}
#movie {
  width: 100%;
  margin: auto;
  padding: 50px 0;
}
iframe {
  width: 800px;
  height: 500px;
}
</style>