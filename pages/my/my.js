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
        boss: {}
    },
    notice:function(e){
        let user_identity = e.currentTarget.dataset.identity
        if (user_identity == 1){
            return
        }
      wx.navigateTo({
          url:"/pages/my/notice/notice?iden="+user_identity
      })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        //获取con_id
        this.setData({
            imgHost: app.globalData.host.imgHost
        })
    },
    /**
     * 判断是否存在con_id
     */
    checkLogin: function(con_id) {
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
    getUserOrderCount: function() {
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
    getBoss: function() {
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
    getUser: function() {
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
    getQrcode: function() {
        app.wxrequest({
            url: "user/getUserQrcode",
            method: "GET",
            data: { link: "/pages/index/index" },
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
    checkOrder: function(e) {
        if (this.data.con_id) {
            wx.navigateTo({
                url: "/pages/order/order?status=" + e.currentTarget.dataset.status
            })
        } else {
            app.toast({ title: "请先登录" })
        }
    },
    diamondlist: function(e) {
        if (this.data.con_id) {
            wx.navigateTo({
                url: "/pages/diamondlist/diamondlist"
            })
        } else {
            app.toast({ title: "请先登录" })
        }
    },
    activity: function(e) {
        if (this.data.con_id) {
            wx.navigateTo({
                url: "/pages/activity/activity"
            })
        } else {
            app.toast({ title: "请先登录" })
        }
    },
    myQr: function() {
        if (this.data.con_id) {
            wx.navigateTo({
                url: "/pages/my/myQr/myQr"
            })
        } else {
            app.toast({ title: "请先登录" })
        }
    },
    bindPhone: function() {
        if (this.data.con_id) {

            // wx.navigateTo({
            //     url: ""
            // })
        } else {
            app.toast({ title: "请先登录" })
        }
    },
    toaddress: function() {
        console.log(this.data.con_id)
        if (this.data.con_id) {
            wx.navigateTo({
                url: "/pages/address/address"
            })
        } else {
            app.toast({ title: "请先登录" })
        }
    },
    tonewpassword: function() {
        if (this.data.con_id) {
            wx.navigateTo({
                url: "newpassword/newpassword"
            })
        } else {
            app.toast({ title: "请先登录" })
        }
    },
    coupon: function() {
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
    call: function() {
        wx.makePhoneCall({
            phoneNumber: '15502123212'
        })
    },
    money: function() {
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
    inte: function() {
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
    getStorage: function() {
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
    gosxy: function() {
        app.toast({
            title: "敬请期待"
        })
    },

    gocommiss: function() {
        wx.navigateTo({
            url: "/pages/my/commission/commission"
        })
    },
    join: function() {
        wx.navigateTo({
            url: "/pages/my/join/join"
        })
    },
    goearn: function(e) {
        let earn = e.currentTarget.dataset.earn,
            enter = e.currentTarget.dataset.enter,
            entered = e.currentTarget.dataset.entered,
            all = e.currentTarget.dataset.all
        wx.navigateTo({
            // url: "/pages/boss/earnings/earnings?earn=" + earn + "&all=" + all + "&enter=" + enter + "&entered=" + entered
             url:"/pages/my/earnings/earnings"
        })
    },
    gototalcommiss:function(){
      wx.navigateTo({
          url: "/pages/boss/commission/commission"
      })
    },
    goInte: function(e) {
        let int = e.currentTarget.dataset.int
        wx.navigateTo({
            url: "/pages/my/integ/integ?int="+int
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
        let that = this
        app.judgelogin({
            success() {
                if (app.globalData.updateNum) {
                    app.setCartNum()
                }
                that.getStorage()
                that.getUserOrderCount()
                that.getBoss()
            }
        })
    },
    getUserInfoFun(e) {
        wx.getUserInfo({
            success: function(res) {
                console.log("userInfo:" + res)　　　　　　　 //do anything
            },
            fail() {
                console.log(121)
            }
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
        wx.showNavigationBarLoading() //在标题栏中显示加载
            //模拟加载
        let that = this
        setTimeout(function() {
            that.getStorage()
            wx.hideNavigationBarLoading() //完成停止加载
            wx.stopPullDownRefresh({}) //停止下拉刷新
        }, 1500);
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
        let sharejson = app.share({
            title: '个人中心',
            path: '/pages/my/my'
        })
        return sharejson
    }
})