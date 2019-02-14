// pages/goods/detail.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        goodid: '',
        goodInfo: {},
        showModel: true,
        attr: [],
        price: '',
        goodData: {},
        buy: false,
        repertory: true
    },
    showModel: function() {
        this.setData({
            showModel: true
        })
    },
    changeSwiper: function(e) {
        this.setData({
            swipercur: parseInt(e.detail.current) + 1
        })
    },
    hideModel: function() {
        this.setData({
            showModel: false
        })
    },
    showModel: function() {
        this.setData({
            showModel: true
        })
    },
    preventTouchMove: function() {
        //防止用户操作弹出层外界面
    },
    selectAttr: function(e) { //选择规格
        let dataset = e.currentTarget.dataset,
            id = dataset.id,
            idx = dataset.idx,
            dataattr = this.data.attr;
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
    specPrice: function() {
        // console.log(this.complete())
        let buy = false,
            repertory = true;
        if (this.complete()) {
            let size = this.data.attr.sort(function(a, b) {
                    return a - b
                }),
                len1 = size.length,
                sku = this.data.goodInfo.goods_sku,
                len = sku.length,
                i, name = '',
                goodData = this.data.goodData;
            buy = true

            for (i = 0; i < len1; i++) {
                name += size[i] + ','
            }
            name = name.substring(0, name.length - 1)
            for (i = 0; i < len; i++) {
                if (sku[i].spec == name) {
                    if (sku[i].stock > 0) {
                        goodData.sku_price = sku[i].retail_price
                        goodData.sku_image = sku[i].sku_image
                    } else {
                        buy = false
                        repertory = false
                    }
                    break;
                }
            }

            this.setData({
                goodData: goodData
            })
        }
        this.setData({
            buy: buy,
            repertory: repertory
        })
    },
    /**
     * 是否选完规格
     */
    complete: function() {
        let goods_spec = this.data.goodInfo.goods_spec,
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
    getnum: function(e) {
        var num = e.detail.value;
        console.log(num)
        this.setData({
            buyNum: num
        });
    },
    jian: function(e) {
        // console.log(123)
        var that = this;
        var newnum = that.data.buyNum - 1;
        if (newnum >= 1) {
            this.setData({
                buyNum: newnum
            })
        }
    },
    jia: function(e) {
        var that = this;
        var newnum = that.data.buyNum + 1;
        this.setData({
            buyNum: newnum
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.setData({
            goodid: options.goodid
        })
        this.getGoodInfo(this.data.goodid)
    },
    getGoodInfo: function(id) {
        let t = this,
            goodData = {}
        app.wxrequest({
            url: 'index/goods/getGoods',
            data: {
                goods_id: id
            },
            success: function(res) {
                goodData.sku_image = res.goods_data.image
                t.setData({
                    goodInfo: res,
                    goodData: goodData
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