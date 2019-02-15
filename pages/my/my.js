// pages/my/my.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
	loginStatus:false,
	userInfo:{},
	con_id:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	  //获取con_id
	  this.getStorage()
  },
  /**
   * 判断是否存在con_id
   */
  checkLogin:function(con_id){
	  //存在就登陆不存在就无登录
	  if(con_id){
		  this.getUser(con_id)
		  this.setData({
			  loginStatus:true
		  })
	  }else{
		  this.setData({
			  loginStatus:false
		  })
		  return
	  }
  },
  getUser:function(con_id){
	  let that = this
	  app.wxrequest({
		  url:"index/user/getuser",
		  data:{con_id:con_id},
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
   * 获取con_id
   */
  getStorage:function(){
	  let that = this
	  wx.getStorage({
	  	key:"con_id",
		success(res) {
			that.checkLogin(res.data)
			console.log(res)
// 			that.setData({
// 				con_id:res.data
// 			})
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