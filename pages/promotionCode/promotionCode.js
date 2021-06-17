import {
  code
} from '../../config/api'

const App = getApp()

Page({
  data: {
    iphoneFooter: 0,
    code: null,
    imgPre: null,
    userId: null,
    w: null,
    h: null,
    dpr: null,
    canvasTemppath: null
  },

  onShow() {
    this.setData({
      iphoneFooter: App.globalData.iphoneFooter,
      imgPre: App.globalData.imgPre,
      userId: wx.getStorageSync('userId'),
      w: wx.getSystemInfoSync().screenWidth,
      h: wx.getSystemInfoSync().windowHeight,
      dpr: wx.getSystemInfoSync().pixelRatio
    })
    this.getCode()
  },

  // 小程序码
  getCode() {
    let obj = {
      path: '/pages/pointsShop/pointsShop?shareUserId=' + this.data.userId
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
        ctx.fillStyle = "#fff"; // 背景色
        ctx.fillRect(0, 0, this.data.w, this.data.w) // 画布大小  
        // 小程序码
        let pic = canvas.createImage();
        pic.src = this.data.imgPre + "/" + this.data.code
        pic.onload = () => {
          ctx.drawImage(pic, this.data.w * 0.25, this.data.w * 0.25, this.data.w * 0.5, this.data.w * 0.5)
          // 推广ID
          ctx.font = "normal 500 14px sans-serif"
          ctx.fillStyle = "black"
          ctx.fillText('推广ID：' + (this.data.userId + 43200), this.data.w * 0.36, this.data.w * 0.84)
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
