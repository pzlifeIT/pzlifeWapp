// pages/activity/buyvip/buyvip.js
const app = getApp()
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		mask: true,
		imgUrls: [
			app.globalData.host.imgHost+"solitairebanner1.jpg",
			app.globalData.host.imgHost+"solitairebanner3.jpg",
			app.globalData.host.imgHost+"solitairebanner2.jpg"
		],
		uid: "",
		imgHost:'',
		navH:0
	},
	button: function() {
		let maks = !this.data.mask
		this.setData({
			mask: mask
		})
	},
	preventTouchMove: function() {
		//防止用户操作弹出层外界面
	},
	 editstatus: function() {
	    let mask = !this.data.mask
	    this.setData({
	        mask: mask
	    })
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		this.setData({
		    imgHost: app.globalData.host.imgHost,
			navH:app.globalData.topHeadHeight
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
		let that = this,
			share = app.share({
				title: "恭喜获得钻石会员卡",
				path: '/pages/activity/activity',
				imageUrl: "http://pnkp5i8sb.bkt.clouddn.com/nomember01.png"
			})
		return share
	}
})
