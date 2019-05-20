// pages/boss/join/join.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        page: 1,
        pageNum: 10,
        reach: true,
        list: [],
        imgHost: "",
        num: 1,
        commission: {},
        tab:0,
        yan:true
    },
    clickSelect: function(e) {
        let num = parseInt(e.currentTarget.dataset.num)
        this.setData({
            num: num
        })
    },
    yan:function(){
      let yan = !this.data.yan
      this.setData({
          yan:yan
      })
    },
    selectTab:function(e){
        let tab = e.currentTarget.dataset.tab
        this.setData({
            tab:tab,
            page:1,
            pageNum:10,
            reach:true,
            list:[]
        },function () {
            this.getLogTransfer(tab)
        })

    },
    getLogTransfer:function(stype){
        let that = this
        app.wxrequest({
            url:"user/getLogTransfer",
            data: {
                stype:parseInt(stype),
                page:that.data.page || 1,
                pageNum:that.data.pageNum || 10
            },
            success(res){
                if (res.log_transfer.length < 10) {
                    that.setData({
                        reach:false
                    })
                }
                if (res.log_transfer.length > 0){
                    let list = that.data.list
                    list.push(res.log_transfer)
                    that.setData({
                        list:list,
                        page:that.data.page + 1
                    })
                }
            }
        })
    },
    getshopcommission() {
        let that = this
        app.wxrequest({
            url: "user/getshopcommission",
            data: {
                page: that.data.page || 1,
                pageNum: that.data.pageNum || 10
            },
            success(res) {
                if (res.data.length < 10) {
                    that.setData({
                        reach: false
                    })
                }
                if (res.data.length > 0) {
                    let list = that.data.list
                    list.push(res.data)
                    that.setData({
                        list: list,
                        page: that.data.page + 1
                    })
                }
            },
            error(res) {

            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.setData({
            imgHost: app.globalData.host.imgHost
        })
        this.getshopcommissionsum()
        if (options.hidden == 1){
            this.setData({
                yan:true
            },function () {
                this.getshopcommission()
            })
        } else if (options.hidden == 2){
            this.setData({
                yan:false,
                tab:2
            },function () {
                this.getLogTransfer(2)
            })
        }
    },
    logTransfer:function(){
        this.setData({
            tab:0,
            list:[],
            page:1,
            reach:true
        },function () {
            this.getshopcommission()
        })
    },
    getshopcommissionsum() {
        let that = this
        app.wxrequest({
            url: "user/getshopcommissionsum",
            success(res) {
                that.setData({
                    commission: res || {}
                })
            },
            error(res) {
                app.toast({
                    title: '获取失败'
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
        if (this.data.tab ==1){
            this.getLogTransfer(1)
        } else if (this.data.tab == 2){
            this.getLogTransfer(2)
        } else {
            this.getshopcommission()
        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})