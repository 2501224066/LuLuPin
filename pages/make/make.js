import {
  goodsList
} from '../../config/api'

Page({
  data: {
    tabList: [
      '全部', '1-99元', '100-199元', '200元以上'
    ],
    tabIndex: 0,
    list: [],
    keyword: null,
    page: 1
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
      type: this.data.tabIndex,
    }
    this.data.keyword ? obj.keyword = this.data.keyword : null
    goodsList(obj).then(res => {
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

  // 切换tab
  checkoutTab(e) {
    this.setData({
      tabIndex: e.currentTarget.dataset.index,
      page: 1
    })
    this.getData()
  },

  // 输入关键字
  setKeyword(e) {
    this.setData({
      keyword: e.detail.value,
      page: 1
    })
    this.getData()
  },

  // 关闭关键字
  close() {
    this.setData({
      keyword: null
    })
    this.getData()
  }
})
