import {
  orderList,
  take,
  pointsPay
} from '../../config/api'

const App = getApp()

Page({
  data: {
    tabList: [
      '全部', '待付款', '待发货', '已发货', '已完成', '已取消'
    ],
    tabIndex: 0,
    list: [],
    imgPre: null,
    page: 1
  },

  onLoad() {
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

  // 切换tab
  checkoutTab(e) {
    this.setData({
      page: 1,
      tabIndex: e.currentTarget.dataset.index
    })
    wx.setStorageSync('lookOrderTab', this.data.tabIndex)
    this.getData()
  },

  // 数据
  getData(addStatus = false) {
    let obj = {
      page: this.data.page,
      type: this.data.tabIndex
    }
    orderList(obj).then(res => {
      this.setData({
        list: addStatus ? this.data.list.concat(res.data) : res.data
      })
    })
  },

  // 收货
  take(e) {
    let that = this
    wx.showModal({
      title: '确认',
      content: '是否确认收货',
      success(r) {
        if (r.confirm) {
          let obj = {
            id: e.currentTarget.dataset.id
          }
          take(obj).then(res => {
            wx.showToast({
              title: '收货成功',
              icon: "success"
            })
            setTimeout(() => {
              that.setData({
                page: 1
              })
              that.getData()
            }, 1000)
          })
        }
      }
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
  }
})
