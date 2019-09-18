// pages/addonitems/addonitems.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        showModel: false,
        mask: false,
        reach: true,
        page: 1,
        pagenum: 10,
        list: [],
        text: '',
        hint: '',
        goodData: {},
        repertory: true,
        buyNum: 1,
        attr: [],
        goods: {}
    },
    showModel: function (e) {
        console.log(e.currentTarget.dataset.goodsdata)
        let goodData = e.currentTarget.dataset.goodsdata;
        let goods = {};
        let attr = []
        let buy = false
        let repertory = true
        if (goodData.goods_sku.length === 1) {
            if (goodData.goods_sku[0].stock > 0) {
                goods.sku_price = goodData.goods_sku[0].retail_price
                goods.sku_image = goodData.goods_sku[0].sku_image
                goods.integral_active = goodData.goods_sku[0].integral_active
                goods.sku_name = goodData.goods_sku[0].sku_name
                goods.id = goodData.goods_sku[0].id
                goods.brokerage = goodData.goods_sku[0].brokerage
                attr[0] = goodData.goods_sku[0].spec
                buy = true
                repertory = true
            } else {
                goods = {}
                repertory = false
            }
        }
        this.setData({
            showModel: true,
            goodData: goodData,
            attr: attr,
            buy: buy,
            repertory: repertory,
            goods: goods
        })
    },
    hideModel: function () {
        this.setData({
            showModel: false
        })
    },
    goDetail: function (e) {
        let goods_id = e.currentTarget.dataset.goodsId
        let from = e.currentTarget.dataset.from
        wx.navigateTo({
            url: '/pages/goods/detail?goodid=' + goods_id + '&from=' + from
        })
    },
    getGoods: function () {
        let skuid = this.data.skuid
        let supplierid = this.data.supplierid
        let addressid = this.data.addressid
        let page = this.data.page
        let pagenum = this.data.pagenum
        let that = this
        app.wxrequest({
            url: "order/getAddOnItems",
            data: {
                sku_id_list: skuid,
                supplier_id: supplierid,
                user_address_id: addressid,
                page: page || 1,
                pagenum: pagenum || 10
            },
            success(res) {
                if (res.goodsList.length < 10) {
                    that.setData({
                        reach: false
                    })
                }
                if (res.goodsList.length > 0) {
                    let list = that.data.list
                    list.push(res.goodsList)
                    that.setData({
                        list: list,
                        page: that.data.page + 1
                    })
                }
                that.setData({
                    text: res.supplierFreightText,
                    hint: res.freightSupplierPriceText
                })
            },
            error(res) {

            }
        })
    },
    selectAttr: function (e) { //选择规格
        let dataset = e.currentTarget.dataset,
            id = dataset.id,
            idx = dataset.idx,
            dataattr = this.data.attr;
        console.log(dataattr)
        if (dataattr[idx] == id) {
            dataattr[idx] = 0
        } else {
            dataattr[idx] = id
        }
        this.setData({
            attr: dataattr
        })
        this.specPrice()
    },
    /**
     * 规格选择完成，价格图片显示和无库存显示
     */
    specPrice: function () {
        // console.log(this.complete())
        let buy = false,
            repertory = true;
        if (this.complete()) {
            let size = this.data.attr.sort(function (a, b) {
                    return a - b
                }),
                len1 = size.length,
                sku = this.data.goodData.goods_sku,
                len = sku.length,
                i, name = '',
                goodData = this.data.goods;
            buy = true

            for (i = 0; i < len1; i++) {
                name += size[i] + ','
            }
            name = name.substring(0, name.length - 1)
            console.log(size)
            console.log(name)
            for (i = 0; i < len; i++) {
                if (sku[i].spec == name) {
                    if (sku[i].stock > 0) {
                        goodData.sku_price = sku[i].retail_price
                        goodData.sku_image = sku[i].sku_image
                        goodData.integral_active = sku[i].integral_active
                        goodData.sku_name = sku[i].sku_name
                        goodData.id = sku[i].id
                        goodData.brokerage = sku[i].brokerage
                    } else {
                        buy = false
                        repertory = false
                        goodData = {}
                    }
                    break;
                }
            }
            this.setData({
                goods: goodData
            })
        }
        this.setData({
            buy: buy,
            repertory: repertory
        })
    },
    previewImage: function (e) {
        wx.previewImage({
            current: e.currentTarget.dataset.img, // 当前显示图片的http链接
            urls: [e.currentTarget.dataset.img] // 需要预览的图片http链接列表
        })
    },
    /**
     * 是否选完规格
     */
    complete: function () {
        let goods_spec = this.data.goodData.spec,
            len = goods_spec.length,
            dataattr = this.data.attr,
            i, y = 0
        for (i = 0; i < len; i++) {
            if (dataattr[i]) {
                y++
            }
        }
        if (y == len) {
            return true
        } else {
            return false
        }
    },
    getnum: function (e) {
        var num = e.detail.value;
        this.setData({
            buyNum: num
        });
    },
    jian: function (e) {
        // console.log(123)
        var that = this;
        var newnum = that.data.buyNum - 1;
        if (newnum >= 1) {
            this.setData({
                buyNum: newnum
            })
        }
    },
    jia: function (e) {
        var that = this;
        var newnum = that.data.buyNum + 1;
        this.setData({
            buyNum: newnum
        })
    },
    confirm:function(){
        if (!this.data.buy) {
            app.toast({
                title: '请选择规格'
            })
            return
        }
        //将选中的skuid，地址id传到创建结算页订单接口
        let pages = getCurrentPages()
        let page = pages[pages.length - 2]
        let data = page.data
        let goods = this.data.goods
        console.log(goods)
        console.log(data)
        this.addCart(goods.id)
        //将当前选中的skuid放进确认订单页的skuid中
        let skus = data.skus.split(',')
        skus.push(goods.id)
        let skuStr = skus.join(',')
        page.setData({
            skus:skuStr
        })
        app.modal({
            title: '凑单添加成功',
            content:'是否继续凑单？',
            cancelText:'继续凑单',
            confirmText:"去支付",
            success(){
                wx.navigateBack({
                    delta:1
                })
            }
        })
    },
    addCart:function(id) {
        let that = this
        let buyNum = that.data.buyNum
        app.wxrequest({
            url:"cart/addUserCart",
            data: {
                goods_skuid:id,
                goods_num:buyNum,
                parent_id: app.globalData.pid
            },
            success(res){

            },
            error(res) {

            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options)
        let that = this
        this.setData({
            skuid: options.skuid,
            supplierid: options.supplierid,
            addressid: options.addressid
        }, function () {
            that.getGoods()
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
        if (!this.data.reach) return
        this.getGoods()
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})