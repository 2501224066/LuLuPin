Component({
  properties: {
    detail: { // 数据列表
      type: JSON,
      value: {}
    }
  },
  methods: {
    // 跳转
    to(e){
      wx.navigateTo({
        url: e.currentTarget.dataset.url
      })
    }
  }
})