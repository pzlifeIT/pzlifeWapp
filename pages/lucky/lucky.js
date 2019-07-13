// pages/lucky/lucky.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        list: [{
            title: '6包抽纸',
            subtitle: '10个碎片',
            img: ''
        }, {
            title: '5元优惠券',
            subtitle: '',
            img: ''
        }, {
            title: '12袋酸奶',
            subtitle: '40个碎片',
            img: ''
        }, {
            title: '10元优惠券',
            subtitle: '',
            img: ''
        }, {
            title: '99免费体验',
            subtitle: '2个碎片',
            img: ''
        }, {
            title: '通用碎片',
            subtitle: '',
            img: ''
        }, {
            title: '宝宝天赋测试',
            subtitle: '2个碎片',
            img: ''
        }, {
            title: '钻石会员资格',
            subtitle: '20个碎片',
            img: ''
        }, ],
        btn: '点击\n抽奖',
        animation: '',
        num: 0,
        circle: 0,
        imgHost: '',
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.setData({
            imgHost: app.globalData.host.imgHost
        })
    },
    zhuanpan: function() {
        let y = Math.floor(Math.random() * 7) + 1;
        let circle = this.data.circle + 1800;
        let num = circle + y * 45;
        let animation = wx.createAnimation({
            duration: 4000,
            timingFunction: 'ease-out',
        })
        animation.rotate(num).step();
        this.setData({
            animation: animation.export(),
            num: num,
            circle: circle
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