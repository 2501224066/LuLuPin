import {
  offline
} from '../../config/api'

Page({
  data: {
    tab: ['下线用户微信昵称', '商城消费', '佣金'],
    page: 1,
    pagesize: 15,
    list: []
  },
  onShow() {
    this.setData({
      page: 1
    })
    this.getData()
  },

  // 数据
  getData(addStatus = false) {
    let obj = {
      page: this.data.page,
      pagesize: this.data.pagesize
    }
    offline(obj).then(res => {
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
