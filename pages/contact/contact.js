

Page({
/**
   * 页面的初始数据
   */
  data: {
    order_name:"jiang884584"
    // order_ids:"21435643645765867879" 
 
  },

// 一键复制事件
copyBtn: function (e) {
  var that = this;
  wx.setClipboardData({
   //准备复制的数据
    data: that.data.order_name,
 // data: that.data.order_name + that.data.order_ids,
    success: function (res) {
      wx.showToast({
        title: '复制成功',
      });
    }
  });
},

})