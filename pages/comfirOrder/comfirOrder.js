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
        site: {},
        buypup: false,
        paytype: 0,
        paymoney: {}
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
    hidepay: function() {
        this.setData({
            buypup: false
        })
    },
    selpaytype: function(e) {
        console.log(e.currentTarget.dataset.type)
        let type = e.currentTarget.dataset.type,
            paym = {},
            stat = this.data.stat
        this.setData({
            paytype: type
        })
        if (type == 1) {
            paym.wxpay = stat.total_price
        } else if (type == 2) {
            if (parseFloat(stat.balance) >= parseFloat(stat.total_price)) {
                paym.redmoney = stat.total_price
                paym.wxpay = '0'
            } else {
                paym.redmoney = stat.balance
                paym.wxpay = parseFloat(stat.total_price) - parseFloat(stat.balance)
            }
        }
        this.setData({
            paymoney: paym
        })
    },
    gobuy: function() {
        this.createorder({
            sku_id_list: this.data.skus,
            user_address_id: this.data.siteid,
            pay_type: this.data.paytype
        })
    },
    showaddres: function(e) {
        if (!this.data.siteid) {
            app.toast({
                title: '请选择地址'
            })
            return
        }
        this.setData({
            addressshow: true
        })
    },
    showbuypup: function() {
        this.setData({
            buypup: true
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

    },
    /**
     * 创建订单接口
     */
    createorder: function(data) {
        let that = this
        app.wxrequest({
            url: 'index/order/createorder',
            data: {
                sku_id_list: data.sku_id_list,
                user_address_id: data.user_address_id,
                pay_type: data.pay_type
            },
            success: function(res) {
                if (res.is_pay == '1') {

                } else {
                    that.pay({
                        order_no: res.order_no,
                        payment: '1',
                        platform: '1'
                    })
                }

            }
        })
    },
    /**
     * 支付
     */
    pay: function(data) {
        app.wxrequest({
            url: 'pay/pay/pay',
            data: {
                order_no: data.order_no,
                payment: data.payment,
                platform: data.platform
            },
            nocon: true,
            success: function(res) {
                let parameters = res.parameters
                wx.requestPayment({
                    timeStamp: parameters.timeStamp,
                    nonceStr: parameters.nonceStr,
                    package: parameters.package,
                    signType: parameters.signType,
                    paySign: parameters.paySign,
                    success(res) {

                    },
                    fail(res) {}
                })
            }
        })
    },
    /**
     * 跳转选择地址
     */
    selsite: function() {
        wx.navigateTo({
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
                    balance: res.balance
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
        this.createsettlement({
            sku_id_list: this.data.skus,
            city_id: this.data.siteid
        })
        this.getUserAddress({
            address_id: this.data.siteid
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