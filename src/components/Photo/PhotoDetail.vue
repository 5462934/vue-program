<template>
    <div class="tmpl">  
      <nav-bar title="图片详情"></nav-bar>
        <div class="photo-title">
            <p>{{imgdetail.title}}</p>
            <span>发起日期：{{imgdetail.add_time}}</span>
            <span>{{imgdetail.click}}次浏览</span>
            <span>分类：民生经济</span>
        </div>
        <my-ul>
            <my-li v-for="(img, index) in imgs" :key="index">
                <img class="preview-img" :src="img.src" height="100" @click="$preview.open(index, imgs)">
            </my-li>    
        </my-ul>
        <div class="photo-desc">
            <p v-html="imgdetail.content"></p>
        </div>
        <mycomments :cid="$route.query.imgId"></mycomments>
    </div>
</template>
<script>
export default {
  data() {
    return {
      imgs: [],
      imgdetail: [],
    };
  },
  created() {
    // 获取传送过来的id
    let imgId = this.$route.query.imgId;
    this.$axios.get('getthumimages/' + imgId)
    .then( res => {
      // console.log(res)
      this.imgs = res.data.message;
      for (var i = 0; i < this.imgs.length; i++) {
        this.imgs[i].w = 600;
        this.imgs[i].h = 400;
      }
    })
    .catch( err => {
      console.log(err)
    });
    this.$axios.get('getimageInfo/' + imgId)
    .then( res => {
      // console.log(res)
      this.imgdetail = res.data.message[0]
    })
    .catch( err => {
      console.log(err)
    });
  }
};
</script>
<style scoped>
li {
  list-style: none;
}

ul {
  margin: 0;
  padding: 0;
}

.photo-title {
  overflow: hidden;
}

.photo-title,
.photo-desc {
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  padding-bottom: 5px;
  margin-bottom: 5px;
  padding-left: 5px;
}

.photo-title p {
  color: #13c2f7;
  font-size: 20px;
  font-weight: bold;
}

.photo-title span {
  margin-right: 20px;
}

.photo-desc p {
  font-size: 18px;
}
</style>
