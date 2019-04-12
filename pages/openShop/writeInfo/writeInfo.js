// pages/openShop/writeInfo/writeInfo.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        sex: 1,
        name:"",
        idCard:"",
        phone:""
    },
    selectSex: function (e) {
        let sex = e.currentTarget.dataset.sex
        this.setData({
            sex:sex
        })
    },
    watchInput:function(e){
        let item = e.currentTarget.dataset.model
        this.setData({
            [item]:e.detail.value
        })
    },
    openShop:function(){
      let pid = app.globalData.pid,
          name = this.data.name,
          idCard = this.data.idCard,
          sex = this.data.sex,
          phone = this.data.phone
        if (name == ""){
            app.toast({
                title:"姓名不能为空"
            })
            return
        }
        if (idCard == ""){
            app.toast({
                title:"身份证号不能为空"
            })
            return
        }
        if(phone == "" || phone.length < 11){
            app.toast({
                title:"电话号码错误"
            })
            return
        }
        console.log(pid)
        console.log(name)
        console.log(idCard)
        console.log(sex)
        console.log(phone)
        app.wxrequest({
           url:"rights/shopApplyBoss",
            data: {
                target_nickname:name,
                target_sex:sex,
                target_mobile:phone,
                target_idcard:idCard,
                parent_id:"EE"
            },
            success(res){
               wx.navigateTo({
                   url:"/pages/openShop/submitStatus/submitStatus"
               })
            },
            error(res){
               if (res == 3000){
                   app.toast({
                       title:"用户不存在"
                   })
               } else if (res == 3002 || res == 3003 || res == 3004 || res == 3005 || res == 3006 || res == 3007 || res == 3008){
                   app.toast({
                       title:"参数错误"
                   })
               } else if (res == 3009){
                   app.toast({
                       title:"已申请过，无法再次申请"
                   })
               } else if (res == 3010){
                   app.toast({
                       title:"您已经是合伙人"
                   })
               } else if (res == 3011) {
                   app.toast({
                       title:"记录已存在"
                   })
               } else if (res == 3012){
                   app.toast({
                       title:"邀请人不是合伙人"
                   })
               }
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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