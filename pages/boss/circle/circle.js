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
        maizhu:[],
        div:1,
        peopleNum:0,
        diamon_user_count:0,
        social_count_all:0
    },
    select:function(e){
        let tab = e.currentTarget.dataset.tab
        this.setData({
            tab:tab,
            page:1,
            socialList:[],
            maizhu:[],
            reach:true
        })
        console.log(this.data.page)
        this.getusersocial()
    },
    clickDiv:function(e){
        let div = e.currentTarget.dataset.div
        this.setData({
            div:div,
            socialList:[],
            maizhu:[],
            peopleNum:0,
            diamon_user_count:0,
            social_count_all:0,
            reach:true,
            page:1
        })
        if (div == 1){
            this.getusersocial()
        }else if (div == 2){

        }
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
                        page:that.data.page + 1,
                        peopleNum:res.user_ring_count || 0,
                        diamon_user_count:res.diamon_user_count || 0,
                        social_count_all:res.social_count_all || 0
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