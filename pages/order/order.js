// pages/order/order.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        orhead: '',
        order: true,
        orderStatus: 1,
        mask: false,
        order_list: []
    },
    comfir: function(e) {
        this.setData({
            mask: true
        })
    },
    preventTouchMove: function(e) {

    },
    hidemask: function(e) {
        this.setData({
            mask: false
        })
    },
    headtap: function(e) {
        console.log(e.currentTarget.dataset.num)
        let n = e.currentTarget.dataset.num
        this.setData({
            orhead: n,
            orderStatus: n
        })
        this.getUserOrderList({
            order_status: n
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.getUserOrderList({

        })
    },
    disorder: function(data) {
        let arr = data,
            len = arr.length,
            i;
        console.log(data)
        for (i = 0; i < len; i++) {
            switch (parseInt(arr[i].order_status)) {
                case 1:
                    arr[i].order_status_text = '待付款 '
                    break;
                case 2:
                    arr[i].order_status_text = '订单已取消'
                    break;
                case 3:
                    arr[i].order_status_text = '订单已关闭'
                    break;
                case 4:
                    arr[i].order_status_text = '已付款'
                    break;
                case 5:
                    arr[i].order_status_text = '已发货'
                    break;
                case 6:
                    arr[i].order_status_text = '已收货'
                    break;
                case 7:
                    arr[i].order_status_text = '待评价'
                    break;
                case 8:
                    arr[i].order_status_text = '退款申请中'
                    break;
                case 9:
                    arr[i].order_status_text = '退款中'
                    break;
                case 10:
                    arr[i].order_status_text = '退款成功'
                    break;
                default:
                    arr[i].order_status_text = '未知状态'
            }
        }
        console.log(arr)
        return arr
    },
    /**
     * 获取订单
     */
    getUserOrderList: function(data) {
        let that = this
        app.wxrequest({
            url: 'index/order/getUserOrderList',
            data: {
                order_status: data.order_status || '',
                page: data.page || 1,
                pagenum: data.pagenum || 10
            },
            success: function(res) {
                let order_list = that.disorder(res.order_list)
                that.setData({
                    order_list: order_list,
                    order: true
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