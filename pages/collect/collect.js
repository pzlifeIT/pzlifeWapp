// pages/collect/collect.js
const app = getApp()
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		collect: 1,
		selectShop: false,
		collectGoods: [],
		imgHost: ''
	},
	select: function(e) {
		let num = e.currentTarget.dataset.num
		this.setData({
			collect: num
		})
	},
	selectShop: function() {
		let status = !this.data.selectShop
		this.setData({
			selectShop: status
		})
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
