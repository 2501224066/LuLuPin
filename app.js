import {
  setting
} from 'config/api'

App({
  globalData: {
    mapKey: 'LIHBZ-ELKL3-LLD34-YBUY2-2KZ5E-K2FEE', // 腾讯地图服务 KEY
    imgPre: 'https://test.giftfond.cn/', // 图片前缀
    navHeight: 0,
    navTop: 0,
    windowHeight: 0,
    iphoneFooter: 0,
  },

  onLaunch() {
    this.update()
  },

  onShow() {
    this.getSetting()
    this.getPhoneModel()
    this.topData()
  },

  // 设置
  getSetting() {
    setting().then(res => {
      wx.setStorageSync('minWithdrawalPrice', Number(res.data.min_balance))
      wx.setStorageSync('applyPromotersPrice', Number(res.data.pro_price))
      wx.setStorageSync('pointsPushImg', res.data.points_pushImg)
      wx.setStorageSync('price2pointRate', res.data.point_rate)
    })
  },

  // 版本更新
  update() {
    if (wx.canIUse('getUpdateManager')) {
      const updateManager = wx.getUpdateManager()
      updateManager.onCheckForUpdate(function (res) {
        if (res.hasUpdate) {
          updateManager.onUpdateReady(function () {
            wx.showModal({
              title: '更新提示',
              content: '新版本已经准备好，是否重启应用？',
              showCancel: false,
              success: function (res) {
                if (res.confirm) {
                  updateManager.applyUpdate()
                }
              }
            })
          })
          updateManager.onUpdateFailed(function () {
            wx.showModal({
              title: '已经有新版本了哟~',
              content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~'
            })
          })
        }
      })
    }
  },

  // 获取机型
  getPhoneModel() {
    wx.getSystemInfo({
      success: (res) => {
        if (res.model.indexOf('iPhone X') != -1 ||
          res.model.indexOf('iPhone XR') != -1 ||
          res.model.indexOf('iPhone XS Max') != -1 ||
          res.model.indexOf('iPhone 11') != -1 ||
          res.model.indexOf('iPhone 11 Pro') != -1 ||
          res.model.indexOf('iPhone 11 Pro Max') != -1) {
          this.globalData.iphoneFooter = true;
        } else {
          this.globalData.iphoneFooter = false;
        }
      }
    })
  },

  // 计算顶部数据
  topData() {
    let menuButtonObject = wx.getMenuButtonBoundingClientRect();
    wx.getSystemInfo({
      success: res => {
        let statusBarHeight = res.statusBarHeight,
          navTop = menuButtonObject.top, //胶囊按钮与顶部的距离
          navHeight = statusBarHeight + menuButtonObject.height + (menuButtonObject.top - statusBarHeight) * 2; //导航高度
        this.globalData.navHeight = navHeight;
        this.globalData.navTop = navTop;
        this.globalData.windowHeight = res.windowHeight;
      },
      fail(err) {
        console.log(err);
      }
    })
  }
})
