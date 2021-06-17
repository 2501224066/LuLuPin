import {
  withdrawalList,
  withdrawalListCount
} from '../../config/api'

const App = getApp()

Page({
  data: {
    phoneFooter: null,
    navHeight: 0,
    navTop: 0,
    tabIndex: 0,
    tab: [{
      type: 2,
      name: '成功'
    }, {
      type: 1,
      name: '审核中'
    }, {
      type: 3,
      name: '失败'
    }],
    dateIndex: 0,
    date: [],
    total: 0,
    list: []
  },

  onShow() {
    this.setData({
      navHeight: App.globalData.navHeight,
      navTop: App.globalData.navTop,
      iphoneFooter: App.globalData.iphoneFooter,
    })
    this.sixMonth()
    this.getData()
    this.count()
  },

  // 数据
  getData() {
    let obj = {
      type: this.data.tab[this.data.tabIndex].type,
      date: this.data.date[this.data.dateIndex]
    }
    withdrawalList(obj).then(res => {
      this.setData({
        list: res.data
      })
    })
  },

  // 统计
  count() {
    let obj = {
      date: this.data.date[this.data.dateIndex]
    }
    withdrawalListCount(obj).then(res => {
      this.setData({
        total: res.data.total
      })
    })
  },

  // 切换tab
  checkoutTab(e) {
    this.setData({
      tabIndex: e.currentTarget.dataset.index
    })
    this.getData()
    this.count()
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
