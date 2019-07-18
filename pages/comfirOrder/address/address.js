// pages/comfirOrder/address/address.js
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        siteid: '',
        skus: '',
        address: [],
        num: 1,
        quick: false,
        imgHost: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.setData({
                imgHost: app.globalData.host.imgHost
            })
            // this.getUserAddress()
    },
    setsite: function(e) {
        console.log(e.currentTarget.dataset)
        app.globalData.addressId = e.currentTarget.dataset.id
        wx.navigateBack()

        // wx.redirectTo({
        //     url: '../comfirOrder?skus=' + this.data.skus + '&siteid=' + e.currentTarget.dataset.id + '&num=' + this.data.num + '&quick=' + this.data.quick
        // })
    },
    /**
     * 获取所有用户地址接口
     */
    getUserAddress: function() {
        let that = this
        app.wxrequest({
            url: 'user/getUserAddress',
            data: {
                address_id: ''
            },
            success: function(res) {
                that.setData({
                    address: res.data || []
                })
            }
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
        this.getUserAddress()
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

    }
})