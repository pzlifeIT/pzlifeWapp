// pages/my/my.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        loginStatus: false,
        userInfo: {},
        con_id: "",
        imgHost: '',
        orderCount: {},
        boss: {},
        yan: true,
        yan_all: true,
        progress: '',
        couponNum: 0,
        yan1: true,
        yan1_all: true,
        no_price: 0,
        can_price: 0
    },
    getTaskProgress: function () {
        let that = this
        app.wxrequest({
            url: "rights/userTaskProgress",
            success(res) {
                that.setData({
                    progress: res.taskprogress
                })
            }
        })
    },
    yanAll: function () {
        let yanAll = !this.data.yan_all
        this.setData({
            yan_all: yanAll
        })
    },
    yan1All: function () {
        let yanAll = !this.data.yan1_all
        this.setData({
            yan1_all: yanAll
        })
    },
    yan: function () {
        let yan = !this.data.yan
        this.setData({
            yan: yan
        })
    },
    yan1: function () {
        let yan = !this.data.yan1
        this.setData({
            yan1: yan
        })
    },
    notice: function (e) {
        let user_identity = e.currentTarget.dataset.identity
        if (user_identity == 1) {
            return
        }
        wx.navigateTo({
            url: "/pages/my/notice/notice?iden=" + user_identity
        })
    },
    noUpgrade: function () {
        app.toast({
            title: "只能查看与您身份对应的须知"
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        //获取con_id
        this.setData({
            imgHost: app.globalData.host.imgHost
        })
    },
    /**
     * 判断是否存在con_id
     */
    checkLogin: function (con_id) {
        //存在就登陆不存在就无登录
        if (con_id) {
            this.getUser()

        }
        // else {
        //     this.setData({
        //         loginStatus: false
        //     })
        // }
    },
    getUserOrderCount: function () {
        let that = this
        app.wxrequest({
            url: "user/getUserOrderCount",
            method: "GET",
            success(res) {
                console.log(res)
                that.setData({
                    orderCount: res
                })
            }
        })
    },
    goOpenShop: function () {
        wx.navigateTo({
            url: "/pages/openShop/openShop"
        })
    },
    getBoss: function () {
        let that = this
        app.wxrequest({
            url: "user/getbossshop",
            success(res) {
                that.setData({
                    boss: res.data
                })
            }
        })
    },
    goMyVoice: function () {
        if (this.data.con_id) {
            wx.navigateTo({
                url: "/pages/myVoice/myVoice"
            })
        } else {
            app.toast({title: "请先登录"})
        }
    },
    getUser: function () {
        let that = this
        app.wxrequest({
            url: "user/getuser",
            success(res) {
                let userInfo = res.data
                switch (parseInt(userInfo.user_identity)) {
                    case 1:
                        userInfo.user_vid = "普通会员"
                        break;
                    case 2:
                        userInfo.user_vid = "钻石会员";
                        break;
                    case 3:
                        userInfo.user_vid = "创业店主";
                        break;
                    case 4:
                        userInfo.user_vid = "合伙人";
                        break;
                    default:
                        userInfo.user_vid = "普通会员"
                }
                switch (parseInt(userInfo.user_market)) {
                    case 1:
                        userInfo.user_mid = "兼职市场经理（体验）";
                        break;
                    case 2:
                        userInfo.user_mid = "永久兼职市场经理";
                        break;
                    case 3:
                        userInfo.user_mid = "兼职市场总监（体验）";
                        break;
                    case 4:
                        userInfo.user_mid = "兼职市场总监";
                        break;
                }
                that.setData({
                    userInfo: userInfo,
                    loginStatus: true
                })
            },
            fail(err) {
                console.log(err)
                that.setData({
                    loginStatus: false
                })
            },
            error(code) {
                console.log(code)
                that.setData({
                    loginStatus: false
                })
            }
        })
    },
    getQrcode: function () {
        app.wxrequest({
            url: "user/getUserQrcode",
            method: "GET",
            data: {link: "/pages/index/index"},
            nocon: false,
            success(res) {
                console.log(res)
            },
            error(res) {
                console.log(res)
            },
            fail(res) {

            }
        })
    },
    upgrade: function (e) {
        let iden = e.currentTarget.dataset.iden;
        let type = e.currentTarget.dataset.type;
        wx.navigateTo({
            url: "/pages/notice/notice?iden=" + iden + "&type=" + type
        })
    },
    checkOrder: function (e) {
        if (this.data.con_id) {
            wx.navigateTo({
                url: "/pages/order/order?status=" + e.currentTarget.dataset.status
            })
        } else {
            app.toast({title: "请先登录"})
        }
    },
    gotocommiss: function (e) {
        let etype = e.currentTarget.dataset.etype;
        let hidden = e.currentTarget.dataset.hidden;
        if (etype == 2 && this.data.userInfo.user_market < 2) {
            app.toast({title: "请先升级为永久兼职市场经理"})
            return
        }
        wx.navigateTo({
            url: "/pages/commission/commission?etype=" + etype + '&hidden=' + hidden
        })
    },

    myQr: function () {
        if (this.data.con_id) {
            wx.navigateTo({
                url: "/pages/my/myQr/myQr"
            })
        } else {
            app.toast({title: "请先登录"})
        }
    },
    bindPhone: function () {
        if (this.data.con_id) {

            // wx.navigateTo({
            //     url: ""
            // })
        } else {
            app.toast({title: "请先登录"})
        }
    },
    toaddress: function () {
        console.log(this.data.con_id)
        if (this.data.con_id) {
            wx.navigateTo({
                url: "/pages/address/address"
            })
        } else {
            app.toast({title: "请先登录"})
        }
    },
    tonewpassword: function () {
        if (this.data.con_id) {
            wx.navigateTo({
                url: "newpassword/newpassword"
            })
        } else {
            app.toast({title: "请先登录"})
        }
    },
    coupon: function () {
        if (this.data.con_id) {
            // wx.navigateTo({
            //     url: "/pages/coupon/coupon"
            // })
        } else {
            app.toast({
                title: '请先登录'
            })
        }
    },
    call: function () {
        wx.makePhoneCall({
            phoneNumber: '15502123212'
        })
    },
    money: function () {
        if (this.data.con_id) {
            let caseMoney = this.data.userInfo.balance
            wx.navigateTo({
                url: "/pages/my/case/case"
            })
        } else {
            app.toast({
                title: '请先登录'
            })
        }
    },
    inte: function () {
        if (this.data.con_id) {
            // let integral = this.data.userInfo.integral
            // wx.navigateTo({
            //     url: "/pages/my/integ/integ?integ=" + integral
            // })
        } else {
            app.toast({
                title: '请先登录'
            })
        }
    },
    /**
     * 获取con_id
     */
    getStorage: function () {
        let that = this
        wx.getStorage({
            key: "con_id",
            success(res) {
                that.checkLogin(res.data)
                that.setData({
                    con_id: res.data
                })
            },
            error() {
                console.log('000')
            }
        });
    },
    gosxy: function () {
        wx.navigateTo({
            url: "/pages/my/inviteQr/inviteQr"
        })
    },

    gocommiss: function (e) {
        let status = e.currentTarget.dataset.hidden
        if (this.data.con_id) {
            wx.navigateTo({
                url: "/pages/my/commission/commission?hidden=" + status
            })
        } else {
            app.toast({
                title: "请先登录"
            })
        }

    },
    join: function () {
        wx.navigateTo({
            url: "/pages/my/join/join"
        })
    },
    addCard: function () {
        if (this.data.con_id) {
            wx.navigateTo({
                url: "/pages/boss/cardBag/cardBag"
            })
        } else {
            app.toast({
                title: "请先登录"
            })
        }
    },
    activeEarn: function () {
        if (this.data.con_id) {
            wx.navigateTo({
                url: "/pages/my/activeEarn/activeEarn"
            })
        } else {
            app.toast({
                title: "请先登录"
            })
        }
    },
    toShangpiao: function () {
        if (this.data.con_id) {
            wx.navigateTo({
                url: "/pages/diamActive/shiftMoney/shiftMoney"
            })
        } else {
            app.toast({
                title: "请先登录"
            })
        }
    },
    bountyWithdraw: function () {
        if (this.data.con_id) {
            wx.navigateTo({
                url: "/pages/boss/withdraw/withdraw"
            })
        } else {
            app.toast({
                title: "请先登录"
            })
        }
    },
    instr: function () {
        if (this.data.con_id) {
            wx.navigateTo({
                url: "/pages/my/instructions/instructions"
            })
        } else {
            app.toast({
                title: "请先登录"
            })
        }
    },
    goearn: function (e) {
        let earn = e.currentTarget.dataset.earn,
            enter = e.currentTarget.dataset.enter,
            entered = e.currentTarget.dataset.entered,
            all = e.currentTarget.dataset.all
        if (this.data.con_id) {
            wx.navigateTo({
                // url: "/pages/boss/earnings/earnings?earn=" + earn + "&all=" + all + "&enter=" + enter + "&entered=" + entered
                url: "/pages/my/earnings/earnings"
            })
        } else {
            app.toast({
                title: "请先登录"
            })
        }
    },
    gototalcommiss: function (e) {
        let hidden = e.currentTarget.dataset.hidden,
            ent = e.currentTarget.dataset.ent
        if (this.data.con_id) {
            wx.navigateTo({
                url: "/pages/boss/commission/commission?hidden=" + hidden + "&ent=" + ent
            })
        } else {
            app.toast({
                title: "请先登录"
            })
        }
    },
    goInte: function (e) {
        let int = e.currentTarget.dataset.int
        if (this.data.con_id) {
            wx.navigateTo({
                url: "/pages/my/integ/integ?int=" + int
            })
        } else {
            app.toast({
                title: "请先登录"
            })
        }
    },
    diamBoss: function (e) {
        let stype = e.currentTarget.dataset.stype
        if (this.data.con_id) {
            wx.navigateTo({
                url: "/pages/diamActive/diamActive?stype=" + stype
            })
        } else {
            app.toast({
                title: "请先登录"
            })
        }
    },
    goCircle: function () {
        wx.navigateTo({
            url: "/pages/circle/circle"
        })
    },
    buyDiam: function () {
        console.log(123)
        wx.switchTab({
            url: "/pages/my/getVip/getVip"
        })
    },
    goCoupon: function () {
        if (this.data.con_id) {
            wx.navigateTo({
                url: "/pages/coupon/coupon"
            })
        } else {
            app.toast({
                title: "请先登录"
            })
        }
    },
    getCountUserCoupon: function () {
        let that = this
        app.wxrequest({
            url: "user/getusercouponlist",
            data: {
                is_useL: 2
            },
            success(res) {
                let num = that.disCoupon(res.data)
                that.setData({
                    couponNum: num
                })
            }
        })
    },
    disCoupon: function (data) {
        let arr = [];
        for (let i = 0; i < data.length; i++) {
            if (data[i].is_use == 2) {
                arr.push(data[i])
            }
        }
        return (arr.length)
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
        let that = this
        app.judgelogin({
            success() {
                if (app.globalData.updateNum) {
                    app.setCartNum()
                }
                that.getStorage()
                that.getUserOrderCount()
                that.getBoss()
                that.getTaskProgress()
                that.getCountUserCoupon()
                that.getMoney()
            }
        })

    },
    getMoney: function () {
        let that = this
        app.wxrequest({
            url: "user/getUserBusinessMoneyTotal",
            success(res) {
                that.setData({
                    no_price: res.no_price,
                    can_price: res.can_price
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
        wx.showNavigationBarLoading() //在标题栏中显示加载
        //模拟加载
        let that = this
        setTimeout(function () {
            that.getStorage()
            that.getUserOrderCount()
            that.getBoss()
            that.getTaskProgress()
            that.getCountUserCoupon()
            that.getMoney()
            wx.hideNavigationBarLoading() //完成停止加载
            wx.stopPullDownRefresh({}) //停止下拉刷新
        }, 1500);
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
        return app.share()
    }
})