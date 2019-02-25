// pages/login/captchaLogin/captchaLogin.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        phone: "",
        code: "",
        logcode: "",
        time: 60,
        getcode: "获取验证码",
        disabled: false
    },
    /**
     * 获取输入的值
     */
    inputwacth: function(e) {
        let item = e.currentTarget.dataset.model
        this.setData({
            [item]: e.detail.value
        })
    },
    /**
     * 获取短信验证码
     */
    getcode: function(e) {
        console.log("huoqule")
        let phone = parseInt(this.data.phone),
            that = this
        app.wxrequest({
            url: "index/user/sendvercode",
            data: {
                mobile: phone,
                stype: 3
            },
            success(res) {
                that.timeOut()

            },
            error(res) {
                if (res == 3004) {
                    app.toast({
                        title: '短信发送失败'
                    })
                } else if (res == 3001) {
                    app.toast({
                        title: '手机号码格式有误'
                    })
                } else if (res == 3003) {
                    app.toast({
                        title: '一分钟内不能重复发送'
                    })
                }
            },
            fail(res) {
                console.log(res)
            }
        })
    },

    timeOut: function() {
        let num = this.data.time,
            that = this
        let i = setInterval(function() {
            num--
            if (num < 1) {
                that.setData({
                    getcode: "获取验证码",
                    disabled: false
                })
                clearInterval(i)
                return
            }
            that.setData({
                getcode: num + "秒后重发",
                disabled: true
            })
        }, 1000)
    },
    /**
     * 登录
     */
    bindGetUserInfo: function(e) {
        this.getCode()
        let that = this
        let encrypteddata = e.detail.encryptedData,
            iv = e.detail.iv,
            mobile = this.data.phone,
            vercode = this.data.code,
            code = this.data.logcode
        app.wxrequest({
            url: "index/user/quicklogin",
            data: {
                mobile: mobile,
                encrypteddata: encrypteddata,
                iv: iv,
                vercode: vercode,
                code: code,
				buid:app.globalData.pid
            },
            nocon: true,
            success(res) {
                console.log(res)
                    //登录完成后将con_id存入本地缓存
                wx.setStorage({
                    key: "con_id",
                    data: res.con_id
                })
                wx.reLaunch({
                    url: "/pages/index/index"
                })
                app.getconid()
            },
            error(res) {
                if (res == 3001) {
                    app.toast({
                        title: '手机格式有误'
                    })
                } else if (res == 3002) {
                    app.toast({
                        title: '登录失败'
                    })
                } else if (res == 3004) {
                    app.toast({
                        title: '验证码格式有误'
                    })
                } else if (res == 3006) {
                    app.toast({
                        title: '验证码错误'
                    })
                }
            },
            fail(res) {

            }
        })
    },
    getCode: function() {
        let that = this
        wx.login({
            success(res) {
                that.setData({
                    logcode: res.code
                })
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.getCode()
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