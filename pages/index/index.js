import {
  homeData,
  bandPromoters
} from '../../config/api'

const App = getApp()

Page({
  data: {
    navHeight: 0,
    navTop: 0,
    navScrollTop: 0,
    domScrollTop: 0,
    swiper: [], // 轮播
    noticeTop: 0,
    notice: [], // 消息
    active: [], // 团
    dynamic: [], // 动态
    imgPre: null
  },

  onLoad(options) {
    this.domScrollTop()
    this.setData({
      navHeight: App.globalData.navHeight,
      navTop: App.globalData.navTop,
      imgPre: App.globalData.imgPre,
    })
    if (options.hasOwnProperty('shareUserId')) {
      wx.setStorageSync('shareUserId', options.shareUserId)
      if (!wx.getStorageSync('loginStatus')) {
        wx.navigateTo({
          url: '/pages/login/login',
        })
        return
      }
      // 绑定
      this.bandPromoters()
    }
  },

  onShow() {
    this.getData()
    this.checkJoin()
  },

  // 绑定推广者
  bandPromoters() {
    let obj = {
      id: wx.getStorageSync('shareUserId')
    }
    bandPromoters(obj).then(res => {
      wx.removeStorageSync('shareUserId')
      wx.navigateTo({
        url: '/pages/bindSuccess/bindSuccess',
      })
    })
  },

  // 标签距离顶部距离
  domScrollTop() {
    let query = wx.createSelectorQuery();
    query.select('#dom').boundingClientRect();
    query.exec((res) => {
      this.setData({
        domScrollTop: res[0].top
      })
    })
  },

  // 检查是否受邀进来参团
  checkJoin() {
    if (wx.getStorageSync('joinGroupId')) {
      wx.showModal({
        title: '您已登录',
        content: '是否继续参与拼团',
        success(res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/earnDetail/earnDetail?id=' + wx.getStorageSync('joinGroupId'),
            })
            wx.removeStorageSync('joinGroupId')
          } else if (res.cancel) {
            wx.removeStorageSync('joinGroupId')
          }
        }
      })
    }
  },

  // 数据
  getData() {
    homeData().then(res => {
      this.setData({
        swiper: res.data.banner,
        active: res.data.active,
        notice: res.data.notice,
        dynamic: res.data.newGroupNotice
      })
    })
  },

  // 去拼团列表
  toMake() {
    wx.switchTab({
      url: '/pages/make/make',
    })
  },

  //  跳转
  to(e) {
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
    wx.navigateTo({
      url: e.currentTarget.dataset.url,
    })
  },

  // 页面上滑距离，控制 nav 变色
  onPageScroll(ev) {
    this.setData({
      navScrollTop: ev.scrollTop
    })
  },

  // 分享
  onShareAppMessage() {
    return {
      title: '超划算拼团，拼不中赢现金红包。',
      path: '/pages/index/index?shareUserId=' + wx.getStorageSync('userId')
    }
  }
})
