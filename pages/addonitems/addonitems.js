// pages/addonitems/addonitems.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        showModel: false,
        mask: false
    },
    showModel: function () {
        this.setData({
            showModel: true
        })
    },
    hideModel: function () {
        this.setData({
            showModel: false
        })
    },
    goDetail: function (e) {
        let goods_id = e.currentTarget.dataset.goodsId
        let from = e.currentTarget.dataset.from
        wx.navigateTo({
            url: '/pages/goods/detail?goodid=' + goods_id + '&from=' + from
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