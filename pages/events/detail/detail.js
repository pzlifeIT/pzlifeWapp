// pages/events/detail/detail.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        num: 1,
        hidden: 1,
        addressId: "",
        address: {},
        go: false,
        goodsid: '',
        goods_data: {},
        goods_sku: [],
        goods_spec: [],
        attr: [],
        attrText: '',
        total: 0,
        buy: false,
        status: true,
        use: false,
        info: {},
        attrId: 0,
        select: false,
        pop: false,
        line: true,
        home: false,
        imgHost: '',
        qrcode: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options.goodsid)
        let base = app.base64(app.globalData.host.cmsHost+"?order_on=odr19053111360856501025");
        this.setData({
            goodsid: options.goodsid,
            imgHost: app.globalData.host.imgHost
        })
        this.getGoodsInfo(options.goodsid)
    },
    useCase: function () {
        let use = !this.data.use;
        this.setData({
            use: use
        })
    },
    buy: function () {
        if (!this.data.attr[0]) {
            app.toast({
                title: "请选择规格"
            })
            return
        }
        if (!this.data.buy) {
            app.toast({
                title: "库存告罄"
            })
            return
        }
        console.log(this.data.hidden)
        if (this.data.hidden == 1) {
            this.offLineBuy()
        } else {
            this.quickBuy()
        }
    },
    offLineBuy: function () {
        let that = this,
            use = this.data.use,
            paytype = 0
        if (!this.data.select) {
            app.toast({title: "请选择规格"})
            return
        }
        if (use) {
            paytype = 2 //商票
        } else {
            paytype = 1 // 三方
        }
        app.wxrequest({
            url: "OfflineActivities/createOfflineActivitiesOrder",
            data: {
                sku_id: that.data.attrId,
                pay_type: paytype,
                buy_num: that.data.num,
                buid: app.globalData.pid
            },
            success(res) {
                let base = app.base64(app.globalData.host.cmsHost+"?order_on="+res.order_no)
                console.log(app.globalData.host.apiHost+'OfflineActivities/createOrderQrCode?data='+base)
                if (res.is_pay == 1) {
                    that.setData({
                        pop: true,
                        qrcode:app.globalData.host.apiHost+'OfflineActivities/createOrderQrCode?data='+base
                    });
                    that.getUserInfo()
                } else {
                    that.pay({order_no: res.order_no})
                }
            },
            error(res) {
                let text = ''
                switch (parseInt(res)) {
                    case 3000:
                        text = '未获取到数据'
                        break;
                    case 3001:
                        text = 'skuid错误'
                        break;
                    case 3003:
                        text = '地址id错误'
                        break;
                    case 3004:
                        text = "商品已售完"
                        break;
                    case 3006:
                        text = "商品不支持配送"
                        break;
                    case 3007:
                        text = '商品库存不足'
                        break;
                    case 3008:
                        text = '支付方式错误'
                        break;
                    case 3009:
                        text = '创建订单失败'
                        break;
                }
                app.toast({title: text})
            },
            fail(res) {

            }
        })
    },
    quickBuy: function () {
        let that = this,
            use = this.data.use,
            paytype = 0
        console.log(this.data.attrId)
        if (!app.globalData.addressId) {
            app.toast({title: "请选择地址"})
            return
        }
        if (!this.data.select) {
            app.toast({title: "请选择规格"})
            return
        }
        if (use) {
            paytype = 2 //商票
        } else {
            paytype = 1 // 三方
        }
        app.wxrequest({
            url: "order/quickcreateorder",
            data: {
                sku_id: that.data.attrId,
                user_address_id: app.globalData.addressId,
                pay_type: paytype,
                num: that.data.num,
                buid: app.globalData.pid
            },
            success(res) {
                let base = app.base64(app.globalData.host.cmsHost+"?order_on="+res.order_no)
                if (res.is_pay == 1) {
                    that.setData({
                        pop: true,
                        qrcode:app.globalData.host.apiHost+'OfflineActivities/createOrderQrCode?data='+base
                    });
                    that.getUserInfo()
                } else {
                    that.pay({order_no: res.order_no})
                }
            },
            error(res) {
                let text = ''
                switch (parseInt(res)) {
                    case 3000:
                        text = '未获取到数据'
                        break;
                    case 3001:
                        text = 'skuid错误'
                        break;
                    case 3003:
                        text = '地址id错误'
                        break;
                    case 3004:
                        text = "商品已售完"
                        break;
                    case 3006:
                        text = "商品不支持配送"
                        break;
                    case 3007:
                        text = '商品库存不足'
                        break;
                    case 3008:
                        text = '支付方式错误'
                        break;
                    case 3009:
                        text = '创建订单失败'
                        break;
                }
                app.toast({title: text})
            },
            fail(res) {

            }
        })
    },
    pay: function (data) {
        let that = this
        app.wxpay({
            order_no: data.order_no,
            payment: '1',
            success(res) {
                let base = app.base64(app.globalData.host.cmsHost+"?order_on="+data.order_no)
                that.setData({
                    pop: true,
                    qrcode:app.globalData.host.apiHost+'OfflineActivities/createOrderQrCode?data='+base
                });
                that.getUserInfo()
            },
            fail(res) {

            }
        })
    },
    jian: function () {
        let num = this.data.num,
            total = this.data.total,
            goods_sku = this.data.goods_sku,
            attr = this.data.attr
        if (num <= 1) {
            return
        }
        let newNum = num - 1,
            retail_price = 0;
        for (let i = 0; i < goods_sku.length; i++) {
            if (goods_sku[i].spec == attr[0]) {
                retail_price = goods_sku[i].retail_price
            }
        }
        let newTotal = Math.floor(newNum * retail_price * 100) / 100
        this.setData({
            num: newNum,
            total: newTotal
        })
    },
    jia: function () {
        let num = this.data.num,
            total = this.data.total,
            attr = this.data.attr,
            goods_sku = this.data.goods_sku
        let newNum = num + 1,
            retail_price = 0,
            stock = 0
        for (let i = 0; i < goods_sku.length; i++) {
            if (goods_sku[i].spec == attr[0]) {
                retail_price = goods_sku[i].retail_price
                stock = goods_sku[i].stock
            }
        }
        if (!attr[0]) {
            app.toast({title: "请选择规格"})
            return
        }
        let newTotal = Math.floor(newNum * retail_price * 100) / 100
        if (newNum > stock) {
            app.toast({title: "库存告罄"})
            return
        }
        this.setData({
            num: newNum,
            total: newTotal
        })
    },
    selectAttr: function (e) {
        let id = e.currentTarget.dataset.id,
            ind = e.currentTarget.dataset.ind,
            attrId = this.data.attrId,
            select = e.currentTarget.dataset.select,
            name = e.currentTarget.dataset.name,
            attr = this.data.attr;
        console.log(e)
        console.log(name)
        attr[ind] = id
        if (name.indexOf("配送") != -1) {
            app.toast({title: "当前规格只能配送到家"})
            this.setData({
                home: true,
                line: false,
                hidden: 2
            })
        } else {
            app.toast({title: "当前规格只能线下自提"})
            this.setData({
                line: true,
                home: false,
                hidden: 1
            })
        }
        let ok = false
        if (!select) {
            ok = true
        } else {
            ok = false
        }
        this.setData({
            attr: attr,
            select: ok,
            attrText: name
        })
        this.skuPrice()
    },
    skuPrice: function () {
        let attr = this.data.attr,
            skus = this.data.goods_sku,
            buy = false;
        let num = this.data.num
        if (this.success()) {
            let newAttr = attr.sort()
            for (let i = 0; i < skus.length; i++) {
                if (skus[i].spec == newAttr[0]) {
                    if (skus[i].stock > 0) {
                        this.setData({
                            total: Math.floor(skus[i].retail_price * num * 100) / 100,
                            buy: true,
                            attrId: skus[i].id
                        })
                    } else {
                        this.setData({
                            total: 0,
                            buy: false
                        })
                    }
                }
            }
        }
    },
    success: function () {
        let goods_spec = this.data.goods_spec,
            attr = this.data.attr;
        let y = 0
        for (let i = 0; i < goods_spec.length; i++) {
            if (attr[i]) {
                y++
            }
        }
        if (y == goods_spec.length) {
            return true
        } else {
            return false
        }
    },
    way: function (e) {
        if (!this.data.attrText) {
            app.toast({title: "请选择规格"})
            return
        }
        if (this.data.attrText.indexOf("白") != -1) { // 配送到家
            app.toast({title: "当前规格只能配送到家"})
            this.setData({
                home: true,
                line: false
            })
        } else {
            app.toast({title: "当前规格只能线下自提"})
            this.setData({
                line: true,
                home: false
            })
        }
        this.setData({
            hidden: e.detail.value
        })
    },
    qrcode: function () {
        let base = new Base64()
    },
    exp: function () {
        if (this.data.attrText.indexOf("白") == -1) { // 不可以配送
            app.toast({title: "当前规格不能配送到家"})
            this.setData({
                home: false,
                line: true
            })
        }
    },
    goAddress: function () {
        wx.navigateTo({
            url: '/pages/comfirOrder/address/address'
        })
    },
    getAddress: function () {
        let that = this
        app.wxrequest({
            url: "user/getUserAddress",
            data: {
                address_id: app.globalData.addressId
            },
            success(res) {
                that.setData({
                    address: res.data
                })
            }
        })
    },
    getGoodsInfo: function (id) {
        let that = this
        app.wxrequest({
            url: "goods/getGoods",
            data: {
                goods_id: id,
                source: 4
            },
            nocon: true,
            success(res) {
                console.log(res)
                that.setData({
                    goods_data: res.goods_data,
                    goods_sku: res.goods_sku,
                    goods_spec: res.goods_spec
                })
            },
            error(res) {
                app.toast({
                    title: "未获取到商品信息"
                })
            }
        })
    },
    getUserInfo: function () {
        let that = this
        app.wxrequest({
            url: "user/getuser",
            success(res) {
                that.setData({
                    info: res.data
                })
            }
        })
    },
    goIndex: function () {
        wx.switchTab({
            url: '/pages/index/index'
        })
    },
    goEvents: function () {
        wx.navigateBack()
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
        this.getUserInfo()
        console.log(app.globalData.addressId)
        if (!app.globalData.addressId) return
        console.log(app.globalData.addressId)
        this.setData({
            addressId: app.globalData.addressId
        })
        this.getAddress()
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

    },

    /**
     * 用户点击右上角分享
     */

})