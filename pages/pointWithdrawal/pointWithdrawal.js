import {
  transfer,
  userInfo
} from '../../config/api'

Page({
  data: {
    agree: false,
    hasPoint: '0.00',
    price2pointRate: 1,
    point: null,
    price: null,
    minWithdrawalPrice: 0
  },

  onShow() {
    this.getPrice()
  },

  // 用户信息
  getPrice() {
    userInfo().then(res => {
      this.setData({
        minWithdrawalPrice: wx.getStorageSync('minWithdrawalPrice'),
        hasPoint: res.data.point,
        price2pointRate: parseFloat(wx.getStorageSync('price2pointRate'))
      })
    })
  },

  // 同意
  agree() {
    this.setData({
      agree: !this.data.agree
    })
  },

  // 金额
  setPrice(e) {
    this.setData({
      price: e.detail.value,
      point: (e.detail.value * this.data.price2pointRate).toFixed(2) * 1
    })
  },

  // 购物币
  setPoint(e) {
    this.setData({
      point: e.detail.value,
      price: (e.detail.value / this.data.price2pointRate).toFixed(2) * 1
    })
  },

  // 提现
  sub() {
    if (!this.data.agree) {
      wx.showToast({
        title: '请先同意协议',
        icon: 'loading'
      })
      return
    }

    if (this.data.price < this.data.minWithdrawalPrice) {
      wx.showToast({
        title: '最低提现' + this.data.minWithdrawalPrice + '元',
        icon: 'loading'
      })
      return
    }

    let obj = {
      type: 2,
      money: this.data.point
    }
    transfer(obj).then(res => {
      wx.showToast({
        title: '提交申请成功',
        icon: 'success'
      })
      wx.navigateBack()
    })
  },

  // 跳转
  to(e) {
    wx.navigateTo({
      url: e.currentTarget.dataset.url
    })
  }
})
