// pages/lucky/myPrize/myPrize.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        imgHost: '',
        page: 1,
        winnings: [],
        reach: true,
        notice: false,
        getId: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.setData({
            imgHost: app.globalData.host.imgHost
        })

    },
    getHdLucky() {
        app.wxrequest({
            url: "OfflineActivities/getUserHdLucky",
            data: {
                page: this.data.page,
                pageNum: 10
            },
            success: res => {
                if (res.winnings.length < 10) {
                    this.setData({
                        reach: false
                    })
                }
                if (res.winnings.length <= 0) return

                let winningsList = this.data.winnings
                winningsList.push(this.disWinnings(res.winnings))
                this.setData({
                    page: this.data.page + 1,
                    winnings: winningsList
                })
            },
            error() {
                app.toast({ title: '意料之外的错误' });
            }
        })
    },
    disWinnings(winnings = []) {
        if (winnings.length === 0) return;
        return winnings.map(val => {
            val.subTit = this.getSubTit(val)
            val.state = this.getState(val)
            return val
        })
    },
    getSubTit(j = {}) {
        let json = {
            2: '规格:' + (j.goods_sku_name || ''),
            4: (j.relevance || '') + '积分',
            5: '数量：X' + j.debris,
        }
        console.log(json[5])
        return j.need_debris === 1 ? json[j.kind] || '' : '数量：X' + j.debris;
    },
    getState(j = {}) {
        let n = 1,
            json = { 1: 3, 2: 4, 3: 5, 4: 7, 5: 1 };
        n = j.status === 1 && (j.need_debris === 1 ? json[j.kind] : 1);
        j.status === 2 && (n = 2);
        j.status === 3 && (n = 6);
        return n
    },
    getCoupons(e) {
        this.receivePrize(e.currentTarget.dataset.id, '领取成功,请前往个人中心优惠券查看')
    },
    getIntegral(e) {
        this.receivePrize(e.currentTarget.dataset.id, '领取成功,请前往个人中心积分查看')
    },
    showNotice(e) {
        this.setData({
            notice: true,
            getId: e.currentTarget.dataset.id
        })
    },
    change() {
        this.receivePrize(this.data.getId, '升级成功,请前往个人中心查看')
    },
    receivePrize(id, tit) {
        app.wxrequest({
            url: "OfflineActivities/receivePrize",
            data: {
                receive_id: id,
            },
            success: () => {
                app.toast({ title: tit });
                this.setData({
                    page: 1,
                    winnings: [],
                    reach: true,
                    getId: '',
                    notice: false
                }, () => {
                    this.getHdLucky()
                })
            },
            error(code) {
                let err = {
                    3004: '未选择配送地址',
                    3005: '领取失败',
                    3006: '无效的商品或者优惠券',
                    3007: '有未使用的优惠券',
                    3008: '已是钻石会员无法领取',
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
        this.setData({
            page: 1,
            winnings: [],
            reach: true
        }, () => {
            this.getHdLucky()
        })
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
        if (!this.data.reach) return;
        this.getHdLucky()
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})