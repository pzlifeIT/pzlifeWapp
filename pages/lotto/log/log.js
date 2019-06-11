// pages/lotto/log/log.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        pop: false,
        logAll:[],
        qrcode:'',
        page:1,
        pageNum:10,
        reach:true
    },
    goHome: function () {
        wx.switchTab({
            url: "/pages/index/index"
        })
    },
    hiddenPop: function () {
        this.setData({
            pop: false
        })
    },
    lingqu: function (e) {
        let wid = e.currentTarget.dataset.wid
        let base = app.base64(app.globalData.host.cmsHost + "lucky.html?pid=" + app.globalData.userInfo.uid + "&wid=" + wid);
        this.setData({
            qrcode: app.globalData.host.apiHost + "OfflineActivities/createOrderQrCode?data=" + base,
            pop:true
        })
    },
    null: function () {

    },
    getLuckLog: function () {
        let that = this
        app.wxrequest({
            url: "OfflineActivities/getUserHdLucky",
            data:{
                page: that.data.page || 1,
                pageNum: that.data.pageNum || 10
            },
            success(res) {
                if (res.winnings.length < 10) {
                    that.setData({
                        reach:false
                    })
                }
                if (res.winnings.length > 0){
                    let logAll = that.data.logAll
                    logAll.push(res.winnings)
                    console.log(logAll)
                    that.setData({
                        logAll:logAll,
                        page:that.data.page + 1
                    })
                }
            },
            error(res) {

            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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
        this.getLuckLog()
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
        if (!this.data.reach) return
        this.getLuckLog()
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
        return app.share()
    }
})