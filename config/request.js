import {
  BASE_URL
} from './constant.js'

const go = function (obj) {
  wx.showLoading({
    title: '加载中',
    duration: 2000,
    mask: true
  })
  return new Promise((resolve, reject) => {
    wx.request({
      url: BASE_URL + obj.url,
      method: obj.method,
      data: obj.data,
      header: {
        'token': wx.getStorageSync('token') || '',
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        wx.hideLoading() //隐藏loading
        if (res.data.code === 200) {
          resolve(res.data)
        } else if (res.data.code === 444) {
          wx.showToast({
            icon: 'loading',
            title: '登录已过期'
          })
          setTimeout(() => {
            wx.navigateTo({
              url: '/pages/login/login',
            })
          }, 1000)
        } else {
          wx.showToast({
            icon: 'loading',
            title: res.data.msg
          })
        }
      },
      fail: function () {
        reject()
        wx.showToast({
          icon: 'none',
          title: '网络请求超时，请退出重试',
          duration: 4000,
        })
      }
    })
  })
}

module.exports = {
  go
}
