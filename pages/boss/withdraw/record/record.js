// pages/boss/withdraw/record/record.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        div: 1,
        imgHost: "",
        reach:true,
        page:1,
        pageNum:10,
        list:[]
    },
    selectDiv: function (e) {
        let div = e.currentTarget.dataset.div
        this.setData({
            div: div,
            reach:true,
            page:1,
            list:[]
        })
        if (this.data.div == 1) {
            wx.setNavigationBarTitle({
                title: "申请记录"
            })
            this.getRecord()
        } else if (this.data.div == 2) {
            wx.setNavigationBarTitle({
                title: "发票信息"
            })
        }
    },
    previewImg: function (e) {
        let img = e.currentTarget.dataset.img;
        wx.previewImage({
            current: img,
            urls: [img]
        })
    },
    getRecord: function () {
        let that = this
        app.wxrequest({
            url: "user/getLogTransfer",
            data: {
                stype: 2,
                page: that.data.page || 1,
                pageNum: that.data.pageNum || 10
            },
            success(res) {
                that.dispose(res.log_transfer)
                if (res.log_transfer.length < 10) {
                    that.setData({
                        reach: false
                    })
                }
                if (res.log_transfer.length > 0) {
                    let list = that.data.list;
                    list.push(res.log_transfer);
                    console.log(list)
                    that.setData({
                        list: list,
                        page: that.data.page + 1
                    })
                }
            }
        })
    },
    dispose:function(data){
        for (let i = 0;i<data.length;i++){
            data[i].bank_card = data[i].bank_card.substring(15,19)
        }
        // console.log(data)
    },    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            imgHost: app.globalData.host.imgHost,
            div: options.div
        })
        if (options.div == 1) {
            wx.setNavigationBarTitle({
                title: "申请记录"
            })
            this.getRecord()
        } else if (options.div == 2) {
            wx.setNavigationBarTitle({
                title: "发票信息"
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
        if (!this.data.reach){
            return
        }
        if (this.data.div == 1){
            this.getRecord()
        }

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})