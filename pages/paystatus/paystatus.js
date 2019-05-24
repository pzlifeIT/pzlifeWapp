// pages/paystatus/paystatus.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        status: 1,
        order_no: '',
        siteid: '',
        site: {},
        price: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        let opt = options
        this.setData({
            status: opt.status,
            orderno: opt.orderno,
            siteid: opt.siteid,
            price: opt.price
        })
        this.getsite(opt.siteid)
    },
    getsite: function(id) {
        let that = this
        app.wxrequest({
            url: 'user/getUserAddress',
            data: {
                address_id: id
            },
            success: function(res) {
                that.setData({
                    site: res.data || {}
                })
            }
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
            url: '/pages/order/order?status=' + n
        })
    },
    gopay: function() {
        let that = this
        app.wxrequest({
            url: 'pay/pay',
            data: {
                order_no: that.data.orderno,
                payment: '1',
                platform: '1'
            },
            host: 2,
            nocon: true,
            success: function(res) {
                let parameters = res.parameters
                wx.requestPayment({
                    timeStamp: parameters.timeStamp,
                    nonceStr: parameters.nonceStr,
                    package: parameters.package,
                    signType: parameters.signType,
                    paySign: parameters.paySign,
                    success(res) {
                        that.setData({
                            status: 1
                        })
                    },
                    fail(res) {
                        that.setData({
                            status: 2
                        })
                    }
                })
            },
            error: function(code) {
                switch (parseInt(code)) {
                    case 3000:
                        app.toast({ title: '不存在需要支付的订单' })
                        break;
                    case 3001:
                        app.toast({ title: '订单号错误' })
                        break;
                    case 3002:
                        app.toast({ title: '订单类型错误' })
                        break;
                    case 3004:
                        app.toast({ title: '订单已取消' })
                        break;
                    case 3005:
                        app.toast({ title: '订单已关闭' })
                        break;
                    case 3006:
                        app.toast({ title: '订单已付款' })
                        break;
                    case 3007:
                        app.toast({ title: '订单已过期' })
                        break;
                    case 3010:
                        app.toast({ title: '支付失败' })
                        wx.switchTab({
                            url: '/pages/cart/cart'
                        })
                        break;
                    default:
                        app.toast({ title: '意料之外的网络错误' })
                }

            }
        })
    },
    goindex: function(e) {
        wx.switchTab({
            url: '/pages/index/index'
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