// pages/boss/case/case.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        i: 0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            i: options.i
        })
        if (options.i == 1){
            wx.setNavigationBarTitle({
              title: '商票总额'
            })
        } else if (options.i == 2){
            wx.setNavigationBarTitle({
                title:"商票余额"
            })
        } else if (options.i == 3){
            wx.setNavigationBarTitle({
              title: '未结算商票'
            })
        } else if (options.i == 4){
            wx.setNavigationBarTitle({
                title:"已使用商票"
            })
        }
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