const App = getApp()

Page({
  data: {
    iphoneFooter: 0,
  },

  onShow() {
    this.setData({
      iphoneFooter: App.globalData.iphoneFooter
    })
  },

  // 去我的
  toMy(){
    wx.switchTab({
      url: '/pages/my/my',
    })
  }

})
