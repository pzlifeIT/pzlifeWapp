// pages/order/logisticsInfo/logisticsInfo.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        express_key: '',
        express_no: '',
        order_no: '',
        address: {},
        expresslog: [],
        len: 0,
        imgHost:""
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            express_key: options.expresskey,
            express_no: options.expressno,
            order_no: options.orderno,
            express_name: options.expressname,
            imgHost: app.globalData.host.imgHost
        })
        this.getExpressLog({
            express_key: options.expresskey,
            express_no: options.expressno,
            order_no: options.orderno
        })
    },
    getExpressLog(data) {
        let that = this
        app.wxrequest({
            url: 'order/getExpressLog',
            data: {
                express_key: data.express_key,
                express_no: data.express_no,
                order_no: data.order_no
            },
            success: function (res) {
                that.setData({
                    address: res.address,
                    expresslog: res.expresslog,
                    len: res.expresslog.length - 1
                })
            }
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