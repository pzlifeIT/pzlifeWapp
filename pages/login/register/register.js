// pages/login/register/register.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        phone: '',
        code: '',
        pass: "",
        checkpass: "",
        getcode: "获取验证码",
        time: 59,
        disabled: false,
        logcode: ""
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

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
    getCaptcha: function(e) {
        let phone = this.data.phone,
            that = this
        if (phone == '') {
            app.toast({ title: '请填写手机号码' })
            return
        }
        if (phone.length > 11 || phone.length < 11) {
            app.toast({ title: '请填写11位手机号码' })
            return
        }
        app.wxrequest({
            url: "index/user/sendvercode",
            data: {
                mobile: phone,
                stype: 1
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
            },
            fail(res) {}
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
     * 注册
     */
    bindGetUserInfo: function(e) {
        this.getCode()
        let encrypteddata = e.detail.encryptedData,
            iv = e.detail.iv,
            mobile = this.data.phone,
            vercode = this.data.code,
            password = this.data.pass,
            checkpass = this.data.checkpass,
            code = this.data.logcode
        if (code == '') {
            app.toast({ title: '微信授权失败' })
            return
        }
        if (mobile == '') {
            app.toast({ title: '请填写手机号码' })
            return
        }
        if (mobile.length > 11 || mobile.length < 11) {
            app.toast({ title: '请填写11位手机号码' })
            return
        }
        if (password == '') {
            app.toast({ title: '请输入密码' })
            return
        }
        if (checkpass == '') {
            app.toast({ title: '请输入确认密码' })
            return
        }
        if (password != checkpass) {
            app.toast({
                title: '两次密码不一致'
            })
        }
        app.wxrequest({
            url: "index/user/register",
            data: {
                mobile: mobile,
                encrypteddata: encrypteddata,
                iv: iv,
                vercode: vercode,
                password: password,
                code: code,
                buid: app.globalData.pid
            },
            nocon: true,
            success(res) {
                app.toast({
                    title: '注册成功'
                })
                app.setconid(res.con_id)
            },
            error(res) {
                if (res == 3001) {
                    app.toast({ title: '手机格式有误' })
                } else if (res == 3002) {
                    app.toast({ title: '用户未授权,无法注册' })
                } else if (res == 3004) {
                    app.toast({ title: '验证码格式有误' })
                } else if (res == 3005) {
                    app.toast({ title: '密码强度不够' })
                } else if (res == 3006) {
                    app.toast({ title: '验证码错误' })
                } else if (res == 3007) {
                    app.toast({ title: '注册失败' })
                } else if (res == 3008) {
                    app.toast({ title: '手机号已被注册' })
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