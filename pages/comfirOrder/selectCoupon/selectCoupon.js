// pages/comfirOrder/selectCoupon/selectCoupon.js
const app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        list: []
    },
    radio: function (e) {
        let pages = getCurrentPages();
        let prevPage = pages[pages.length - 2];
        prevPage.setData({
            couponText: e.detail.value
        });
        wx.navigateBack({
            delta: -1
        })
    },
    getUseCoupon: function () {
        let that = this
        app.wxrequest({
            url: "user/getusercouponlist",
            data: {
                is_use: 2
            },
            success(res) {
                let coupon = that.disPrice(res.data);
                that.setData({
                    list: coupon
                })
            },
            error(code) {
                switch (parseInt(code)) {
                    case 3001:
                        app.toast({title: "参数有误"});
                        break;
                    case 3002:
                        app.toast({title: "用户不存在"});
                        break;
                    default:
                        app.toast({title: "错误码：" + code})
                        break;
                }
            }
        })
    },
    disPrice: function (data) {
        for (let i = 0; i < data.length; i++) {
            data[i].price = data[i].price * 100 / 100;
            data[i].create_time = data[i].create_time.split(' ')[0]
            data[i].end_time = data[i].end_time.split(' ')[0]
        }
        return data
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getUseCoupon()
    }

    ,

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    }
    ,

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    }
    ,

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    }
    ,

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    }
    ,

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    }
    ,

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    }
    ,

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})