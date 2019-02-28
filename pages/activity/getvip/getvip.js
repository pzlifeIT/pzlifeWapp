// pages/activity/buyvip/buyvip.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
	mask:false,
	imgUrls:[
		"http://pnkp5i8sb.bkt.clouddn.com/solitairebanner1.jpg",
		"http://pnkp5i8sb.bkt.clouddn.com/solitairebanner3.jpg",
		"http://pnkp5i8sb.bkt.clouddn.com/solitairebanner2.jpg"
	]
  },
	button:function(){
		let maks = !this.data.mask
		this.setData({
			mask:mask
		})
	},
	preventTouchMove: function() {
	    //防止用户操作弹出层外界面
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