import {
  setting
} from '../../config/api'

Page({
  data: {
    text: null
  },

  onShow() {
    this.getData()
  },

  // 数据
  getData() {
    setting().then(res => {
      this.setData({
        text: res.data.site_about_us
      })
    })
  }
})
