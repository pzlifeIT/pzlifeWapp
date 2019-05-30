// pages/address/address.js
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        address: [],
        imgHost: ""
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        // this.getUserAddress()
        this.setData({
            imgHost: app.globalData.host.imgHost
        })
    },
    redirect: function(e) {
        console.log(e.currentTarget.dataset.id)
        wx.redirectTo({
            url: 'installAddress/installAddress?id=' + e.currentTarget.dataset.id
        })
    },
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
    default: function(e) {
        let that = this,
            id = e.currentTarget.dataset.id
        app.wxrequest({
            url: 'user/updateUserAddressDefault',
            data: {
                address_id: id
            },
            success: function(res) {
                that.disaddress(id)
                app.globalData.addressId = id
            }
        })
    },
    disaddress: function(id) {
        let data = this.data.address,
            len = data.length
        for (let i = 0; i < len; i++) {
            data[i].default = 2
            if (data[i].id == id) {
                data[i].default = 1
            }
        }
        this.setData({
            address: data
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

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})