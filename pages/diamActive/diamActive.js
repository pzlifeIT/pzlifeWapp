// pages/diamActive/diamActive.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        imgHost: "",
        mask: true,
        ident: 0,
        stype: 0,
        pop: false,
        navHight:app.globalData.topHeadHeight
    },
    preventTouchMove: function() {

    },
    popNotice: function() {
        let pop = !this.data.pop
        this.setData({
            pop: pop
        })
    },
    change: function(e) {
        console.log(e)
        if (e.detail.value.length >= 1) {
            this.buy()
        } else {
            app.toast({
                title: "不点击同意将无法升级为钻石会员"
            })
        }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.setData({
            imgHost: app.globalData.host.imgHost
        })
        if (options.stype) {
            //等于1就是从个人中心进来的
            this.setData({
                stype: options.stype
            })
        }
    },
    editstatus: function() {
        let mask = !this.data.mask
        this.setData({
            mask: mask
        })
    },
    preventTouchMove: function() {

    },
    buy: function() {
        let pid = app.globalData.pid,
            that = this
        app.wxrequest({
            url: "order/createMemberOrder",
            data: {
                pay_type: 2,
                user_type: 1,
                parent_id: pid,
                actype: 2
            },
            success(res) {
                that.pay(res.order_data.order_no)
            },
            error(res) {
                app.toast({
                    title: "发起支付失败，错误码：" + res,

                })
            }
        })
    },
    pay: function(order_no) {
        let that = this
        app.wxpay({
            order_no: order_no,
            payment: '2',
            success(res) {
                that.setData({
                    ident: 2,
                    pop: false
                });
                app.modal({
                    title:"是否去个人中心",
                    context:"点击确定将跳转到个人中心",
                    success(res){
                        wx.switchTab({
                            url:"/pages/my/my"
                        })
                    }
                })

            },
            fail(res) {
                app.toast({
                    title: "支付失败"
                })
            }
        })
    },
    getUserInfo: function() {
        let that = this
        app.judgelogin({
            success(res) {
                that.setData({
                    ident: res.data.user_identity
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
        this.getUserInfo()

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
        let that = this,
            share = app.share({
                title: "邀请钻石会员",
                path: '/pages/diamActive/diamActive',
                imageUrl: "https://webimages.pzlive.vip/gz_02.png"
            })
        return share
    }
})