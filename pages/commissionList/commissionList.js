import {
  commissionList,
  commissionListCount
} from '../../config/api'

const App = getApp()

Page({
  data: {
    phoneFooter: null,
    navHeight: 0,
    navTop: 0,
    dateIndex: 0,
    date: [],
    list: [],
    total: [],
    page: 1,
    pagesize: 10,
  },

  onShow() {
    this.setData({
      page: 1,
      navHeight: App.globalData.navHeight,
      navTop: App.globalData.navTop,
      iphoneFooter: App.globalData.iphoneFooter,
    })
    this.sixMonth()
    this.getData()
    this.count()
  },

  // 数据
  getData(addStatus = false) {
    let obj = {
      page: this.data.page,
      pagesize: this.data.pagesize,
      date: this.data.date[this.data.dateIndex]
    }
    commissionList(obj).then(res => {
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

  // 统计
  count() {
    let obj = {
      date: this.data.date[this.data.dateIndex]
    }
    commissionListCount(obj).then(res => {
      this.setData({
        total: res.data.total
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
  },

  bindPickerChange(e) {
    this.setData({
      page: 1,
      dateIndex: e.detail.value
    })
    this.getData()
    this.count()
  },


})
