<template>
  <div>
    <Logo></Logo>
    <form>
      <md-field>
        <label>Utilisateur</label>
        <md-input v-on:click="error = false" v-on:keyup.enter="check" v-model="user" required></md-input>
      </md-field>
      <md-field>
        <label>Mot de passe</label>
        <md-input
          v-on:click="error = false"
          v-on:keyup.enter="check"
          v-model="password"
          type="password"
          required
        ></md-input>
      </md-field>
      <md-button v-on:click="check" class="md-raised md-accent">Connexion</md-button>
    </form>
    <transition name="bounce">
      <md-empty-state
        v-if="error == true"
        class="md-accent md-elevation-9"
        md-rounded
        :md-size="size"
        md-label="Erreur de connexion"
        md-description="Vous devez saisir un utilisateur ou mot de passe valide"
      ></md-empty-state>
    </transition>
    <Copyright></Copyright>
  </div>
</template>

<script>
import Logo from "@/components/Logo.vue";
import Copyright from "@/components/Copyright.vue";

export default {
  name: "Login",
  components: {
    Logo,
    Copyright,
  },
  data: function () {
    return {
      error: false,
      user: "",
      password: "",
      size: 300,
      tokenInfo: "",
    };
  },
  methods: {
    check: async function () {
      if (this.user == "") {
        this.error = true;
      } else {
        let response = await fetch(
          `${this.$store.getters.siteWebAPI}/authentication/token/new?api_key=${this.$store.getters.keyAPI}`
        );
        let json = await response.json();
        this.tokenInfo = json.request_token;

        this.userInfo();
      }
    },
    userInfo: async function () {
      let info = {
        username: this.user,
        password: this.password,
        request_token: this.tokenInfo,
      };
      let getUser = await fetch(
        `${this.$store.getters.siteWebAPI}/authentication/token/validate_with_login?api_key=${this.$store.getters.keyAPI}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(info),
        }
      );
      let getInfoUser = await getUser.json();

      if (getInfoUser.success) {
        console.log("Connexion OK");

        let token = {
          request_token: this.tokenInfo,
        };

        let session = await fetch(
          `${this.$store.getters.siteWebAPI}/authentication/session/new?api_key=${this.$store.getters.keyAPI}`,
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(token),
          }
        );
        let getSessionId = await session.json();
        if (getSessionId.success) {
          this.$store.commit("SessionId", getSessionId.session_id);
          this.$store.dispatch("loadAccount");
          this.$store.commit("Status", true);
          this.$router.push("accueil");
        }
      } else {
        this.error = true;
      }
    },
  },
};
</script>
<style scoped>
form {
  display: block;
  width: 20%;
  margin: auto;
}
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
</style>
