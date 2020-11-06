import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    accountId: 0,
    moviesList: [],
    lastMovies: [],
    movie: {},
    movieSelect: {},
    sessionId: "",
    videoId: "",
    favorisMovie: [],
    watchMovies: [],
    status: false,
    APIkey: '**************',
    siteWebAPI: 'https://api.themoviedb.org/3'
  },
  getters: {
    siteWebAPI: state => {
      return state.siteWebAPI
    },
    keyAPI: state => {
      return state.APIkey
    },
    MoviesList: state => {
      return state.moviesList
    },
    LastMovie: state => {
      return state.lastMovies
    },
    VideoMovie: state => {
      return state.movie
    },
    MovieSelect: state => {
      return state.movieSelect
    },
    SessionId: (state) => {
      return state.sessionId
    },
    FavorisMovies: (state) => {
      return state.favorisMovie
    },
    AccountId: (state) => {
      return state.accountId
    },
    WatchMovies: (state) => {
      return state.watchMovies
    },
    Status: (state) => {
      return state.status
    }
  },
  mutations: {
    MoviesList: (state, payload) => {
      state.moviesList = payload
    },
    LastMoviesList: (state, payload) => {
      state.lastMovies = payload;
    },
    VideoMovie: (state, payload) => {
      state.movie = payload;
    },
    MovieSelect: (state, payload) => {
      state.movieSelect = payload
    },
    SessionId: (state, id) => {
      state.sessionId = id
    },
    FavorisMovies: (state, payload) => {
      state.favorisMovie = payload
    },
    AccountId: (state, payload) => {
      state.accountId = payload
    },
    WatchMovies: (state, payload) => {
      state.watchMovies = payload
    },
    Status: (state, payload) => {
      state.status = payload
    }
  },
  actions: {
    async loadMoviesList(context, movie) {
      let response = await fetch(
        `${this.state.siteWebAPI}/search/movie?api_key=${this.state.APIkey}&language=fr-FR&page=1&include_adult=false&query=${movie}`
      );
      let json = await response.json();
      context.commit('MoviesList', json)
    },
    async loadLastMoviesList(context) {
      let response = await fetch(
        `${this.state.siteWebAPI}/movie/popular?api_key=${this.state.APIkey}&language=fr-FR&page=1`
      );
      let json = await response.json();
      context.commit('LastMoviesList', json)
    },
    async loadMovieVideo(context, id) {
      let response = await fetch(
        `${this.state.siteWebAPI}/movie/${id}/videos?api_key=${this.state.APIkey}&language=fr-FR`
      );
      let json = await response.json();
      json.videoId = ""
      for (let info of json.results) {
        if (info.type == "Trailer") {
          json.videoId = info.key
        }
      }
      context.commit('VideoMovie', json)
    },
    async loadFavorisMovies(context) {
      let response = await fetch(`${this.state.siteWebAPI}/account/${this.state.accountId}/favorite/movies?api_key=${this.state.APIkey}&session_id=${this.state.sessionId}`);
      let json = await response.json();
      context.commit('FavorisMovies', json)
    },
    async loadAccount(context) {
      let response = await fetch(`${this.state.siteWebAPI}/account?api_key=${this.state.APIkey}&session_id=${this.state.sessionId}`);
      let json = await response.json();
      context.commit('AccountId', json.id)
    },
    async loadWatchMovies(context) {
      let response = await fetch(`${this.state.siteWebAPI}/account/${this.state.accountId}/watchlist/movies?api_key=${this.state.APIkey}&session_id=${this.state.sessionId}`);
      let json = await response.json();
      context.commit('WatchMovies', json)
    },
  },
})
