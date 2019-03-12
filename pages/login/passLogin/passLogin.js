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
        imgHost: ''
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
    login: function() {
        let mobile = this.data.phone,
            password = this.data.pass
        app.wxrequest({
            url: "user/login",
            data: { mobile: mobile, password: password, buid: app.globalData.pid },
            nocon: true,
            success(res) {
                let pages = getCurrentPages();
                let prevpage = pages[pages.length - 3]
                let str = "pages/goods/detail";
                app.setconid(res.con_id)
                    //从商品详情页跳来的
                if (prevpage.route == str) {
                    wx.navigateBack({
                        delta: pages.indexOf(prevpage)
                    })
                } else {
                    wx.reLaunch({
                        url: "/" + prevpage.route
                    })
                }
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