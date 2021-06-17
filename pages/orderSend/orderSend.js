import {
  orderSend
} from '../../config/api'

const App = getApp()

Page({
  data: {
    id: null,
    iphoneFooter: 0,
    code: null,
    picker: ['驯鹿到家', '中通快递', '韵达快递', '顺丰快递'],
    pickerIndex: 0
  },

  onLoad(options) {
    this.setData({
      id: options.id
    })
  },

  onShow() {
    this.setData({
      iphoneFooter: App.globalData.iphoneFooter,
    })
  },

  // 姓名
  code(e) {
    this.setData({
      code: e.detail.value
    })
  },

  // 选择公司
  bindPickerChange(e) {
    this.setData({
      pickerIndex: e.detail.value
    })
  },


  // 发货
  sub() {
    if (!this.data.code) {
      wx.showToast({
        title: '快递单号未填写',
        icon: 'loading'
      })
      return
    }
    let obj = {
      type: this.data.pickerIndex,
      expr_no: this.data.code,
      id: this.data.id
    }
    orderSend(obj).then(res => {
      wx.showToast({
        title: '发货成功',
        icon: 'success'
      })
      setTimeout(() => {
        wx.navigateBack()
      }, 1000)
    })
  }

})
