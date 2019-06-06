// pages/lotto/lotto.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        imgHost: "",
        pop:false,
        box:[1,2,3,4,5,6,7,8],
        idx:0
    },
    golog:function(){
      wx.navigateTo({
          url:'log/log'
      })
    },
    click:function(){
        console.log(123)
        let num = 0,
            index = 0,
            box = this.data.box,
            that = this
      let timer = setInterval(function () {
          num = box[index]
          index++
          console.log(num)
          if (index >= 7){
              index = 0
              clearInterval(timer)
          }
          that.setData({
              idx:num
          })
        },1000);

    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            imgHost: app.globalData.host.imgHost
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})