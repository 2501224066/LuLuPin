import {
  promotionOrder
} from '../../config/api'

const App = getApp()

Page({
  data: {
    page: 1,
    pagesize: 10,
    list: [],
    imgPre: null
  },

  onShow() {
    this.setData({
      page: 1,
      imgPre: App.globalData.imgPre,
    })
    this.getData()
  },

  // 数据
  getData(addStatus = false) {
    let obj = {
      page: this.data.page,
      pagesize: this.data.pagesize
    }
    promotionOrder(obj).then(res => {
      this.setData({
        list: addStatus ? this.data.list.concat(res.data) : res.data
      })
    })
  },

  // 触底
  onReachBottom() {
    this.setData({
      page: this.data.page + 1
    })
    this.getData(true)
  },
})
