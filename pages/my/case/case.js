// pages/my/case/case.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        scroll_height: 0,
        caseList: [],
        userInfo: {},
        imgHost: '',
        ident:0,
        balance:0,
        balanceAll:0,
        balanceUse:0,
        noBbonus:0,
        reach:true,
        page:1
    },
    getCaseDetail:function(){
        let that = this
        app.wxrequest({
            url:"user/getshopbalance",
            data: {
                stype:3,
                page:that.data.page || 1,
                page_num:10
            },
            nocon:false,
            success(res){
                if (res.data.length < 10){
                    that.setData({
                        reach:false
                    })
                }
                if (res.data.length > 0) {
                    let list = that.data.caseList
                    list.push(res.data)
                    that.setData({
                        caseList:list,
                        page : that.data.page+1
                    })
                }
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        let windowHeight = wx.getSystemInfoSync().windowHeight,
            windowWidth = wx.getSystemInfoSync().windowWidth
        console.log(app.globalData.userInfo)
        this.setData({
            scroll_height: windowHeight * 750 / windowWidth - 20,
            imgHost: app.globalData.host.imgHost
        })
        this.getCaseDetail()
        this.getCaseNum()
    },
    getCaseNum:function(){
      let that = this
      app.wxrequest({
          url:"user/getshopbalancesum",
          success(res){
              that.setData({
                  balance:res.balance,
                  balanceAll:res.balanceAll,
                  balanceUse:res.balanceUse,
                  noBbonus:res.noBbonus
              })
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
            userInfo:app.globalData.userInfo
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
        if (!this.data.reach) return
        this.getCaseDetail()
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {
        return app.share()
    }
})