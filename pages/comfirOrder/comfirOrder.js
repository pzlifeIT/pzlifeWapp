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
        paymoney: {},
        num: 1,
        quick: 0
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
                paym.wxpay = (parseFloat(stat.total_price) - parseFloat(stat.balance)).toFixed(2)
            }
        }
        this.setData({
            paymoney: paym
        })
    },
    gobuy: function() {
        if (this.data.paytype == 0) {
            app.toast({ title: '请选择支付方式' })
            return
        }
        if (this.data.siteid == '') {
            app.toast({ title: '请选择地址' })
            return
        }
        if (this.data.quick == 1) {
            this.quickcreateorder()
        } else {
            this.createorder()
        }
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
            siteid: options.siteid || '',
            num: options.num || 1,
            quick: options.quick || 0
        })
    },
    /**
     * 创建订单接口
     */
    createorder: function(data) {
        let that = this
        app.wxrequest({
            url: 'index/order/createorder',
            data: {
                sku_id_list: that.data.skus,
                user_address_id: that.data.siteid,
                pay_type: that.data.paytype
            },
            success: function(res) {
                if (res.is_pay == 1) {
                    that.gopaystatus({
                        order_no: res.order_no,
                        status: 1
                    })
                } else {
                    that.pay({
                        order_no: res.order_no
                    })
                }

            },
            error: function(code) {
                switch (parseInt(code)) {
                    case 3000:
                    case 3001:
                    case 3003:
                        app.toast({ title: '商品信息出错' })
                        break;
                    case 3004:
                        app.toast({ title: '商品已售完' })
                        break;
                    case 3005:
                        app.toast({ title: '商品未加入购物车' })
                        wx.switchTab({
                            url: '/pages/cart/cart'
                        })
                        break;
                    case 3006:
                        app.toast({ title: '该地区商品不支持配送' })
                        break;
                    case 3007:
                        app.toast({ title: '商品库存不足' })
                        break;
                    default:
                        app.toast({ title: '意料之外的网络错误' })
                }

            }
        })
    },
    quickcreateorder: function(data) {
        let that = this
        app.wxrequest({
            url: 'index/order/quickcreateorder',
            data: {
                buid: app.globalData.pid,
                sku_id: that.data.skus,
                user_address_id: that.data.siteid,
                pay_type: that.data.paytype,
                num: that.data.num
            },
            success: function(res) {
                if (res.is_pay == 1) {
                    that.gopaystatus({
                        order_no: res.order_no,
                        status: 1
                    })
                } else {
                    that.pay({
                        order_no: res.order_no
                    })
                }
            },
            error(code) {
                switch (parseInt(code)) {
                    case 3000:
                    case 3001:
                    case 3003:
                        app.toast({ title: '商品信息出错' })
                        break;
                    case 3004:
                        app.toast({ title: '商品已售完' })
                        break;
                    case 3006:
                        app.toast({ title: '该地区商品不支持配送' })
                        break;
                    case 3007:
                        app.toast({ title: '商品库存不够' })
                        break;
                    default:
                        app.toast({ title: '意料之外的网络错误' })
                }
            }
        })
    },
    gopaystatus: function(data) {
        let that = this
        wx.redirectTo({
            url: '/pages/paystatus/paystatus?status=' + data.status + '&orderno=' + data.order_no + '&siteid=' + that.data.siteid + '&price=' + that.data.stat.total_price
        })
    },
    /**
     * 支付
     */
    pay: function(data) {
        let that = this
        app.wxrequest({
            url: 'pay/pay/pay',
            data: {
                order_no: data.order_no,
                payment: '1',
                platform: '1'
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
                        that.gopaystatus({
                            order_no: data.order_no,
                            status: 1
                        })
                    },
                    fail(res) {
                        that.gopaystatus({
                            order_no: data.order_no,
                            status: 2
                        })
                    }
                })
            },
            error: function(code) {
                switch (parseInt(code)) {
                    case 3000:
                        app.toast({ title: '不存在需要支付的订单' })
                        break;
                    case 3001:
                        app.toast({ title: '订单号错误' })
                        break;
                    case 3002:
                        app.toast({ title: '订单类型错误' })
                        break;
                    case 3004:
                        app.toast({ title: '订单已取消' })
                        break;
                    case 3005:
                        app.toast({ title: '订单已关闭' })
                        break;
                    case 3006:
                        app.toast({ title: '订单已付款' })
                        break;
                    case 3007:
                        app.toast({ title: '订单已过期' })
                        break;
                    case 3010:
                        app.toast({ title: '支付失败' })
                        wx.switchTab({
                            url: '/pages/cart/cart'
                        })
                        break;
                    default:
                        app.toast({ title: '意料之外的网络错误' })
                }

            }
        })
    },
    /**
     * 跳转选择地址
     */
    selsite: function() {
        wx.navigateTo({
            url: 'address/address?siteid=' + this.data.siteid + '&skus=' + this.data.skus + '&num=' + this.data.num + '&quick=' + this.data.quick
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
            },
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
                sku_id_list: that.data.skus,
                user_address_id: that.data.siteid
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
            },
            error: function(code) {
                switch (parseInt(code)) {
                    case 3001:
                        app.toast({ title: '未选择商品' })
                        break;
                    case 3003:
                        app.toast({ title: '地址错误' })
                        break;
                    case 3004:
                        app.toast({ title: '商品售罄' })
                        break;
                    case 3005:
                        app.toast({ title: '商品未加入购物车' })
                        wx.switchTab({
                            url: '/pages/cart/cart'
                        })
                        break;
                    case 3006:
                        app.toast({ title: '该地区商品不支持配送' })
                        break;
                    case 3007:
                        app.toast({ title: '商品库存不够' })
                        break;
                    default:
                        app.toast({ title: '意料之外的错误' })
                }
            }
        })
    },
    quickSettlement: function(data) {
        let that = this
        app.wxrequest({
            url: "index/order/quicksettlement",
            data: {
                buid: app.globalData.pid,
                sku_id: that.data.skus,
                num: that.data.num,
                user_address_id: that.data.siteid
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
            },
            error: function(code) {
                switch (parseInt(code)) {
                    case 3001:
                        app.toast({ title: '未选择商品' })
                        break;
                    case 3003:
                        app.toast({ title: '地址错误' })
                        break;
                    case 3004:
                        app.toast({ title: '商品售罄' })
                        break;
                    case 3006:
                        app.toast({ title: '该地区商品不支持配送' })
                        break;
                    case 3007:
                        app.toast({ title: '商品库存不够' })
                        break;
                    default:
                        app.toast({ title: '意料之外的错误' })
                }
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
        if (this.data.quick == 1) {
            this.quickSettlement()
        } else {
            this.createsettlement()
        }

        if (!this.data.siteid) return
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