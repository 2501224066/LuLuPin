Component({
  data: {
    domWidth: null,
  },
  properties: {
    imgPre: { // 图片前缀
      type: String,
      value: ""
    },
    detail: { // 数据列表
      type: JSON,
      value: {}
    }
  },
  lifetimes: {
    attached() {
      this.domWidth()
    }
  },
  methods: {
    // 标签宽度
    domWidth() {
      let query = this.createSelectorQuery();
      query.select('#dom').boundingClientRect();
      query.exec((res) => {
        this.setData({
          domWidth: res[0].width
        })
      })
    },

    // 跳转
    to(e) {
      wx.navigateTo({
        url: e.currentTarget.dataset.url
      })
    }
  }
})
