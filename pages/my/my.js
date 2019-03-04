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
        imgHost: ''
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

        } else {
            this.setData({
                loginStatus: false
            })
        }
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
                        userInfo.user_vid = "boss合伙人";
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
    checkOrder: function(e) {
        if (this.data.con_id) {
            wx.navigateTo({
                url: "/pages/order/order?status=" + e.currentTarget.dataset.status
            })
        } else {
            app.toast({ title: "请先登录" })
        }
    },
    activity: function(e) {
        if (this.data.con_id) {
            wx.navigateTo({
                url: "/pages/activity/activity?ident=" + this.data.userInfo.user_identity + "&uid=" + this.data.userInfo.uid
            })
        } else {
            app.toast({ title: "请先登录" })
        }
    },
    myQr: function() {
        if (this.data.con_id) {
            // wx.navigateTo({
            //     url: ""
            // })
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
        // window.location.href = 'tel:152'
        wx.makePhoneCall({
            phoneNumber: '15736884734'
        })
    },
    money: function() {
        if (this.data.con_id) {
            // let caseMoney = this.data.userInfo.balance
            // wx.navigateTo({
            //     url: "/pages/my/case/case?caseMoney=" + caseMoney
            // })
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
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        this.getStorage()
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