import {
  noticeDetail
} from '../../config/api'

Page({
  data: {
    id: null,
    detail: null
  },

  onLoad(options){
    this.setData({
      id: options.id
    })
  },

  onShow() {
    this.getData()
  },

  // 数据
  getData() {
    let obj = {
      id: this.data.id
    }
    noticeDetail(obj).then(res => {
      this.setData({
        detail: res.data
      })
    })
  }
})
