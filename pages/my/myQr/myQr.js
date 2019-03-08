// pages/my/myQr/myQr.js
const app = getApp()
// let qrcode = require(../../utils/qrcode.js)
Page({

    /**
     * 页面的初始数据
     */
    data: {
        qrcode: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.getUserQrcode()
        this.setData({
            qrcode: app.globalData.host.apiHost + 'user/getUserQrcode?con_id=' + app.globalData.con_id + '&link=/pages/index/index'
        })
        console.log(app.globalData.host.apiHost + 'user/getUserQrcode?con_id=' + app.globalData.con_id + '&link=/pages/index/index')
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },
    getUserQrcode: function() {
        let that = this
        app.wxrequest({
            url: 'user/getUserQrcode',
            data: {
                link: '/pages/index/index'
            },
			method:"GET",
            success(res) {
                console.log(res)
            }
        })
    },
	save: function () {
        console.log('save')
        wx.showActionSheet({
            itemList: ['保存图片'],
            success: function (res) {
                console.log(res.tapIndex)
                if (res.tapIndex == 0) {
                    qrcode.exportImage(function (path) {
                        wx.saveImageToPhotosAlbum({
                            filePath: path,
                        })
                    })
                }
            }
        })
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