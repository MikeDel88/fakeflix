<template>
    <div>
        FakeFlix &copy; {{ year.getFullYear() }} - Powered by <a :href="url" target="_blank" class="md-accent">{{website}}</a>
    </div>
</template>
<script>
export default {
  name: "Copyright",

  data:function(){
    return{
        website:"themoviedb.org",
        url:"https://www.themoviedb.org/",
        year: new Date()
    }
  },
};
</script>
<style scoped>
div{
    margin: 10px 0;
}
</style>