import {
  pointsGoodsDetail,
  addCar,
  pointsGoodsSku,
  buy,
  carList
} from '../../config/api'

const App = getApp()

Page({
  data: {
    iphoneFooter: 0,
    navHeight: 0,
    navTop: 0,
    navScrollTop: 0,
    domScrollTop: 0,
    id: null,
    detail: null,
    carNum: 0,
    buyType: 1, // 购买类型 1:加入购物车 2:购买
    maxBuyNum: 0, // 最大购买数量
    buyNum: 1, //购买数量
    specsShow: false, // 规格展示
    shareShow: false, // 分享展示
    specsArr: [], // 选中规格
    skuId: null, // 规格ID
    skuPrice: null, // 规格价格
    stock: null, // 库存
    imgPre: null
  },

  onLoad(options) {
    this.domScrollTop()
    this.setData({
      id: options.id,
    })
    if (options.shareUserId) {
      wx.setStorageSync('shareUserId', options.shareUserId)
    }
  },

  onShow() {
    if (!wx.getStorageSync('loginStatus')) {
      wx.showToast({
        title: '请先登录',
        icon: 'loading'
      })
      setTimeout(() => {
        wx.navigateTo({
          url: '/pages/login/login',
        })
      }, 500)
      return
    }
    this.setData({
      specsShow: false,
      shareShow: false,
      navHeight: App.globalData.navHeight,
      navTop: App.globalData.navTop,
      iphoneFooter: App.globalData.iphoneFooter,
      imgPre: App.globalData.imgPre,
    })
    this.getData()
    this.getCarNum()
  },

  // 标签距离顶部距离
  domScrollTop() {
    let query = wx.createSelectorQuery();
    query.select('#dom').boundingClientRect();
    query.exec((res) => {
      this.setData({
        domScrollTop: res[0].top
      })
    })
  },

  // 数据
  getData() {
    let obj = {
      id: this.data.id
    }
    pointsGoodsDetail(obj).then(res => {
      this.setData({
        detail: res.data,
        stock: res.data.goods.stock,
        maxBuyNum: res.data.goods.max_buycount,
        skuPrice: res.data.goods.price
      })
    })
  },

  // 返回
  back() {
    if (getCurrentPages().length < 2) {
      wx.switchTab({
        url: '/pages/index/index',
      })
      return
    }
    wx.navigateBack()
  },

  // 跳转
  to(e) {
    wx.navigateTo({
      url: e.currentTarget.dataset.url
    })
  },

  // 去购物车
  toCar() {
    wx.switchTab({
      url: '/pages/car/car',
    })
  },

  // 加入购物车
  addCar() {
    if (this.data.specsArr.length < this.data.detail.sku.length) {
      wx.showToast({
        title: '请选择规格',
        icon: 'loading'
      })
      return
    }

    let obj = {
      goods_id: this.data.id,
      number: this.data.buyNum,
      sku_id: this.data.skuId
    }
    addCar(obj).then(res => {
      wx.showToast({
        title: '加入购物车成功',
        icon: 'success'
      })
      this.getCarNum()
      this.setData({
        specsShow: false
      })
    })
  },

  // 选中规格
  checkedSpecs(e) {
    e.currentTarget.dataset.arr.forEach(element => {
      this.data.specsArr.indexOf(element) > -1 ? this.data.specsArr.splice(this.data.specsArr.indexOf(element), 1) : ''
    })
    this.data.specsArr.push(e.currentTarget.dataset.name)
    this.setData({
      specsArr: this.data.specsArr
    })
    if (this.data.specsArr.length == this.data.detail.sku.length) {
      this.getSkuId()
    }
  },

  // skuId
  getSkuId() {
    let obj = {
      type: 2,
      id: this.data.id,
      attr1_value: this.data.specsArr.length < 1 ? '' : this.data.specsArr[0],
      attr2_value: this.data.specsArr.length < 2 ? '' : this.data.specsArr[1]
    }
    pointsGoodsSku(obj).then(res => {
      this.setData({
        skuId: res.data.id,
        skuPrice: res.data.price,
        stock: res.data.stock
      })
    })
  },

  // 页面上滑距离，控制 nav 变色
  onPageScroll(ev) {
    this.setData({
      navScrollTop: ev.scrollTop
    })
  },

  // 打开规格
  openSpecs(e) {
    this.setData({
      buyType: e.currentTarget.dataset.type,
      specsShow: true,
      buyNum: 1
    })
  },

  // 关闭规格
  closeSpecs() {
    this.setData({
      specsShow: false
    })
  },

  // 打开分享
  openShare() {
    this.setData({
      shareShow: true
    })
  },

  // 关闭分享
  closeShare() {
    this.setData({
      shareShow: false
    })
  },

  // 数量增加
  numUp(e) {
    if (this.data.buyNum < this.data.maxBuyNum) {
      this.setData({
        buyNum: this.data.buyNum + 1
      })
    } else {
      wx.showToast({
        title: '限购' + this.data.maxBuyNum + '份',
        icon: 'none'
      })
    }
  },

  // 数量减少
  numDown(e) {
    if (this.data.buyNum > 1) {
      this.setData({
        buyNum: this.data.buyNum - 1
      })
    }
  },

  // 输入数量
  numInput(e) {
    if (isNaN(e.detail.value) || Number(e.detail.value) === 0) {
      this.setData({
        buyNum: 1
      })
      return
    }
    if (e.detail.value > this.data.maxBuyNum) {
      this.setData({
        buyNum: this.data.maxBuyNum
      })
      return
    }
    this.setData({
      buyNum: Number(e.detail.value)
    })
  },

  // 直接购买
  buy() {
    if (this.data.specsArr.length < this.data.detail.sku.length) {
      wx.showToast({
        title: '请选择规格',
        icon: 'loading'
      })
      return
    }

    let obj = {
      goods_id: this.data.id,
      number: this.data.buyNum,
      sku_id: this.data.skuId
    }
    buy(obj).then(res => {
      wx.navigateTo({
        url: '/pages/pointsConfirm/pointsConfirm?carId=' + res.data
      })
    })
  },

  // 分享
  onShareAppMessage() {
    return {
      title: this.data.detail.goods.name,
      path: '/pages/pointsGoodsDetail/pointsGoodsDetail?id=' + this.data.id + '&shareUserId=' + wx.getStorageSync('userId'),
      imageUrl: this.data.imgPre + "/" + this.data.detail.goods.banners[0],
    }
  },

  // 查询购物车数量
  getCarNum() {
    if (wx.getStorageSync('loginStatus')) {
      carList().then(res => {
        this.setData({
          carNum: res.data.length
        })
      })
    }
  }
})
