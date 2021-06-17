import {
  goodsDetail,
  follow,
  createOrder,
  pointsGoodsSku,
  rebate
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
    follow: null, // 关注
    maxBuyNum: 0, // 最大购买数量
    buyNum: 1, //购买数量
    specsShow: false, // 规格展示
    buyType: 1, // 购买类型 1:拼团 2:购买
    specsArr: [], // 选中规格
    group: null, // 相关团
    groupId: null, // 加入拼团ID
    stock: null, // 库存
    skuId: null,
    rebate: null, // 返利数据
  },

  onLoad(options) {
    this.domScrollTop()
    this.setData({
      id: options.id,
      groupId: Number(options.groupId),
    })
    if (options.hasOwnProperty('shareUserId')) {
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
      }, 1000)
      return
    }
    this.setData({
      specsShow: false,
      navHeight: App.globalData.navHeight,
      navTop: App.globalData.navTop,
      iphoneFooter: App.globalData.iphoneFooter
    })
    this.getData()
    this.rebate()
  },

  // 返利数据
  rebate() {
    let obj = {
      id: this.data.id
    }
    rebate(obj).then(res => {
      this.setData({
        rebate: res.data
      })
    })
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
    goodsDetail(obj).then(res => {
      this.setData({
        detail: res.data,
        group: res.data.active != "" ? res.data.active : null,
        follow: res.data.goods.collect_status,
        maxBuyNum: res.data.goods.max_buycount,
        stock: res.data.goods.stock,
      })
      if (this.data.group != null) {
        this.countTime()
      }
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

  // 收藏
  follow() {
    let obj = {
      good_id: this.data.detail.goods.id,
      status: this.data.follow ? 0 : 1
    }
    follow(obj).then(res => {
      this.setData({
        follow: this.data.follow ? 0 : 1
      })
    })
  },

  // 跳转
  to(e) {
    wx.navigateTo({
      url: e.currentTarget.dataset.url
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
      type: 1,
      id: this.data.id,
      attr1_value: this.data.specsArr.length < 1 ? '' : this.data.specsArr[0],
      attr2_value: this.data.specsArr.length < 2 ? '' : this.data.specsArr[1]
    }
    pointsGoodsSku(obj).then(res => {
      this.setData({
        skuId: res.data.id,
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

  // 创建订单
  create() {
    if (this.data.specsArr.length < this.data.detail.sku.length) {
      wx.showToast({
        title: '请选择规格',
        icon: 'loading'
      })
      return
    }

    let obj = {
      buy_type: this.data.buyType,
      sku_id: this.data.skuId,
      good_id: this.data.id,
      num: this.data.buyNum,
      message: '',
      sku: this.data.specsArr.length == 0 ? '默认,默认' : (this.data.specsArr.length == 1 ? this.data.specsArr[0] + ',默认' : this.data.specsArr.toString()),
      active_id: this.data.groupId ? this.data.groupId : 0
    }
    createOrder(obj).then(res => {
      wx.navigateTo({
        url: '/pages/confirm/confirm?orderId=' + res.data.order_id + '&goodsId=' + res.data.good_id
      })
    })
  },

  // 倒计时
  countTime() {
    let that = this
    let timing = setInterval(function () {
      let nowTime = Math.floor(Date.parse(new Date()) / 1000);
      that.data.group.forEach(function (value, key) {
        let d = '00'
        let H = '00'
        let i = '00'
        let s = '00'
        if (value.overtime >= nowTime) {
          let surplus = value.overtime - nowTime
          d = that.addZero(Math.floor(surplus / 86400))
          H = that.addZero(Math.floor((surplus - d * 86400) / 3600))
          i = that.addZero(Math.floor((surplus - d * 86400 - H * 3600) / 60))
          s = that.addZero(surplus - d * 86400 - H * 3600 - i * 60)
        }
        that.data.group[key].time = d + '天' + H + '时' + i + '分' + s + '秒'
      });

      that.setData({
        group: that.data.group
      })
    }, 1000)

    that.setData({
      timing: timing
    })
  },

  // 补零
  addZero(num) {
    return num < 10 ? "0" + num : num
  },

  // 去拼团列表
  toMake() {
    wx.switchTab({
      url: '/pages/make/make',
    })
  },

  // 分享
  onShareAppMessage() {
    return {
      title: this.data.detail.goods.name,
      path: '/pages/goodsDetail/goodsDetail?id=' + this.data.detail.goods.id + '&shareUserId=' + wx.getStorageSync('userId'),
      imageUrl: this.data.detail.goods.banners[0]
    }
  },

  onHide() {
    clearInterval(this.data.timing);
  },

  onUnload() {
    clearInterval(this.data.timing);
  }
})
