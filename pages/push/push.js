import {
  pushList
} from '../../config/api'

Page({
  data: {
    page: 1,
    list: []
  },

  onShow() {
    this.getData()
  },

  // 数据
  getData(addStatus = false) {
    let obj = {
      page: this.data.page
    }
    pushList(obj).then(res => {
      this.setData({
        list: addStatus ? this.data.list.concat(res.data) : res.data,
        page: this.data.page + 1
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
