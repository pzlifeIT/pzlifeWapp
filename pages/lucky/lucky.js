// pages/lucky/lucky.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        list: [1, 2, 3, 4, 5, 6, 7, 8],
        goodList: [],
        userHdLucky: [],
        General_debris: {},
        btn: '点击\n抽奖',
        hd_id: '',
        animation: '',
        num: 0,
        circle: 0,
        imgHost: '',
        luckyGood: {},
        syntheticGood: {},
        bounced: false,
        bounced_text: '',
        isrotat: false,
        isExchange: false,
        exchangeIndex: 0,
        navHight: app.globalData.topHeadHeight
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.setData({
            imgHost: app.globalData.host.imgHost
        })
        console.log(this.data.navHight)
        this.getLuckGoods()
    },
    zhuanpan: function(n) {
        let circle = this.data.circle + 1800;
        let num = circle + n * 45;
        let animation = wx.createAnimation({
            duration: 4000,
            timingFunction: 'ease-out',
        })
        animation.rotate(num).step();
        this.setData({
            animation: animation.export(),
            num: num,
            circle: circle,
        }, () => {
            this.showWinning()
        })

    },
    showWinning() {
        setTimeout(() => {
            this.setData({
                isrotat: false
            })
            this.showBounced('winning')
            this.getUserHdLucky()
        }, 4000)
    },
    luckydraw() {
        if (this.data.isrotat) return
        this.setData({
            isrotat: true
        })
        app.wxrequest({
            url: "OfflineActivities/luckydraw",
            data: {
                hd_id: this.data.hd_id,
                timekey: new Date().getTime()
            },
            success: res => {
                this.setData({
                    luckyGood: res
                }, () => {
                    this.zhuanpan(this.getNum(this.data.luckyGood.shop_num))
                })
            },
            error: code => {
                this.setData({
                    isrotat: false
                })
                if (code == 3004) {
                    app.toast({ title: '奖品内容变更,将自动刷新' });
                    setTimeout(() => {
                        this.onload()
                    }, 1000)
                    return
                }
                let err = {
                    3003: '已参与抽奖 ',
                    3005: '操作失败',
                    3006: '活动过期，请刷新页面',
                    3008: '奖品已全部抽完'
                }
                app.toast({ title: err[code] || '意料之外的错误' });
            },
            fail: () => {
                this.setData({
                    isrotat: false
                })
            }
        })
    },
    getNum(id, con) {
        let data = this.data.goodList;
        for (let i = 0, len = data.length; i < len; i++) {
            if (data[i].id == id) {
                return con ? data[i] : i + 1
            }
        }
        return false
    },
    getLuckGoods() {
        app.wxrequest({
            url: "OfflineActivities/LuckGoods",
            nocon: true,
            success: res => {
                this.setData({
                    hd_id: res.hd_id,
                    goodList: res.LuckGoods
                })
            },
            error() {
                app.toast({ title: '抽奖奖品为空' });
            }
        })
    },
    getUserHdLucky() {
        app.wxrequest({
            url: "OfflineActivities/getUserHdLucky",
            data: {
                is_debris: 1
            },
            noloading: true,
            success: res => {
                this.setData({
                    userHdLucky: res.winnings || [],
                    CanExchange: this.getCanExchange(res.winnings),
                    General_debris: res.General_debris || {}
                })
            },
            error() {
                app.toast({ title: '意料之外的错误' });
            }
        })
    },
    getCanExchange(data = []) {
        let arr = [];
        for (let i = 0, len = data.length; i < len; i++) {
            data[i].has > 0 && arr.push(data[i])
        }
        return arr
    },
    selExchange(e) {
        this.setData({
            exchangeIndex: e.currentTarget.dataset.index
        })
    },
    exchange() {
        if (this.data.isExchange) return;
        this.setData({
            isExchange: true
        })
        let data = this.data
        app.wxrequest({
            url: "OfflineActivities/userDebrisChange",
            data: {
                use_id: data.General_debris.id,
                use_number: 1,
                chage_id: data.CanExchange[data.exchangeIndex].id
            },
            success: res => {
                app.toast({ title: '兑换成功' });
                this.cancelExchange()
                this.getUserHdLucky()
                this.setData({
                    isExchange: false
                })
            },
            error: code => {
                this.setData({
                    isExchange: false
                })
                let err = {
                    3003: '您不具有该碎片',
                    3004: '您暂时无法兑换该碎片',
                    3005: '通用碎片数量不足'
                }
                app.toast({ title: err[code] || '意料之外的错误' });
            },
            fail: () => {
                this.setData({
                    isExchange: false
                })
            }
        })
    },
    showExchange() {
        if (this.data.General_debris.has < 1) return
        this.showBounced('exchange')
    },
    cancelBounced() {
        this.setData({
            bounced: false,
            bounced_text: ''
        })
    },
    showBounced(text) {
        if (!text) return
        this.setData({
            bounced: true,
            bounced_text: text
        })
    },
    synthetic(e) {
        let id = e.currentTarget.dataset.id;
        app.wxrequest({
            url: "OfflineActivities/userDebrisCompound",
            data: {
                use_id: id,
            },
            success: res => {
                this.getUserHdLucky()
                this.setData({
                    syntheticGood: this.getNum(id, true),
                })
                this.showBounced('dialcompound')
            },
            error(code) {
                let err = {
                    3004: '未查询到该奖品碎片记录',
                    3005: '碎片不够，无法合成'
                }
                app.toast({ title: err[code] || '意料之外的错误' });
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
        this.getUserHdLucky()
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