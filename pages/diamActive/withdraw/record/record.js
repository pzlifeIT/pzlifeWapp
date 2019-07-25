// pages/boss/withdraw/record/record.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        div: 1,
        imgHost: "",
        reach: true,
        page: 1,
        pageNum: 10,
        list: []
    },
    getRecord: function () {
        let that = this
        app.wxrequest({
            url: "user/getLogTransfer",
            data: {
                stype: 4,
                page: that.data.page || 1,
                pageNum: that.data.pageNum || 10
            },
            success(res) {
                that.dispose(res.log_transfer)
                if (res.log_transfer.length < 10) {
                    that.setData({
                        reach: false
                    })
                }
                if (res.log_transfer.length > 0) {
                    let list = that.data.list;
                    list.push(res.log_transfer);
                    console.log(list)
                    that.setData({
                        list: list,
                        page: that.data.page + 1
                    })
                }
            }
        })
    },
    dispose: function (data) {
        for (let i = 0; i < data.length; i++) {
            data[i].bank_card = data[i].bank_card.substring(15, 19)
        }
        // console.log(data)
    }, /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            imgHost: app.globalData.host.imgHost
        })
        this.getRecord()
    },
    gomy: function () {
        wx.switchTab({
            url: "/pages/my/my"
        })
    },
    gocardbag: function () {
        wx.navigateTo({
            url: "/pages/boss/cardBag/cardBag"
        })
    },
    goDiamAc: function () {
        wx.navigateTo({
            url: "/pages/diamActive/diamActive"
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
        if (!this.data.reach) {
            return
        }
        this.getRecord()

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
        return app.share()
    }
})