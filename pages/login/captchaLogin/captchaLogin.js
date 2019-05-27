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
        disabled: false,
        imgHost: '',
        share_id: "",
        a: ""
    },
    /**
     * 获取输入的值
     */
    inputwacth: function(e) {
        let item = e.currentTarget.dataset.model,
            mobile = e.detail.value
        mobile = mobile.replace(/[^\d]/g, '')
        this.setData({
            [item]: mobile
        })
    },
    /**
     * 获取短信验证码
     */
    getcode: function(e) {
        let phone = this.data.phone,
            that = this
        if (phone == '' || phone == null) {
            app.toast({ title: '请填写手机号码' })
            return
        }
        if (phone.length < 11) {
            app.toast({ title: '请填写11位手机号码' })
            return
        }
        app.wxrequest({
            url: "user/sendvercode",
            data: {
                mobile: phone,
                stype: 3
            },
            nocon: true,
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
        console.log(this.data.a)
        this.getCode()
        let share_id = this.data.share_id
        let that = this
        let encrypteddata = e.detail.encryptedData,
            iv = e.detail.iv,
            mobile = this.data.phone,
            vercode = this.data.code,
            code = this.data.logcode
        if (mobile == '') {
            app.toast({ title: '请填写手机号码' })
            return
        }
        if (mobile.length < 11) {
            app.toast({ title: '请填写11位手机号码' })
            return
        }
        if (vercode == '') {
            app.toast({ title: '请输入验证码' })
            return
        }
        that.getUserRead(encrypteddata, iv)
        app.wxrequest({
            url: "user/quicklogin",
            data: {
                mobile: mobile,
                encrypteddata: encrypteddata,
                iv: iv,
                vercode: vercode,
                code: code,
                buid: app.globalData.pid
            },
            noloading: true,
            nocon: true,
            success(res) {
                let pages = getCurrentPages();
                let prevpage = pages[pages.length - 3]
                let str = "pages/goods/detail"
                    //登录完成后将con_id存入本地缓存
                app.setconid(res.con_id)

                console.log(prevpage)
                    //从商品详情页跳来的
                if (prevpage.route == str) {
                    wx.navigateBack({
                        delta: pages.indexOf(prevpage)
                    })
                } else {
                    wx.reLaunch({
                        url: "/" + prevpage.route + "?share_id=" + share_id

                    })
                }
            },
            error(code) {
                switch (parseInt(code)) {
                    case 3000:
                        app.toast({ title: '微信授权失败' })
                        break;
                    case 3001:
                        app.toast({ title: '手机格式有误' })
                        break;
                    case 3004:
                    case 3006:
                        app.toast({ title: '验证码错误' })
                        break;
                    case 3009:
                        app.toast({ title: '该微信号已绑定手机号' })
                        break;
                    default:
                        app.toast({ title: '意料之外的错误' })
                        break;
                }
            }
        })
    },
    getUserRead: function(encrypteddata = "", iv = "") {
        let pid = app.globalData.pid
        wx.login({
            success(res) {
                if (res.code) {
                    app.wxrequest({
                        url: "user/getUserRead",
                        noloading: true,
                        data: {
                            code: res.code,
                            view_uid: pid,
                            encrypteddata: encrypteddata,
                            iv: iv
                        },
                        nocon: true,
                        success(res) {
                            console.log(res)
                        },
                        error(res) {
                            console.log(res)
                        }
                    })
                }
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
        this.setData({
            imgHost: app.globalData.host.imgHost
        })
        if (options.share_id) {
            this.setData({
                share_id: options.share_id
            })
        }
        if (options.a) {
            this.setData({
                a: options.a
            })
        }
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
        let that = this,
            share = app.share({
                title: "快捷登陆",
                path: '/pages/captchaLogin/captchaLogin'
            })
        return share
    }
})