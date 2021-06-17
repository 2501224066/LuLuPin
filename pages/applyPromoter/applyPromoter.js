import {
  BASE_URL
} from '../../config/constant.js'

import {
  applyPromoters
} from '../../config/api'

const App = getApp()

Page({
  data: {
    iphoneFooter: 0,
    imgPre: null,
    name: null,
    region: ['', '', ''],
    address: null,
    idFace: null,
    idBack: null,
    price: 0
  },

  onShow() {
    this.setData({
      imgPre: App.globalData.imgPre,
      iphoneFooter: App.globalData.iphoneFooter,
      price: wx.getStorageSync('applyPromotersPrice')
    })
  },

  // 姓名
  name(e) {
    this.setData({
      name: e.detail.value
    })
  },

  // 地址
  address(e) {
    this.setData({
      address: e.detail.value
    })
  },

  // 选择位置
  bindRegionChange(e) {
    this.setData({
      region: e.detail.value
    })
  },

  // 上传身份证正面
  idFace() {
    let that = this
    wx.chooseImage({
      count: 1,
      success(res) {
        let tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: BASE_URL + '/extend/upload',
          filePath: tempFilePaths[0],
          name: 'img',
          header: {
            'token': wx.getStorageSync('token') || ''
          },
          success(res) {
            that.setData({
              idFace: JSON.parse(res.data).data.url
            })
          }
        })
      }
    })
  },

  // 上传身份证反面
  idBack() {
    let that = this
    wx.chooseImage({
      count: 1,
      success(res) {
        let tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: BASE_URL + '/extend/upload',
          filePath: tempFilePaths[0],
          name: 'img',
          header: {
            'token': wx.getStorageSync('token') || ''
          },
          success(res) {
            that.setData({
              idBack: JSON.parse(res.data).data.url
            })
          }
        })
      }
    })
  },

  // 提交
  sub() {
    if (!this.data.name) {
      wx.showToast({
        title: '姓名未填写',
        icon: 'loading'
      })
      return
    }

    if (this.data.region[2] == '') {
      wx.showToast({
        title: '位置未选择',
        icon: 'loading'
      })
      return
    }

    if (!this.data.address) {
      wx.showToast({
        title: '详细地址未填写',
        icon: 'loading'
      })
      return
    }

    if (this.data.idFace && this.data.idfBack) {
      wx.showToast({
        title: '身份证不完整',
        icon: 'loading'
      })
      return
    }

    let obj = {
      name: this.data.name,
      province: this.data.region[0],
      city: this.data.region[1],
      area: this.data.region[2],
      street: this.data.address,
      id_cart_front: this.data.idFace,
      id_cart_back: this.data.idBack,
    }
    applyPromoters(obj).then(res => {
      if (this.data.price == 0) {
        //订阅
        wx.requestSubscribeMessage({
          tmplIds: ['LlJq7Wkrrmd1M5AZDa0_Pfk-tKVFpuYAt20517DiIO0'],
          success() {
            wx.reLaunch({
              url: '/pages/applyPromoterRel/applyPromoterRel',
            })
          }
        })
        return
      }

      wx.requestPayment({
        timeStamp: res.data.timeStamp,
        nonceStr: res.data.nonceStr,
        package: res.data.package,
        signType: 'MD5',
        paySign: res.data.paySign,
        success(r) {
          if (r.errMsg == "requestPayment:ok") {
            //订阅
            wx.requestSubscribeMessage({
              tmplIds: ['LlJq7Wkrrmd1M5AZDa0_Pfk-tKVFpuYAt20517DiIO0'],
              success() {
                wx.reLaunch({
                  url: '/pages/applyPromoterRel/applyPromoterRel',
                })
              }
            })
          }
        },
        fail() {
          wx.showToast({
            title: '支付取消',
            icon: 'loading'
          })
        }
      })
    })
  }
})
