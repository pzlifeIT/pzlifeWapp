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
        bounty: 0,
        reality: 0.00
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.setData({
            imgHost: app.globalData.host.imgHost
        })
    },
    setmoney: function(e) {
        let val = e.detail.value,
            withdraw = false;
        if (val.length > 0 & parseFloat(val) > 0) {
            withdraw = true
        }
        if (parseFloat(this.data.bounty) < parseFloat(val)) {
            app.toast({
                title: '输入金额大于可用金额'
            })
            withdraw = false
        }
        let num = val ? (parseFloat(val) * 1.25) + '' : 0
        num = Math.floor(num * 100) / 100
        this.setData({
            reality: num,
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
            url: 'user/bountyTransferBalance',
            data: {
                money: that.data.money || 0
            },
            success(res) {
                wx.navigateTo({
                    url: './shiftSuccess/shiftSuccess'
                });
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
                        text = '转商券失败'
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
    getUserInfo: function() {
        let that = this
        app.wxrequest({
            url: "user/getuser",
            nologin: true,
            success(res) {
                that.setData({
                    bounty: res.data.bounty
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
        this.getUserInfo()
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