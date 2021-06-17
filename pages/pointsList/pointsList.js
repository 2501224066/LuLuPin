import {
  pointsList,
  pointsListCount
} from '../../config/api'

const App = getApp()

Page({
  data: {
    phoneFooter: null,
    navHeight: 0,
    navTop: 0,
    dateIndex: 0,
    total: "0.00",
    date: [],
    list: [],
    entry: '0.00', // 收入
    out: '0.00' // 支出
  },

  onShow() {
    this.setData({
      navHeight: App.globalData.navHeight,
      navTop: App.globalData.navTop,
      iphoneFooter: App.globalData.iphoneFooter,
      page: 1
    })
    this.sixMonth()
  },

  // 返回
  back() {
    wx.navigateBack()
  },

  // 数据
  getData(addStatus = false) {
    let obj = {
      date: this.data.date[this.data.dateIndex],
      page: this.data.page
    }
    pointsList(obj).then(res => {
      this.setData({
        total: res.data.total,
        list: addStatus ? this.data.list.concat(res.data.list) : res.data.list
      })
    })
  },

  // 最近六个月
  sixMonth() {
    let data = new Date();
    let year = data.getFullYear();
    let mon = data.getMonth() + 2;
    let date = new Array();
    for (let i = 0; i < 5; i++) {
      mon = mon - 1;
      if (mon <= 0) {
        year = year - 1;
        mon = mon + 12;
      }
      if (mon < 10) {
        mon = "0" + mon;
      }
      date[i] = year + "/" + mon
    }
    this.setData({
      date: date
    })
    this.count()
    this.getData()
  },

  // 统计
  count() {
    let obj = {
      date: this.data.date[this.data.dateIndex]
    }
    pointsListCount(obj).then(res => {
      this.setData({
        entry: res.data.entry,
        out: res.data.out
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

  bindPickerChange(e) {
    this.setData({
      page: 1,
      dateIndex: e.detail.value
    })
    this.getData()
    this.count()
  },

  // 跳转
  to(e) {
    wx.navigateTo({
      url: e.currentTarget.dataset.url
    })
  }
})
