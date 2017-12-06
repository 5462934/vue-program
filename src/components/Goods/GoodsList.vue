<template>
<div :style="'height' + height ">
	<nav-bar title="商品列表"></nav-bar>
	<mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="isAutoFill" ref="loadmore">
		<ul>
			<li v-for="list in goodslist" :key="list.id">
				<router-link :to="{ name: 'goods.detail', query: {goodsId: list.id}}">
					<img v-lazy="list.img_url">
					<div class="title">{{list.title | convertTitle(25)}}</div>
					<div class="desc">
						<div class="sell">
							<span>￥{{list.sell_price}}</span>
							<s>￥{{list.market_price}}</s>
						</div>
						<div class="detail">
							<div class="hot">
								热卖中
							</div>
							<div class="count">
								剩{{list.stock_quantity}}件
							</div>
						</div>
					</div>
				</router-link>
			</li>
		</ul>
	</mt-loadmore>
</div>  
</template>
<script>
export default {
  // 接收App里的头和底部
  props: ["appRefs"],
  data() {
    return {
      goodslist: [],
      page: 1,
      isAutoFill: false, //是否自动检测，并调用loadBottom
      allLoaded: false, //数据是否全部加载完毕，如果是，禁止函数
      height: "",//根节点div高度
    };
  },
  methods: {
    loadBottom() {
      this.$axios
        .get(`getgoods?pageindex=${this.page}`)
        .then(res => {
          // 判断是否还有数据
          if (res.data.message.length == 0) {
            this.$toast({
              message: "没有更多数据了",
              duration: 2000
            });
            this.allLoaded = true; // 若数据已全部获取完毕,禁止下拉刷新函数调用
            return;
          }
          // 追加下一页的数据
          this.goodslist = this.goodslist.concat(res.data.message);
          this.page++;
          // 从loading状态通知回到pull初始状态
          this.$refs.loadmore.onBottomLoaded();
        })
        .catch(err => {
          console.log(err);
        });
		},
		changeHeight() {
			// 改变父盒子高度
			this.height = document.documentElement.clientHeight - 
			this.appRefs.header.$el.offsetHeight -
			this.appRefs.footer.$el.offsetHeight;
		}
	},
	mounted() {
		this.changeHeight();
	},
  created() {
		// 获取路由参数
    this.page = this.$route.query.page || 1;
    this.$axios
      .get(`getgoods?pageindex=${this.page}`)
      .then(res => {
        // console.log(res)
        this.goodslist = res.data.message;
        this.page++;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>
<style scoped>
ul {
  overflow: hidden;
}
li {
  width: 50%;
  float: left;
  padding: 6px;
  box-sizing: border-box;
}

li > a:not(.mui-btn) {
  margin: 0px;
  padding: 0px;
  border: 1px solid #5c5c5c;
  box-shadow: 0 0 4px #666;
  width: 100%;
  display: block;
}

li > a:not(.mui-btn) img {
  width: 100%;
}

.sell > span {
  float: left;
  color: red;
  text-align: left;
}

.detail > .hot {
  float: left;
  text-align: left;
  font-size: 15px;
}

.detail > .count {
  float: right;
  text-align: right;
  font-size: 15px;
}

/*撑开，去除浮动没有的高度*/

.detail {
  overflow: hidden;
}

.desc {
  color: rgba(92, 92, 92, 0.8);
  background-color: rgba(0, 0, 0, 0.2);
}

img {
  height: 200px;
}
</style>
