<template>
<div class="tmpl">
    <nav-bar title="新闻列表"></nav-bar>
    <div class="demo">
      <ul>
        <li v-for="news in newList" :key="news.id">
          <router-link :to="{name: 'news.detail', query: { newsId: news.id }}">
            <img class="" v-lazy="news.img_url">
            <div >
              <span>{{news.title | convertTitle(13)}}</span>
              <div class="news-desc">
                <p>点击数:{{news.click}}</p>
                <p>发表时间:{{news.add_time | convertTime}}</p>
              </div>
            </div>
          </router-link>
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
    };
  },
  created() {
    this.$axios.get("getnewslist")
    .then(res => {
      // console.log(res);
      this.newList = res.data.message;
    })
    .catch( err => {
      console.log('获取新闻列表失败',err)
    })
  }
};
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

.line {
  margin-left: 16px;
  transform: scaleY(0.5);
  border-bottom: 1px solid #c8c7cc;
}
</style>