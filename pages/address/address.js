import {
  addressList,
  delAddress
} from '../../config/api'

const App = getApp()

Page({
  data: {
    iphoneFooter: 0,
    list: []
  },

  onShow() {
    this.setData({
      iphoneFooter: App.globalData.iphoneFooter,
    })
    this.getData()
  },

  // 数据
  getData() {
    addressList().then(res => {
      this.setData({
        list: res.data
      })
    })
  },

  // 删除
  del(e) {
    let that = this
    wx.showModal({
      title: '提示',
      content: '确定要删除吗？',
      success: function (sm) {
        let obj = {
          id: e.currentTarget.dataset.id
        }
        delAddress(obj).then(res => {
          that.getData()
        })
      }
    })
  },

  //  跳转
  to(e) {
    wx.navigateTo({
      url: e.currentTarget.dataset.url,
    })
  }
})
