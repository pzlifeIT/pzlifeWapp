// pages/activity/buyvip/buyvip.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        mask: false,
        imgUrls: [
            app.globalData.host.imgHost + "solitairebanner1.jpg",
            app.globalData.host.imgHost + "solitairebanner3.jpg",
            app.globalData.host.imgHost + "solitairebanner2.jpg"
        ],
        share_id: "",
        con_id: "",
        uid: "",
        ident: 1,
        imgHost: ''
    },
    preventTouchMove: function() {
        //防止用户操作弹出层外界面
    },
    button: function() {
        let maks = !this.data.mask
        this.setData({
            mask: mask
        })
    },
    editstatus: function() {
        let mask = !this.data.mask
        this.setData({
            mask: mask
        })
    },
    buy: function() {
        let pid = app.globalData.pid,
            that = this;
        app.wxrequest({
            url: "order/createMemberOrder",
            data: {
                pay_type: 2,
                user_type: 1,
                parent_id: pid
            },
            success(res) {
                that.pay(res.order_data.order_no)
            },
            error(res) {
                app.toast({
                    title: "发起支付失败"
                })
            }
        })
    },
    gopaystatus: function(data) {
        let that = this
        wx.redirectTo({
            url: '/pages/paystatus/paystatus?status=' + data.status + '&orderno=' + data.order_no + '&siteid=' + that.data.siteid +
                '&price=' + that.data.stat.total_price
        })
    },
    pay: function(order_no) {
        let that = this
        app.wxrequest({
            url: "pay/pay",
            data: {
                order_no: order_no,
                payment: '2',
                platform: '1'
            },
            host: 2,
            nocon: true,
            success(res) {
                let parameters = res.parameters
                wx.requestPayment({
                    timeStamp: parameters.timeStamp,
                    nonceStr: parameters.nonceStr,
                    package: parameters.package,
                    signType: parameters.signType,
                    paySign: parameters.paySign,
                    success(res) {
                        that.setData({
                            mask: true
                        })
                    },
                    fail(res) {
                        that.gopaystatus({
                            order_no: res.data.order_no,
                            status: 2
                        })
                    }
                })
            },
            error(code) {
                switch (parseInt(code)) {
                    case 3000:
                        app.toast({
                            title: '不存在需要支付的订单'
                        })
                        break;
                    case 3001:
                        app.toast({
                            title: '订单号错误'
                        })
                        break;
                    case 3002:
                        app.toast({
                            title: '订单类型错误'
                        })
                        break;
                    case 3004:
                        app.toast({
                            title: '订单已取消'
                        })
                        break;
                    case 3005:
                        app.toast({
                            title: '订单已关闭'
                        })
                        break;
                    case 3006:
                        app.toast({
                            title: '订单已付款'
                        })
                        break;
                    case 3007:
                        app.toast({
                            title: '订单已过期'
                        })
                        break;
                    case 3010:
                        app.toast({
                            title: '支付失败'
                        })
                        break;
                    default:
                        app.toast({
                            title: '意料之外的网络错误'
                        })
                }
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.setData({
            imgHost: app.globalData.host.imgHost
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
        let that = this,
            share = app.share({
                title: "恭喜获得钻石会员卡",
                path: '/pages/activity/buyvip/buyvip',
                imageUrl: "http://pnkp5i8sb.bkt.clouddn.com/nomember01.png"
            })
        return share
    }
})