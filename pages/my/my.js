// pages/my/my.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        loginStatus: false,
        userInfo: {},
        con_id: ""
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        //获取con_id
        this.getStorage()
    },
    /**
     * 判断是否存在con_id
     */
    checkLogin: function(con_id) {
        //存在就登陆不存在就无登录
        if (con_id) {
            this.getUser(con_id)
            this.setData({
                loginStatus: true
            })
        } else {
            this.setData({
                loginStatus: false
            })
            return
        }
    },
    getUser: function(con_id) {
        let that = this
        app.wxrequest({
            url: "index/user/getuser",
            data: { con_id: con_id },
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
                    userInfo: userInfo
                })
            },
            fail(err) {
                console.log(err)
            },
            error(code) {
                console.log(code)
            }
        })
    },
	checkOrder:function(){
		if (this.data.con_id) {
		    wx.navigateTo({
		        url: "pages/order/order?con_id=" + con_id
		    })
		} else {
		    wx.showToast({
		        title: "请先登录",
		        icon: "none",
		        duration: 1500
		    })
		}
	},
	myQr:function(){
		if (this.data.con_id) {
		    wx.navigateTo({
		        url: "pages/coupon/coupon?con_id=" + con_id
		    })
		} else {
		    wx.showToast({
		        title: "请先登录",
		        icon: "none",
		        duration: 1500
		    })
		}
	},
	bindPhone:function(){
		if (this.data.con_id) {
		    wx.navigateTo({
		        url: ""
		    })
		} else {
		    wx.showToast({
		        title: "请先登录",
		        icon: "none",
		        duration: 1500
		    })
		}
	},
	toaddress:function(){
		if (this.data.con_id) {
		    wx.navigateTo({
		        url: "/pages/address/address"
		    })
		} else {
		    wx.showToast({
		        title: "请先登录",
		        icon: "none",
		        duration: 1500
		    })
		}
	},
	tonewpassword:function(){
		if (this.data.con_id) {
		    wx.navigateTo({
		        url: ""
		    })
		} else {
		    wx.showToast({
		        title: "请先登录",
		        icon: "none",
		        duration: 1500
		    })
		}
	},
    coupon: function() {
        if (this.data.con_id) {
            wx.navigateTo({
                url: "pages/coupon/coupon?con_id=" + con_id
            })
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
    pay: function(data) {
        app.wxrequest({
            url: 'pay/pay/pay',
            data: {
                // order_no: data.order_no,
                // payment: data.payment,
                // platform: data.platform
                order_no: 'odr19021817062852575049',
                payment: '1',
                platform: '1'
            },
            nocon: true,
            success: function(res) {
                let parameters = res.parameters
                wx.requestPayment({
                    timeStamp: parameters.timeStamp,
                    nonceStr: parameters.nonceStr,
                    package: parameters.package,
                    signType: parameters.signType,
                    paySign: parameters.paySign,
                    success(res) {
                        console.log(res)
                    },
                    fail(res) {}
                })
            }
        })
    },
    money: function() {
        if (this.data.con_id) {
            wx.navigateTo({
                url: "pages/my/case/case?con_id=" + con_id
            })
        } else {
            app.toast({
                title: '请先登录'
            })
        }
    },
    inte: function() {
        if (this.data.con_id) {
            wx.navigateTo({
                url: "pages/my/integ/integ?con_id=" + con_id
            })
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
                console.log(res)
                that.setData({
                    con_id: res.data
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