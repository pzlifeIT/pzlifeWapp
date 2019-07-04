// pages/category/goods/goods.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        sub_id: '',
        page: 1,
        reach: true,
        goodsList: [],
        sub_name: ""
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let sub_id = options.sub_id
        this.setData({
            sub_id: options.sub_id,
            sub_name: options.sub_name || '商品列表'
        })
        if (sub_id) {
            this.getSubGoodsList(sub_id)
        }
        console.log(options)
        wx.setNavigationBarTitle({
            title: options.sub_name || "商品列表"
        })
    },

    /**
     * 获取专题商品
     */
    getSubGoodsList: function (sub_id) {
        let that = this
        app.wxrequest({
            url: "goods/getSubjectGoods",
            data: {
                subject_id: sub_id,
                page: that.data.page || 1,
                page_num: that.data.page_num || 10
            },
            nocon: true,
            success(res) {
                if (res.data.length < 10) {
                    that.setData({
                        reach: false
                    })
                }
                if (res.data.length > 0) {
                    let goodsList = that.data.goodsList
                    goodsList.push(res.data)
                    that.setData({
                        goodsList: goodsList,
                        page: that.data.page + 1
                    })
                }
            },
            error(code) {
                console.log(code)
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
        if (!this.data.reach) return
        this.getSubGoodsList(this.data.sub_id)
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
        let that = this,
            sub_id = this.data.sub_id,
            share = app.share({
                title: this.data.sub_name || '商品列表',
                path: '/pages/category/goods/goods?sub_id=' + sub_id + "&sub_name=" + this.data.sub_name
            })
        return share
    }
})