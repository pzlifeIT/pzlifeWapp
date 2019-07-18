// pages/diamondlist/diamondlist.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        Diamondvips: [],
        DiamondvipDominos: 0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getDominosChance()
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
    getDominosChance() {
        let that = this
        app.wxrequest({
            url: 'rights/getDominosChance',
            success: function (res) {
                let Diamondvips = that.disDominos(res.Diamondvips)
                that.setData({
                    Diamondvips: Diamondvips,
                    DiamondvipDominos: res.DiamondvipDominos || 0
                })
            }
        })
    },
    disDominos(data) {
        if (!data) return []
        if (data.length < 1) return []
        let len = data.length
        for (let i = 0; i < len; i++) {
            let time = data[i].create_time.split(' ')
            data[i].time = time[0]
        }
        return data
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