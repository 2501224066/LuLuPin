import {
  rank
} from '../../config/api'

Page({
  data: {
    tabList: [
      '邀请', '收入', '购物币', '消费'
    ],
    tabIndex: 0,
    list:[]
  },

  onShow() {
    this.getData()
  },

  // 数据
  getData() {
    let obj = {
      type: this.data.tabIndex + 1
    }
    rank(obj).then(res => {
      this.setData({
        list: res.data
      })
    })
  },


  // 切换tab
  checkoutTab(e) {
    this.setData({
      tabIndex: e.currentTarget.dataset.index
    })
    this.getData()
  }
})
