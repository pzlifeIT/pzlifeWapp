// pages/boss/boss.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        imgHost: '',
        boss: {},
        bossname: "",
        head: "",
        popCase: false,
        popShouyi: false,
        popYongjin: false,
        popJoin: false,
        content: "",
        title: ""
    },
    getBossInfo: function () {
        let that = this
        app.wxrequest({
            url: "user/getbossshop",
            success(res) {
                console.log(res)
                that.setData({
                    boss: res.data
                })
            }
        })
    },
    cardbag: function () {
        wx.navigateTo({
            url: "cardBag/cardBag"
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            imgHost: app.globalData.host.imgHost
        })
        let that = this
        let time = setInterval(function () {
            if (app.globalData.userInfo) {
                that.setData({
                    bossname: app.globalData.userInfo.nick_name,
                    head: app.globalData.userInfo.avatar
                })
                clearInterval(time)
            }
        }, 100);
    },
    casetotal: function (e) {
        let i = e.currentTarget.dataset.i
        wx.navigateTo({
            url: "/pages/boss/case/totalcase/totalcase?i=" + i
        })
    },
    case: function (e) {
        let i = e.currentTarget.dataset.i
        wx.navigateTo({
            url: "/pages/boss/case/case?i=" + i
        })
    },
    goInte: function () {
        wx.navigateTo({
            url: "/pages/boss/integral/integral"
        })
    },
    gocommiss: function () {
        wx.navigateTo({
            url: "/pages/boss/commission/commission"
        })
    },
    goshiftMoney() {
        wx.navigateTo({
            url: "/pages/shiftMoney/shiftMoney"
        })
    },
    pop: function (e) {
        let poptype = e.currentTarget.dataset.type
        if (poptype == 1) {
            this.setData({
                popCase: true,
                title: "商券总额",
                content: "佣金转入商券总额+钻石会员分享奖励"
            })
        } else if (poptype == 2) {
            this.setData({
                popShouyi: true,
                title: "经营性收益",
                content: "个人购物可分配利润的75%+普通会员购物可分配利润的75%+钻石会员购物获补贴总额的15%+直接招商的合伙人月经营性收益总额的15%"
            })
        } else if (poptype == 4) {
            this.setData({
                popYongjin: true,
                title: "佣金收益",
                content: "经营收益总额+招商代理收益"
            })
        } else if (poptype == 3) {
            this.setData({
                popJoin: true,
                title: "招商代理收益",
                content: "招新合伙人的一次性代理费"
            })
        }
    },
    preventTouchMove: function () {

    },
    know: function () {
        this.setData({
            popCase: false,
            popShouyi: false,
            popYongjin: false,
            popJoin: false
        })
    },
    join: function () {
        wx.navigateTo({
            url: "/pages/boss/join/join"
        })
    },
    earning: function (e) {
        let earn = e.currentTarget.dataset.earn,
            enter = e.currentTarget.dataset.enter,
            entered = e.currentTarget.dataset.entered,
            all = e.currentTarget.dataset.all
        wx.navigateTo({
            url: "/pages/boss/earnings/earnings?earn=" + earn + "&all=" + all + "&enter=" + enter + "&entered=" + entered
        })
    },
    commission: function () {
        wx.navigateTo({
            url: "withdraw/withdraw"
        })
    },
    goOpenShop: function () {
        wx.navigateTo({
            url: "/pages/openShop/openShop"
        })
    },
    activity: function (e) {
        wx.navigateTo({
            url: "/pages/activity/activity"
        })
    },
    diamondlist: function (e) {
        wx.navigateTo({
            url: "/pages/diamondlist/diamondlist"
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
        this.getBossInfo()
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