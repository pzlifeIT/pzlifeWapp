// pages/paystatus/paystatus.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        status: 1,
        order_no: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.setData({
            status: options.status,
            orderno: options.orderno
        })

    },
    goorder: function(e) {
        let n
        if (this.data.status == 1) {
            n = 4
        } else if (this.data.status == 2) {
            n = 1
        }
        wx.navigateTo({
            url: '/page/order/order?status=' + n
        })
    },
    gopay: function(e) {

    },
    goindex: function(e) {
        wx.switchTab({
            url: '/page/index/index'
        })
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})