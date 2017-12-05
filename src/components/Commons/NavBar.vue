<template>
  <div class="cms-s-header">
        <div @click="back"><img class="back" src="../../static/img/back.png" alt=""></div>
        <span class="page-title">{{title}}</span>
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
.back {
  width: 20px;
  margin-left: 15px;
  margin-top: 10px
}
.cms-s-header {
  height: 40px;
  background-color: #f0f0f0;
}

.page-title {
  margin-left: 40%;
  position: absolute;
  top: 50px;
}

</style>

