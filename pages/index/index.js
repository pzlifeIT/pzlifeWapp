//index.js
//获取应用实例
const app = getApp()

Page({
	data: {
		imgUrls: [
			app.globalData.host.imgHost + "banner.png",
			app.globalData.host.imgHost + "banner.png",
			app.globalData.host.imgHost + "banner.png",
		],
		motto: 'Hello World',
		userInfo: {},
		hasUserInfo: false,
		canIUse: wx.canIUse('button.open-type.getUserInfo'),
		imgHost: '',
		num:1,
		pos_scroll:0
	},
	//事件处理函数
	bindViewTap: function() {
		wx.navigateTo({
			url: '../logs/logs'
		})
	},
	swiper:function(e){
		this.setData({
			num:parseInt(e.detail.current)+1
		})
	},
	movescroll:function(e){
		console.log(e)
		if(e.detail.scrollLeft >=500){
			e.detail.scrollLeft = 500
		}
		this.setData({
			pos_scroll:parseInt(e.detail.scrollLeft)
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
	onLoad: function() {
		this.setData({
			imgHost: app.globalData.host.imgHost
		})
	},
	bindRegionChange: function(e) {
		console.log(e)
	},
	getUserInfo: function(e) {
		console.log(e)
		app.globalData.userInfo = e.detail.userInfo
		this.setData({
			userInfo: e.detail.userInfo,
			hasUserInfo: true
		})
	}
})
