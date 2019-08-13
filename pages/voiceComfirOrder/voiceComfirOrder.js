// pages/voiceComfirOrder/voiceComfirOrder.js
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        imgHost: '',
        sku_id: '',
        num: 1,
        goods_id: '',
        isIphoneX: false,
        coupon: '',
        couponText: '',
        couponTitle: '',
        goodsInfo: {},
        paytype: 1
    },
    /**
     * 结算
     */
    quickSettlementAudio: function () {
        let that = this
        app.wxrequest({
            url: "order/quickSettlementAudio",
            data: {
                buid: app.globalData.pid,
                sku_id: that.data.sku_id,
                goods_id: that.data.goods_id,
                num: that.data.num,
                user_coupon_id: that.data.coupon
            },
            success(res) {
                that.setData({
                    goodsInfo: res,
                    datalist: res.supplier_list
                })
            },
            error(code) {
                switch (parseInt(code)) {
                    case 3000:
                        app.toast({title: "未获取到数据"});
                        break;
                    case 3001:
                        app.toast({title: "sku错误"});
                        break;
                    case 3002:
                        app.toast({title: "商品id错误"});
                        break;
                    case 3003:
                        app.toast({title: '数量错误'});
                        break;
                    case 3004:
                        app.toast({title: "uid错误"});
                        break;
                    case 3005:
                        app.toast({title: "商品已下架"});
                        break;
                    case 3006:
                        app.toast({title: "该商品sku不存在"});
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
    selpaytype: function (e) {
        let type = e.currentTarget.dataset.type,
            paym = {},
            stat = this.data.goodsInfo
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
    showaddres: function () {
        if (this.data.paytype == 0) {
            app.toast({title: "请选择支付方式"});
            return
        }
        this.quickCreateAudioOrder()
    },
    quickCreateAudioOrder: function () {
        let that = this
        app.wxrequest({
            url: 'order/quickCreateAudioOrder',
            data: {
                buid: app.globalData.pid,
                sku_id: that.data.sku_id,
                goods_id: that.data.goods_id,
                pay_type: that.data.paytype,
                num: that.data.num,
                user_coupon_id: that.data.coupon
            },
            success(res) {
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
                    case 3002:
                        app.toast({title: '商品信息错误'});
                        break;
                    case 3004:
                        app.toast({title: "商品已售罄"});
                        break;
                    case 3007:
                        app.toast({title: "库存不足"});
                        break;
                    case 3008:
                        app.toast({title: "支付方式错误"});
                        break;
                    case 3009:
                        app.toast({title: "创建失败"});
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
    gopaystatus: function (data) {
        let that = this
        wx.redirectTo({
            url: '/pages/paystatus/paystatus?status=' + data.status + '&orderno=' + data.order_no + '&siteid=' + '' + '&price=' + that.data.goodsInfo.total_goods_price + "&type=3"
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
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            imgHost: app.globalData.host.imgHost,
            sku_id: options.sku_id,
            num: options.buyNum || 1,
            goods_id: options.goods_id,
            isIphoneX: app.isIphoneX()
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
    onShow: function () {
        this.disCoupon(this.data.couponText);
        this.quickSettlementAudio()
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