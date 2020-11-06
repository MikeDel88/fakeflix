<template>
  <div class="accueil" v-if="this.$store.getters.Status == true">
    <Menu></Menu>
    <div class="display">
      <ListMovie></ListMovie>
      <LastMovie></LastMovie>
    </div>
    <Copyright></Copyright>
  </div>
</template>


<script>
import Menu from "@/components/Menu.vue";
import ListMovie from "@/components/ListMovie.vue";
import LastMovie from "@/components/LastMovie.vue";
import Copyright from "@/components/Copyright.vue";


export default {
  name: "Accueil",
  components: {
    Menu,
    ListMovie,
    LastMovie,
    Copyright,
  },
};
</script>
<style>
.display {
  display: flex;
}
</style>