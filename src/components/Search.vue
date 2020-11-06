<template>
  <md-field md-clearable>
    <md-input v-model="research" :value="research" v-on:keyup="searchStr(research)"></md-input>
  </md-field>
</template>
<script>
import _ from "lodash";
export default {
  name: "Search",
  data: () => ({
    research: "Rechercher un film",
  }),
  methods: {
    searchStr(research) {
      this.requestAPI(research);
    },
    requestAPI: _.debounce(function (string) {
      this.$store.dispatch("loadMoviesList", string);
      if (this.$router.currentRoute.name != "Accueil") {
        this.$router.push("/accueil");
      }
    }, 500),
  },
};
</script>