// pages/login/login.js
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        imgHost: '',
        share_id: "",
        a: ""
    },
    bindGetUserInfo: function(e) {
        let encrypteddata = e.detail.encryptedData ? e.detail.encryptedData : "",
            iv = e.detail.iv ? e.detail.iv : '',
            that = this,
            route = app.globalData.routePage;
        that.getUserRead(encrypteddata, iv);
        wx.login({
            success(res) {
                if (res.code) {

                    app.wxrequest({
                        url: "user/loginuserbywx",
                        data: { code: res.code, buid: app.globalData.pid, encrypteddata: encrypteddata, iv: iv },
                        nocon: true,
                        success(res) {
                            app.setconid(res.con_id)
                            let index = app.getIndex(route)
                            console.log(index)
                            wx.navigateBack({
                                delta: index
                            })
                        },
                        error(res) {
                            if (res == 3000 || res == 3002) {
                                app.toast({
                                    title: "用户未绑定手机号,1.5秒后跳转去快捷登录",
                                });
                                let timer = setTimeout(function() {
                                    wx.navigateTo({
                                        url: "/pages/login/captchaLogin/captchaLogin"
                                    })
                                    clearTimeout(timer)
                                }, 2000);
                            } else if (res == 3003) {
                                app.toast({
                                    title: "登录失败,请稍后重试",
                                })
                            } else if (res == 3001) {
                                app.toast({
                                    title: "用户授权失败",
                                })
                            } else {
                                app.toast({
                                    title: "登录失败，错误码：" + res
                                })
                            }
                        }
                    })
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
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.setData({
            imgHost: app.globalData.host.imgHost
        })
        if (options.share_id) {
            this.setData({
                share_id: options.share_id
            })
        }
        if (options.a) {
            console.log(options.a)
            this.setData({
                a: options.a
            })
        }
        app.getWxRoute()
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
        return app.share()
    }
})