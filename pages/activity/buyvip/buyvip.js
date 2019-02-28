// pages/activity/buyvip/buyvip.js
const app = getApp()
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
	],
	share_id:"",
	con_id:""
  },
	button:function(){
		let maks = !this.data.mask
		this.setData({
			mask:mask
		})
	},
	buy:function(){
		let share_id = this.data.share_id,
			that = this
		app.wxrequest({
			url:"index/order/createMemberOrder",
			data:{pay_type:2,user_type:1,parent_id:share_id},
			nocon:false,
			success(res){				
				that.pay(res.order_data.order_no)
			},
			error(res){
				app.modal({
					title:""
				})
			}
		})
	},
	gopaystatus: function(data) {
	    let that = this
	    wx.redirectTo({
	        url: '/pages/paystatus/paystatus?status=' + data.status + '&orderno=' + data.order_no + '&siteid=' + that.data.siteid + '&price=' + that.data.stat.total_price
	    })
	},
	pay:function(order_no){
		app.wxrequest({
			url:"pay/pay/pay",
			data:{order_no:order_no,payment:'2',platform:'1'},
			nocon:true,
			success(res){
				let parameters = res.parameters,
					that = this
				wx.requestPayment({
				    timeStamp: parameters.timeStamp,
				    nonceStr: parameters.nonceStr,
				    package: parameters.package,
				    signType: parameters.signType,
				    paySign: parameters.paySign,
				    success(res) {
				        that.setData({
							mask:true
						})
				    },
				    fail(res) {
				        that.gopaystatus({
				            order_no: data.order_no,
				            status: 2
				        })
				    }
				})
			}
		})
	},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	let share_id = options.share_id,
		con_id = options.con_id
		this.setData({
			share_id:share_id,
			con_id:con_id
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