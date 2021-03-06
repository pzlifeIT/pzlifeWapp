// pages/openShop/openShop.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        imgHost: "",
        qrcode: ""
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            imgHost: app.globalData.host.imgHost
        })
        this.getUserQrcode()
    },
    getUserQrcode: function () {
        let that = this,
            pid = app.globalData.userInfo.uid
        app.wxrequest({
            url: 'user/getUserQrcode',
            data: {
                page: 'pages/openShop/notice/notice',
                scene: pid,
                stype: 2
            },
            nocon: false,
            method: "GET",
            success(res) {
                console.log(res)
                that.setData({
                    qrcode: res.Qrcode
                })
            },
            error(res) {
                console.log(res)
            }
        })
    },
    save: function (e) {
        console.log(e)
        let img = e.currentTarget.dataset.img;
        wx.authorize({
            scope: "scope.writePhotosAlbum",
            success(res) {
                console.log(res)
                wx.downloadFile({
                    url: img,
                    success(res) {
                        wx.saveImageToPhotosAlbum({
                            filePath: res.tempFilePath,
                            success(res) {
                                app.toast({
                                    title: "保存成功，请进入相册查看"
                                })
                            }
                        })
                    }
                })
            },
            fail(res) {
                app.modal({
                    content: "您未授权保存到相册，请点击确定打开权限",
                    success(res) {
                        wx.openSetting({
                            success(res) {
                                app.toast({
                                    title: "请再次长按图片保存"
                                })
                            }
                        })
                    }
                })

            }
        })
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
        return app.share({
            title:"邀请开店",
            path:"/pages/openShop/notice/notice"
        })
    }
})