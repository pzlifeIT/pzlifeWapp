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
        price: '',
        type: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let opt = options
        this.setData({
            status: opt.status,
            orderno: opt.orderno,
            siteid: opt.siteid || '',
            price: opt.price,
            type: opt.type || ''
        })
        console.log(options.type)
        this.getsite(opt.siteid)
    },
    getsite: function (id) {
        let that = this
        if (id == '') return
        app.wxrequest({
            url: 'user/getUserAddress',
            data: {
                address_id: id
            },
            success: function (res) {
                that.setData({
                    site: res.data || {}
                })
            }
        })
    },
    goorder: function (e) {
        let n
        if (this.data.status == 1 && this.data.type == 3) {//音频，直接跳到已收货
            wx.navigateTo({
                url: '/pages/order/order?status=6'
            });
            return
        }
        if (this.data.status == 1) {
            n = 4
        } else if (this.data.status == 2) {
            n = 1
        }
        wx.navigateTo({
            url: '/pages/order/order?status=' + n
        })

    },
    gopay: function () {
        let that = this
        app.wxpay({
            order_no: that.data.orderno,
            payment: '1',
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
    goindex: function (e) {
        wx.switchTab({
            url: '/pages/index/index'
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