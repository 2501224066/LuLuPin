import {
  groupDetail
} from '../../config/api'

const App = getApp()

Page({
  data: {
    id: null,
    iphoneFooter: 0,
    timestamp: 0,
    detail: null,
    d: '00',
    H: '00',
    i: '00',
    s: '00',
  },

  onLoad(options) {
    this.setData({
      id: options.id
    })
    if (options.shareUserId) {
      wx.setStorageSync('shareUserId', options.shareUserId)
      wx.setStorageSync('joinGroupId', options.joinGroupId)
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
      }, 500)
      return
    }
    wx.removeStorageSync('shareUserId')
    wx.removeStorageSync('joinGroupId')
    this.setData({
      iphoneFooter: App.globalData.iphoneFooter,
      timestamp: Math.floor(Date.parse(new Date()) / 1000)
    })
    this.getData()
  },

  // 去拼团
  toMake() {
    wx.switchTab({
      url: '/pages/index/index',
    })
  },

  // 加入拼团
  join() {
    if (!this.data.detail.num) {
      wx.showToast({
        title: '拼团已满',
        icon: 'loading'
      })
      return
    }

    wx.navigateTo({
      url: '/pages/goodsDetail/goodsDetail?id=' + this.data.detail.goods.id + '&groupId=' + this.data.id,
    })
  },

  //数据
  getData() {
    let obj = {
      id: this.data.id
    }
    groupDetail(obj).then(res => {
      this.setData({
        detail: res.data
      })
      this.countTime()
    })
  },

  // 分享
  onShareAppMessage() {
    return {
      title: this.data.detail.goods.name,
      path: '/pages/earnDetail/earnDetail?id=' + this.data.id + '&shareUserId=' + wx.getStorageSync('userId') + '&joinGroupId=' + this.data.id,
      imageUrl: this.data.detail.goods.image_thumb
    }
  },

  // 倒计时
  countTime() {
    let that = this
    let timing = setInterval(function () {
      let d = '00'
      let H = '00'
      let i = '00'
      let s = '00'
      let nowTime = Math.floor(Date.parse(new Date()) / 1000)
      if (that.data.detail.overtime >= nowTime) {
        let surplus = that.data.detail.overtime - nowTime
        d = that.addZero(Math.floor(surplus / 86400))
        H = that.addZero(Math.floor((surplus - d * 86400) / 3600))
        i = that.addZero(Math.floor((surplus - d * 86400 - H * 3600) / 60))
        s = that.addZero(surplus - d * 86400 - H * 3600 - i * 60)
      }
      that.setData({
        d: d,
        H: H,
        i: i,
        s: s
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

  // 跳转
  to(e) {
    wx.navigateTo({
      url: e.currentTarget.dataset.url
    })
  },

  onHide() {
    clearInterval(this.data.timing);
  },

  onUnload() {
    clearInterval(this.data.timing);
  }
})
