import {
  carList,
  updateCarNum,
  delCarGoods,
  carCheckout
} from '../../config/api'

const App = getApp()

Page({
  data: {
    list: [],
    imgPre: null,
    touchStart: null, // 手指滑动开始坐标
    checkoutId: [],
    total: 0,
  },

  onShow() {
    this.setData({
      imgPre: App.globalData.imgPre,
    })
    this.getData()
    this.total()
  },

  // 选中
  checkout(e) {
    let obj = {
      ids: e.currentTarget.dataset.id,
      is_check: 1
    }
    carCheckout(obj).then(res => {
      this.data.checkoutId.push(e.currentTarget.dataset.id)
      this.setData({
        checkoutId: this.data.checkoutId
      })
      this.total()
    })
  },

  // 不选中
  unCheckout(e) {
    let obj = {
      ids: e.currentTarget.dataset.id,
      is_check: 0
    }
    carCheckout(obj).then(res => {
      this.data.checkoutId.splice(this.data.checkoutId.indexOf(e.currentTarget.dataset.id), 1)
      this.setData({
        checkoutId: this.data.checkoutId
      })
      this.total()
    })
  },

  // 删除
  remove(e) {
    let obj = {
      ids: String(e.currentTarget.dataset.id)
    }
    delCarGoods(obj).then(res => {
      this.data.checkoutId.splice(this.data.checkoutId.indexOf(e.currentTarget.dataset.id), 1)
      this.data.list.splice(e.currentTarget.dataset.index, 1)
      this.setData({
        checkoutId: this.data.checkoutId,
        list: this.data.list
      })
      wx.setTabBarBadge({
        index: 3,
        text: String(this.data.list.length)
      })
      this.total()
    })
  },

  // 数据
  getData() {
    if (!wx.getStorageSync('loginStatus')) {
      return
    }
    carList().then(res => {
      this.setData({
        list: res.data
      })
    })
  },

  // 数量增加
  up(e) {
    let key = e.currentTarget.dataset.index
    if (this.data.list[key].number < this.data.list[key].max_number) {
      this.data.list[key].number = Number(this.data.list[key].number) + 1
      this.setData({
        list: this.data.list
      })
      this.total()
      this.updateCarNum(key)
    } else {
      wx.showToast({
        title: '限购' + this.data.list[key].max_number + '份',
        icon: 'none'
      })
    }
  },

  // 数量减少
  down(e) {
    let key = e.currentTarget.dataset.index
    if (this.data.list[key].number > 1) {
      this.data.list[key].number = this.data.list[key].number - 1
      this.setData({
        list: this.data.list
      })
      this.total()
      this.updateCarNum(key)
    }
  },

  // 输入数量
  numInput(e) {
    let key = e.currentTarget.dataset.index
    if (isNaN(e.detail.value) || Number(e.detail.value) === 0) {
      this.data.list[key].number = 1
      this.setData({
        list: this.data.list
      })
      this.total()
      this.updateCarNum(key)
      return
    }
    if (e.detail.value > this.data.list[key].max_number) {
      this.data.list[key].number = this.data.list[key].max_number
      this.setData({
        list: this.data.list
      })
      this.total()
      this.updateCarNum(key)
      return
    }
    this.data.list[key].number = e.detail.value
    this.setData({
      list: this.data.list
    })
    this.total()
    this.updateCarNum(key)
  },

  // 修改数量
  updateCarNum(key) {
    let obj = {
      id: this.data.list[key].id,
      number: this.data.list[key].number,
    }
    this.total()
    updateCarNum(obj)
  },

  // 总价
  total() {
    let total = 0
    this.data.list.forEach(v => {
      if (this.data.checkoutId.indexOf(v.id) > -1) {
        total += Number(v.price * v.number)
      }
    })
    this.setData({
      total: total
    })
  },

  // 全选
  allCheckout() {
    let checkoutId = []
    this.data.list.forEach(v => {
      checkoutId.push(v.id)
    })
    if (checkoutId.length === 0) {
      return
    }
    let obj = {
      ids: checkoutId.join(","),
      is_check: 1
    }
    carCheckout(obj).then(res => {
      this.setData({
        checkoutId: checkoutId
      })
      this.total()
    })
  },

  // 全不选
  allUncheckout() {
    let obj = {
      ids: this.data.checkoutId.join(","),
      is_check: 0
    }
    carCheckout(obj).then(res => {
      this.setData({
        checkoutId: []
      })
      this.total()
    })
  },

  // 手指滑动开始
  touchstart: function (e) {
    this.setData({
      touchStart: e.changedTouches[0].clientX
    })
  },

  // 手指滑动结束
  touchMove: function (e) {
    let clientX = e.changedTouches[0].clientX;
    let touchStart = this.data.touchStart;
    if (touchStart != null) {
      if (clientX - touchStart >= 50) {
        this.data.list[e.currentTarget.dataset.index].moveSpace = 0
        this.setData({
          touchStart: null,
          list: this.data.list
        })
      } else if (clientX - touchStart <= -50) {
        this.data.list[e.currentTarget.dataset.index].moveSpace = -75
        this.setData({
          touchStart: null,
          list: this.data.list
        })
      }
    }
  },
  toMake() {
    wx.switchTab({
      url: '/pages/pointsShop/pointsShop',
    })
  },
  // 跳转
  to(e) {
    wx.navigateTo({
      url: e.currentTarget.dataset.url
    })
  }
})
