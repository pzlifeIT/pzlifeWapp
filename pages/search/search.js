// pages/search/search.js
const app = getApp()
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		search: '',
		searchList:[],
		goodsList:[]
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {

	},
	inputwacth: function(e) {
		console.log(e)
		this.setData({
			search: e.detail.value
		});

	},
	/**
	 * 搜索
	 */
	mid:function(keyword =""){
		//获取数组
		let arr = this.data.searchList
		console.log(this.data.searchList)
		//将搜索的词放进数组中
		let search = this.data.search.replace(/\s*/g, "");
		if (keyword) {
			search = keyword.replace(/\s*/g, "")
		}
		if (search == "") {
			console.log(123)
			return false
		}
		arr.unshift(search)
		for (let i = 0; i < arr.length - 1; i++) {
			for (let j = i + 1; j < arr.length; j++) {
				if (arr[i] == arr[j]) {
					arr.splice(j, 1)
					j--
				}
			}
		}
		//将搜索的词存进全局变量
		wx.setStorageSync("searchList", arr)
		this.getSearchGood(search)
	},
	/**
	 * 请求搜索
	 */
	getSearchGood: function(search) {
	    let that = this
	    app.wxrequest({
	        url: "index/goods/getSearchGoods",
	        data: { search: search },
	        nocon: true,
	        success(res) {
	            that.setData({
	                goodsList: res.goods_data
	            })
	        },
	        error(res) {
	
	        },
	        fail(res) {
	
	        }
	    })
	},
	/**
	 * 点击搜索按钮
	 */
	getSearchGoods: function(e) {
		this.mid()
	},
	clickSearch: function(e) {
		console.log(e)
		let keyword = e.currentTarget.dataset.keyword
		console.log(keyword)
		this.mid(keyword)
		this.setData({
			search:keyword
		})
	},
	del:function(){
		let that =this
		wx.showModal({
			title:"提示",
			content:"是否确认清空？",
			success(res) {
				if(res.confirm){
					wx.setStorageSync("searchList",[])
					that.setData({
						searchList:[]
					})
				}
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
		// 		获取搜索历史
		this.setData({
			searchList:  wx.getStorageSync("searchList") || []
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
