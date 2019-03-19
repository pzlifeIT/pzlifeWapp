// pages/boss/circle/circle.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tab: 1,
        sum:{},
        page:1,
        pageNum:10,
        reach:true,
        socialList:[],
        maizhu:[]
    },
    select:function(e){
        let tab = e.currentTarget.dataset.tab
        this.setData({
            tab:tab,
            page:1,
            socialList:[],
            maizhu:[]
        })
        console.log(this.data.page)
        this.getusersocial()
    },
    getusersocialsum:function(){
        let that = this
        app.wxrequest({
            url:"user/getusersocialsum",
            success(res){
                that.setData({
                    sum:res
                })
            }
        })
    },
    getusersocial:function(){
        let that = this,
            tab = parseInt(this.data.tab)
        app.wxrequest({
            url:"user/getusersocial",
            data: {
                stype:tab,
                page: this.data.page || 1,
                pageNum: this.data.pageNum || 10
            },
            success(res){
                if (res.data.length < 10){
                    that.setData({
                        reach:false
                    })
                }
                if (res.data.length > 0){
                    let social = that.data.socialList,
                        maizhu = that.data.maizhu
                    if (tab == 1){
                        social.push(res.data)
                    } else if (tab == 2){
                        maizhu.push(res.data)
                    }
                    console.log(social)
                    that.setData({
                        socialList:social,
                        maizhu:maizhu,
                        page:that.data.page + 1
                    })
                }
            },
            error(res){
                console.log(res)
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.getusersocialsum()
        this.getusersocial()
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
        // this.setData({
        //     page:this.data.page + 1
        // })
        this.getusersocial()
        // this.getusersocialsum()
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})