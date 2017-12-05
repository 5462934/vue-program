<template>
 	<div class="tmpl">
		<nav-bar title="商品列表"></nav-bar>
		<ul>
			<li v-for="list in goodslist" :key="list.id">
				<router-link :to="{ name: 'goods.detail', query: {goodsId: list.id}}">
					<img v-lazy="list.img_url">
					<div class="title">{{list.title}}</div>
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
	</div>  
</template>
<script>
	export default {
		data() {
			return {
				goodslist: []
			}
		},
		created() {
			this.$axios.get('getgoods?pageindex=1')
			.then( res => {
				// console.log(res)
				this.goodslist = res.data.message;
			})
			.catch( err => {
				console.log(err)
			})
		}
	}
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

.detail >.hot {
    float: left;
    text-align: left;
    font-size: 15px;
}

.detail >.count {
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
