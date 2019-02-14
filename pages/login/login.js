// pages/login/login.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
	
  },
  bindGetUserInfo:function(e){
	 wx.login({
	 	success(res) {
			if(res.code){
				app.wxrequest({
					url:"index/user/loginuserbywx",
					data:{code:res.code},
					success(res){
						wx.reLaunch({
							url:"/pages/index/index"
						})
					},
					error(res){
						if (res == 3000) {
							wx.showToast({
								title: "用户不存在",
								icon: "none",
								duration: 2000
							})
						} else if (res == 3001) {
							wx.showToast({
								title: "code码错误",
								icon: "none",
								duration: 2000
							})
						} else if (res == 3002) {
							wx.showToast({
								title: "无手机号，请先注册",
								icon: "none",
								duration: 2000
							})
						} else if (res == 3003) {
							wx.showToast({
								title: "登录失败",
								icon: "none",
								duration: 2000
							})
						} 
					},
					fail(res){
						
					}
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