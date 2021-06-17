import {
  earnList
} from '../../config/api'

Page({
  data: {
    tabList: [
      '全部', '拼团中', '拼团成功', '拼团失败'
    ],
    tabIndex: 0,
    list: [],
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
    let type = null
    switch (this.data.tabIndex) {
      case 0:
        type = 0
        break
      case 1:
        type = 3
        break
      case 2:
        type = 1
        break
      case 3:
        type = 2
        break
    }
    let obj = {
      page: this.data.page,
      type: type
    }
    earnList(obj).then(res => {
      this.setData({
        list: addStatus ? this.data.list.concat(res.data) : res.data
      })
      if (this.data.list.length > 0) {
        this.countTime()
      }
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
      page: 1,
      tabIndex: e.currentTarget.dataset.index
    })
    this.getData()
  },

  // 倒计时
  countTime() {
    let that = this
    let timing = setInterval(function () {
      let nowTime = Math.floor(Date.parse(new Date()) / 1000);
      that.data.list.forEach(function (value, key) {
        let d = '00'
        let H = '00'
        let i = '00'
        let s = '00'
        if (value.expiretime >= nowTime) {
          let surplus = value.expiretime - nowTime
          d = that.addZero(Math.floor(surplus / 86400))
          H = that.addZero(Math.floor((surplus - d * 86400) / 3600))
          i = that.addZero(Math.floor((surplus - d * 86400 - H * 3600) / 60))
          s = that.addZero(surplus - d * 86400 - H * 3600 - i * 60)
        }
        that.data.list[key].time = d + '天' + H + '时' + i + '分' + s + '秒'
      });
      that.setData({
        list: that.data.list
      })
    }, 1000)

    that.setData({
      timing: timing
    })
  },

  // 补零
  addZero(num) {
    return num < 10 ? "0" + num : num
  },

  // 跳转
  to(e) {
    wx.navigateTo({
      url: e.currentTarget.dataset.url
    })
  },

  onHide() {
    clearInterval(this.data.timing);
  },

  onUnload() {
    clearInterval(this.data.timing);
  }
})
