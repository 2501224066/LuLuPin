import {
  commissionRank
} from '../../config/api'

Page({
  data: {
    list:[]
  },

  onShow() {
    this.getData()
  },

  // 数据
  getData() {
    commissionRank().then(res => {
      this.setData({
        list: res.data
      })
    })
  }
})
