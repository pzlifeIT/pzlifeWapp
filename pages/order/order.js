// pages/order/order.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        orhead: '1',
        order:true,
        orderStatus:1,
		mask:false
    },
	comfir:function(e){
		this.setData({
			mask:true
		})
	},
	 preventTouchMove:function(e){
	
	},
	hidemask:function(e){
	  this.setData({
	    mask:false
	  })
	},
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

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
    headtap: function(e) {
        console.log(e.currentTarget.dataset.num)
        let n = e.currentTarget.dataset.num
        this.setData({
            orhead: n,
            orderStatus:n
        })
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