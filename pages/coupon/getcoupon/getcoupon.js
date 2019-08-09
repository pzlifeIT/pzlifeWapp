// pages/coupon/getcoupon/getcoupon.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        head: "1",
        coupon: [],
        imgHost: '',
        scene: {},
        page: 1,
        page_num: 10,
        reach: false,
        navHight:app.globalData.topHeadHeight
    },
    goUse: function (e) {
        let type = e.currentTarget.dataset.urltype;
        let typeId = e.currentTarget.dataset.typeid;
        let goods_type = e.currentTarget.dataset.goodstype;
        if (type == 1 && goods_type == 2){
            wx.navigateTo({
                url:"/pages/voiceDetail/voiceDetail?goodid="+typeId
            });
            return
        }else {
            if (type == 1 ) {
                wx.navigateTo({
                    url: "/pages/goods/detail?goodid=" + typeId
                })
            } else if (type == 2) {
                wx.navigateTo({
                    url: "/pages/category/goods/goods?sub_id=" + typeId
                })
            }else {
                app.toast({title:"优惠券类型错误"})
            }
        }

    },
    /**
     * 领取优惠券
     */
    getCoupon: function (e) {
        let coupon_id = e.currentTarget.dataset.couponid;
        let that = this
        app.wxrequest({
            url: "user/addusercoupon",
            data: {
                coupon_id: coupon_id
            },
            success(res) {
                app.toast({title: "领取成功！"});
                that.setData({
                    page: 1,
                    coupon: [],
                    reach: false
                }, function () {
                    that.getActiveCoupon()
                })
            },
            error(res) {
                switch (parseInt(res)) {
                    case 3001:
                        app.toast({title: "优惠券id错误"})
                        break;
                    case 3002:
                        app.toast({title: "用户不存在"});
                        break;
                    case 3003:
                        app.toast({title: "优惠券不存在"});
                        break;
                    case 3004:
                        app.toast({title: "已经领取过"})
                        break;
                    case 3005:
                        app.toast({title: "领取失败"});
                        break;
                    default:
                        app.toast({title: "错误码：" + res})
                        break;
                }
            }
        })
    },
    /**
     * 获取优惠券活动列表
     */
    getActiveCoupon: function () {
        let that = this
        app.wxrequest({
            url: "user/gethdcoupon",
            data: {
                coupon_hd_id: that.data.scene.id || 0,
                page: that.data.page || 1,
                page_num: that.data.page_num || 10
            },
            success(res) {
                if (res.data.coupons) {
                    if (res.data.coupons.length < 10) {
                        that.setData({
                            reach: true
                        })
                    }
                    if (res.data.coupons.length > 0) {
                        let coupon = that.data.coupon;
                        that.disPrice(res.data.coupons)
                        coupon.push(res.data.coupons)
                        console.log(coupon)
                        that.setData({
                            coupon: coupon,
                            page: that.data.page + 1
                        })
                    }
                }
            },
            error(res) {
                switch (parseInt(res)) {
                    case 3001:
                        app.toast({title: "活动id错误"});
                        break;
                    case 3002:
                        app.toast({title: "页码错误"});
                        break;
                    case 3003:
                        app.toast({title: "每页数量错误"});
                        break;
                    default:
                        app.toast({title: "错误码：" + res});
                        break;
                }
            }
        })
    },
    disPrice: function (data) {
        for (let i = 0; i < data.length; i++) {
            data[i].price = data[i].price * 100 / 100
        }
        return data
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            imgHost: app.globalData.host.imgHost,
            scene: app.disScene(options.scene)
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
            page:1,
            coupon:[],
            reach:false
        },function () {
            this.getActiveCoupon()
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
    onReachBottom: function () {
        if (this.data.reach) return;
        this.getActiveCoupon()
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
        return app.share()
    }
})