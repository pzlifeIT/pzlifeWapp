// pages/comfirOrder/comfirOrder.js
const app = getApp();
let inte = null
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
        paytype: 1,
        paymoney: {},
        num: 1,
        quick: 0,
        imgHost: '',
        distribution: false,
        payStatus: false,
        coupon: '',
        couponText: '',
        couponTitle: '',
        isIphoneX: false,
        s: '00',
        m: 30,
        timeout: '30分00秒'
    },
    hideModel: function (e) {
        this.setData({
            isShow: false
        })
    },
    showModel: function (e) {
        this.setData({
            isShow: true
        })
    },
    hideaddress: function (e) {
        this.setData({
            addressshow: false
        })
    },
    hidedistribution(e) {
        this.setData({
            distribution: false
        })
    },
    hidepay: function () {
        this.setData({
            buypup: false
        })
    },
    cancelbuypup() {
        wx.navigateBack()
    },
    selpaytype: function (e) {
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
    gobuy: function () {
        if (this.data.paytype == 0) {
            app.toast({title: '请选择支付方式'})
            return
        }
        if (this.data.siteid == '') {
            app.toast({title: '请选择地址'})
            return
        }
        if (this.data.quick == 1) {
            this.quickcreateorder()
        } else {
            this.createorder()
        }
    },
    showaddres: function (e) {
        if (!this.data.siteid) {
            app.toast({
                title: '请选择地址'
            })
            return
        }
        if (this.data.paytype === 0) {
            app.toast({
                title: '请选择支付方式'
            })
            return
        }
        this.setData({
            addressshow: true
        })
    },
    showbuypup: function () {

        // this.setData({
        //     buypup: true
        // })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.time()
        this.setData({
            imgHost: app.globalData.host.imgHost,
            skus: options.skus,
            siteid: app.globalData.addressId,
            num: options.num || 1,
            quick: options.quick || 0,
            isIphoneX: app.isIphoneX()
        })
    },
    /**
     * 创建订单接口
     */
    createorder: function (data) {
        let that = this
        app.wxrequest({
            url: 'order/createorder',
            data: {
                sku_id_list: that.data.skus,
                user_address_id: that.data.siteid,
                pay_type: that.data.paytype,
                user_coupon_id: that.data.coupon
            },
            success: function (res) {

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
                app.globalData.updateNum = true
            },
            error: function (code) {
                switch (parseInt(code)) {
                    case 3000:
                    case 3001:
                    case 3003:
                        app.toast({title: '商品信息出错'})
                        break;
                    case 3004:
                        app.toast({title: '商品已售完'})
                        break;
                    case 3005:
                        app.toast({title: '商品未加入购物车'})
                        wx.switchTab({
                            url: '/pages/cart/cart'
                        })
                        break;
                    case 3006:
                        that.setData({
                            distribution: true
                        })
                        app.toast({title: '该地区商品不支持配送'})
                        break;
                    case 3007:
                        app.toast({title: '商品库存不足'})
                        break;
                    case 3008:
                        app.toast({title: "支付方式错误"})
                        break;
                    case 3009:
                        app.toast({title: "创建订单失败"})
                        break;
                    case 3010:
                        app.modal({
                            title: "钻石会员专享",
                            content: "该商品为钻石会员专享，是否去升级为钻石会员？",
                            success() {
                                wx.switchTab({
                                    url: '/pages/my/getVip/getVip'
                                })
                            }
                        });
                        break;
                    case 3011:
                        app.toast({title: "创业店主及以上身份专享商品"});
                        break;
                    case 3012:
                        app.toast({title: "合伙人及以上身份专享商品"});
                        break;
                    case 3013:
                        app.toast({
                            title: "优惠券不可用"
                        });
                        break;
                    default:
                        app.toast({title: '错误码：' + code})
                }

            }
        })
    },
    quickcreateorder: function (data) {
        let that = this
        app.wxrequest({
            url: 'order/quickcreateorder',
            data: {
                buid: app.globalData.pid,
                sku_id: that.data.skus,
                user_address_id: that.data.siteid,
                pay_type: that.data.paytype,
                num: that.data.num,
                user_coupon_id: that.data.coupon
            },
            success: function (res) {
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
                        app.toast({title: '商品信息出错'})
                        break;
                    case 3004:
                        app.toast({title: '商品已售完'})
                        break;
                    case 3006:
                        that.setData({
                            distribution: true
                        })
                        app.toast({title: '该地区商品不支持配送'})
                        break;
                    case 3007:
                        app.toast({title: '商品库存不够'})
                        break;
                    case 3008:
                        app.toast({title: "支付方式错误"})
                        break;
                    case 3009:
                        app.toast({title: "创建订单失败"})
                        break;
                    case 3010:
                        app.modal({
                            title: "钻石会员专属",
                            content: "该商品为钻石会员及以上身份专属，是否去升级为钻石会员？",
                            success() {
                                wx.switchTab({
                                    url: "/pages/my/getVip/getVip"
                                })
                            }
                        });
                        break;
                    case 3011:
                        app.toast({title: "创业店主及以上身份专享商品"});
                        break;
                    case 3012:
                        app.toast({title: "合伙人及以上身份专享"});
                        break;
                    case 3013:
                        app.toast({title: "优惠券不可用"});
                        break;
                    default:
                        app.toast({title: '错误码：' + code})
                }
            }
        })
    },
    gopaystatus: function (data) {
        let that = this
        wx.redirectTo({
            url: '/pages/paystatus/paystatus?status=' + data.status + '&orderno=' + data.order_no + '&siteid=' + that.data.siteid + '&price=' + that.data.stat.total_price
        })
    },
    /**
     * 支付
     */
    pay: function (data) {
        let that = this
        app.wxpay({
            order_no: data.order_no,
            payment: '1',
            success(res) {
                that.setData({
                    payStatus: true
                })
                that.gopaystatus({
                    order_no: data.order_no,
                    status: 1
                })
            },
            fail(res) {
                that.setData({
                    payStatus: false
                })
                that.gopaystatus({
                    order_no: data.order_no,
                    status: 2
                })
            },
            error(code) {
                if (code == 3010) {
                    wx.switchTab({
                        url: '/pages/cart/cart'
                    })
                }
            }
        })
    },
    /**
     * 跳转选择地址
     */
    selsite: function () {
        wx.navigateTo({
            url: 'address/address'
        })
    },
    /**
     * 获取地址接口
     */
    getUserAddress: function (data) {
        let that = this
        app.wxrequest({
            url: 'user/getUserAddress',
            data: {
                address_id: data.address_id
            },
            success: function (res) {
                that.setData({
                    site: res.data || {}
                })
            },
        })
    },
    /**
     * 创建结算页
     */
    createsettlement: function (data) {
        let that = this
        app.wxrequest({
            url: "order/createsettlement",
            data: {
                sku_id_list: that.data.skus,
                user_address_id: that.data.siteid,
                user_coupon_id: that.data.coupon
            },
            success(res) {
                let stat = {
                    goods_count: res.goods_count,
                    rebate_all: res.rebate_all,
                    total_freight_price: res.total_freight_price,
                    total_goods_price: res.total_goods_price,
                    total_price: res.total_price,
                    balance: res.balance,
                    discount_money: res.discount_money
                }
                that.setData({
                    datalist: res.supplier_list,
                    stat: stat,
                    siteid: res.default_address_id
                })
                app.globalData.addressId = res.default_address_id
                that.getUserAddress({
                    address_id: res.default_address_id
                })
            },
            error: function (code) {
                switch (parseInt(code)) {
                    case 3001:
                        app.toast({title: '未选择商品'})
                        break;
                    case 3003:
                        app.toast({title: '地址错误'})
                        break;
                    case 3004:
                        app.toast({title: '商品售罄'})
                        break;
                    case 3005:
                        app.toast({title: '商品未加入购物车'})
                        wx.switchTab({
                            url: '/pages/cart/cart'
                        })
                        break;
                    case 3006:
                        that.setData({
                            distribution: true
                        })
                        app.toast({title: '该地区商品不支持配送'})
                        break;
                    case 3007:
                        app.toast({title: '商品库存不够'})
                        break;
                    case 3010:
                        app.modal({
                            title: "钻石会员专享",
                            content: "该商品为钻石会员及以上身份专享，是否升级为钻石会员？",
                            success: function () {
                                wx.switchTab({
                                    url: "/pages/my/getVip/getVip"
                                })
                            }
                        });
                        break;
                    case 3011:
                        app.toast({title: "创业店主及以上身份专享商品"});
                        break;
                    case 3012:
                        app.toast({title: "合伙人及以上身份专享商品"});
                        break;
                    case 3013:
                        app.toast({title: "优惠券不可用"});
                        break;
                    default:
                        app.toast({title: '错误码：' + code})
                        break;
                }
                // if (!that.data.siteid) {
                //     that.getUserAddress({
                //         address_id: app.globalData.addressId
                //     })
                // }else {
                //     that.getUserAddress({
                //         address_id: that.data.siteid
                //     })
                // }

            }
        })
    },
    quickSettlement: function (data) {
        let that = this
        app.wxrequest({
            url: "order/quicksettlement",
            data: {
                buid: app.globalData.pid,
                sku_id: that.data.skus,
                num: that.data.num,
                user_address_id: that.data.siteid,
                user_coupon_id: that.data.coupon
            },
            success(res) {
                let stat = {
                    goods_count: res.goods_count,
                    rebate_all: res.rebate_all,
                    total_freight_price: res.total_freight_price,
                    total_goods_price: res.total_goods_price,
                    total_price: res.total_price,
                    balance: res.balance,
                    discount_money: res.discount_money
                }
                that.setData({
                    datalist: res.supplier_list,
                    stat: stat,
                    siteid: res.default_address_id
                })
                app.globalData.addressId = res.default_address_id
                that.getUserAddress({
                    address_id: res.default_address_id
                })
            },
            error: function (code) {
                switch (parseInt(code)) {
                    case 3001:
                        app.toast({title: '未选择商品'})
                        break;
                    case 3003:
                        app.toast({title: '地址错误'})
                        break;
                    case 3004:
                        app.toast({title: '商品售罄'})
                        break;
                    case 3006:
                        that.setData({
                            distribution: true
                        })
                        app.toast({title: '该地区商品不支持配送'})
                        break;
                    case 3007:
                        app.toast({title: '商品库存不够'})
                        break;
                    case 3010:
                        app.modal({
                            title: "钻石会员专享",
                            content: "该商品为钻石会员及以上身份专享，是否升级为钻石会员？",
                            success() {
                                wx.switchTab({
                                    url: "/pages/my/getVip/getVip"
                                })
                            }
                        });
                        break;
                    case 3011:
                        app.toast({title: "该商品为创业店主及以上身份专属"});
                        break;
                    case 3012:
                        app.toast({title: "该商品为合伙人及以上身份专属"});
                        break;
                    case 3013:
                        app.toast({title: "优惠券不可用"});
                        break;
                    default:
                        app.toast({title: '错误码：' + code})
                }
                // if (!that.data.siteid){
                //     that.getUserAddress({
                //         address_id: app.globalData.addressId
                //     })
                // } else {
                //     that.getUserAddress({
                //         address_id: that.data.siteid
                //     })
                // }

            }
        })
    },
    disCoupon: function (data) {
        console.log(data)
        if (data.length > 0) {
            let arr = data.split("-");
            console.log(arr)
            this.setData({
                coupon: arr[0],
                couponTitle: arr[1]
            })
        } else {
            this.setData({
                coupon: '',
                couponTitle: ''
            })
        }
    },
    time: function () {
        let second = this.timeTosecond('30:00')
        let that = this
        console.log(second)
        inte = setInterval(function () {
            second--
            if (second <= 0) {
                second = 0
            }
            let ms = that.formatTime(second)
            // console.log(ms)
            that.setData({
                timeout: ms
            })
            if (second == 0) {
                clearInterval(inte)
                app.toast({title: '支付时间已截止，请重新下单'});
                setTimeout(function () {
                    wx.switchTab({
                        url: "/pages/cart/cart"
                    })
                }, 1000)
            }
        }, 1000)
    },
    formatTime: function (s) {
        let min = Math.floor(Math.floor(s / 60) % 60);
        let sec = Math.floor(parseInt(s % 60));
        min = min < 10 ? '0' + min : min;
        sec = sec < 10 ? '0' + sec : sec;
        return min + '分' + sec + '秒'
    },
    timeTosecond: function (str) {
        let arr = str.split(':');
        let ms = parseInt(arr[0] * 60);
        let ss = parseInt(arr[1]);
        let seconds = ms + ss;
        return seconds;
    },
    addGoods: function (e) {
        let skuid = e.currentTarget.dataset.sku,
            supplierid = e.currentTarget.dataset.supplierid,
            addressid = this.data.siteid
        wx.navigateTo({
            url: '/pages/addonitems/addonitems?skuid=' + skuid + '&supplierid=' + supplierid + '&addressid=' + addressid
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
    onShow: function (o) {

        if (this.data.payStatus) return;
        console.log('siteid', app.globalData.addressId)

        console.log(this.data.couponText)

        this.setData({
            siteid: app.globalData.addressId,
            distribution: false
        })

        this.disCoupon(this.data.couponText);
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
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {
        clearInterval(inte)
        console.log('wozhixingle ')
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

    }
})