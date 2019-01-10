// pages/category/category.js
const url = require("../../config.js").url;
const app = getApp()
Page({
    data: {
        category: "",
        firstCate: [],
        secondCate: [],
        classify: [],
        thirdCate: {
            "title": "",
            "image": ""
        },
        idx: 0
    },


    //选择一级分类
    selectCate: function(e) {
        console.log(this.classify)
        let id = e.currentTarget.dataset.cateId,
            showClassify = this.getshowClassify(this.data.classify, id)
        console.log(this.getshowClassify(this.data.classify, id))
        this.setData({
            idx: id,
            secondCate: showClassify
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.getClassify()
    },
    /**
     * 获取分类
     */
    getClassify: function() {
        let that = this
        app.wxrequest({
            url: 'index/category/getfirstcate',
            success(res) {
                let first = that.getfirst(res.data),
                    id = res.data[0].id,
                    showClassify = that.getshowClassify(res.data, id)
                that.setData({
                    firstCate: first,
                    classify: res.data,
                    secondCate: showClassify,
                    idx: id
                })
            }
        })
    },
    /**
     * 获取一级分类
     */
    getfirst: function(data) {
        let len = data.length,
            i, arr = [],
            json1
        for (i = 0; i < len; i++) {
            json1 = {}
            json1.id = data[i].id
            json1.type_name = data[i].type_name
            arr.push(json1)
        }
        return arr
    },
    /**
     * 获取展示分类
     */
    getshowClassify: function(data, id) {
        let len = data.length,
            i, arr = [],
            json1
        for (i = 0; i < len; i++) {
            if (id == data[i].id) {
                if (data[i]._child instanceof Array) {
                    arr = data[i]._child
                }
                break
            }
        }
        return arr
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