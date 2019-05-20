// pages/boss/integral/integral.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        reach:true,
        page:1,
        pageNum:10,
        list:[],
        imgHost:"",
        int:0
    },
    getInte: function () {
        let that = this
        app.wxrequest({
            url:"user/getintegraldetail",
            data: {
                page:that.data.page || 1,
                page_num:that.data.pageNum || 10
            },
            nocon:false,
            success(res){
                if (res.data.length < 10){
                    that.setData({
                        reach:false
                    })
                }
                if (res.data.length > 0){
                    let list = that.data.list
                    list.push(res.data)
                    that.setData({
                        list:list,
                        page:that.data.page + 1
                    })
                }
            }

        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getInte()
        this.setData({
            imgHost:app.globalData.host.imgHost,
            int:options.int
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
        if (!this.data.reach) return
        this.getInte()
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
        return app.share()
    }
})