// pages/boss/commission/commission.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        div: 1,
        num: 1,
        page: 1,
        pageNum: 10,
        reach: true,
        imgHost: '',
        info: {},
        total: 0,
        etype: 0,
        commiss: [],
        own: 0,
        vip: 0,
        dimond: 0,
        hidden:1
    },
    clickDiv: function (e) {
        let div = e.currentTarget.dataset.div;
        this.setData({
            div: div,
            reach: true,
            page: 1,
            commiss: []
        });
            this.getCommiss(this.data.etype, div)
    },
    getInfo: function () {
        let that = this
        app.wxrequest({
            url: "user/getbossshop",
            success(res) {
                that.setData({
                    info: res.data
                })
            }
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getInfo()
        this.setData({
            imgHost: app.globalData.host.imgHost
        })
        if (options.etype == 1) {//可分佣
            this.setData({
                etype: 1,
                hidden:options.hidden
            })
            wx.setNavigationBarTitle({
                title: '可分佣收益'
            })
            this.getCommiss(1, 1)
        } else if (options.etype == 2) {
            this.setData({
                etype: 2,
                hidden:options.hidden
            });
            wx.setNavigationBarTitle({
                title: "不可分佣收益"
            });
            this.getCommiss(2)
        }
    },
    getCommiss: function (type = 1, wtype = '') {
        let that = this;
        app.wxrequest({
            url: "user/getUserBusinessMoney",
            data: {
                type: type,
                wtype: wtype,
                page: that.data.page || 1,
                page_num: that.data.page_num || 10
            },
            success(res) {
                that.setData({
                    total: res.all_price,
                    own: res.own_price,
                    vip: res.vip_price,
                    dimond: res.dimondvip_price
                })
                if (res.businessmoney.length < 10) {
                    that.setData({
                        reach: false
                    })
                }
                if (res.businessmoney.length > 0) {
                    let commiss = that.data.commiss;
                    commiss.push(res.businessmoney);
                    that.setData({
                        commiss: commiss,
                        page: that.data.page + 1
                    });
                }
            },
            error(res) {
                switch (parseInt(res)) {
                    case 3005:
                        app.toast({title: "暂无查看权限"});
                        break;
                    default:
                        app.toast({title: "错误码：" + res})
                }
            }
        })
    },
    hidden: function () {
        let status = this.data.hidden
        if (status == 1){
            this.setData({
                hidden: 2
            })
        } else {
            this.setData({
                hidden: 1
            })
        }

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
        if (!this.data.reach) {
            return
        }
        if (this.data.etype == 1){
            this.getCommiss(this.data.etype,this.data.div)
        } else if (this.data.etype == 2){
            this.getCommiss(2)
        }

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
        return app.share()
    }
})