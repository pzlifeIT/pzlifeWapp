// pages/voiceDetail/voiceDetail.js
const innerAudioContent = wx.createInnerAudioContext();
const app = getApp();
let inte = null
Page({

    /**
     * 页面的初始数据
     */
    data: {
        imgHost: '',
        goods_banner: [],
        goods_data: {},
        goods_details: [],
        goods_sku: [],
        goods_spec: [],
        playState: true,
        idx: '',
        selectVoice: false,
        showModel: false,
        buyNum: 1,
        isIphoneX: false,
        goodData: {},
        attr: [],
        repertory: true,
        buy: false,
        indx: 0,
        skuInfo: {},
        goods_id: 0,
        identity:0,
        cartNum:0,
        sku_id:''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            imgHost: app.globalData.host.imgHost,
            isIphoneX: app.isIphoneX(),
            goods_id: options.goodid
        })

    },
    call: function () {
        wx.makePhoneCall({
            phoneNumber: '15502123212'
        })
    },
    showModel: function () {
        this.setData({
            showModel: true
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
    preventTouchMove: function () {
        //防止用户操作弹出层外界面
    },
    hideSelect: function () {
        this.setData({
            selectVoice: false
        })
    },
    hideModel: function () {
        this.setData({
            showModel: false
        })
    },
    selectVoice: function () {
        this.setData({
            selectVoice: true
        })
    },
    selectAttr: function (e) {
        //当前选中其他不选中
        let id = e.currentTarget.dataset.id,
            indx = e.currentTarget.dataset.indx;
        let attr = [];
        if (attr[0] == id) {
            attr[0] = 0
        } else {
            attr[0] = id
        }
        this.setData({
            attr: attr
        })
        this.skuPrice()
    },
    skuPrice: function () {
        let attr = this.data.attr;
        let buy = true;
        let sku = this.data.goods_sku;
        let skuInfo = {}
        console.log(attr)
        //获取sku信息
        for (let i = 0; i < sku.length; i++) {
            if (sku[i].id == attr[0]) {
                skuInfo.retail_price = sku[i].retail_price
                skuInfo.name = sku[i].name
                skuInfo.brokerage = sku[i].brokerage
                skuInfo.integral_active = sku[i].integral_active
                skuInfo.sku_image = this.data.goods_data.image
            }
        }
        this.setData({
            goodData: skuInfo,
            buy: true
        })
    },

    complete: function () {
        let goods_spec = this.data.goods_sku,
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
    previewImage: function (e) {
        wx.previewImage({
            current: e.currentTarget.dataset.img, // 当前显示图片的http链接
            urls: [e.currentTarget.dataset.img] // 需要预览的图片http链接列表
        })
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
        if (this.data.attr.length <= 0) {
            app.toast({
                title: '请选择规格'
            })
            return
        }
        let that = this
        app.judgelogin({
            success(res) {
                wx.navigateTo({
                    url: "/pages/voiceComfirOrder/voiceComfirOrder?sku_id=" + that.data.attr[0] + "&goods_id=" + that.data.goods_data.id + "&buyNum=" + that.data.buyNum
                })
            }
        })
    },
    /**
     * 获取音频详情
     */
    getVoiceDetail: function () {
        let that = this,
            goodData = {},
            buy = false,
            repertory = true,
            attr = [];
        app.wxrequest({
            url: "goods/getGoods",
            data: {
                goods_id: that.data.goods_id,
                source: 4
            },
            success(res) {
                console.log(res)
                goodData.sku_image = res.goods_data.image
                goodData.audio = res.goods_sku[0].audios[0].audio
                if (res.goods_sku.length == 1) {
                    goodData.retail_price = res.goods_sku[0].retail_price
                    goodData.integral_active = res.goods_sku[0].integral_active
                    goodData.name = res.goods_sku[0].name
                    goodData.id = res.goods_sku[0].id
                    goodData.brokerage = res.goods_sku[0].brokerage
                    buy = true
                    attr[0] = res.goods_sku[0].id
                    // attr.push(res.goods_spec[0].list[0].id)
                    if (parseInt(res.goods_sku[0].stock) < 1) {
                        repertory = false
                    }
                }
                console.log(goodData)
                that.setData({
                    goods_banner: res.goods_banner,
                    goods_data: res.goods_data,
                    goods_details: res.goods_details,
                    goods_sku: res.goods_sku,
                    goods_spec: res.goods_spec,
                    goodData: goodData,
                    buy: buy,
                    repertory: repertory,
                    attr: attr
                })
            },
            error(res) {
                switch (parseInt(res)) {
                    case 3000:
                        app.toast({title: "商品已下架"});
                        break;
                    default:
                        app.toast({title: '错误码：' + res})
                }
            }
        })
    },
    play: function (e) {
        let audio = e.currentTarget.dataset.audio;
        let time = e.currentTarget.dataset.time;
        let playState = !this.data.playState;
        let skuid = e.currentTarget.dataset.sku;
        let that = this;
        let idx = e.currentTarget.dataset.idx;
        innerAudioContent.src = audio;
        innerAudioContent.stop();
        innerAudioContent.play();
        innerAudioContent.onPlay(function () {
            console.log('zhengzaibofang ')
        })
        that.setData({
            idx: idx,
            sku_id:skuid
        });
        //获取当前播放位置
        inte = setInterval(function () {
            if (innerAudioContent.currentTime >= time){
                innerAudioContent.stop();
                app.toast({title:"试听结束"});
                that.setData({
                    idx:'',
                    sku_id:''
                })
                clearInterval(inte)
            }
        },1000);
        innerAudioContent.onError(function (res) {
            console.log(res)
        })
    },
    stopplay: function (e) {
        innerAudioContent.stop();
        clearInterval(inte)
        this.setData({
            idx: '',
            sku_id:''
        })
    },
    
    getgoodsrecommend: function () {
        let that = this
        app.wxrequest({
            url: "goods/goodsrecommend",
            data: {
                goods_id: that.data.goods_id
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
        let id = e.currentTarget.dataset.goodsid
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
    getGoodsAway: function () {
        if (this.data.identity != 4) return
        let t = this
        app.wxrequest({
            url: 'shopMmanage/getGoodsAway',
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
        this.getVoiceDetail()
        this.getgoodsrecommend()
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
        innerAudioContent.stop()
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
    onShareAppMessage: function () {
        let that = this
        return app.share({
            title: that.data.goods_data.goods_name,
            path: '/pages/voiceDetail/voiceDetail?goodid=' + that.data.goods_id,
            imageUrl: that.data.goods_data.share_image,
        })
    }
})