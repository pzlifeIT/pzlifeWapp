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
        trueMoney:0
    },
    clear: function () {
        console.log(123)
        this.setData({
            money: '',
            trueMoney:0
        })
    },
    getInvoice: function () {
        let that = this
        app.wxrequest({
            url: "user/getInvoice",
            success(res) {
                that.setData({
                    has_invoice:res.invoice.has_invoice / 100,
                    no_invoice:res.invoice.no_invoice / 100
                })
            }
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
        console.log(that.data.userInfo.commission)
        console.log(cardInfo)
        if (parseFloat(that.data.money) > parseFloat(that.data.userInfo.commission) || that.data.money == 0) {
            app.toast({
                title: "提现金额错误"
            })
            return
        }
        if (parseFloat(that.data.money) < 2000){
            app.toast({
                title:"提现金额不得少于2000"
            })
            return
        }
        if (parseFloat(that.data.money) > 200000){
            app.toast({
                title:"提现金额不得大于200000"
            })
            return
        }
        if (that.data.cardInfo == false || that.data.invoice == 0) {
            app.toast({
                title: "未选择银行卡或是否可提供发票"
            })
            return
        }
        app.wxrequest({
            url: "user/commissionTransferCash",
            data: {
                bankcard_id: cardInfo.cardId,
                money: that.data.money,
                invoice: that.data.invoice
            },
            success(res) {
                app.getUserInfo()
                wx.navigateTo({
                    url: "/pages/boss/withdraw/submitStatus/submitStatus?status=" + status
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
                trueMoney:trueMoney
            })
        } else if (e.detail.value == 2) {//不提供
            let trueMoney = parseFloat(money) - (parseFloat(no)  * parseFloat(money))
            this.setData({
                trueMoney:trueMoney
            })
        }
    },
    watchInput: function (e) {
        this.setData({
            money: e.detail.value
        })
        if (parseFloat(e.detail.value) > parseFloat(this.data.userInfo.commission)) {
            app.toast({
                title: "提现金额不得大于可用金额"
            })
        }

    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        app.getUserInfo()
        this.getInvoice()
        console.log(app.globalData.userInfo)
        let that = this
        let time = setInterval(function () {
            if (app.globalData.userInfo) {
                clearInterval(time)
                that.setData({
                    imgHost: app.globalData.host.imgHost,
                    userInfo: app.globalData.userInfo
                })
            }
        }, 1000);
        this.setData({
            imgHost: app.globalData.host.imgHost
        })
        // if (options.stype == 1){
        //     let info = {
        //         cardName:options.name,
        //         cardId:options.cardId,
        //         cardNum:options.num,
        //         cardImg:options.img
        //     };
        //     this.setData({
        //         cardInfo:info
        //     })
        // }
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
    know: function () {
        let status = !this.data.mask
        this.setData({
            mask: status
        })
    }
    ,
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
        console.log(this.data.cardInfo)
        console.log(app.globalData.userInfo)
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