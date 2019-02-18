// pages/comfirOrder/comfirOrder.js
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        skus: '',
        isShow: false,
        addressshow: false,
        datalist: [],
        stat: {},
        siteid: '',
        site: {}
    },
    maopao: function(e) {

    },
    hideModel: function(e) {
        this.setData({
            isShow: false
        })
    },
    showModel: function(e) {
        this.setData({
            isShow: true
        })
    },
    hideaddress: function(e) {
        this.setData({
            addressshow: false
        })
    },
    showaddres: function(e) {
        if (!this.data.siteid) {
            wx.showToast({
                title: '请选择地址',
                icon: 'none',
                duration: 2000
            })
            return
        }
        this.setData({
            addressshow: true
        })
    },
    suborder: function() {
        this.createorder({
            sku_id_list: data.sku_id_list,
            user_address_id: data.address_id,
            pay_type: '4'
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.setData({
            skus: options.skus,
            siteid: options.siteid || ''
        })
        console.log(this.data.skus)
        this.createsettlement({
            sku_id_list: options.skus,
            city_id: options.siteid
        })
        this.getUserAddress({
            address_id: options.siteid
        })
    },
    /**
     * 创建订单接口
     */
    createorder: function(data) {
        app.wxrequest({
            url: 'index/user/createorder',
            data: {
                sku_id_list: data.sku_id_list,
                user_address_id: data.user_address_id,
                pay_type: data.pay_type
            },
            success: function(res) {

            }
        })
    },
    /**
     * 跳转选择地址
     */
    selsite: function() {
        wx.redirectTo({
            url: 'address/address?siteid=' + this.data.siteid + '&skus=' + this.data.skus
        })
    },
    /**
     * 获取地址接口
     */
    getUserAddress: function(data) {
        let that = this
        app.wxrequest({
            url: 'index/user/getUserAddress',
            data: {
                address_id: data.address_id
            },
            success: function(res) {
                that.setData({
                    site: res.data || {}
                })
            }
        })
    },
    /**
     * 创建结算页
     */
    createsettlement: function(data) {
        let that = this
        app.wxrequest({
            url: "index/order/createsettlement",
            data: {
                sku_id_list: data.sku_id_list,
                user_address_id: data.city_id
            },
            success(res) {
                let stat = {
                    goods_count: res.goods_count,
                    rebate_all: res.rebate_all,
                    total_freight_price: res.total_freight_price,
                    total_goods_price: res.total_goods_price,
                    total_price: res.total_price,
                }
                that.setData({
                    datalist: res.supplier_list,
                    stat: stat
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
    onShow: function(o) {
        console.log(o)
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