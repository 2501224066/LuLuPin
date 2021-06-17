import {
  userInfo
} from '../../config/api'


const App = getApp()

Page({
  data: {
    iphoneFooter: 0,
    isPromoter: 0, 
    upName: ''
  },

  onShow() {
    this.setData({
      iphoneFooter: App.globalData.iphoneFooter,
    })
    this.getUserInfo()
  },


  // 用户信息
  getUserInfo() {
    userInfo().then(res => {
      this.setData({
        isPromoter: res.data.promotion_status,
        upName: res.data.share_name,
      })
    })
  },
  // 去拼团
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
