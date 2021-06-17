import {
  followList
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
    followList().then(res => {
      this.setData({
        list: addStatus ? this.data.list.concat(res.data) : res.data
      })
    })
  }

})
