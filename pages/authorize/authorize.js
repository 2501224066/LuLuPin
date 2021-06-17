import {
  updateUserInfo
} from '../../config/api'


const App = getApp()

Page({
  data: {
    navHeight: 0,
    navTop: 0,
  },

  onShow() {
    this.setData({
      navHeight: App.globalData.navHeight,
      navTop: App.globalData.navTop
    })
  },

  getUserProfile(e) {
    wx.getUserProfile({
      desc: '用于完善会员资料',
      success: (res) => {
        // 存储用户信息
        wx.setStorageSync('userInfo', {
          nickName: res.userInfo.nickName,
          avatarUrl: res.userInfo.avatarUrl,
          phone: wx.getStorageSync('userInfo').phone,
          sex: res.userInfo.gender,
        })

        let obj = {
          nickname: res.userInfo.nickName,
          user_img: res.userInfo.avatarUrl,
          sex: res.userInfo.gender
        }
        updateUserInfo(obj).then(res => {
          wx.setStorageSync('authStatus', true)
          wx.showToast({
            icon: "success",
            title: '授权成功',
            success() {
              wx.switchTab({
                url: '/pages/my/my'
              })
            }
          })
        })
      }
    })
  },

  // 返回主页
  toHome() {
    wx.switchTab({
      url: '/pages/pointsShop/pointsShop',
    })
  }
})
