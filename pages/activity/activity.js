// pages/activity/activity.js
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        mask: false,
        over: false,
        isvip: false,
        con_id: '',
        identity: 0,
        share_id: '',
        share: 0,
        isover: 0,
        uid: "",
        imgHost: '',
        poptype: true,
        navH:0,
        navHight:app.globalData.topHeadHeight
    },
    cha: function() {
        let isvip = !this.data.isvip
        this.setData({
            isvip: isvip
        })
    },
    editstatus: function() {
        let mask = !this.data.mask
        this.setData({
            mask: mask
        })
    },
    call: function() {
        wx.makePhoneCall({
            phoneNumber: "15502123212"
        })
    },
    cancel: function() {
        let over = !this.data.over
        this.setData({
            over: over
        })
    },
    preventTouchMove: function() {
        //防止用户操作弹出层外界面
    },
    popmodal: function() {
        app.modal({
            title: "选择用户领取方式"
        })
    },
    free: function() {
        let type = !this.data.poptype;
        this.setData({
            poptype: type
        })
    },
    pay: function() {
        let share_id = this.data.share_id
        wx.navigateTo({
            url: "/pages/activity/buyvip/buyvip"
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.setData({
            imgHost: app.globalData.host.imgHost,
            navH:app.globalData.topHeadHeight
        })
        if (options.share_id) {
            let share_id = options.share_id
            this.setData({
                share_id: share_id
            })
        }
        if (options.uid) {
            this.setData({
                uid: options.uid
            })
        }
        console.log(app.globalData.userInfo)
        this.setData({
            identity: app.globalData.userInfo.user_identity
        })

    },
    getuserinfo: function() {
        let that = this
        app.judgelogin({
            success(res) {
                that.setData({
                    udi: res.data.uid
                })
            }
        })
    },
    lingvip: function() {
        let pid = app.globalData.pid
        app.wxrequest({
            url: "rights/receiveDiamondvip",
            data: { parent_id: pid },
            success(res) {
                wx.redirectTo({
                    url: "/pages/activity/getvip/getvip"
                })
            },
            error(res) {
                wx.redirectTo({
                    url: "/pages/activity/buyvip/buyvip"
                })
            }
        })
    },
    /**
     * 从连接进
     */
    clickLink: function() {
        //需要判断进来的用户有没有登录，登录了就获取他的身份，还要获取分享者的身份
        let pid = app.globalData.pid
        let that = this
        app.judgelogin({
            success(res) {
                if (res.data) {
                    if (res.data.user_identity == 1) {
                        //如果是普通用户，判断分享者有没有权限
                        app.wxrequest({
                            url: "rights/IsGetDominos",
                            data: {
                                parent_id: pid
                            },
                            nocon: true,
                            success(result) {
                                //如果有就领取
                                that.lingvip()
                            },
                            error(result) {
                                //没有
                                wx.navigateTo({
                                    url: "/pages/activity/buyvip/buyvip"
                                })
                            }
                        })
                    } else if (res.data.user_identity == 2) {
                        that.setData({
                            isvip: true
                        })
                    } else if (res.data.user_identity == 3 || res.data.user_identity == 4) {
                        that.setData({
                            poptype: true
                        })

                        console.log(that.data.identity)
                        console.log(that.data.poptype)
                            //判断是不是发起者进来了，如果是就判断还有没有资格
                        app.wxrequest({
                            url: "rights/IsBossDominos",
                            nocon: false,
                            success(res) {
                                that.setData({
                                    mask: true
                                })
                            },
                            error(res) {
                                if (res == 3005) {
                                    that.setData({
                                        over: true
                                    })
                                }
                            }
                        })
                    }
                }
            }
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
        this.clickLink()
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
        let that = this,
            share = app.share({
                title: "恭喜获得钻石会员卡",
                path: '/pages/activity/activity',
                imageUrl:""
            })
        return share
    }
})