<template>
    <div class="tmpl">
      <nav-bar title="图文分享"></nav-bar>
        <!-- 引入返回导航 -->
        <div class="photo-header">
            <ul>
                <li v-for="cate in imgcate" :key="cate.id" >
                    <a href="javascript:;" @click="change(cate.id)">{{cate.title}}</a>
                </li>
            </ul>
        </div>
        <div class="photo-list">
            <ul>
                <li v-for="images in images" :key="images.id">
                    <a>
                        <img :src="images.img_url">
                        <p>
                            <span>{{images.title}}</span>
                            <br>
                            <span>{{images.zhaiyao}}</span>
                        </p>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
  export default {
    data() {
      return {
        imgcate: [],
        images: []
      }
    },
    methods: {
      change(id) {
        this.$axios.get('getimages/' + id)
        .then(res => {
          this.images = res.data.message;
          if (res.data.message.length == 0) {
            this.$toast({
              message: '没有图片咯',
              duration: 3000
            });
          }
        })
      }
    },
    created() {
      this.$axios.all([
        this.$axios.get('getimgcategory'),
        this.$axios.get('getimages/0')
      ])
      .then(this.$axios.spread((imgcateres, imagesres) => {
        console.log(imgcateres);
        console.log(imagesres);
        // 图文分类
        this.imgcate = imgcateres.data.message;
        // 图文列表
        this.images = imagesres.data.message;
      }))
    }
  }
</script>
<style>
.photo-header li {
    list-style: none;
    display: inline-block;
    margin-left: 10px;
    height: 30px;
}

.photo-header ul {
    /*强制不换行*/
    white-space: nowrap;
    overflow-x: auto;
    padding-left: 0px;
    margin: 5;
}


/*下面的图片*/

.photo-list li {
    list-style: none;
    position: relative;
}

.photo-list li img {
    width: 100%;
    height: 230px;
    vertical-align: top;
}

.photo-list ul {
    padding-left: 0px;
    margin: 0;
}

.photo-list p {
    position: absolute;
    bottom: 0px;
    color: white;
    background-color: rgba(0, 0, 0, 0.3);
    margin-bottom: 0px;
}

.photo-list p span:nth-child(1) {
    font-weight: bold;
    font-size: 16px;
}



</style>
