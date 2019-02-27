// pages/order/orderDetail/orderDetail.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        orderno: '',
        order_info: {}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        console.log(options)
        this.setData({
            orderno: options.orderno
        })
        parseInt
        parseFloat
        this.getUserOrderInfo({
            orderno: options.orderno
        })
    },
    disOrderInfo: function(data) {
        let info = data
        info.order_status_text = this.getorder_status(info.order_status)
        info.deduction_money = parseFloat(info.deduction_money)
        info.third_money = parseFloat(info.third_money)
        return info
    },
    getorder_status: function(n) {
        let text = ''
        switch (parseInt(n)) {
            case 1:
                text = '待付款 '
                break;
            case 2:
                text = '订单已取消'
                break;
            case 3:
                text = '订单已关闭'
                break;
            case 4:
                text = '已付款'
                break;
            case 5:
                text = '已发货'
                break;
            case 6:
                text = '已收货'
                break;
            case 7:
                text = '待评价'
                break;
            case 8:
                text = '退款申请中'
                break;
            case 9:
                text = '退款中'
                break;
            case 10:
                text = '退款成功'
                break;
            default:
                text = '未知状态'
        }
        return text
    },
    getUserOrderInfo: function(data) {
        let that = this
        app.wxrequest({
            url: 'index/order/getUserOrderInfo',
            data: {
                order_no: data.orderno
            },
            success: function(res) {
                let info = that.disOrderInfo(res.order_info)
                that.setData({
                    order_info: info
                })
            },
            error: function(code) {

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
        console.log(1111)
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