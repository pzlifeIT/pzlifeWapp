// pages/login/captchaLogin/captchaLogin.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        phone: "",
        code: "",
        newpass: "",
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
                stype: 2
            },
            success(res) {
                that.timeOut()

            },
            error(res) {
                if (res == 3004) {
                    app.toast({ title: '短信发送失败' })
                } else if (res == 3001) {
                    app.toast({ title: '手机号码格式有误' })
                } else if (res == 3003) {
                    app.toast({ title: '一分钟内不能重复发送' })
                }
            },
            fail(res) {
                console.log(res)
            }
        })
    },
    rePassword: function() {
        let phone = this.data.phone,
            code = this.data.code,
            newpass = this.data.newpass
        app.wxrequest({
            url: "index/user/resetpassword",
            data: {
                mobile: phone,
                vercode: code,
                password: newpass
            },
            success(res) {
                app.toast({ title: '修改成功' })
                wx.navigateBack({
                    delta: 1
                })
            },
            error(res) {
                if (res == 3004) {
                    app.toast({ title: '短信发送失败' })
                } else if (res == 3001) {
                    app.toast({ title: '手机号码格式有误' })
                } else if (res == 3003) {
                    app.toast({ title: '更新失败' })
                } else if (res == 3002) {
                    app.toast({ title: '该手机未注册' })
                } else if (res == 3004) {
                    app.toast({ title: '验证码格式错误' })
                } else if (res == 3005) {
                    app.toast({ title: '密码强度不够' })
                } else if (res == 3006) {
                    app.toast({ title: '验证码错误' })
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
    getCode: function() {
        let that = this
        wx.login({
            success(res) {
                that.setData({
                    code: res.code
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