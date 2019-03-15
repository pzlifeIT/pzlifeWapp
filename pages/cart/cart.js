// pages/cart/cart.js
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        mask: false,
        valid: [],
        failure: [],
        total: 0,
        selectAll: false,
        sku_id: 0,
        con_id: "",
        shop_id: 0,
        imgHost: ''
    },
    /**
     * 全选
     */
    selectAll: function() {
        let valid = this.data.valid,
            selectAll = !this.data.selectAll
        for (let i = 0; i < valid.length; i++) {
            valid[i].selectStatus = selectAll
            for (let j = 0; j < valid[i].goods.length; j++) {
                valid[i].goods[j].selectStatus = selectAll
                if (valid[i].goods[j].selectStatus == true) {
                    selectAll = true
                }
            }
        }

        this.setData({
            valid: valid,
            selectAll: selectAll
        });
        this.getTotal(valid)
    },
    /**
     * 选择店铺
     */
    selectShop: function(e) {
        let valid = e.currentTarget.dataset.valid,
            validIndex = e.currentTarget.dataset.validIndex,
            selectShop = !valid[validIndex].selectStatus,
            select = []
        for (let i = 0; i < valid[validIndex].goods.length; i++) {
            valid[validIndex].goods[i].selectStatus = selectShop
            select[i] = valid[validIndex].goods[i].selectStatus
        }
        let status = true
        let have = select.indexOf(status)
        if (have < 0) { //如果没有false
            this.setData({
                selectAll: false
            })
        } else {
            this.setData({
                selectAll: true
            })
        }
        valid[validIndex].selectStatus = selectShop
        this.setData({
            valid: valid
        });
        this.getTotal(valid)
    },
    /**
     * 选择商品
     */
    selectGoods: function(e) {
        let goodsIndex = e.currentTarget.dataset.goodsIndex,
            goods = e.currentTarget.dataset.goods,
            selectStatus = !goods[goodsIndex].selectStatus,
            validIndex = e.currentTarget.dataset.validIndex,
            valid = this.data.valid
        console.log(goods)
        console.log(valid)
        goods[goodsIndex].selectStatus = selectStatus
        valid[validIndex].goods = goods
        let select = []
        for (let i = 0; i < goods.length; i++) {
            //必须所有的都是true全选才是true
            //把所有的状态都存进一个数组里，如果数组元素有一个是false就不能是true
            select[i] = goods[i].selectStatus
        }
        let status = false
        let have = select.indexOf(status)
        if (have < 0) { //如果没有false
            this.setData({
                selectAll: true
            })
        } else {
            this.setData({
                selectAll: false
            })
        }
        let haveTrue = select.indexOf(false)
        if (haveTrue >= 0) {
            valid[validIndex].selectStatus = false
        } else {
            valid[validIndex].selectStatus = true
        }
        this.setData({
            valid: valid
        });
        this.getTotal(valid)
    },
    /**
     * 计算总价
     */
    getTotal: function(valid) {
        // valid = this.data.valid,
        let total = 0
        for (let i = 0; i < valid.length; i++) {
            for (let j = 0; j < valid[i].goods.length; j++) {
                if (valid[i].goods[j].selectStatus) {
                    total += valid[i].goods[j].buy_num * valid[i].goods[j].retail_price
                }
            }
        }
        total = parseFloat(total.toFixed(2))
        this.setData({
            // valid:valid,
            total: total
        })
    },

    jian: function(e) {
        let that = this
        const goodsIndex = e.currentTarget.dataset.goodsIndex //商品下标
        let goods = e.currentTarget.dataset.goods, //商品数据
            num = goods[goodsIndex].buy_num, //购买数量
            valid = this.data.valid,
            con_id = this.data.con_id,
            sku_id = goods[goodsIndex].id,
            track_id = goods[goodsIndex].track_id,
            validIndex = e.currentTarget.dataset.validIndex, //有效商品下标
            brokerage = goods[goodsIndex].brokerage
        if (num <= 1) {
            return false
        }
        app.wxrequest({
            url: "cart/addUserCart",
            data: {
                con_id: con_id,
                goods_skuid: sku_id,
                goods_num: -1,
                parent_id: app.globalData.pid
            },
            success(res) {
                brokerage = parseFloat(brokerage / num)
                num = num - 1
                brokerage = parseFloat(brokerage * num)
                goods[goodsIndex].buy_num = num
                goods[goodsIndex].brokerage = parseFloat(brokerage.toFixed(2))
                valid[validIndex].goods = goods
                that.setData({
                    valid: valid
                });
                that.getTotal(valid)
                app.setCartNum()
                    // that.getStorage()
            },
            error(res) {
                if (res == 3000) {
                    app.toast({
                        title: "未获取到数据"
                    })
                } else if (res == 3001) {
                    app.toast({
                        title: "con_id错误"
                    })
                } else if (res == 3002) {
                    app.toast({
                        title: "con_id错误"
                    })
                }
            },
            fail(res) {

            }
        })
    },
    jia: function(e) {
        let that = this
        const goodsIndex = e.currentTarget.dataset.goodsIndex //商品下标
        let goods = e.currentTarget.dataset.goods, //商品数据
            num = goods[goodsIndex].buy_num, //购买数量
            valid = this.data.valid,
            con_id = this.data.con_id,
            sku_id = goods[goodsIndex].id,
            track_id = goods[goodsIndex].track_id,
            validIndex = e.currentTarget.dataset.validIndex, //有效商品下标
            stock = goods[goodsIndex].stock,
            brokerage = goods[goodsIndex].brokerage
            // console.log(e)
            // 		return
        if (num >= stock) {
            app.toast({
                title: "库存不足"
            });
            return false
        }

        app.wxrequest({
            url: "cart/addUserCart",
            data: {
                con_id: con_id,
                goods_skuid: sku_id,
                goods_num: 1,
                parent_id: app.globalData.pid
            },
            success(res) {
                brokerage = parseFloat(brokerage / num)
                num = num + 1
                brokerage = parseFloat(brokerage * num)
                goods[goodsIndex].buy_num = num
                goods[goodsIndex].brokerage = parseFloat(brokerage.toFixed(2))
                valid[validIndex].goods = goods
                that.setData({
                    valid: valid
                });
                that.getTotal(valid)
                app.setCartNum()
                    // that.getStorage()
            },
            error(res) {
                if (res == 3000) {
                    app.toast({
                        title: "未获取到数据"
                    })
                } else if (res == 3001) {
                    app.toast({
                        title: "con_id错误"
                    })
                } else if (res == 3002) {
                    app.toast({
                        title: "缺少参数"
                    })
                }
            },
            fail(res) {

            }
        })

    },
    del: function(e) {
        console.log(e)
        let goods = e.currentTarget.dataset.goods,
            goodsIndex = e.currentTarget.dataset.goodsIndex,
            sku_id = goods[goodsIndex].id,
            shop_id = goods[goodsIndex].track_id
        this.setData({
            mask: true,
            sku_id: sku_id,
            shop_id: shop_id
        })
    },
    confirmDel: function() {
        let con_id = this.data.con_id,
            sku_id = this.data.sku_id,
            shop_id = this.data.shop_id,
            that = this
        app.wxrequest({
            url: "cart/editUserCart",
            data: {
                con_id: con_id,
                del_skuid: sku_id,
                del_shopid: shop_id
            },
            success(res) {
                that.setData({
                    mask: false
                });
                app.toast({
                    title: "删除成功"
                })
                app.setCartNum()
                that.getStorage()
            },
            error(res) {
                console.log(res)
            },
            fail(res) {
                console.log(res)
            }
        })
    },
    preventTouchMove: function(e) {
        //弹出层防止界面滑动
    },
    hidemask: function(e) {
        this.setData({
            mask: false
        })
    },
    none: function(e) {

    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.setData({
                imgHost: app.globalData.host.imgHost
            })
            // this.getCartGoodsList()
            // this.getStorage()
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },
    /**
     * 去结算
     */
    buyGoods: function() {
        let valid = this.data.valid,
            len = valid.length,
            len1, x, y, skus = ''
        for (x = 0; x < len; x++) {
            len1 = valid[x].goods.length
            for (y = 0; y < len1; y++) {
                if (valid[x].goods[y].selectStatus) {
                    skus += valid[x].goods[y].id + ','
                }
            }
        }
        skus = skus.substring(0, skus.length - 1);
        console.log(skus)
        wx.navigateTo({
            url: '/pages/comfirOrder/comfirOrder?skus=' + skus
        })
    },
    /**
     * 添加选择状态字段
     */
    addText: function(data) {
        for (let i = 0; i < data.length; i++) {
            data[i].selectStatus = false
            for (let j = 0; j < data[i].goods.length; j++) {
                data[i].goods[j].selectStatus = false
            }
        }
        return data
    },
    getCartGoodsList: function(con_id) {
        let that = this
        app.wxrequest({
            url: "cart/getUserCart",
            data: {
                con_id: con_id
            },
            success(res) {
                let valid = that.addText(res.valid)
                that.setData({
                    valid: valid,
                    failure: res.failure,
                    validNum: valid.length + ''
                });
                that.getTotal(valid)
            },
            error(res) {
                console.log(456)
                if (res == 5000) {
                    wx.showModal({
                        title: "请先登录",
                        content: "是否确定去登录",
                        showCancel: true,
                        confirmColor: "#E61F18",
                        success(res) {
                            if (res.confirm) { //点击确定
                                wx.navigateTo({
                                    url: "/pages/login/login"
                                })
                            }
                        }
                    })
                } else if (res == 3000) {
                    that.setData({
                        valid: [],
                        failure: []
                    })
                }
            }
        })
    },
    /**
     * 获取con_id
     */
    getStorage: function() {
        let that = this
        wx.getStorage({
            key: "con_id",
            success(res) {
                that.getCartGoodsList(res.data)
                console.log(res)
                that.setData({
                    con_id: res.data
                })
            },
            fail(res) {
                wx.showModal({
                    title: "请先登录",
                    content: "是否确定去登录",
                    showCancel: true,
                    confirmColor: "#E61F18",
                    success(res) {
                        if (res.confirm) { //点击确定
                            wx.navigateTo({
                                url: "/pages/login/login"
                            })
                        }
                    }
                })
            }
        })
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        this.getStorage()
        app.setCartNum()
        this.setData({
            selectAll: false
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