// pages/boss/cardBag/cardBag.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        imgHost: "",
        buttonStatus: false, //停用
        cardList:[]
    },
    /**
     * 获取银行卡列表
     */
    getCardList:function(){
        let that = this
      app.wxrequest({
          url:"user/getUserBankcards",
          success(res){
              that.dispose(res.user_bank)
            that.setData({
                cardList:res.user_bank
            })
          }
      })
    },
    /**
     * 处理银行卡号
     */
    dispose:function(data){
      for (let i = 0;i<data.length;i++){
          data[i].bank_card = data[i].bank_card.replace(/(\d{5})\d{10}(\d{4})/,"$1**** ****$2")
      }
      // console.log(data)
    },
    clickButton: function (e) {
        let buttonStatus = !this.data.buttonStatus,
            status = e.currentTarget.dataset.status,
            id = e.currentTarget.dataset.cardid
        if (status == 1) {
            this.startStop(id,status,"启用")
        } else if (status == 2) {
            this.startStop(id,status,"停用")
        }
    },
    startStop:function(id,status,stype){
        let that = this
        app.modal({
            content: "是否"+stype+"该银行卡？",
            confirmColor: "#e61f18",
            success(res) {
                app.wxrequest({
                    url:"user/changeUserBankcardStatus",
                    data: {
                        id:id,
                        status:status
                    },
                    noloading:true,
                    success(res){
                        app.toast({
                            title:"操作成功"
                        })
                        that.getCardList()
                    },
                    error(res){
                        if (res == 3004){
                            app.toast({
                                title: "该银行卡状态无法变更"
                            })
                        } else if (res == 3006) {
                            app.toast({
                                title:"未查询到该银行卡"
                            })
                        }else if (res == 3007){
                            app.toast({
                                title:stype+"失败"
                            })
                        }
                    }
                })
            }
        })
    },
    addCard: function (e) {
        let stype = e.currentTarget.dataset.stype,
            cardId = e.currentTarget.dataset.cardid
        wx.navigateTo({
            url:"addCard/addCard?stype="+stype+"&cardId="+cardId
        })
    },
    backout:function(e){
        let id = e.currentTarget.dataset.cardid,
            that = this;
      app.wxrequest({
          url:"user/changeUserBankcardStatus",
          data: {
              id:id,
              status:3
          },
          noloading:true,
          success(res){
              app.toast({
                  title:"撤销成功"
              })
              that.getCardList()
          },
          error(res){
              if (res == 3004){
                  app.toast({
                      title: "该银行卡状态无法变更"
                  })
              } else if (res == 3006) {
                  app.toast({
                      title:"未查询到该银行卡"
                  })
              }else if (res == 3007){
                  app.toast({
                      title:"撤销失败"
                  })
              }
          }
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