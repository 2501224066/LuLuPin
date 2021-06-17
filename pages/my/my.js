import {
  userInfo
} from '../../config/api'

const App = getApp()

Page({
  data: {
    userInfo: null,
    navHeight: 0,
    navTop: 0,
    money: '0.00', // 余额
    point: 0, // 购物币
    invite: 0, // 邀请人数
    isPromoter: 0,
    isAdmin: 0
  },

  onShow() {
    this.setData({
      userInfo: wx.getStorageSync('userInfo'),
      navHeight: App.globalData.navHeight,
      navTop: App.globalData.navTop
    })

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

    this.getUserInfo()
  },

  // 用户信息
  getUserInfo() {
    userInfo().then(res => {
      this.setData({
        money: res.data.balance,
        invite: res.data.invite_num,
        point: res.data.point,
        isPromoter: res.data.promotion_status,
        isAdmin:  res.data.is_admin,
      })
    })
  },

  // 去订单
  toOrder(e) {
    wx.navigateTo({
      url: '/pages/order/order'
    })
  },
  
  //  跳转
  to(e) {
    if(e.currentTarget.dataset.hasOwnProperty('tab')){
      wx.setStorageSync('lookOrderTab', e.currentTarget.dataset.tab)
    }
    wx.navigateTo({
      url: e.currentTarget.dataset.url,
    })
  }
})
