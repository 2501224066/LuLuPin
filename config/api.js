var common = require('./request')

// 登录
export function login(data, repair = '') {
  return common.go({
    method: 'post',
    url: '/login/miniapp_login' + repair,
    data: data
  })
}

// 修改用户信息
export function updateUserInfo(data, repair = '') {
  return common.go({
    method: 'post',
    url: '/user/editUser' + repair,
    data: data
  })
}

// 首页
export function homeData(data, repair = '') {
  return common.go({
    method: 'get',
    url: '/home/index' + repair,
    data: data
  })
}

// 商品列表
export function goodsList(data, repair = '') {
  return common.go({
    method: 'get',
    url: '/active/list' + repair,
    data: data
  })
}

// 商品详情
export function goodsDetail(data, repair = '') {
  return common.go({
    method: 'get',
    url: '/active/detail' + repair,
    data: data
  })
}

// 配置
export function setting(data, repair = '') {
  return common.go({
    method: 'get',
    url: '/home/setting' + repair,
    data: data
  })
}

// 我的推荐
export function pushList(data, repair = '') {
  return common.go({
    method: 'get',
    url: '/user/myInvite' + repair,
    data: data
  })
}

// 收藏
export function follow(data, repair = '') {
  return common.go({
    method: 'post',
    url: '/user/setFavorites' + repair,
    data: data
  })
}

// 用户信息
export function userInfo(data, repair = '') {
  return common.go({
    method: 'get',
    url: '/user/userinfo' + repair,
    data: data
  })
}

// 地址列表
export function addressList(data, repair = '') {
  return common.go({
    method: 'get',
    url: '/user/address_query' + repair,
    data: data
  })
}

// 位置树
export function whereTree(data, repair = '') {
  return common.go({
    method: 'get',
    url: '/address/list' + repair,
    data: data
  })
}

// 修改地址
export function editAddress(data, repair = '') {
  return common.go({
    method: 'post',
    url: '/user/address_save' + repair,
    data: data
  })
}

// 获取地址
export function getAddress(data, repair = '') {
  return common.go({
    method: 'get',
    url: '/user/address_info' + repair,
    data: data
  })
}

// 删除地址
export function delAddress(data, repair = '') {
  return common.go({
    method: 'post',
    url: '/user/address_delete' + repair,
    data: data
  })
}

// 收藏列表
export function followList(data, repair = '') {
  return common.go({
    method: 'get',
    url: '/user/getFavorites' + repair,
    data: data
  })
}

// 创建订单
export function createOrder(data, repair = '') {
  return common.go({
    method: 'post',
    url: '/order/create' + repair,
    data: data
  })
}

// 默认地址
export function defaultAddress(data, repair = '') {
  return common.go({
    method: 'get',
    url: '/user/DefaultAddress' + repair,
    data: data
  })
}

// 订单详情
export function orderDetail(data, repair = '') {
  return common.go({
    method: 'get',
    url: '/order/order_info' + repair,
    data: data
  })
}

// 订单支付数据
export function orderPayData(data, repair = '') {
  return common.go({
    method: 'get',
    url: '/order/pre' + repair,
    data: data
  })
}

// 支付
export function pay(data, repair = '') {
  return common.go({
    method: 'get',
    url: '/wxpay/miniapp_pay' + repair,
    data: data
  })
}

// 钱包
export function wallet(data, repair = '') {
  return common.go({
    method: 'get',
    url: '/user/BalanceDetail' + repair,
    data: data
  })
}

// 订单列表
export function orderList(data, repair = '') {
  return common.go({
    method: 'get',
    url: '/order/query' + repair,
    data: data
  })
}

// 拼团记录
export function earnList(data, repair = '') {
  return common.go({
    method: 'get',
    url: '/user/myActive' + repair,
    data: data
  })
}

// 排行榜
export function rank(data, repair = '') {
  return common.go({
    method: 'get',
    url: '/rank/list' + repair,
    data: data
  })
}

// 公告详情
export function noticeDetail(data, repair = '') {
  return common.go({
    method: 'get',
    url: '/home/notice' + repair,
    data: data
  })
}

// 拼团详情
export function groupDetail(data, repair = '') {
  return common.go({
    method: 'get',
    url: '/active/groupDetail' + repair,
    data: data
  })
}

// 收入支出统计
export function moneyCount(data, repair = '') {
  return common.go({
    method: 'get',
    url: '/user/getEntry' + repair,
    data: data
  })
}

// 提现申请
export function transfer(data, repair = '') {
  return common.go({
    method: 'post',
    url: '/user/transfer' + repair,
    data: data
  })
}

// 抽奖详情
export function luckDetail(data, repair = '') {
  return common.go({
    method: 'post',
    url: '/luck/list' + repair,
    data: data
  })
}


// 刮奖
export function luck(data, repair = '') {
  return common.go({
    method: 'post',
    url: '/luck/get' + repair,
    data: data
  })
}

// 支付后创建的团
export function groupId(data, repair = '') {
  return common.go({
    method: 'get',
    url: '/wxpay/getStatus' + repair,
    data: data
  })
}

// 确认收货
export function take(data, repair = '') {
  return common.go({
    method: 'get',
    url: '/order/receiveOrder' + repair,
    data: data
  })
}

// 购物币商城首页
export function pointsIndex(data, repair = '') {
  return common.go({
    method: 'get',
    url: '/mall/index' + repair,
    data: data
  })
}

// 一级分类
export function classify(data, repair = '') {
  return common.go({
    method: 'get',
    url: '/category/index' + repair,
    data: data
  })
}

// 二级分类
export function twoClassify(data, repair = '') {
  return common.go({
    method: 'get',
    url: '/category/getFirst' + repair,
    data: data
  })
}

// 购物币商品
export function pointsGoods(data, repair = '') {
  return common.go({
    method: 'get',
    url: '/pointGoods/query' + repair,
    data: data
  })
}

// 购物币商品详情
export function pointsGoodsDetail(data, repair = '') {
  return common.go({
    method: 'get',
    url: '/pointGoods/detail' + repair,
    data: data
  })
}

// 加入购物车
export function addCar(data, repair = '') {
  return common.go({
    method: 'post',
    url: '/cart/add' + repair,
    data: data
  })
}

// 购物币商品SKU
export function pointsGoodsSku(data, repair = '') {
  return common.go({
    method: 'get',
    url: '/pointGoods/getSkuPrice' + repair,
    data: data
  })
}

// 购物车列表
export function carList(data, repair = '') {
  return common.go({
    method: 'get',
    url: '/cart/query' + repair,
    data: data
  })
}

// 修改购物车数量
export function updateCarNum(data, repair = '') {
  return common.go({
    method: 'get',
    url: '/cart/update' + repair,
    data: data
  })
}

// 删除购物车商品
export function delCarGoods(data, repair = '') {
  return common.go({
    method: 'get',
    url: '/cart/delete' + repair,
    data: data
  })
}

//购物车选中状态  
export function carCheckout(data, repair = '') {
  return common.go({
    method: 'get',
    url: '/cart/checked' + repair,
    data: data
  })
}

// 直接购买
export function buy(data, repair = '') {
  return common.go({
    method: 'post',
    url: '/cart/fastAdd' + repair,
    data: data
  })
}

// 购物币购买确认订单
export function pointsConfirm(data, repair = '') {
  return common.go({
    method: 'get',
    url: '/pointOrder/pre' + repair,
    data: data
  })
}

// 购物币商城下单
export function pointsCreateOrder(data, repair = '') {
  return common.go({
    method: 'post',
    url: '/pointOrder/createOrder' + repair,
    data: data
  })
}

// 购物币商支付
export function pointsPay(data, repair = '') {
  return common.go({
    method: 'get',
    url: '/pay/miniapp_pay' + repair,
    data: data
  })
}

// 获取小程序码
export function code(data, repair = '') {
  return common.go({
    method: 'get',
    url: '/extend/getCode' + repair,
    data: data
  })
}

// 推广下线
export function offline(data, repair = '') {
  return common.go({
    method: 'get',
    url: '/extend/myDown' + repair,
    data: data
  })
}

// 提现明细
export function withdrawalList(data, repair = '') {
  return common.go({
    method: 'get',
    url: '/extend/myTransfer' + repair,
    data: data
  })
}

// 提现明细统计
export function withdrawalListCount(data, repair = '') {
  return common.go({
    method: 'get',
    url: '/extend/getTransfer' + repair,
    data: data
  })
}

// 佣金明细统计
export function commissionList(data, repair = '') {
  return common.go({
    method: 'get',
    url: '/extend/myPro' + repair,
    data: data
  })
}

// 佣金明细
export function commissionListCount(data, repair = '') {
  return common.go({
    method: 'get',
    url: '/extend/getProByDate' + repair,
    data: data
  })
}

// 绑定推广者
export function bandPromoters(data, repair = '') {
  return common.go({
    method: 'get',
    url: '/extend/bindUser' + repair,
    data: data
  })
}

// 申请推广员
export function applyPromoters(data, repair = '') {
  return common.go({
    method: 'post',
    url: '/extend/set' + repair,
    data: data
  })
}

// 推广订单
export function promotionOrder(data, repair = '') {
  return common.go({
    method: 'get',
    url: '/extend/myOrder' + repair,
    data: data
  })
}

// 佣金排名
export function commissionRank(data, repair = '') {
  return common.go({
    method: 'get',
    url: '/extend/rankExtend' + repair,
    data: data
  })
}

// 购物币明细
export function pointsList(data, repair = '') {
  return common.go({
    method: 'get',
    url: '/extend/pointDetail' + repair,
    data: data
  })
}

// 购物币明细统计
export function pointsListCount(data, repair = '') {
  return common.go({
    method: 'get',
    url: '/extend/getPointByDate' + repair,
    data: data
  })
}

// 购物币推荐商品
export function pointsPush(data, repair = '') {
  return common.go({
    method: 'get',
    url: '/mall/homePush' + repair,
    data: data
  })
}

// 所以待发货订单列表
export function waitSendOrder(data, repair = '') {
  return common.go({
    method: 'get',
    url: '/ajax/getSend' + repair,
    data: data
  })
}

// 发货
export function orderSend(data, repair = '') {
  return common.go({
    method: 'get',
    url: '/ajax/send' + repair,
    data: data
  })
}

// 返利数据
export function rebate(data, repair = '') {
  return common.go({
    method: 'get',
    url: '/goods/getRule' + repair,
    data: data
  })
}