import {
  defaultAddress,
  pointsPay,
  pointsConfirm,
  pointsCreateOrder
} from '../../config/api'

const App = getApp()

Page({
  data: {
    imgPre: null,
    iphoneFooter: 0,
    carId: null,
    detail: null,
    address: null,
    orderId: null
  },

  onLoad(options) {
    this.setData({
      carId: options.carId
    })
    this.getData()
  },

  onShow() {
    this.setData({
      imgPre: App.globalData.imgPre,
      iphoneFooter: App.globalData.iphoneFooter
    })
    this.getAddress()
  },

  // 数据
  getData() {
    let obj = {
      cart_id: this.data.carId
    }
    pointsConfirm(obj).then(res => {
      this.setData({
        detail: res.data
      })
    })
  },

  // 地址
  getAddress() {
    defaultAddress().then(res => {
      this.setData({
        address: res.data
      })
    })
  },

  // 跳转
  to(e) {
    wx.navigateTo({
      url: e.currentTarget.dataset.url
    })
  },

  // 创建订单
  create() {
    let that = this
    if (!that.data.address.id) {
      wx.showToast({
        title: '请设置地址',
        icon: 'loading'
      })
      return
    }

    let obj = {
      cart_id: this.data.carId,
      address_id: this.data.address.id
    }
    pointsCreateOrder(obj).then(res => {
      this.setData({
        orderId: res.data
      })
      this.pay()
    })
  },

  // 支付
  pay() {
    let that = this
    let obj = {
      order_id: that.data.orderId
    }
    pointsPay(obj).then(res => {
      // 0元无需支付
      if (!res.data.needPay) {
        // 订阅
        wx.requestSubscribeMessage({
          tmplIds: ['9Dw4q9dwf5syslHVvldG23vdYtsVk2fDrsTK9cG38JE', 'FEt-lfDG1w4G6IMync2bIzeII2MtlbDrBnqhlDHNUjE', 'ogaAjFMMr8XwY1yuV5Dz-55SPLyS5lmYeUNpONE_QGE'],
          success() {
            wx.reLaunch({
              url: '/pages/orderDetail/orderDetail?id=' + that.data.orderId,
            })
          }
        })
        return
      }

      wx.requestPayment({
        timeStamp: res.data.timeStamp,
        nonceStr: res.data.nonceStr,
        package: res.data.package,
        signType: 'MD5',
        paySign: res.data.paySign,
        success(r) {
          if (r.errMsg == "requestPayment:ok") {
            // 订阅
            wx.requestSubscribeMessage({
              tmplIds: ['9Dw4q9dwf5syslHVvldG23vdYtsVk2fDrsTK9cG38JE', 'FEt-lfDG1w4G6IMync2bIzeII2MtlbDrBnqhlDHNUjE', 'ogaAjFMMr8XwY1yuV5Dz-55SPLyS5lmYeUNpONE_QGE'],
              success() {
                wx.reLaunch({
                  url: '/pages/orderDetail/orderDetail?id=' + that.data.orderId,
                })
              }
            })
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
  }
})
