// pages/boss/circle/circle.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tab: 1,
        sum: {},
        page: 1,
        page_num: 10,
        reach: true,
        socialList: [],
        div: 1,
        peopleNum: 0,
        diamon_user_count: 0,
        social_count_all: 0,
        onlyRead: [],
        circle: [],
        total: 0,
        userInfo: {}
    },
    select: function (e) {
        let tab = e.currentTarget.dataset.tab
        this.setData({
            tab: tab,
            page: 1,
            socialList: [],
            onlyRead: [],
            reach: true,
            circle: [],
            total: 0
        })
        console.log(this.data.page)
        this.getCircle(tab)
    },
    getCircle: function (tab) {
        let that = this
        app.wxrequest({
            url: "rights/getUserBusinessCircle",
            data: {
                type: tab,
                page: that.data.page || 1,
                page_num: that.data.page_num || 10
            },
            success: function (res) {
                if (res.business.length < 10) {
                    that.setData({
                        reach: false
                    })
                }
                if (res.business.length > 0) {
                    let circle = that.data.circle;
                    circle.push(res.business)
                    that.setData({
                        circle: circle,
                        total: res.total,
                        page: that.data.page + 1
                    })
                }
            },
            error(res) {
                switch (parseInt(res)) {
                    case 3000:
                        app.toast({title: "用户不存在"});
                        break;
                    case 3001:
                        app.toast({title: "查询类型错误"});
                        break;
                    case 3002:
                        app.toast({title: "无权限查看"});
                        break;
                    case 3003:
                        app.toast({title: "无效查询"});
                        break;
                    default:
                        app.toast({title: "错误码：" + res})
                }
            }
        })
    },
    clickDiv: function (e) {
        let div = e.currentTarget.dataset.div
        this.setData({
            div: div,
            onlyRead: [],
            reach: true,
            page: 1,
            circle: [],
            total: 0
        })
        if (div == 1) {
            this.getUserInfo()
        } else if (div == 2) {
            this.getread()
        }
    },
    getread: function () {
        let that = this
        app.wxrequest({
            url: "user/getread",
            data: {
                page: that.data.page || 1,
                pageNum: that.data.pageNum || 10
            },
            success(res) {
                if (res.data.length < 10) {
                    that.setData({
                        reach: false
                    })
                }
                if (res.data.length > 0) {
                    let onlyRead = that.data.onlyRead
                    onlyRead.push(onlyRead)
                    that.setData({
                        onlyRead: onlyRead,
                        page: that.data.page + 1
                    })
                }
            }
        })
    },
    getusersocialsum: function () {
        let that = this
        app.wxrequest({
            url: "user/getusersocialsum",
            success(res) {
                that.setData({
                    sum: res
                })
            }
        })
    },
    getUserInfo: function () {
        let that = this
        app.wxrequest({
            url: "user/getuser",
            success(res) {
                that.setData({
                    userInfo: res.data
                });
                if (res.data.user_market != 0) {
                    that.getCircle(1)
                    that.setData({
                        tab:1
                    })
                } else {
                    that.getCircle(2)
                    that.setData({
                        tab:2
                    })
                }
            },
            error(res) {
                app.toast({title: "未获取到用户信息"})
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getusersocialsum()
        // this.getCircle(1)
        this.getUserInfo()
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
        if (!this.data.reach) return

        if (this.data.div == 1) {
            this.getusersocial()
        } else if (this.data.div == 2) {
            this.getread()
        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
        return app.share()
    }
})