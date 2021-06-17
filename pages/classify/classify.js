import {
  classify,
  twoClassify,
  pointsGoods
} from '../../config/api'

const App = getApp()

Page({
  data: {
    imgPre: null,
    tabIndex: 0,
    tab: [''],
    twoIndex: 0,
    two: [''],
    goods: [],
    keyword: '',
    page: 1,
    pagesize: 15,
    tabId: null // icon跳进来
  },

  onLoad(options) {
    if (options.hasOwnProperty('id')) {
      this.setData({
        tabId: options.id
      })
    }
    this.setData({
      imgPre: App.globalData.imgPre,
      page: 1
    })
    this.getClassify()
  },
  
  // 关键字
  keyword(e) {
    this.setData({
      keyword: e.detail.value,
      page: 1
    })
    this.getGoods()
  },

  // 清楚关键字
  closeKeyword() {
    this.setData({
      keyword: '',
      page: 1
    })
    this.getGoods()
  },

  // 一级分类
  getClassify() {
    let that = this
    classify().then(res => {
      that.setData({
        tab: res.data
      })
      if (that.data.tabId != null) {
        res.data.forEach(function (v, k) {
          if (v.id == that.data.tabId) {
            that.setData({
              tabIndex: k
            })
          }
        })
      }
      that.getTwoClassify()
    })
  },

  // 二级分类
  getTwoClassify() {
    let obj = {
      id: this.data.tab[this.data.tabIndex].id
    }
    twoClassify(obj).then(res => {
      this.setData({
        two: res.data
      })
      this.getGoods()
    })
  },

  // 商品
  getGoods(addStatus = false) {
    let obj = {
      pid: this.data.tab[this.data.tabIndex].id,
      id: this.data.two.length > 0 ? this.data.two[this.data.twoIndex].id : null,
      page: this.data.page,
      pagesize: this.data.pagesize
    }
    if (this.data.keyword != '') {
      obj.keyword = this.data.keyword
    }
    pointsGoods(obj).then(res => {
      this.setData({
        goods: addStatus ? this.data.goods.concat(res.data) : res.data
      })
    })
  },

  // 触底
  onReachBottom() {
    this.setData({
      page: this.data.page + 1
    })
    this.getGoods(true)
  },

  // 切换tab
  checkoutTab(e) {
    this.setData({
      tabIndex: e.currentTarget.dataset.index,
      twoIndex: 0,
      goods: [],
      page: 1
    })
    this.getTwoClassify()
  },

  // 切换two
  checkoutTwo(e) {
    this.setData({
      twoIndex: e.currentTarget.dataset.index,
      goods: [],
      page: 1
    })
    this.getGoods()
  }
})
