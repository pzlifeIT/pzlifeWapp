// pages/login/register/register.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
       phone:null,
	   code:null,
	   getCode:"获取验证码",
	   time:59,
	   disabled:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  /**
   * 获取输入的值
   */
  inputwacth:function(e){
	  console.log(e)
	  let item = e.currentTarget.dataset.model
	  console.log(item)
	  this.setData({
		  [item]:e.detail.value
	  }),
	  console.log(this.data.phone)
	  console.log(this.data.code)
  },
  /**
   * 获取短信验证码
   */
  getCaptcha:function(e){ 
	  console.log("huoqule")
	  let phone = parseInt(this.data.phone),
	      that = this
	  app.wxrequest({
		url:"index/user/sendvercode",
		data:{mobile:phone,stype:1},
		success(res){
			that.timeOut()
		},
		error(res){
			if(res == 3004){
				wx.showToast({
					title:"短信发送失败",
					icon:"none",
					duration:2000
				})
			}else if(res == 3001){
				wx.showToast({
					title:"手机号码格式有误",
					icon:"none",
					duration:2000
				})
			}else if(res == 3003){
				wx.showToast({
					title:"一分钟内不能重复发送",
					icon:"none",
					duration:2000
				})
			}
		},
		fail(res){
			console.log(res)
		}
	})
  },
  timeOut:function(){
	  let num = this.data.time,
			that = this
	  setTimeout(function(){
	  	num--
		if(num<=1){
			that.setData({
				getCode:"获取验证码"
			})
			return
		}
	  	that.setData({
	  		getCode:num+"秒后重发",
			disabled:true
	  	})
	  },1000)
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