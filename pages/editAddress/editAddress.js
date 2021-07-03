import {
  editAddress,
  getAddress
} from '../../config/api'

import QQMapWX from "../../utils/qqmap-wx-jssdk.min.js"

const App = getApp()

Page({
  data: {
    id: null,
    iphoneFooter: 0,
    sex: null,
    default: 0,
    address: null,
    name: null,
    phone: null,
    region: ['广东省', '广州市', '海珠区'],
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
    if (this.data.id) {
      this.getData()
    }
  },

  // 数据
  getData() {
    let obj = {
      id: this.data.id
    }
    getAddress(obj).then(res => {
      this.setData({
        sex: res.data.sex,
        default: res.data.is_default,
        address: res.data.street,
        name: res.data.contact,
        phone: res.data.mobile,
        region: [res.data.province, res.data.city, res.data.area]
      })
    })
  },

  // 获取定位
  getAddressForMap() {
    wx.getLocation({
      type: 'wgs84',
      success: (res) => {
        let qqmapsdk = new QQMapWX({
          key: App.globalData.mapKey,
        });
        qqmapsdk.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          success: (re) => {
            this.setData({
              region: [re.result.address_component.province, re.result.address_component.city, re.result.address_component.district],
              address: re.result.address_component.street
            })
          }
        })
      }
    })
  },

  // 编辑地址
  save() {
    if (!this.data.address) {
      wx.showToast({
        title: '地址未填写',
        icon: "loading"
      })
      return
    }
    if (!this.data.name) {
      wx.showToast({
        title: '联系人姓名未填写',
        icon: "loading"
      })
      return
    }
    if (!this.data.sex) {
      wx.showToast({
        title: '性别未选择',
        icon: "loading"
      })
      return
    }
    if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.data.phone))) {
      wx.showToast({
        title: '手机号有误',
        icon: "loading"
      })
      return
    }

    let obj = {
      contact: this.data.name,
      mobile: this.data.phone,
      province: this.data.region[0],
      city: this.data.region[1],
      area: this.data.region[2],
      street: this.data.address,
      is_default: this.data.default,
      sex: this.data.sex,
    }
    this.data.id ? obj.id = this.data.id : null
    editAddress(obj).then(res => {
      wx.navigateBack()
    })
  },

  bindRegionChange(e) {
    this.setData({
      region: e.detail.value
    })
  },

  // 选择性别
  checkoutSex(e) {
    this.setData({
      sex: e.currentTarget.dataset.sex
    })
  },

  // 设置默认
  setDefault() {
    this.setData({
      default: this.data.default == 1 ? 0 : 1
    })
  },

  // 地址
  address(e) {
    this.setData({
      address: e.detail.value
    })
  },

  // 电话
  phone(e) {
    this.setData({
      phone: e.detail.value
    })
  },

  // 姓名
  name(e) {
    this.setData({
      name: e.detail.value
    })
  }
})
