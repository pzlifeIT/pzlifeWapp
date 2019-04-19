// pages/boss/withdraw/withdraw.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        imgHost: "",
        mask: false,
        cardInfo: "",
        userInfo: {},
        invoice: 0,
        disabled: true,
        money: "",
        has_invoice:0.1,
        no_invoice:0.06,
        trueMoney:0,
        commission:0.00
    },
    clear: function () {
        console.log(123)
        this.setData({
            money: '',
            trueMoney:0
        })
    },
    /**
     * 发起提现
     */
    withdraw: function () {
        let that = this,
            cardInfo = that.data.cardInfo,
            status = this.data.invoice
        console.log(that.data.money)
        console.log(that.data.userInfo.bounty)
        console.log(cardInfo)
        if (parseFloat(that.data.money) > parseFloat(that.data.commission) || that.data.money == 0) {
            app.toast({
                title: "提现金额错误"
            })
            return
        }
        if (parseFloat(that.data.money) <= 0){
            app.toast({
                title:"提现金额不能为0"
            })
            return
        }
        if (parseFloat(that.data.money) > 200000){
            app.toast({
                title:"提现金额不得大于200000"
            })
            return
        }
        if (that.data.cardInfo == false) {
            app.toast({
                title: "未选择银行卡"
            })
            return
        }
        app.wxrequest({
            url: "user/bountyTransferCash",
            data: {
                bankcard_id: cardInfo.cardId,
                money: that.data.money,
                invoice: that.data.invoice
            },
            success(res) {
                wx.navigateTo({
                    url: "/pages/diamActive/withdraw/submitStatus/submitStatus"
                })
            },
            error(res) {
                if (res == 3003) {
                    app.toast({
                        title: "提现金额必须为数字"
                    })
                } else if (res == 3004 || res == 3007) {
                    app.toast({
                        title: "单笔提现金额不能少于2000,高于200000"
                    })
                } else if (res == 3005) {
                    app.toast({
                        title: "余额不足"
                    })
                } else if (res == 3006) {
                    app.toast({
                        title: "未查询到该银行卡"
                    })
                }else if (res == 3009) {
                    app.toast({
                        title: "错误代码:3009,请联系客服"
                    })
                }else if (res == 3008) {
                    app.toast({
                        title: "该银行卡暂不可用"
                    })
                }
            }
        })
    },
    select: function (e) {
        this.setData({
            invoice: e.detail.value
        })
        let money = this.data.money || 0,
            has = this.data.has_invoice,
            no = this.data.no_invoice
        console.log(has)
        console.log(no)
        if (e.detail.value == 1) {//提供发票
            let trueMoney = parseFloat(money) - (parseFloat(has)  * parseFloat(money))
            this.setData({
                trueMoney:trueMoney.toFixed(2)
            })
        } else if (e.detail.value == 2) {//不提供
            let trueMoney = parseFloat(money) - (parseFloat(no)  * parseFloat(money))
            this.setData({
                trueMoney:trueMoney.toFixed(2)
            })
        }
    },
    watchInput: function (e) {
        this.setData({
            money: e.detail.value,
            trueMoney:e.detail.value
        })
        if (e.detail.value == 0 || e.detail.value == '') {
            this.setData({
                trueMoney:0
            })
        }
        if (parseFloat(e.detail.value) > parseFloat(this.data.commission)) {
            app.toast({
                title: "提现金额不得大于可用金额"
            })
        }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(app.globalData.userInfo)
        this.setData({
            imgHost: app.globalData.host.imgHost
        })
    },
    selectDiv: function (e) {
        let div = e.currentTarget.dataset.div;
        wx.navigateTo({
            url: "record/record?div=" + div
        })
    },
    selectBank: function () {
        wx.navigateTo({
            url: "selectCard/selectCard"
        })
    },
    getUserInfo: function() {
        let that = this
        app.wxrequest({
            url: "user/getuser",
            nologin: true,
            success(res) {
                that.setData({
                    commission: res.data.bounty
                })
            }
        })
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    }
    ,

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        this.getUserInfo()
    }
    ,

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    }
    ,

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    }
    ,

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    }
    ,

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    }
    ,

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})