// pages/article/article.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        list: [],
        page: 1,
        page_num: 10,
        reach: true
    },
    getArticle() {
        let that = this
        app.wxrequest({
            url: "wechattweets/getWeChatGraphicMaterialList",
            data: {
                page: that.data.page || 1,
                page_num: that.data.page_num || 10
            },
            success(res) {
                if (res.WeChatList.length < 10) {
                    that.setData({
                        reach: false
                    })
                }
                if (res.WeChatList.length > 0) {
                    let list = that.data.list;
                    list.push(res.WeChatList)
                    that.setData({
                        list: list,
                        page: that.data.page + 1
                    })
                }
            }
        })
    },
    goDetail: function (e) {
        let url = e.currentTarget.dataset.url;
        console.log(url)
        wx.navigateTo({
            url: "detail/detail?url=" + encodeURIComponent(url)
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getArticle()
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
        wx.showNavigationBarLoading() //在标题栏中显示加载
        //模拟加载
        let that = this
        setTimeout(function () {
            that.setData({
                page: 1,
                list: [],
                reach: true
            }, function () {
                that.getArticle()
            })

            wx.hideNavigationBarLoading() //完成停止加载
            wx.stopPullDownRefresh() //停止下拉刷新
        }, 1500);
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        if (!this.data.reach) return
        this.getArticle()
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
        return app.share({
            title: "热门文章",
            path: "/pages/article/article"
        })
    }
})