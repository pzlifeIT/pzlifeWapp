// pages/my/notice/notice.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        imgHost:"",
        ident:0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            imgHost: app.globalData.host.imgHost,
            ident:options.iden
        })
        if (options.iden == 2){
            wx.setNavigationBarTitle({
                title:"钻石会员须知"
            })
        } else if (options.iden == 4){
            wx.setNavigationBarTitle({
                title:"合伙人须知"
            })
        }
    },
    back:function(){
      wx.navigateBack({
          delta:1
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