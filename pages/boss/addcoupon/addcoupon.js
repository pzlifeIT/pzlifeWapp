// pages/boss/addcoupon/addcoupon.js
const app = getApp()
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		imgHost: '',
		startDate:"2018.09.15",
		endDate:"2019.01.03",
		title:"",
		subtitle:"",
		number:0,
		full:0,
		subtract:0
	},
	inputwacth:function(e){
		console.log(e)
		let item = e.currentTarget.dataset.model,
			model = e.detail.value
		this.setData({
			[item]:model
		})
	},
    selectStartDate:function(e){
		console.log(e)
		let endDate = this.data.endDate
		if (e.detail.value > endDate){
			app.toast({
				title:"开始时间不能大于结束时间"
			})
			return
		}
		this.setData({
			startDate:e.detail.value
		})
	},
    selectEndDate:function(e){
        console.log(e)
		let start = this.data.startDate
		if (e.detail.value < start){
			app.toast({
				title:"结束时间不能小于开始时间"
			})
			return
		}
        this.setData({
            endDate:e.detail.value
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
