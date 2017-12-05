<template>
    <div class="tmpl">
      <nav-bar title="图文分享"></nav-bar>
        <!-- 引入返回导航 -->
        <div class="photo-header">
            <ul>
                <li v-for="cate in imgcate" :key="cate.id">
                    <a href="javascript:;">{{cate.title}}</a>
                </li>
            </ul>
        </div>
        <div class="photo-list">
            <ul>
                <li>
                    <a>
                        <img src="">
                        <p>
                            <span>图片标题</span>
                            <br>
                            <span>图片摘要</span>
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
        imgcate: []
      }
    },
    created() {
      this.$axios.get('getimgcategory')
      .then(res => {
        console.log(res)
        this.imgcate = res.data.message;
      })
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
