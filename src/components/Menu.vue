<template>
  <div>
    <Logo></Logo>
    <md-toolbar
      class="md-layout"
      :class="`md-alignment-${vertical}-${horizontal}`"
      md-elevation="0"
    >
      <div class="md-layout-item">
        <md-button class="md-accent" v-on:click="logout">
          Déconnexion
        </md-button>
        <md-button class="md-accent">
          <router-link class="md-accent" :to="{ name: 'Accueil'}">Accueil</router-link>
        </md-button>
        <md-button class="md-accent">
          <router-link class="md-accent" :to="{ name: 'Favoris'}">Favoris</router-link>
        </md-button>
        <md-button class="md-accent">
          <router-link class="md-accent" :to="{ name: 'Voir'}">A voir</router-link>
        </md-button>
      </div>
      <div class="md-layout-item">
        <Search></Search>
      </div>
    </md-toolbar>
  </div>
</template>

<script>
import Search from "@/components/Search.vue";
import Logo from "@/components/Logo.vue";
export default {
  name: "Menu",
  data: function () {
    return {
      horizontal: "space-between",
      vertical: "center",
    };
  },
  components: {
    Search,
    Logo,
  },
  props: {},
  methods:{
    logout: function(){
      this.$store.commit('SessionId', "")
      this.$store.commit('Status', false)
      this.$store.commit('AccountId', null)
      this.$router.push('/')
      console.log('Déconnexion réussie')
    }
  }

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
  margin: 0 20px;
  text-decoration: none;
}

#nav a.router-link-exact-active {
  color: #b94258;
}
</style>
