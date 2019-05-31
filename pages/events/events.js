// pages/events/events.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        imgHost: "",
        num: 1,
        data: {},
        scene: {},
        enScene: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            imgHost: app.globalData.host.imgHost
        })
        let that = this
        console.log(decodeURIComponent(options.scene))
        console.log(options)
        console.log(options.scene)
        if (options.scene) {
            this.setData({
                enScene: options.scene,
                scene: app.disScene(options.scene)
            }, function () {
                that.getEvents()
            })
        }

    },
    getEvents: function () {
        let that = this
        app.wxrequest({
            url: "OfflineActivities/getOfflineActivities",
            data: {
                active_id: that.data.scene.id
            },
            nocon: true,
            success(res) {
                console.log(res)
                that.setData({
                    data: res.data
                })
            }
        })
    },
    slider: function (e) {
        console.log(e)
        let num = this.data.num
        this.setData({
            num: e.detail.current + 1
        })
    },
    buy: function (e) {
        wx.navigateTo({
            url: "/pages/events/detail/detail?goodsid=" + e.currentTarget.dataset.goodsid
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
        return app.share()
    }
})