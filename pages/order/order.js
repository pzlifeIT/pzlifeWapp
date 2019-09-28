// pages/order/order.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        status: '',
        order: true,
        page: 1,
        mask: false,
        reach: true,
        order_list: [],
        user_identity: 0,
        imgHost: '',
        orderno: '',
        navHight:app.globalData.topHeadHeight
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
    gologistics: function(e) {
        let that = this,
            orderno = e.currentTarget.dataset.orderno
        wx.navigateTo({
            url: '/pages/order/logisticslist/logisticslist?orderno=' + orderno
        })
    },
    headtap: function(e) {
        wx.pageScrollTo({
            scrollTop:0,
            duration: 1
        })
        let n = e.currentTarget.dataset.num
        this.setData({
            status: n,
            page: 1,
            reach: true,
            order_list: []
        })
        this.getUserOrderList({
            orderStatus: n
        })
    },
    confirmOrder: function(e) {
        let orderno = e.currentTarget.dataset.orderno
        this.setData({
            mask: true,
            orderno: orderno
        })
    },
    confirm: function() {
        let that = this,
            orderno = this.data.orderno
        app.wxrequest({
            url: 'order/confirmOrder',
            data: {
                order_no: orderno
            },
            success: function(res) {
                that.setData({
                    page: 1,
                    reach: true,
                    order_list: [],
                    mask: false
                })
                that.getUserOrderList({
                    orderStatus: that.data.status
                })
            }
        })
    },
    call() {
        wx.makePhoneCall({
            phoneNumber: '15502123212'
        })
    },
    /**
     * 支付
     */
    gopay: function(e) {
        console.log(e.currentTarget.dataset.orderno)
        let that = this
        app.wxpay({
            order_no: e.currentTarget.dataset.orderno,
            payment: '1',
            success(res) {
                that.setData({
                    page: 1,
                    reach: true,
                    order_list: []
                })
                that.getUserOrderList({
                    orderStatus: that.data.status
                })
            },
            fail(res) {
                app.toast({ title: '支付失败' })
            }
        })
    },
    cancelorder: function(e) {
        let that = this
        app.modal({
            content: '是否取消订单',
            success: function() {
                app.wxrequest({
                    url: 'order/cancelorder',
                    data: {
                        order_no: e.currentTarget.dataset.orderno
                    },
                    success: function(res) {
                        that.setData({
                            page: 1,
                            reach: true,
                            order_list: []
                        })
                        that.getUserOrderList({
                            orderStatus: that.data.status
                        })

                        app.toast({ title: '取消成功！', duration: 1500 })
                    },
                    error: function(code) {
                        app.toast({ title: '取消失败' })
                    }
                })
            },
            cancel: function() {

            }
        })

    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.setData({
            imgHost: app.globalData.host.imgHost,
            user_identity: app.globalData.userInfo.user_identity,
            status: options.status
        })
        this.getUserOrderList({
            orderStatus: options.status
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
                    arr[i].order_status_text = '待评价'
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
        return arr
    },
    /**
     * 获取订单
     */
    getUserOrderList: function(data) {
        let that = this
        app.wxrequest({
            url: 'order/getUserOrderList',
            data: {
                orderStatus: parseInt(data.orderStatus) || '',
                page: data.page || 1,
                pagenum: data.pagenum || 10
            },
            success: function(res) {
                if (res.order_list.length < 10) {
                    that.setData({
                        reach: false
                    })
                }
                if (res.order_list.length > 0) {
                    let order_list = that.data.order_list
                    order_list.push(that.disorder(res.order_list))
                    that.setData({
                        order_list: order_list,
                        order: true,
                        page: that.data.page + 1
                    })
                }
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
        if (this.data.reach) {
            this.getUserOrderList({
                orderStatus: this.data.status,
                page: this.data.page
            })
        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})