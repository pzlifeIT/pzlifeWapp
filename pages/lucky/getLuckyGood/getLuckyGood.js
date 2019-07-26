// pages/lucky/getLuckyGood/getLuckyGood.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        imgHost: '',
        goodId: '',
        goodInfo: {},
        siteid: '',
        site: {},
        addressshow: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        console.log(options)
        this.setData({
            imgHost: app.globalData.host.imgHost,
            goodId: options.id
        }, () => {
            this.getGoodInfo(options.id)
        })

    },
    getGoodInfo(id) {
        app.wxrequest({
            url: "OfflineActivities/getUserHdLucky",
            data: {
                id: id,
            },
            success: res => {
                this.setData({
                    goodInfo: res.winnings || {}
                })
            },
            error() {
                app.toast({ title: '意料之外的错误' });
            }
        })
    },
    gobuy() {
        app.wxrequest({
            url: "OfflineActivities/receivePrize",
            data: {
                receive_id: this.data.goodId,
                user_address_id: this.data.siteid
            },
            success: res => {
                app.toast({ title: '领取成功，2秒后跳回' });
                setTimeout(() => {
                    wx.navigateBack()
                }, 2000)
            },
            error(code) {
                let err = {
                    3004: '未选择配送地址',
                    3005: '领取失败',
                    3006: '无效的商品或者优惠券',
                    3007: '有未使用的优惠券',
                    3008: '已是钻石会员无法领取',
                }
                app.toast({ title: err[code] || '意料之外的错误' });
            }
        })
    },
    showaddress() {
        if (this.data.siteid === '') {
            app.toast({ title: '请选择地址' });
            return
        }
        this.setData({
            addressshow: true
        })
    },
    /**
     * 获取地址接口
     */
    getUserAddress: function(data) {
        let that = this
        app.wxrequest({
            url: 'user/getUserAddress',
            data: {
                address_id: data.address_id
            },
            success: function(res) {
                that.setData({
                    site: res.data || {}
                })
            },
        })
    },
    selsite: function() {
        wx.navigateTo({
            url: '/pages/comfirOrder/address/address'
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
        this.setData({
            siteid: app.globalData.addressId
        }, () => {
            if (!this.data.siteid) return
            this.getUserAddress({
                address_id: this.data.siteid
            })
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