// pages/goods/detail.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        goodid: '',
        goodInfo: {},
        showModel: false,
        attr: [],
        price: '',
        goodData: {},
        buy: false,
        repertory: true,
        buyNum: 1,
        swipercur: 1,
        imgHost: '',
        identity: 0,
        status: 0,
        cartNum: 0,
        recommend: [],
        navH: 0,
        navHight:app.globalData.topHeadHeight,
        isIphoneX:false,
        from:'',
        mask:false
    },
    showModel: function () {
        this.setData({
            showModel: true
        })
    },
    addOnItems:function() {
        if (!this.data.showModel) {
            this.setData({
                showModel: true
            })
            return
        }
        if (!this.data.buy) {
            app.toast({
                title: '请选择规格'
            })
            return
        }
        if (parseInt(this.data.buyNum) < 1) {
            app.toast({
                title: '数量不能小于1'
            })
            return
        }

        let pages = getCurrentPages()
        let page = pages[pages.length - 3]
        let data = page.data
        let goods = this.data.goodData
        console.log(goods)
        console.log(data)
        this.addUserCart({
            goods_skuid: this.data.goodData.id,
            goods_num: this.data.buyNum,
            parent_id: app.globalData.pid,
            type:1
        })
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
                    delta:2
                })
            }
        })
    },
    changeSwiper: function (e) {
        this.setData({
            swipercur: parseInt(e.detail.current) + 1
        })
    },
    putaway: function () {
        let that = this
        app.wxrequest({
            url: 'shopmanage/autoShopGoods',
            data: {
                type: 1,
                goods_id: that.data.goodid
            },
            success: function (res) {
                that.getGoodsAway()
                app.toast({title: '操作成功'})
            }
        })
    },
    hideModel: function () {
        this.setData({
            showModel: false
        })
    },
    preventTouchMove: function () {
        //防止用户操作弹出层外界面
    },
    call: function () {
        wx.makePhoneCall({
            phoneNumber: '15502123212'
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
                goodData: goodData
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
    buyGood: function () {
        if (!this.data.showModel) {
            this.setData({
                showModel: true
            })
            return
        }
        if (!this.data.buy) {
            app.toast({
                title: '请选择规格'
            })
            return
        }
        let that = this
        app.judgelogin({
            success(res) {
                wx.navigateTo({
                    url: "/pages/comfirOrder/comfirOrder?skus=" + that.data.goodData.id + '&num=' + that.data.buyNum + '&quick=' + 1
                })
            }
        })
    },
    joinCart: function () {
        if (!this.data.showModel) {
            this.setData({
                showModel: true
            })
            return
        }
        if (!this.data.buy) {
            app.toast({
                title: '请选择规格'
            })
            return
        }
        if (parseInt(this.data.buyNum) < 1) {
            app.toast({
                title: '数量不能小于1'
            })
            return
        }
        this.addUserCart({
            goods_skuid: this.data.goodData.id,
            goods_num: this.data.buyNum,
            parent_id: app.globalData.pid
        })
    },
    /**
     * 判断是否
     */
    /**
     * 加入购物车接口
     */
    addUserCart: function (data) {
        let that = this
        app.wxrequest({
            url: 'cart/addUserCart',
            data: {
                goods_skuid: data.goods_skuid,
                goods_num: data.goods_num,
                parent_id: data.parent_id
            },
            success: function (res) {
                that.setData({
                    showModel: false
                })
                app.globalData.updateNum = true
                that.getCartNum()
                if (!data.type){
                    app.toast({title: '加入购物车成功'})
                }
            },
            error: function (res) {
                switch (parseInt(res)) {
                    case 3005:
                        app.modal({
                            title: "钻石会员专享",
                            content: "该商品为钻石会员及以上身份专享，是否去升级为钻石会员？",
                            success() {
                                wx.switchTab({
                                    url: "/pages/my/getVip/getVip"
                                })
                            }
                        });
                        break;
                    case 3006:
                        app.toast({title:"库存不足"});
                        break;
                    case 3007:
                        app.toast({title:"该商品为创业店主及以上身份专享"});
                        break;
                    case 3008:
                        app.toast({title:"该商品为合伙人及以上身份专享"});
                        break;
                    case 3010:
                        app.toast({title:"库存不足"});
                        break;
                    default:
                        app.toast({
                            title: "错误码：" + res
                        });
                        break;
                }

            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log('app.globalData.userInfo.user_identity', app.globalData.userInfo.user_identity)
        this.setData({
            goodid: options.goodid,
            imgHost: app.globalData.host.imgHost,
            identity: app.globalData.userInfo.user_identity || 0,
            navH: app.globalData.topHeadHeight,
            isIphoneX:app.isIphoneX(),
            from:options.from
        })
        this.getGoodInfo(options.goodid)
        this.getgoodsrecommend(options.goodid)
    },
    /**
     * 商品推荐
     */
    getgoodsrecommend: function (id) {
        let that = this
        app.wxrequest({
            url: "goods/goodsrecommend",
            data: {
                goods_id: id
            },
            nocon: true,
            success(res) {
                that.setData({
                    recommend: res.data
                });
            }

        })
    },
    recommendGoods: function (e) {
        let id = e.currentTarget.dataset.goodsid;
        let type = e.currentTarget.dataset.type;
        if (type == 1){
            wx.navigateTo({
                url: "/pages/goods/detail?goodid=" + id
            })
        } else if (type == 2){
            wx.navigateTo({
                url: "/pages/voiceDetail/voiceDetail?goodid=" + id
            })
        }

    },
    /**
     * 获取商品详情
     */
    getGoodInfo: function (id) {
        let t = this,
            goodData = {},
            dataattr = this.data.attr,
            buy = false,
            repertory = true,
            attr = [];
        app.wxrequest({
            url: 'goods/getGoods',
            data: {
                goods_id: id,
                source: 4
            },
            nocon: true,
            success: function (res) {
                goodData.sku_image = res.goods_data.image
                if (res.goods_sku.length == 1) {
                    goodData.sku_price = res.goods_sku[0].retail_price
                    goodData.sku_image = res.goods_sku[0].sku_image
                    goodData.integral_active = res.goods_sku[0].integral_active
                    goodData.sku_name = res.goods_sku[0].sku_name
                    goodData.id = res.goods_sku[0].id
                    goodData.brokerage = res.goods_sku[0].brokerage
                    buy = true
                    attr.push(res.goods_spec[0].list[0].id)
                    if (parseInt(res.goods_sku[0].stock) < 1) {
                        repertory = false
                    }
                }
                t.setData({
                    goodInfo: res,
                    goodData: goodData,
                    buy: buy,
                    repertory: repertory,
                    attr: attr
                });
                // t.getgoodsrecommend(id)
            },
            error: function (code) {
                app.toast({title: '商品已下架'})
                setTimeout(function () {
                    wx.navigateBack()
                },1000)
            }
        })
    },
    getGoodsAway: function () {
        if (this.data.identity != 4) return
        let t = this
        app.wxrequest({
            url: 'shopManage/getGoodsAway',
            data: {
                goods_id: t.data.goodid
            },
            success(res) {

                t.setData({
                    status: res.putaway
                })
            }
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
        this.setData({
            identity: app.globalData.userInfo.user_identity || 0,
            cartNum: ''
        })
        this.getCartNum()
        this.getGoodsAway()
    },
    getCartNum: function (id) {
        let that = this
        app.wxrequest({
            url: 'cart/getUserCartNum',
            nologin: true,
            success: function (res) {
                that.setData({
                    cartNum: res.total
                })
            }
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

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    // onReachBottom: function () {
    //
    // },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
        let that = this,
            share = app.share({
                title: that.data.goodInfo.goods_data.goods_name,
                path: '/pages/goods/detail?goodid=' + that.data.goodid,
                imageUrl: that.data.goodInfo.goods_data.share_image,
            })
        return share
    }
})