import {
  defaultAddress,
  goodsDetail,
  groupId,
  orderDetail,
  orderPayData,
  pay
} from '../../config/api'

const App = getApp()

Page({
  data: {
    iphoneFooter: 0,
    goodsId: null,
    orderId: null,
    detail: null,
    address: null,
    orderPayData: null,
  },

  onLoad(options) {
    this.setData({
      goodsId: options.goodsId,
      orderId: options.orderId
    })
  },

  onShow() {
    this.setData({
      iphoneFooter: App.globalData.iphoneFooter
    })
    this.getGoodsDetail()
    this.getOrderDetail()
    this.getAddress()
    this.getOrderPayData()
  },

  // 订单数据
  getOrderDetail() {
    let obj = {
      id: this.data.orderId
    }
    orderDetail(obj).then(res => {
      this.setData({
        orderDetail: res.data
      })
    })
  },

  // 支付数据
  getOrderPayData() {
    let obj = {
      id: this.data.orderId
    }
    orderPayData(obj).then(res => {
      this.setData({
        orderPayData: res.data
      })
    })
  },

  // 商品数据
  getGoodsDetail() {
    let obj = {
      id: this.data.goodsId
    }
    goodsDetail(obj).then(res => {
      this.setData({
        detail: res.data.goods
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

  // 支付
  pay() {
    let that = this
    if (!that.data.address.id) {
      wx.showToast({
        title: '请设置地址',
        icon: 'loading'
      })
      return
    }

    let obj = {
      order_id: that.data.orderId
    }
    pay(obj).then(res => {
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
              tmplIds: ['WfgVI-w26qo57hZEzOrb1nFVrTvh0wvdw3DnXJCc8iI', 'FEt-lfDG1w4G6IMync2bIzeII2MtlbDrBnqhlDHNUjE', 'ogaAjFMMr8XwY1yuV5Dz-55SPLyS5lmYeUNpONE_QGE'],
              success() {
                // 直接购买
                if (that.data.orderDetail.buy_type != 1) {
                  wx.navigateTo({
                    url: '/pages/orderDetail/orderDetail?id=' + that.data.orderId,
                  })
                  return
                }

                // 拼团购买 轮训获取结果
                wx.showLoading({
                  title: '获取支付结果',
                  duration: 5000,
                  mask: true
                })
               setTimeout(() => {
                  let obj = {
                    id: that.data.orderId
                  }
                  groupId(obj).then(val => {
                    if (val.data.status == 2) {
                      wx.hideLoading()
                      wx.navigateTo({
                        url: '/pages/luckDraw/luckDraw?id=' + val.data.active_id + '&goodsId=' + res.data.good_id,
                      })
                    } else if (val.data.status == 0) {
                      wx.hideLoading()
                      wx.showToast({
                        title: '支付取消',
                        icon: 'loading'
                      })
                    }
                  })
                }, 1000)
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
