// pages/my/getVip/getVip.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        imgHost: "",
        mask: true,
        pop: false,
        userInfo: {}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            imgHost: app.globalData.host.imgHost
        })
    },
    popNotice: function () {
        let pop = !this.data.pop;
        this.setData({
            pop: pop
        })
    },

    change: function (e) {
        console.log(e)
        if (e.detail.value.length >= 1) {
            this.buy()
        } else {
            app.toast({
                title: "不点击同意将无法升级为钻石会员"
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
                        text = "错误码：" + res
                        break;
                }
                app.toast({
                    title: text
                })
            }
        })
    },
    pay: function (order_no) {
        let that = this
        app.wxpay({
            order_no: order_no,
            payment: '2',
            noloading:true,
            success(res) {
                app.toast({title: "恭喜升级为钻石会员！"});
                that.setData({
                    pop:false
                });
                app.judgelogin({})
            },
            fail(res) {
                app.toast({title: "支付失败"})
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
        let that = this
        app.judgelogin({
            success(res) {
                that.setData({
                    userInfo: res.data
                })
            }
        })
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