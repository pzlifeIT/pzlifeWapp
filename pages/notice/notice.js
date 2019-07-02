// pages/my/notice/notice.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        imgHost: "",
        ident: 0,
        refe_type: 0,
        parent_id: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            imgHost: app.globalData.host.imgHost,
            ident: options.iden
        })
        if (options.iden == 4) {
            wx.setNavigationBarTitle({
                title: "合伙人和兼职市场总监权益规定"
            })

        } else if (options.iden == 3) {
            wx.setNavigationBarTitle({
                title: "创业店主和兼职市场经理须知"
            })
        } else {
            wx.setNavigationBarTitle({
                title: "会员权益须知"
            })
        }
        if (options.type == 2) {
            this.setData({
                refe_type: 1
            })
        } else if (options.type == 3) {
            this.setData({
                refe_type: 2
            })
        } else if (options.type == 4) {
            this.setData({
                refe_type: 3
            })
        }
    },
    back: function () {
        let that = this
        app.modal({
            title: "是否确定升级",
            content: "点击确定将为您的身份进行升级",
            success(res) {
                that.upgrade()
            }
        })
    },
    upgrade: function () {
        let refe_type = this.data.refe_type;
        app.wxrequest({
            url: "rights/userUpgrade",
            data: {
                refe_type:refe_type
            },
            success(res) {
                app.toast({
                    title: "升级成功！"
                })
            },
            error(res) {
                let text = ''
                switch (parseInt(res)) {
                    case 3001:
                        text = '邀请类型错误';
                        break;
                    case 3002:
                        text = '只有钻石才能升级创业店主';
                        break;
                    case 3003:
                        text = '只有创业店主才能升级兼职市场经理';
                        break;
                    case 3004:
                        text = '只有合伙人才能升级兼职市场总监';
                        break;
                    case 3005:
                        text = '升级失败';
                        break;
                    case 3006:
                        text = '已经是兼职市场经理';
                        break;
                    case 3007:
                        text = '正在冷却期内无法升级';
                        break;
                    default:
                        text = '错误码：' + res
                }
                app.toast({title:text})
            }
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

    }
})