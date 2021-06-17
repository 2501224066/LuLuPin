import {
  login
} from '../../config/api'

const App = getApp()

Page({
  data: {
    navHeight: 0,
    navTop: 0,
    agree: false,
    code: null,
  },

  onShow() {
    this.setData({
      navHeight: App.globalData.navHeight,
      navTop: App.globalData.navTop
    })
    this.login()
  },

  // 同意协议
  agree() {
    this.setData({
      agree: !this.data.agree
    })
  },

  // 提示同意协议
  noAgree() {
    wx.showToast({
      title: '请先同意协议',
      icon: "none"
    })
  },

  // 返回主页
  toHome() {
    wx.switchTab({
      url: '/pages/pointsShop/pointsShop',
    })
  },

  // 登录
  login() {
    let that = this
    // 获取code
    wx.login({
      success(res) {
        that.setData({
          code: res.code
        })
      }
    })
  },

  // 获取手机号
  getPhoneNumber(e) {
    // 拒绝授权
    if (e.detail.errMsg != 'getPhoneNumber:ok') {
      return false
    }

    let that = this
    wx.checkSession({
      success() {
        var obj = {
          code: that.data.code,
          iv: e.detail.iv,
          encryptedData: e.detail.encryptedData,
        }
        if (wx.getStorageSync('shareUserId')) {
          obj.share_user_id = wx.getStorageSync('shareUserId') // 邀请人
        }
        login(obj).then(res => {
          wx.setStorageSync('token', res.data.token)
          wx.setStorageSync('userId', res.data.id)
          wx.setStorageSync('userInfo', {
            nickName: res.data.nickname,
            avatarUrl: res.data.avatar,
            phone: res.data.mobile,
            sex: 0
          })
          wx.setStorageSync('loginStatus', true)
          wx.showToast({
            icon: "success",
            title: '登录成功',
            success() {
              if (!wx.getStorageSync('authStatus')) {
                wx.navigateTo({
                  url: '/pages/authorize/authorize',
                })
                return
              }
              wx.switchTab({
                url: '/pages/pointsShop/pointsShop',
              })
            }
          })
        })
      },
      fail() {
        that.login()
      }
    })
  },

  // 跳转
  to(e) {
    wx.navigateTo({
      url: e.currentTarget.dataset.url
    })
  }
})
