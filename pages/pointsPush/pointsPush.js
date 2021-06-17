import {
  pointsPush
} from '../../config/api'

const App = getApp()

Page({
  data: {
    goods: [],
    page: 1,
    pagesize: 14,
  },

  onShow() {
    this.setData({
      imgPre: App.globalData.imgPre,
      pointsPushImg: wx.getStorageSync('pointsPushImg'),
      page: 1,
    })
    this.getPush()
  },

  // 推荐商品
  getPush(addStatus = false) {
    let obj = {
      page: this.data.page,
      pagesize: this.data.pagesize,
    }
    pointsPush(obj).then(res => {
      this.setData({
        goods: addStatus ? this.data.goods.concat(res.data) : res.data
      })
    })
  },

  // 触底
  onReachBottom() {
    this.setData({
      page: this.data.page + 1
    })
    this.getPush(true)
  },
})
