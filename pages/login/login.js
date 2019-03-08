// pages/login/login.js
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        imgHost: ''
    },
    bindGetUserInfo: function(e) {
		let encrypteddata = e.detail.encryptedData,
		    iv = e.detail.iv
        wx.login({
            success(res) {
                if (res.code) {
                    app.wxrequest({
                        url: "user/loginuserbywx",
                        data: { code: res.code, buid: app.globalData.pid,encrypteddata:encrypteddata,iv:iv},
                        nocon: true,
                        success(res) {
                            let pages = getCurrentPages();
                            let prevpage = pages[pages.length - 2]
                            app.setconid(res.con_id)
                            wx.navigateBack({
                                delta: prevpage
                            });

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
                                }, 1500);

                            } else if (res == 3003) {
                                app.toast({
                                    title: "登录失败,请稍后重试",
                                })
                            } else if (res == 3001) {
                                app.toast({
                                    title: "用户授权失败",
                                })
                            }
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