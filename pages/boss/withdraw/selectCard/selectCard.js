// pages/boss/withdraw/selectCard/selectCard.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        imgHost: "",
        cardList: []
    },
    addCard: function (e) {
        let stype = e.currentTarget.dataset.stype;
        wx.navigateTo({
            url:"/pages/boss/cardBag/addCard/addCard"
        })
    },
    selectCard:function(e) {
        let id = e.currentTarget.dataset.id,
            name = e.currentTarget.dataset.name,
            num = e.currentTarget.dataset.num,
            img = e.currentTarget.dataset.img;
        console.log(e)
        let pages = getCurrentPages();
        let prevPage = pages[pages.length - 2]
        prevPage.setData({
            cardInfo:{
                cardId:id,
                cardName:name,
                cardNum:num,
                cardImg:img,
                stype:1
            }
        });
        wx.navigateBack({
           delta:1
            // url: "/pages/boss/withdraw/withdraw?cardId=" + id + "&name=" + name + "&num=" + num + "&img=" + img+"&stype=1"
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            imgHost: app.globalData.host.imgHost
        })
        this.getCardList()
    },
    getCardList: function () {
        let that = this;
        app.wxrequest({
            url: "user/getUserBankcards",
            data:{
                is_transfer:1
            },
            success(res) {
                let data = that.dispose(res.user_bank)
                that.setData({
                    cardList: res.user_bank
                })
                console.log(that.data.cardList)
            }
        })
    },
    dispose:function(data){
        for (let i = 0;i<data.length;i++){
            data[i].bank_card = data[i].bank_card.substring(15,19)
        }
        // console.log(data)
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
        return app.share()
    }
})