<template>
    <div>
        FakeFlix &copy; 2020 - Powered by <a :href="url" target="_blank" class="md-accent">{{website}}</a>
    </div>
</template>
<script>
export default {
  name: "Copyright",

  data:function(){
    return{
        website:"themoviedb.org",
        url:"https://www.themoviedb.org/"
    }
  },
};
</script>
<style scoped>
div{
    margin: 10px 0;
}
</style>