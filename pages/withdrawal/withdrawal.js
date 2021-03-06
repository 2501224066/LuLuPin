import {
  transfer,
  userInfo
} from '../../config/api'

Page({
  data: {
    agree: false,
    hasPrice: '0.00',
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
        hasPrice: res.data.balance
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
      price: e.detail.value
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

    // 订阅
    let that = this
    wx.requestSubscribeMessage({
      tmplIds: ['NRVZbTmq0-xVthJBJtDis572-CXiVY6AOE-QmY7-1rU'],
      success() {
        let obj = {
          type: 1,
          money: that.data.price
        }
        transfer(obj).then(res => {
          wx.showToast({
            title: '提交申请成功',
            icon: 'success'
          })
          wx.navigateBack()
        })
      }
    })
  },

  // 跳转
  to(e) {
    wx.navigateTo({
      url: e.currentTarget.dataset.url
    })
  }
})
