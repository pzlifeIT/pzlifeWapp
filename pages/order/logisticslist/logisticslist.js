// pages/order/logisticslist/logisticslist.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        num: 0,
        order_no: '',
        order_subpackage: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        wx.setNavigationBarTitle({
            title: '订单物流'
        })
        this.setData({
            order_no: options.orderno
        })
        this.getOrderSubpackage(options.orderno)
    },
    getOrderSubpackage: function(orderno) {
        let that = this
        app.wxrequest({
            url: 'order/getOrderSubpackage',
            data: {
                order_no: orderno
            },
            success: function(res) {
                that.setData({
                    num: res.package_num,
                    order_subpackage: res.order_subpackage || []
                })
            }
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