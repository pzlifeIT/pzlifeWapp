// pages/boss/case/case.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        i: 1,
        detailList:[],
        imgHost:"",
        page:1,
        pageNum:10,
        reach:true,
        boss:{}
    },
    clickDiv:function(e){
        let i = e.currentTarget.dataset.i
        this.setData({
            i:i,
            detailList:[],
            page:1,
            reach:true,
        })
        if (i == 1){
            wx.setNavigationBarTitle({
                title:"已使用商票明细"
            })
        } else if (i == 3){
            wx.setNavigationBarTitle({
                title:"商票余额明细"
            })
        }
        this.getCaseDetail(i)
    },
    getCaseDetail:function(i){
        let that = this
        app.wxrequest({
            url:"user/getshopbalance",
            data: {
                stype:parseInt(i),
                page:that.data.page || 1,
                page_num:that.data.pageNum || 10
            },
            nocon:false,
            success(res){
                if (res.data.length < 10){
                    that.setData({
                        reach:false
                    })
                }
                if (res.data.length > 0) {
                    let detailList = that.data.detailList
                    detailList.push(res.data)
                    console.log(detailList)
                    console.log(res.data)
                    that.setData({
                        detailList:detailList,
                        page:that.data.page + 1
                    })
                }
            }
        })
    },
    getbossshop:function(){
        let that = this
        app.wxrequest({
            url: "user/getbossshop",
            success(res) {
                console.log(res)
                that.setData({
                    boss: res.data
                })
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            imgHost:app.globalData.host.imgHost
        })
        this.setData({
            i: options.i,
            div:options.i
        })
        if (options.i == 1){
            wx.setNavigationBarTitle({
              title: '已使用商票明细'
            })
        } else if (options.i == 2){
            wx.setNavigationBarTitle({
                title:"待入账商票明细"
            })
        } else if (options.i == 3){
            wx.setNavigationBarTitle({
              title: '商票余额明细'
            })
        }
        this.getCaseDetail(options.i)
        this.getbossshop()
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
        if (!this.data.reach) return;
        this.getCaseDetail(this.data.i)
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
        return app.share()
    }
})