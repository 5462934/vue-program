<template>
	<div>
		<nav-bar title="商品详情"></nav-bar>
		<div class="outer-swiper">
			<div class="swiper">
				<!-- <img :src="goodsImg.thumb_path" alt=""> -->
				<my-swipe :url="swipeUrl"></my-swipe>
			</div>
		</div>
		<div class="product-desc">
			<ul>
				<li>
					<span class="product-desc-span">
						{{goodsInfo.title}}
					</span>
				</li>
				<li class="price-li">
					市场价：
					<s>￥{{goodsInfo.market_price}}</s>
					销售价：
					<span>￥{{goodsInfo.sell_price}}</span>
				</li>
				<li class="number-li">购买数量：
					<span @click="buyCutNum">-</span>
					<span v-model="num">{{buyNums}}</span>
					<span @click="buyAddNum">+</span>
				</li>
				<li>
					<mt-button type="primary">立即购买</mt-button>
					<mt-button type="danger" @click="addShopcart">加入购物车</mt-button>
				</li>
			</ul>
		</div>

		<transition name="myball" v-on:after-enter="afterEnter">
    <div class="ball" v-if="showBall"></div>
    </transition>
		<div class="product-props">
			<ul>
				<li>商品参数</li>
				<li>商品货号：123441231</li>
				<li>库存情况：{{goodsInfo.stock_quantity}}件
				</li>
				<li>上架时间：{{goodsInfo.add_time | convertTime}}</li>
			</ul>
		</div>
		<div class="product-info">
			<ul>
				<li>
					<mt-button type="primary" size="large" plain>图文介绍</mt-button>
				</li>
				<li>
					<router-link :to="{ name: 'goods.comments', query: { cid: goodsInfo.id }}">
					<mt-button type="danger" size="large" plain>
						商品评论
					</mt-button>
					</router-link>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
import GoodsTools from '../Commons/GoodsTools.js'
export default {
  data() {
    return {
      goodsInfo: [],
      goodsImg: [],
			buyNums: 1,
			num: '', // 购买总量
      swipeUrl: '',
      showBall: false, // 小球是否存在
    };
  },
  methods: {
		buyCutNum() {
			if (this.buyNums <= 1) {
        this.$toast({
          message: "已经降到最低咯",
          duration: 2000
        });
        return this.buyNums;
      } else {
        return this.buyNums--;
      }
    },
    buyAddNum() {
      if (this.buyNums >= this.goodsInfo.stock_quantity) {
        this.$toast({
          message: "库存量不够了，再看看别的吧o(^▽^)o",
          duration: 2000
        });
        return this.buyNums;
      } else {
				return this.buyNums++;
      }
    },
    addShopcart() {
      this.showBall = true;// 插入小球，触发v-enter-active的动画

      GoodsTools.addOrUpdate({
        id: this.goodsInfo.id,
        num: this.buyNums
      })

    },
    afterEnter() {
      // 过度元素进入后，动画完毕，将小球移除
      this.showBall = false;
    }
  },
  created() {
		let goodsId = this.$route.query.goodsId;
		this.swipeUrl = `getthumimages/${this.$route.query.goodsId}`;
    this.$axios
      .get("goods/getinfo/" + goodsId)
      .then(res => {
        // console.log(res);
        this.goodsInfo = res.data.message[0];
      })
      .catch(err => {
        console.log(err);
      });

    this.$axios
      .get("goods/getshopcarlist/" + goodsId)
      .then(res => {
        // console.log(res);
        this.goodsImg = res.data.message[0];
      })
      .catch(err => {
        console.log(err);
      });
	},
	// 路由更新
	beforeRouteUpdate(to, from, next) {
		this.swipeUrl = `getthumimages/${this.$route.params.goodsId}`;
		this.$axios.get(`goods/getinfo/${goodsId}`)
    .then(res=>{
      this.goodsInfo = res.data.message[0];
      // console.log(this.goodsInfo);
    })
    .catch(err=>console.log(err));
    next();
	}
};
</script>
<style scoped>
.myball-leave {
  opacity: 0;
}
.myball-enter-active {
  animation: bounce-in 1s;
}

@keyframes bounce-in {
  0% {
    transform: translate3d(0, 0, 0);
  }
  50% {
    transform: translate3d(140px, -50px, 0);
  }
  75% {
    transform: translate3d(160px, 0px, 0);
  }
  100% {
    transform: translate3d(140px, 300px, 0);
  }
}

.swiper {
  border: 1px solid rgba(0, 0, 0, 0.2);
  margin: 8px;
  width: 95%;
  border-radius: 15px;
  overflow: hidden;
}

.outer-swiper,
.product-desc,
.product-props,
.product-info {
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  margin: 3px;
}

/*请ulpadding*/

.outer-swiper ul,
.product-desc ul,
.product-props ul,
.product-info ul {
  padding: 0;
}

.product-desc ul li,
.product-props ul li,
.product-info ul li {
  list-style: none;
  font-size: 15px;
  color: rgba(0, 0, 0, 0.5);
  margin-top: 8px;
}

.product-desc ul > :nth-child(1) span {
  color: blue;
  font-size: 22px;
  font-weight: bold;
}

.product-desc ul > :nth-child(1) {
  border-bottom: 1px solid rgba(0, 0, 0, 0.5);
}

.product-desc ul,
.product-info ul,
.product-props ul {
  padding-left: 10px;
}

.price-li span {
  color: red;
  font-size: 25px;
}

.price-li s {
  margin-right: 16px;
}

/*加减*/

.number-li span {
  display: inline-block;
  border: 2px solid rgba(0, 0, 0, 0.1);
  width: 25px;
}

/*商品参数*/

.product-props ul > :nth-child(1) {
  text-align: left;
}

.product-props ul:not(:nth-child(1)) {
  margin-left: 40px;
}

.product-info ul {
  margin-bottom: 70px;
  padding: 0 5px;
}

.number-li span {
  text-align: center;
}

.number-li > :nth-child(2) {
  width: 40px;
}

.ball {
  border-radius: 50%;
  background-color: red;
  width: 24px;
  height: 24px;
  position: absolute;
  top: 440px;
  left: 120px;
  display: inline-block;
  z-index: 9999;
}
</style>
