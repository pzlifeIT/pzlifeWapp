// pages/my/notice/notice.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        imgHost:"",
        pid:"",
        navHight:app.globalData.topHeadHeight
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            imgHost: app.globalData.host.imgHost,
            pid:options.scene || app.globalData.pid
        })
        app.getUserInfo();
        console.log(options.scene)
    },
    test:function(id){
        app.toast({
            title:id
        })
        app.modal({
            title:app.globalData.pid
        })
    },
    back:function(){
        let pid = this.data.pid
        wx.navigateTo({
           url:"/pages/openShop/writeInfo/writeInfo?pid="+pid
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