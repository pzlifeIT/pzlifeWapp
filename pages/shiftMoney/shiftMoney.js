// pages/shiftMoney/shiftMoney.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        imgHost: '',
        money: '',
        withdraw: false,
        commission: 0,
        reality: 0.00
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.setData({
            imgHost: app.globalData.host.imgHost,
            commission: app.globalData.userInfo.commission || 10000
        })
    },
    setmoney: function(e) {
        let val = e.detail.value,
            withdraw = false;
        if (val.length > 0 & parseFloat(val) > 0) {
            withdraw = true
        }
        if (parseFloat(this.data.commission) < parseFloat(val)) {
            app.toast({
                title: '输入金额大于可用金额'
            })
            withdraw = false
        }
        this.setData({
            reality: val ? parseFloat(val).toFixed(2) : 0,
            money: val,
            withdraw: withdraw
        })
    },
    clear: function() {
        this.setData({
            reality: 0,
            money: '',
            withdraw: false
        })
    },
    transferBalance: function() {
        let that = this
        if (!that.data.withdraw) return
        app.wxrequest({
            url: 'user/commissionTransferBalance',
            data: {
                money: that.data.reality || 0
            },
            success(res) {
                wx.navigateTo({
                    url: './shiftSuccess/shiftSuccess'
                })
            },
            error(code) {
                let text = ''
                switch (parseInt(code)) {
                    case 3003:
                        text = '金额必须为数字'
                        break;
                    case 3004:
                        text = '提现金额不能小于0'
                        break;
                    case 3005:
                        text = '没有足够的余额用于提现'
                        break;
                    case 3006:
                        text = '转商票失败'
                        break;
                    default:
                        text = '意料之外的错误'
                        break;
                }
                app.toast({
                    title: text
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
        this.setData({
            money: '',
            reality: 0.00
        })
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