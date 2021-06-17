import {
  pointsGoodsDetail,
  code
} from '../../config/api'

let App = getApp()

Page({
  data: {
    iphoneFooter: 0,
    img: null,
    orderId: null,
    detail: null,
    code: null,
    w: null,
    h: null,
    dpr: null,
    canvasTemppath: null
  },

  onLoad(options) {
    this.setData({
      orderId: options.orderId
    })
    if (options.hasOwnProperty('shareUserId')) {
      wx.setStorageSync('shareUserId', options.shareUserId)
    }
  },

  onShow() {
    if (!wx.getStorageSync('loginStatus')) {
      wx.showToast({
        title: '请先登录',
        icon: 'loading'
      })
     setTimeout(() => {
        wx.navigateTo({
          url: '/pages/login/login',
        })
      }, 1000)
      return
    }

    this.setData({
      name: wx.getStorageSync('loginStatus') ? wx.getStorageSync('userInfo').nickName.substring(0, 3) + (wx.getStorageSync('userInfo').nickName.length > 3 ? "..." : '') : 'lulu拼',
      iphoneFooter: App.globalData.iphoneFooter,
      imgPre: App.globalData.imgPre,
      w: wx.getSystemInfoSync().screenWidth,
      h: wx.getSystemInfoSync().windowHeight,
      dpr: wx.getSystemInfoSync().pixelRatio
    })
    this.getData()
  },

  // 获取数据
  getData() {
    let obj = {
      id: this.data.orderId
    }
    pointsGoodsDetail(obj).then(res => {
      this.setData({
        detail: res.data
      })
      this.getCode()
    })
  },

  // 小程序码
  getCode() {
    let obj = {
      path: '/pages/pointsGoodsDetail/pointsGoodsDetail?id=' + this.data.detail.goods.id + '&shareUserId=' + wx.getStorageSync('userId')
    }
    code(obj).then(res => {
      this.setData({
        code: res.data
      })
      this.canvas()
    })
  },

  // 绘制 canvas
  canvas() {
    let query = wx.createSelectorQuery()
    query.select('#myCanvas')
      .fields({
        node: true,
        size: true
      })
      .exec((res) => {
        let canvas = res[0].node;
        canvas.width = res[0].width * this.data.dpr
        canvas.height = res[0].height * this.data.dpr
        let ctx = canvas.getContext('2d')
        ctx.scale(this.data.dpr, this.data.dpr)
        ctx.fillStyle = "#f8f8f8"; // 背景色
        ctx.fillRect(0, 0, this.data.w, this.data.w * 1.8) // 画布大小  
        // 商品图
        let pic = canvas.createImage();
        pic.src = this.data.imgPre + "/" + this.data.detail.goods.banners[0]
        pic.onload = () => {
          ctx.drawImage(pic, this.data.w * 0.05, this.data.w * 0.1, this.data.w * 0.9, this.data.w * 0.9)
          // 外倒角-放在此处防止商品图覆盖倒角图片
          let pic4 = canvas.createImage();
          pic4.src = '/image/poster2.png'
          pic4.onload = () => {
            ctx.drawImage(pic4, this.data.w * 0.05, this.data.w * 0.1, this.data.w * 0.9, this.data.w * 1.6)
          }
        }
        // 中间介绍背景
        let pic2 = canvas.createImage();
        pic2.src = "/image/poster1.png"
        pic2.onload = () => {
          ctx.drawImage(pic2, this.data.w * 0.05, this.data.w, this.data.w * 0.9, (this.data.w * 1.6 - this.data.w * 0.9) * 0.75)
          // 商品标题
          ctx.font = "normal bold 16px sans-serif"
          ctx.fillStyle = "black"
          ctx.fillText(this.data.detail.goods.name.substring(0, 12), this.data.w * 0.11, this.data.w * 1.12)
          ctx.fillText(this.data.detail.goods.name.substring(12, 23) + (this.data.detail.goods.name.length > 23 ? "..." : ''), this.data.w * 0.11, this.data.w * 1.18)
          // 简介
          ctx.font = "normal 400 14px sans-serif"
          ctx.fillStyle = "gray"
          ctx.fillText(this.data.detail.goods.desc, this.data.w * 0.11, this.data.w * 1.27)
          // 价格
          ctx.font = "normal bold 20px sans-serif"
          ctx.fillStyle = "red"
          ctx.fillText("¥ " + this.data.detail.goods.price, this.data.w * 0.11, this.data.w * 1.4)
          // 原价
          ctx.font = "normal 400 14px sans-serif"
          ctx.fillStyle = "gray"
          ctx.fillText("¥ " + this.data.detail.goods.price_market, this.data.w * 0.41, this.data.w * 1.4)
          // 删除线
          ctx.font = "normal 400 12px Arial"
          ctx.fillStyle = "gray"
          ctx.fillText(this.data.detail.goods.price_market > 999 ? "———————" : (this.data.detail.goods.price_market > 99 ? "——————" : "—————"), this.data.w * 0.4, this.data.w * 1.4)
          // 小程序码
          let pic6 = canvas.createImage();
          pic6.src = this.data.imgPre + '/' + this.data.code
          pic6.onload = () => {
            ctx.drawImage(pic6, this.data.w * 0.67, this.data.w * 1.1, this.data.w * 0.23, this.data.w * 0.23)
          }
        }
        // 底部红色背景
        let pic7 = canvas.createImage();
        pic7.src = '/image/poster4.png'
        pic7.onload = () => {
          ctx.drawImage(pic7, this.data.w * 0.05, this.data.w + (this.data.w * 1.6 - this.data.w * 0.9) * 0.75, this.data.w * 0.9, (this.data.w * 1.6 - this.data.w * 0.9) * 0.25)
          // 头像
          let pic3 = canvas.createImage();
          pic3.src = wx.getStorageSync('loginStatus') ? wx.getStorageSync('userInfo').avatarUrl : '/image/logo.png'
          pic3.onload = () => {
            ctx.drawImage(pic3, this.data.w * 0.1, this.data.w + (this.data.w * 1.6 - this.data.w * 0.9) * 0.75 + (this.data.w * 1.6 - this.data.w * 0.9) * 0.25 / 4, this.data.w * 0.1, this.data.w * 0.1)
            // 名称
            ctx.font = "normal 400 14px sans-serif"
            ctx.fillStyle = "white"
            ctx.fillText(this.data.name + '推荐好物给您', this.data.w * 0.22, this.data.w * 1.63)
            // 销量
            ctx.font = "normal 400 14px sans-serif"
            ctx.fillStyle = "white"
            ctx.fillText('已售' + this.data.detail.goods.sale_num + '件', this.data.w * 0.72, this.data.w * 1.63)
            // 头像倒角
            let pic5 = canvas.createImage();
            pic5.src = '/image/poster3.png'
            pic5.onload = () => {
              ctx.drawImage(pic5, this.data.w * 0.1, this.data.w + (this.data.w * 1.6 - this.data.w * 0.9) * 0.75 + (this.data.w * 1.6 - this.data.w * 0.9) * 0.25 / 4, this.data.w * 0.1, this.data.w * 0.1)
            }
          }
        }
        // 保存为图片
        let that = this
        setTimeout(() => {
          wx.canvasToTempFilePath({
            x: 0,
            y: 0,
            canvas,
            fileType: 'png',
            success(res) {
              that.setData({
                canvasTemppath: res.tempFilePath
              })
            },
            fail(res) {
              console.log(res)
            }
          })
        }, 1000)
      })
  },

  // 保存图片到相册
  saveImg() {
    wx.saveImageToPhotosAlbum({
      filePath: this.data.canvasTemppath,
      success(res) {
        wx.showToast({
          title: '已保存到相册',
          icon: 'success'
        })
        wx.navigateBack()
      }
    })
  }

})
