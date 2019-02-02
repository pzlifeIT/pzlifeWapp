// pages/category/goods/goods.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
		goods:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
		let cate_id = options.cate_id	
		let sub_id = options.sub_id
		if(cate_id){
			this.getCateGoodsList(cate_id)
		}
		if(sub_id){
			this.getSubGoodsList(sub_id)
		}
  },
  /**
   * 获取分类商品列表
   */
	getCateGoodsList:function(id){
		let that = this
		app.wxrequest({
			url:"index/goods/getCategoryGoods",
			data:{cate_id:id},
			success(res){
				that.setData({
					goods:res.data
				})
			},
			error(res){
				console.log(res)
			}
		})
	},
	/**
	 * 获取专题商品
	 */
	getSubGoodsList:function(id){
		let that = this 
		app.wxrequest({
			url:"index/goods/getSubjectGoods",
			data:{subject_id:id},
			success(res){
				console.log(res)
				that.setData({
					goods:res.data
				})
			},
			error(res){
				console.log(res)
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