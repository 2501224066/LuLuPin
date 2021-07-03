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
    orderId: null,
    remark: ''
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

  // 备注
  remark(e) {
    this.setData({
      remark: e.detail.value
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
      address_id: this.data.address.id,
      message: this.data.remark
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
          tmplIds: ['9pBhhFAQrh4uJ7wUzGg-miJndHgpS_fOVnKF87JCE5Y', 'PulFWEKZ1ilN4Xe65u6gb9QedPSO16eRMSpZJ5ixk_s', 'Bd2w1K75eOaIeEIPUCCXRwUPZLDnhzKYAYJeZoOofD8'],
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
              tmplIds: ['9pBhhFAQrh4uJ7wUzGg-miJndHgpS_fOVnKF87JCE5Y', 'PulFWEKZ1ilN4Xe65u6gb9QedPSO16eRMSpZJ5ixk_s', 'Bd2w1K75eOaIeEIPUCCXRwUPZLDnhzKYAYJeZoOofD8'],
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
