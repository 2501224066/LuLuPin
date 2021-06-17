import {
  waitSendOrder
} from '../../config/api'

const App = getApp()

Page({
  data: {
    list: [],
    imgPre: null,
    page: 1
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
      page: 1,
      imgPre: App.globalData.imgPre,
      tabIndex: wx.getStorageSync('lookOrderTab') ? wx.getStorageSync('lookOrderTab') : 0
    })
    this.getData()
  },

  // 数据
  getData(addStatus = false) {
    let obj = {
      page: this.data.page
    }
    waitSendOrder(obj).then(res => {
      this.setData({
        list: addStatus ? this.data.list.concat(res.data) : res.data
      })
    })
  },

  // 触底
  onReachBottom() {
    this.setData({
      page: this.data.page + 1
    })
    this.getData(true)
  },

  // 跳转
  to(e) {
    wx.navigateTo({
      url: e.currentTarget.dataset.url,
    })
  },



})
