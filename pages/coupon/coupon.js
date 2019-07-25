// pages/coupon/coupon.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        head: 2,
        imgHost: '',
        type: 0,
        list: []
    },
    select: function (e) {
        let num = e.currentTarget.dataset.num
        console.log(num)
        this.setData({
            head: num,
            list: []
        }, function () {
            this.getCouponList()
        })
    },
    goUse: function (e) {
        let id = e.currentTarget.dataset.couponid;
        let type = e.currentTarget.dataset.type;
        if (type == 1){
            wx.navigateTo({
                url:"/pages/goods/detail?goodid="+id
            })
        } else if (type == 2){
            wx.navigateTo({
                url: "/pages/category/goods/goods?sub_id=" + id
            })
        }else {
            app.toast({title:"优惠券类型错误"})
        }
    },
    getCouponList: function () {
        let type = this.data.head;
        let that = this;
        if (!type) {
            app.toast({title: "类型错误"})
            return
        }
        app.wxrequest({
            url: "user/getusercouponlist",
            data: {
                is_use: type
            },
            success(res) {
                let coupon = that.disPrice(res.data)
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
            data[i].create_time = data[i].create_time.split(' ')[0].replace(/-/g,'/')
            data[i].end_time = data[i].end_time.split(' ')[0].replace(/-/g,'/')
        }
        return data
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            imgHost: app.globalData.host.imgHost
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
        this.getCouponList()
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