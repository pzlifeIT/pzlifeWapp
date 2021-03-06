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
        imgHost: '',
        navH: 0,
        navHight:app.globalData.topHeadHeight
    },
    preventTouchMove: function() {
        //防止用户操作弹出层外界面
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
        app.wxpay({
            order_no: order_no,
            payment: '2',
            success(res) {
                that.setData({
                    mask: true
                })
            },
            fail(res) {}
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.setData({
            imgHost: app.globalData.host.imgHost,
            navH: app.globalData.topHeadHeight
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
                path: '/pages/activity/buyvip/buyvip'
            })
        return share
    }
})