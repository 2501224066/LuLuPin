import {
  carList
} from '../../config/api'

Component({
  pageLifetimes: {
    show() {
      this.carNum()
    }
  },
  methods: {
    // 查询购物车数量
    carNum() {
      if (wx.getStorageSync('loginStatus')) {
        carList().then(res => {
          wx.setTabBarBadge({
            index: 3,
            text: String(res.data.length)
          })
        })
      }
    }
  }
})
