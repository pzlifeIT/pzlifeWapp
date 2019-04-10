// pages/boss/cardBag/addCard/addCard.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        yh:false,
        height:0,
        imgHost:"",
        codeText:"获取验证码",
        mask:false,
        bankName:"",
        trueName:"",
        bankZiName:"",
        cardNum:"",
        phone:"",
        code:"",
        disabled:false,
        bankList:[],
        bankId:0,
        message:"",
        error_fields:{},
        stype:0,
        cardId:0
    },
    watchInput:function(e){
        let item = e.currentTarget.dataset.model
        this.setData({
            [item]:e.detail.value
        })
    },
    /**
     * 获取银行
     */
    getBank:function(){
        let that = this
        app.wxrequest({
            url:"user/getAdminBank",
            success(res){
                that.setData({
                    bankList:res.adminBank
                })
            }
        })
    },
    addCard:function(){
      let trueName = this.data.trueName,
          bankId = this.data.bankId,
          bankZiName = this.data.bankZiName,
          cardNum = this.data.cardNum,
          phone = this.data.phone,
          code = this.data.code
        if (phone.length < 11){
            app.toast({
                title:"手机号位数不正确"
            })
            return
        }
        if (cardNum.length < 15){
            app.toast({
                title: "银行卡号位数不正确"
            })
            return
        }
        if (code == ""){
            app.toast({
                title:"请输入验证码"
            })
            return
        }
        if (bankId == "" ){
            app.toast({
                title:"开户银行不能为空"
            })
            return
        }
        if (bankZiName == ""){
            app.toast({
                title:"开户支行不能为空"
            })
            return
        }
        if (trueName == ""){
            app.toast({
                title:"姓名不能为空"
            })
            return
        }
        app.wxrequest({
            url:"user/addUserBankcard",
            data:{
                vercode:code,
                user_name:trueName,
                bank_mobile:phone,
                bank_card:cardNum,
                bank_key_id:bankId,
                bank_add:bankZiName
            },
            success(res){
                app.toast({
                    title:"提交成功"
                })
                wx.redirectTo({
                    url:"/pages/boss/cardBag/cardBag"
                })
            },
            error(res){
                if (res == 3002 || res == 3005 || res == 3006) {
                    app.toast({
                        title:"缺少参数"
                    })
                } else if (res == 3003) {
                    app.toast({
                        title:"验证码错误"
                    })
                }else if (res == 3004) {
                    app.toast({
                        title:"银行卡号错误"
                    })
                }else if (res == 3007) {
                    app.toast({
                        title:"手机格式错误"
                    })
                }else if (res == 3008) {
                    app.toast({
                        title:"支行信息错误"
                    })
                }else if (res == 3009) {
                    app.toast({
                        title:"该银行不存在"
                    })
                }else if (res == 3010) {
                    app.toast({
                        title:"银行卡号不属于所选银行"
                    })
                }else if (res == 3011) {
                    app.toast({
                        title:"银行卡校验失败"
                    })
                }else if (res == 3012) {
                    app.toast({
                        title:"该银行卡已添加"
                    })
                }
            }
        })
    },
    radioChange:function(e){
        if (e.detail.value){
           this.setData({
               yh:false
           })
        }
        this.setData({
            bankId:e.detail.value
        })
    },
    select: function () {
        let select = !this.data.select
        this.setData({
            select:select
        })
    },
    popYh:function(){
        let yh = !this.data.yh
        this.setData({
            yh:yh
        })
        this.getBank()
        this.getHeight()
    },
    getBankName:function(e){
        let name = e.currentTarget.dataset.name
        this.setData({
            bankName:name
        })
    },
    getHeight:function(){
        console.log(123)
      let query = wx.createSelectorQuery(),
          that = this;
      query.select("#pop").boundingClientRect(function (rect) {
          console.log(456)
          console.log(rect.height)
          that.setData({
              height:rect.height
          })
      })

    },
    getCode:function(){
        let num = 60,
            that = this;
        let mobile = this.data.phone
        app.wxrequest({
            url:"user/sendvercode",
            data: {
                stype:4,
                mobile:mobile
            },
            success(res){
                let timer = setInterval(function () {
                    num--;
                    that.setData({
                        codeText:num + "s后重新获取",
                        disabled:true
                    })
                    if (num == 0){
                        that.setData({
                            codeText:"获取验证码",
                            disabled:false
                        })
                        clearInterval(timer)
                    }
                },1000)
            },
            error(res){
                if (res == 3004) {
                    app.toast({
                        title: '短信发送失败'
                    })
                } else if (res == 3001) {
                    app.toast({
                        title: '手机号码格式有误'
                    })
                } else if (res == 3003) {
                    app.toast({
                        title: '一分钟内不能重复发送'
                    })
                }
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getHeight()
        this.setData({
            imgHost:app.globalData.host.imgHost
        })
        console.log(options.stype)
        if (options.stype == 1){
            //如果是type=1就是查看驳回原因否则就是正常添加银行卡
            this.getReason(options.cardId)
            this.setData({
                stype:options.stype
            })
            wx.setNavigationBarTitle({
                title:"修改银行卡信息"
            })
        }
    },
    back:function(){
      wx.navigateBack({
          delta:1
      })
    },
    /**
     * 获取一张银行卡信息以及驳回原因
     * @param id
     */
    getReason:function(id){
        this.setData({
            mask:true
        })
        let that = this
        app.wxrequest({
            url:"user/getUserBankcards",
            data: {
                id:id
            },
            success(res){
                that.setData({
                    bankName:res.user_bank.admin_bank.bank_name,
                    bankId:res.user_bank.admin_bank.id,
                    trueName:res.user_bank.user_name,
                    bankZiName:res.user_bank.bank_add,
                    cardNum:res.user_bank.bank_card,
                    phone:res.user_bank.bank_mobile,
                    message:res.user_bank.message,
                    error_fields:res.user_bank.error_fields,
                    cardId:res.user_bank.id
                })
            }
        })
    },
    editCard:function(){
        let code = this.data.code,
            user_name = this.data.trueName,
            bank_mobile = this.data.phone,
            bank_card = this.data.cardNum,
            bank_key_id = this.data.bankId,
            bank_add = this.data.bankZiName,
            cardId = this.data.cardId
        app.wxrequest({
            url:"user/editUserBankcards",
            data:{
                id:cardId,
                vercode:code,
                user_name:user_name,
                bank_mobile:bank_mobile,
                bank_card:bank_card,
                bank_key_id:bank_key_id,
                bank_add:bank_add
            },
            success(res){
                app.toast({
                    title:"提交成功"
                })
                wx.redirectTo({
                    url:"/pages/boss/cardBag/cardBag"
                })
            },
            error(res){
                if (res == 3002 || res == 3005 || res == 3006) {
                    app.toast({
                        title:"缺少参数"
                    })
                } else if (res == 3003) {
                    app.toast({
                        title:"验证码错误"
                    })
                }else if (res == 3004) {
                    app.toast({
                        title:"银行卡号错误"
                    })
                }else if (res == 3007) {
                    app.toast({
                        title:"手机格式错误"
                    })
                }else if (res == 3008) {
                    app.toast({
                        title:"支行信息错误"
                    })
                }else if (res == 3009) {
                    app.toast({
                        title:"该银行不存在"
                    })
                }else if (res == 3010) {
                    app.toast({
                        title:"银行卡号不属于所选银行"
                    })
                }else if (res == 3011) {
                    app.toast({
                        title:"银行卡校验失败"
                    })
                }else if (res == 3012) {
                    app.toast({
                        title:"未审核和审核失败的银行卡才可修改"
                    })
                }else if (res == 3013) {
                    app.toast({
                        title:"该银行卡已添加"
                    })
                }
            }
        })
    },
    know:function(){
      this.setData({
          mask:false
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