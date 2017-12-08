let obj = {};
let store = window.localStorage;

obj.addOrUpdate = function (newGoods) {

  // 获取本地存储数据
  let goodsObj = this.getGoods();
  // 判断添加的商品是否在goodsObj中
  if (goodsObj[newGoods.id]) {
    // 追加
    goodsObj[newGoods.id] += newGoods.num;
  } else {
    // 新建一个key，给一个值
    goodsObj[newGoods.id] = newGoods.num;
  }

  this.saveGoods(goodsObj);
}

obj.getGoods = function () {
  // ‘{}’是代码健壮性判断
  return JSON.parse(store.getItem('goods') || '{}');
}

obj.saveGoods = function (obj) {
  // 保存到本地
  store.setItem('goods', JSON.stringify(obj));
}

// 获取总数
obj.getTotalCount = function () {
  let goodsList = this.getGoods();
  let sum = 0;
  let arr = Object.values(goodsList);
  arr.forEach( ele => sum += ele);
  return sum;
}

export default obj;