<template>
  <div class="cms-s-header">
        <h1 @click="back">&nbsp<</h1>
        <h1 class="page-title">{{title}}</h1>
  </div> 
</template>
<script>
  export default {
    name: 'nav-bar',
    props: ['title'],
    methods: {
      back() {
        this.$router.go(-1);
      }
    }
  }
</script>
<style scoped>

.cms-s-header {
  height: 40px;
  background-color: #f0f0f0;
}
.tmpl h1 {
  display: inline-block;
  height: 40px;
  line-height: 40px;
  margin-top: 0px;
  margin-bottom: 0px;
}
.page-title {
  position: absolute;
  left: 40%;
  font-size: 20px;
  
}
</style>

