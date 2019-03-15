//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        imgUrls: [
            app.globalData.host.imgHost + "banner.png",
            app.globalData.host.imgHost + "banner.png",
            app.globalData.host.imgHost + "banner.png",
        ],
        motto: 'Hello World',
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        imgHost: '',
        num: 1,
        pos_scroll: 0,
        slider: {},
        icon: {},
        sub: {},
        newGoods: {},
        oneDay: {},
        hotGoods: {},
        season: {},
        shiling: {},
        maizhu: {},
        sub_goods: {},
        hotson: []
    },
    //事件处理函数
    bindViewTap: function() {
        wx.navigateTo({
            url: '../logs/logs'
        })
    },
    goUrl(e) {
        let con = e.currentTarget.dataset
        if (con.jump == 1) {
            wx.navigateTo({
                url: "/pages/category/goods/goods?sub_id=" + con.content
            })
        } else if (con.jump == 2) {
            wx.navigateTo({
                url: "/pages/goods/detail?goodid=" + con.content
            })
        } else if (con.jump == 3) {
            wx.reLaunch({
                url: con.content
            })
        }
    },
    swiper: function(e) {
        this.setData({
            num: parseInt(e.detail.current) + 1
        })
    },
    movescroll: function(e) {
        console.log(e)
        if (e.detail.scrollLeft >= 500) {
            e.detail.scrollLeft = 500
        }
        this.setData({
            pos_scroll: parseInt(e.detail.scrollLeft)
        })
    },
    home: function(home) {
        let that = this
        for (let i = 0; i < home.length; i++) {
            //一个元素是一个模块，具体是哪个模块根据当前元素里面的model——id
            if (home[i].model_id == 1) {
                that.setData({
                    slider: home[i]
                })
            } else if (home[i].model_id == 2) {
                that.setData({
                    icon: home[i]
                })
            } else if (home[i].model_id == 3) {
                that.setData({
                    sub: home[i]
                })
            } else if (home[i].model_id == 4) {
                that.setData({
                    newGoods: home[i]
                })
            } else if (home[i].model_id == 5) {
                that.setData({
                    oneDay: home[i]
                })
                console.log(home[i].son)
            } else if (home[i].model_id == 6) {
                that.setData({
                    hotGoods: home[i]
                });
                home[i].son.shift()
                home[i].son.shift()
                that.setData({
                    hotson: home[i].son
                })

            } else if (home[i].model_id == 7) {
                that.setData({
                    season: home[i]
                })
            } else if (home[i].model_id == 8) {
                that.setData({
                    shiling: home[i]
                })
            } else if (home[i].model_id == 9) {
                that.setData({
                    maizhu: home[i]
                })
            } else if (home[i].model_id == 10) {
                that.setData({
                    sub_goods: home[i]
                });
            }

        }
    },
    /**
     * 下拉刷新
     */
    onPullDownRefresh: function() {
        wx.showNavigationBarLoading() //在标题栏中显示加载
            //模拟加载
        let that = this
        setTimeout(function() {
            that.getIndex()
            wx.hideNavigationBarLoading() //完成停止加载
            wx.stopPullDownRefresh() //停止下拉刷新
        }, 1500);
    },
    onLoad: function(options) {
        console.log(132121)
        console.log()
        this.setData({
            imgHost: app.globalData.host.imgHost
        })
    },
    bindRegionChange: function(e) {
        console.log(e)
    },
    getUserInfo: function(e) {
        console.log(e)
        app.globalData.userInfo = e.detail.userInfo
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
        })
    },
    /**
     * 获取首页接口
     */
    getIndex: function() {
        let that = this
        app.wxrequest({
            url: "Recommend/getRecommend",
            nocon: true,
            success(res) {
                res.recommends.reverse()
                that.home(res.recommends)
                console.log(res.recommends)
            },
            error(res) {
                console.log(res)
            },
            fail(res) {

            }
        })
    },
    onShow: function() {
        this.getIndex()
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {
        let that = this,
            share = app.share({
                title: "品质生活广场",
                path: '/pages/index/index',
                imageUrl: "http://pnkp5i8sb.bkt.clouddn.com/index_01.png"
            })
        return share
    }
})