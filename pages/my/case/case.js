// pages/my/case/case.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        scroll_height: 0,
        caseList: [],
        userInfo: {},
        imgHost: '',
        ident:0
    },
    getCaseDetail:function(){
        let that = this
        app.wxrequest({
            url:"user/getshopbalance",
            data: {
                stype:3
            },
            nocon:false,
            success(res){
                that.setData({
                    caseList:res.data
                })
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        let windowHeight = wx.getSystemInfoSync().windowHeight,
            windowWidth = wx.getSystemInfoSync().windowWidth
        console.log(app.globalData.userInfo)
        this.setData({
            scroll_height: windowHeight * 750 / windowWidth - 68,
            imgHost: app.globalData.host.imgHost
        })
        this.getCaseDetail()
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
        this.setData({
            userInfo:app.globalData.userInfo
        })
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