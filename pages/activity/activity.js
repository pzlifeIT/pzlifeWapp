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
        imgHost: ''
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
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.setData({
            imgHost: app.globalData.host.imgHost
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
        if (options.ident) {
            this.setData({
                identity: options.ident
            })
        }
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
    /**
     * 个人中心进来
     */
    center: function() {
        console.log(this.data.identity)
            //根据传过来的身份提示
        let that = this
        if (this.data.identity == 2) {
            this.setData({
                isvip: true
            })
        } else if (this.data.identity == 3 || this.data.identity == 4) {
            //如果是boss，发请求判断是否领完，如果没有领完就提示怎么开始游戏
            app.wxrequest({
                url: "index/rights/IsBossDominos",
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
        } else {
            app.toast({
                title: "权限不够"
            });
            let timer = setTimeout(function() {
                wx.navigateBack({
                    delta: 1
                })
            }, 1500);
            clearTimeout(timer)
        }
    },
    lingvip: function(share_id, uid) {
        app.wxrequest({
            url: "index/rights/receiveDiamondvip",
            data: { parent_id: share_id },
            nocon: false,
            success(res) {
                wx.redirectTo({
                    url: "/pages/activity/getvip/getvip?uid=" + uid
                })
            },
            error(res) {
                wx.redirectTo({
                    url: "/pages/activity/buyvip/buyvip?share_id=" + share_id + "&con_id=" + app.globalData.con_id + "&uid=" + res.data.uid
                })
            }
        })
    },
    /**
     * 从连接进
     */
    clickLink: function() {
        //需要判断进来的用户有没有登录，登录了就获取他的身份，还要获取分享者的身份
        let share_id = this.data.share_id
        console.log(share_id)
        let that = this
        app.judgelogin({
            success(res) {
                if (res.data) {
                    if (res.data.user_identity == 1) {
                        //如果是普通用户，判断分享者有没有权限
                        app.wxrequest({
                            url: "index/rights/IsGetDominos",
                            data: {
                                parent_id: share_id
                            },
                            nocon: true,
                            success(result) {
                                //如果有就领取
                                that.lingvip(share_id, res.data.uid)
                            },
                            error(result) {
                                //没有
                                wx.navigateTo({
                                    url: "/pages/activity/buyvip/buyvip?share_id=" + share_id + "&con_id=" + app.globalData.con_id + "&uid=" + res.data.uid
                                })
                            }
                        })
                    } else if (res.data.user_identity == 2) {
                        that.setData({
                            isvip: true
                        })
                    } else if (res.data.user_identity == 3 || res.data.user_identity == 4) {
                        //判断是不是发起者进来了，如果是就判断还有没有资格
                        if (app.globalData.con_id == share_id) {
                            app.wxrequest({
                                url: "index/rights/IsBossDominos",
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
                        } else {
                            that.setData({
                                mask: true
                            })
                        }

                    }
                } else {
                    app.modal({
                        title: "是否去登陆",
                        success() {
                            wx.navigateTo({
                                url: "/pages/login/login"
                            })
                        },
                        cancel() {

                        }
                    })
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
        if (this.data.share_id) {
            this.clickLink()
        } else {
            this.center()
        }
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
                path: '/pages/activity/activity?share_id=' + this.data.uid,
                imageUrl: "http://pnkp5i8sb.bkt.clouddn.com/nomember01.png"
            })
        return share
    }
})