<template>
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="(pic, index) in imgs" :key="index">
        <a :href="pic.url">
          <img :src="pic.img || pic.src" alt="">
        </a>
      </mt-swipe-item>
  </mt-swipe>
</template>

<script>
  export default {
    name: "my-swipe",
    props: ["url"],
    
    created() {
      this.$axios
        .get(this.url)
        .then(res => {
          console.log(res);
          this.imgs = res.data.message;
        })
    },
    data() {
      return {
        imgs: []
      }
    },
};
</script>

<style scoped>
.mint-swipe-item img {
  width: 100%;
  height: 100%;
}
.mint-swipe {
  height: 225px;
}
</style>
