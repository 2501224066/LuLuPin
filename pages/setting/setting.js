import {
  userInfo
} from '../../config/api'


const App = getApp()

Page({
  data: {
    userInfo: null,
  },

  onShow() {
    this.setData({
      userInfo: wx.getStorageSync('userInfo'),
    })
  },

  //  跳转
  to(e) {
    wx.navigateTo({
      url: e.currentTarget.dataset.url,
    })
  },

  // 退出登陆
  unlogin() {
    wx.removeStorageSync('userInfo')
    wx.removeStorageSync('loginStatus')
    wx.removeStorageSync('userId')
    wx.removeStorageSync('userId')

    wx.showToast({
      title: '您已退出登陆',
      icon: 'success'
    })

   setTimeout(() => {
      wx.switchTab({
        url: '/pages/index/index',
      })
    }, 1000)
  }
})
