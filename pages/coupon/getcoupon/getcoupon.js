// pages/coupon/getcoupon/getcoupon.js
const app = getApp()
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		couponList: [1],
		click: false,
		imgHost: ''
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		this.setData({
			imgHost: app.globalData.host.imgHost
		})
	},
	/**
	 * 下拉刷新
	 */
	onPullDownRefresh: function() {
		wx.showNavigationBarLoading() //在标题栏中显示加载
		//模拟加载
		setTimeout(function() {
			wx.hideNavigationBarLoading() //完成停止加载
			wx.stopPullDownRefresh() //停止下拉刷新
		}, 1500);
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
