// pages/login/login.js
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },
    bindGetUserInfo: function(e) {
        wx.login({
            success(res) {
                if (res.code) {
                    app.wxrequest({
                        url: "index/user/loginuserbywx",
                        data: { code: res.code },
                        success(res) {
                            wx.setStorage({
                                key: "con_id",
                                data: res.con_id
                            });
                            wx.reLaunch({
                                url: "/pages/index/index"
                            });
                          app.getconid()
                        },
                        error(res) {
                            if (res.code == 3000 ||res.code == 3002) {
                                app.toast({
                                    title: "用户未绑定手机号,1.5秒后跳转去快捷登录",
                                });
								let timer = setTimeout(function(){
									wx.navigateTo({
										url:"/pages/login/captchaLogin/captchaLogin"
									})
								},1500);
								clearTimeout(timer)
                            } else if (res.code == 3003) {
                                app.toast({
                                    title: "登录失败,请稍后重试",
                                })
                            }
                        },
                        fail(res) {

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