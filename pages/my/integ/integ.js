// pages/my/integ/integ.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		scroll_height:0,
		inte:[],
		integ:0
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		let windowHeight = wx.getSystemInfoSync().windowHeight,
			windowWidth = wx.getSystemInfoSync().windowWidth,
			integ = options.integ
		this.setData({
			scroll_height: windowHeight * 750 / windowWidth - 308 - 30,
			integ:integ
		})
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

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function() {

	}
})
