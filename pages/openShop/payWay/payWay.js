// pages/openShop/payWay/payWay.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        imgHost: "",
        ptype: 0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            imgHost: app.globalData.host.imgHost,
            ptype: options.ptype
        })
        if (options.ptype == 1){
            wx.setNavigationBarTitle({
                title:"支付宝付款"
            })
        } else if (options.ptype == 2){
            wx.setNavigationBarTitle({
                title:"微信付款"
            })
        } else if (options.ptype == 3){
            wx.setNavigationBarTitle({
                title:"银行转账"
            })
        }
    },
    save: function (e) {
        let img = e.currentTarget.dataset.img;
        wx.previewImage({
            current: img,
            urls: [img]
        })
    },
    // save: function (e) {
    //     console.log(e)
    //     let img = e.currentTarget.dataset.img;
    //     wx.authorize({
    //         scope: "scope.writePhotosAlbum",
    //         success(res) {
    //             console.log(res)
    //             wx.downloadFile({
    //                 url: img,
    //                 success(res) {
    //                     wx.saveImageToPhotosAlbum({
    //                         filePath:res.tempFilePath,
    //                         success(res){
    //                             app.toast({
    //                                 title:"保存成功，请进入相册查看"
    //                             })
    //                         }
    //                     })
    //                 }
    //             })
    //         },
    //         fail(res) {
    //             app.modal({
    //                 content: "您未授权保存到相册，请点击确定打开权限",
    //                 success(res) {
    //                     wx.openSetting({
    //                        success(res){
    //                            app.toast({
    //                                title: "请再次长按图片保存"
    //                            })
    //                        }
    //                     })
    //                 }
    //             })
    //
    //         }
    //     })
    // },
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

    }
})