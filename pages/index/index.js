//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        imgUrls: [
            'http://imagecache.pzlife.vip/o_1ct9qbhu31idf197n1fgoej1k737.jpg?imageMogr2/thumbnail/720x',
            'http://imagecache.pzlife.vip/o_1ct9qbhu31idf197n1fgoej1k737.jpg?imageMogr2/thumbnail/720x',
            'http://imagecache.pzlife.vip/o_1ct9qbhu31idf197n1fgoej1k737.jpg?imageMogr2/thumbnail/720x'
        ],
        motto: 'Hello World',
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        imgHost: ''
    },
    //事件处理函数
    bindViewTap: function() {
        wx.navigateTo({
            url: '../logs/logs'
        })
    },
    /**
     * 下拉刷新
     */
    onPullDownRefresh: function() {
        wx.showNavigationBarLoading() //在标题栏中显示加载
            //模拟加载
        setTimeout(function() {
            wx.hideNavigationBarLoading() //完成停止加载
            wx.stopPullDownRefresh() //停止下拉刷新
        }, 1500);
    },
    onLoad: function() {
        this.setData({
            imgHost: app.globalData.host.imgHost
        })
    },
    bindRegionChange: function(e) {
        console.log(e)
    },
    getUserInfo: function(e) {
        console.log(e)
        app.globalData.userInfo = e.detail.userInfo
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
        })
    }
})