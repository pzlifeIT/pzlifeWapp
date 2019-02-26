// pages/category/goods/goods.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        goodsList: [],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        let search = options.search
        let sub_id = options.sub_id
        if (sub_id) {
            this.getSubGoodsList(sub_id)
        } else if(search){
			this.getSearchGoods(search)
		}
		
    },
    /**
     * 获取分类商品列表
     */
    getSearchGoods: function(search) {
		let that = this
        app.wxrequest({
        	url:"index/goods/getSearchGoods",
        	data:{search:search},
        	 nocon: true,
        	success(res){
        		that.setData({
					goodsList:res.goods_data
				})
        	},
        	error(res){
        		
        	},
        	fail(res){
        		
        	}
        })
    },
    /**
     * 获取专题商品
     */
    getSubGoodsList: function(id) {
        let that = this
        app.wxrequest({
            url: "index/goods/getSubjectGoods",
            data: { subject_id: id },
            nocon: true,
            success(res) {
                console.log(res)
                that.setData({
                    goodsList: res.data
                })
            },
            error(res) {
                console.log(res)
            }
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