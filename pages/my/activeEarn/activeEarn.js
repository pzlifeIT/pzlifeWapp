// pages/my/activeEarn/activeEarn.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        page: 1,
        pageNum: 10,
        reach: true,
        list: [],
        bounty: 0,
        bountyAll: 0,
        share_num:0,
        imgHost:''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getBountyDetail()
        this.setData({
            imgHost:app.globalData.host.imgHost
        })
    },
    getBountyDetail: function () {
        let that = this
        app.wxrequest({
            url: "user/bountyDetail",
            data: {
                page: that.data.page || 1,
                pageNum: that.data.pageNum || 10
            },
            success(res) {
                if (res.bountyDetail.length < 10) {
                    that.setData({
                        reach: false
                    })
                }
                if (res.bountyDetail.length > 0) {
                    let list = that.data.list
                    list.push(res.bountyDetail)
                    that.setData({
                        list: list,
                        page: that.data.page + 1
                    })
                }
                that.setData({
                    bountyAll:res.bountyAll,
                    share_num:res.share_num
                })
            }
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