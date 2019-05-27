// pages/my/getVip/getVip.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        imgHost: "",
        mask:true,
        pop:false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            imgHost: app.globalData.host.imgHost
        })
    },
    popNotice:function(){
        let pop = !this.data.pop
        this.setData({
            pop:pop
        })
    },
    change:function(e){
        console.log(e)
        if (e.detail.value.length >= 1){
            this.buy()
        } else {
            app.toast({
                title:"不点击同意将无法升级为钻石会员"
            })
        }
    },
    buy: function () {
        let that = this;
        let text = ""
        app.wxrequest({
            url: "order/createMemberOrder",
            data: {
                pay_type: 2,
                user_type: 3,
                actype: 1
            },
            success(res) {
                that.pay(res.order_data.order_no)
            },
            error(res) {
                switch (parseInt(res)) {
                    case 3003:
                        text = "购买权益等级低于现有权益等级"
                        break;
                    default:
                        text = "发起支付失败"
                        break;
                }
                app.toast({
                    title:text
                })
            }
        })
    },
    pay: function (order_no) {
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