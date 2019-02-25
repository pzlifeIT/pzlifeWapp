// pages/address/address.js
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        address: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        // this.getUserAddress()
    },
    redirect: function(e) {
        console.log(e.currentTarget.dataset.id)
        wx.redirectTo({
            url: 'installAddress/installAddress?id=' + e.currentTarget.dataset.id
        })
    },
    getUserAddress: function() {
        let that = this
        app.wxrequest({
            url: 'index/user/getUserAddress',
            data: {
                address_id: ''
            },
            success: function(res) {
                that.setData({
                    address: res.data || []
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
        this.getUserAddress()
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