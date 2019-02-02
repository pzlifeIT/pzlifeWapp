// pages/cart/cart.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mask:false,
    valid:[],
		failure:[]
  },

  jian:function(e){

  },
  jia:function(e){

  },
  del:function(e){
    this.setData({
      mask:true
    })
  },
  preventTouchMove:function(e){
		//弹出层防止界面滑动
  },
  hidemask:function(e){
    this.setData({
      mask:false
    })
  },
  none:function(e){
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
			this.getCartGoodsList()
  },
	getCartGoodsList:function(e){
		let that = this
		app.wxrequest({
			url:"index/cart/getUserCart",
			data:{code:"RVYvaEw2Wk1TeXlnUjdlb2RHc3ZEZz09"},
			success(res){
				console.log(res);return;
				that.setData({
					valid:res.valid,
					failure:res.failure
				})
			},
			error(res){
				console.log(res)
				return;
				if(res == 5000){
					wx.showModal({
						title:"请先登录",
						content:"是否确定去登录",
						showCancel:true,
						confirmColor:"#E61F18",
						success(res){
							if(res.confirm){//点击确定
								wx.navigateTo({
									url:"/pages/login/login"
								})
							}
						}
					})
				}
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