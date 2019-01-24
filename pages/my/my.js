// pages/my/my.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
	loginStatus:false,
	userInfo:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	// console.log(app)
	// this.getUser()
	this.setData({
		userInfo:app.globalData.userInfo
	})
	let that = this;
	wx.getSetting({
		// let that = this;
		success(res) {
			console.log(res.authSetting["scope.userInfo"])	//用户授权结果
			that.checkLogin(res.authSetting["scope.userInfo"])
		}
	})
  },
  checkLogin:function(status){
	  let that = this;
	  if(status){
	  	this.setData({
	  		loginStatus:true
	  	})
	  }else{
	  	this.setData({
	  		loginStatus:false
	  	})
	  }
  },
  getUser:function(){
	  let that = this;
	  app.wxrequest({
		  url:"index/user/getuser",
		  data:{uid:"RVYvaEw2Wk1TeXlnUjdlb2RHc3ZEZz09"},
		  success(res){  
				  let userInfo = res.data
				  switch(parseInt( userInfo.user_identity)){
					  case 1:
					  	userInfo.user_vid = "普通会员"
					  	break;
					  case 2 :
						userInfo.user_vid = "钻石会员";
						break;
					  case 3:
						userInfo.user_vid = "创业店主";
						break;
					  case 4:
						userInfo.user_vid = "boss合伙人";
						break;
						default :
						userInfo.user_vid = "普通会员"
				  }
				  that.setData({
					  userInfo:userInfo
				  })
		  },
		  fail(err){
			  console.log(err)
		  },
		  error(code){
			  console.log(code)
		  }
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