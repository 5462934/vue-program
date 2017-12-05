<template>
  <div class="templ">
    <div class="cms-s-header">
        <h1 >&nbsp<</h1>
        <h1 class="page-title">Pull up</h1>
    </div> 

    <div class="demo">
      <ul>
        <li v-for="news in newList" :key="news.id">
          <a href="#">
            <img :src="news.img_url" alt="">
            <div>
              <span>{{news.title}}</span>
              <div class="news-desc">
                <p>点击数:{{news.click}}</p>
                <p>发表时间: {{news.add_time}}</p>
              </div>
            </div>
          </a>
        </li>
        <li class="line"></li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        newList: []
      }
    },
    created() {
      this.$axios.get('getnewslist')
      .then( res => {
        // console.log(res);
        this.newList = res.data.message;
      })
    }
  }
</script>
<style scoped>
.demo a {
  display: block;
  width: 330px;
  height: 44px;
  color: #000;
  padding: 10px 15px;
}
.demo img {
  float: left;
  width: 42px;
  height: 42px;
  margin-right: 20px;
}
.demo a div {
  float: left;
  width: 238px;
  margin-right: 20px;
}
.demo span {
  display: block;
  width: 100%;
  font-size: 17px;
  line-height: 21px;
  /*    white-space: nowrap;
    overflow: hidden;*/
}
.demo a p {
  float: left;
  color: #0bb0f5;
  font-size: 14px;
  line-height: 21px;
}
.demo p:nth-child(2) {
  float: right;
}

.cms-s-header {
  height: 40px;
  background-color: #f7f7f7;
}
.tmpl h1 {
  display: inline-block;
  height: 40px;
  line-height: 40px;
  margin-top: 0px;
  margin-bottom: 0px;
}
.page-title {
  margin-left: 25%;
}
.line {
  margin-left: 16px;
  transform: scaleY(0.5);
  border-bottom: 1px solid #c8c7cc;
}
</style>