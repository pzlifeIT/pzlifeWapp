// pages/goods/detail.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        showModel: false, //展示弹出层
        swipercur: '1',
        spec: [{
                spec: "尺寸",
                attrs: [{
                        attrname: "M",
                        id: 1,
                        isselect: false
                    }, {
                        attrname: "L",
                        id: 2,
                        isselect: false
                    }, {
                        attrname: "XL",
                        id: 4,
                        isselect: false
                    },
                    {
                        attrname: "XXL",
                        id: 5,
                        isselect: false
                    }
                ]
            },
            {
                spec: "颜色",
                attrs: [{
                        attrname: "白色",
                        id: 12,
                        isselect: false
                    },
                    {
                        attrname: "黑色",
                        id: 13,
                        isselect: false
                    },
                    {
                        attrname: "樱花色",
                        id: 15,
                        isselect: false
                    },
                    {
                        attrname: "蓝色",
                        id: 17,
                        isselect: false
                    },
                    {
                        attrname: "粉红色",
                        id: 20,
                        isselect: false
                    }
                ]
            }
        ],
        idx: 0,
        buyNum: 1
    },
    showModel: function() {
        this.setData({
            showModel: true
        })
    },
    changeSwiper: function(e) {
        console.log(e.detail.current)
        this.setData({
            swipercur: parseInt(e.detail.current) + 1
        })
    },
    hideModel: function() {
        this.setData({
            showModel: false
        })
    },
    preventTouchMove: function() {
        //防止用户操作弹出层外界面
    },
    selectAttr: function(e) {
        var idx = e.currentTarget.dataset.index;
        // console.log(idx)
        this.setData({
            idx: idx
        })
    },
    getnum: function(e) {
        var num = e.detail.value;
        console.log(num)
        this.setData({
            buyNum: num
        });
    },
    jian: function(e) {
        // console.log(123)
        var that = this;
        var newnum = that.data.buyNum - 1;
        if (newnum >= 1) {
            this.setData({
                buyNum: newnum
            })
        }
    },
    jia: function(e) {
        var that = this;
        var newnum = that.data.buyNum + 1;
        this.setData({
            buyNum: newnum
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

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