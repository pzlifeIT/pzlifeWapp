// pages/login/passLogin/passLogin.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        phone: "",
        pass: "",
        goodid: 0,
        share_id: "",
        imgHost: ''
    },
    /**
     * 获取输入的值
     */
    inputwacth: function (e) {
        let item = e.currentTarget.dataset.model
        this.setData({
            [item]: e.detail.value
        })
    },
    bindGetUserInfo: function (e) {
        let mobile = this.data.phone,
            password = this.data.pass,
            share_id = this.data.share_id,
            that = this,
            route = app.globalData.routePage
        let encrypteddata = e.detail.encryptedData,
            iv = e.detail.iv
        if (mobile == '') {
            app.toast({title: '请填写手机号码'})
            return
        }
        if (mobile.length < 11) {
            app.toast({title: '请填写11位手机号码'})
            return
        }
        if (password == '') {
            app.toast({title: '请输入密码'})
            return
        }
        that.getUserRead(encrypteddata, iv)
        wx.login({
            success(res) {
                if (res.code) {
                    app.wxrequest({
                        url: "user/login",
                        data: {
                            mobile: mobile,
                            password: password,
                            buid: app.globalData.pid
                        },
                        nocon: true,
                        success(res) {
                            app.setconid(res.con_id)
                            let index = app.getIndex(route)
                            wx.navigateBack({
                                delta: index
                            })
                        },
                        fail(res) {

                        },
                        error(res) {
                            if (res == 3002) {
                                app.toast({
                                    title: '账号不存在'
                                });
                            } else if (res == 3001) {
                                app.toast({
                                    title: '手机号码格式有误'
                                })
                            } else if (res == 3003) {
                                app.toast({
                                    title: '密码错误'
                                });
                            } else if (res == 3004) {
                                app.toast({
                                    title: '登录失败'
                                })
                            } else if (res == 3005) {
                                app.toast({
                                    title: '密码错误'
                                })
                            }else {
                                app.toast({title: '登录失败,错误码：' + res})
                            }
                        }
                    })
                } else {
                    app.toast({
                        title:"未获取到code码"
                    })
                }
            },
            fail(res){
                app.toast({
                    title:"接口调用失败"
                })
            }
        })

    },
    getUserRead: function (encrypteddata = "", iv = "") {
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
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            imgHost: app.globalData.host.imgHost
        })
        if (options.share_id) {
            this.setData({
                share_id: options.share_id
            })
        }
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

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

        return app.share()
    }
})