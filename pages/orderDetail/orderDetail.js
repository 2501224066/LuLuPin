import {
  orderDetail,
  pointsPay
} from '../../config/api'

const App = getApp()

Page({
  data: {
    iphoneFooter: 0,
    id: null,
    imgPre: null,
    d: '00',
    H: '00',
    i: '00',
    s: '00',
  },

  onLoad(options) {
    this.setData({
      id: options.id
    })
  },

  onShow() {
    this.setData({
      imgPre: App.globalData.imgPre,
      iphoneFooter: App.globalData.iphoneFooter
    })
    this.getData()
  },

  // 购物币订单付款
  pointsPay(e) {
    let obj = {
      order_id: e.currentTarget.dataset.id
    }
    pointsPay(obj).then(res => {
      wx.requestPayment({
        timeStamp: res.data.timeStamp,
        nonceStr: res.data.nonceStr,
        package: res.data.package,
        signType: 'MD5',
        paySign: res.data.paySign,
        success(r) {
          if (r.errMsg == "requestPayment:ok") {
            wx.showToast({
              title: '支付成功',
              icon: 'success'
            })
            this.onShow()
          }
        },
        fail() {
          wx.showToast({
            title: '支付取消',
            icon: 'loading'
          })
        }
      })
    })
  },

  // 数据
  getData() {
    let obj = {
      id: this.data.id
    }
    orderDetail(obj).then(res => {
      this.setData({
        detail: res.data
      })
      this.countTime()
    })
  },

  // 跳转
  to(e) {
    wx.navigateTo({
      url: e.currentTarget.dataset.url
    })
  },

  // 倒计时
  countTime() {
    let that = this
    let timing = setInterval(function () {
      let nowTime = Math.floor(Date.parse(new Date()) / 1000);
      let d = '00'
      let H = '00'
      let i = '00'
      let s = '00'
      if (that.data.detail.over_time >= nowTime) {
        let surplus = that.data.detail.over_time - nowTime
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

  onHide() {
    clearInterval(this.data.timing);
  },

  onUnload() {
    clearInterval(this.data.timing);
  }
})
