// pages/category/category.js
const app = getApp()
Page({
	data: {
		category: "",
		firstCate: [],
		secondCate: [],
		classify: [],
		thirdCate: {
			"title": "",
			"image": ""
		},
		idx: 0,
		firstSub: [],
		subData: [],
		showSub: [],
		ind: 0,
		imgHost: '',
		third: [],
		pid: [],
		toview: "p1",
		heightArr: [],
		right: 0,
		windowheight:0,
		navactive:0,
		lastactive:0
	},


	selectSub: function(e) {
		//点击获取当前点击的一级分类的id，
		console.log(this.data.firstSub)
		let i = e.currentTarget.dataset.i;
		let id = e.currentTarget.dataset.subId,
			//根据一级id找到对应的二三级
			showClassify = this.getShowSub(this.data.subData, id)
			console.log(id)
		this.setData({
			ind: id,
			showSub: showClassify,
			idx: 0,
			secondCate: [],
			toview: "p" + id, //scroll-into-view的值 对应子元素的id值
			navactive:i //索引
		})
		console.log(this.data.ind)
	},
	getHeight: function() {
		let that = this;
		let query = wx.createSelectorQuery().in(this);
		let heightArr = [];
		let s = 0
		query.selectAll(".wai").boundingClientRect((react) => {
			//计算出所有wai的高度
			console.log(react)
			react.forEach((res) => {
				// console.log(res)
				s += res.height;
				heightArr.push(s)
			});
			this.setData({
				heightArr: heightArr
			});
		});
		//获取右边可视高度
		query.select(".cate_right").boundingClientRect(function(res) {
			that.setData({
				right: parseInt(res.height)
			})
		}).exec()
// 		for(let i=0;i<this.data.third.length;i++){
// 			s = s +40+ this.data.third[i].length * 90;
// 			heightArr.push(s)
// 		}
// 		this.setData({
// 			heightArr:heightArr
// 		})
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		this.getwindowheight()
		// this.getClassify()
		this.getSubject()
		this.setData({
			imgHost: app.globalData.host.imgHost
		})
	},
	getwindowheight:function(){
		let that = this
		wx.getSystemInfo({
			success(res) {
				that.setData({
					windowheight:parseInt(res.windowHeight) - 90
				})
			}
		})
	},
	/**
	 * 获取专题
	 */
	getSubject: function() {
		let that = this
		app.wxrequest({
			url: "category/getGoodsSubject",
			nocon: true,
			success(res) {
				console.log(res.data)
				let firstSub = that.getFirstSub(res.data),
					id = res.data[0].id,
					showSub = that.getShowSub(res.data, id)
				that.getthird(res.data)
				that.setData({
					firstSub: firstSub,
					subData: res.data,
					showSub: showSub,
					ind: id
				})
			}
		})
	},
	getthird: function(data) {
		let arr = [],
			pid = []
		for (let i = 0; i < data.length; i++) {
			for (let j = 0; j < data[i]._child.length; j++) {
				arr.push(data[i]._child[j])
				pid.push(data[i]._child[j].pid)
			}
		}
		console.log(arr)
		this.setData({
			third: arr,
			pid: pid
		})
	},
	/**
	 * 获取一级专题
	 */
	getFirstSub: function(data) {
		let arr = []
		for (var i = 0; i < data.length; i++) {
			let json = {}
			json.id = data[i].id
			json.subject = data[i].subject
			arr.push(json)
		}
		return arr
	},
	/**
	 * 获取二三级专题
	 */
	getShowSub: function(data, id) {
		// 		console.log(data)
		// 		console.log(id)
		//循环遍历数组，根据传过来的一级id获取当前一级专题的子专题，放进一个空数组中
		let arr = []
		for (let i = 0; i < data.length; i++) {
			if (id == data[i].id) {
				if (data[i]._child instanceof Array) {
					arr = data[i]._child
				}
				break
			}
		}
		// console.log(arr)
		return arr;
	},
	gun: function(e) {
		// this.getHeight()
		console.log(this.data.right)
		let scrollTop = e.detail.scrollTop;
		let scrollArr = this.data.heightArr;
		//每一块区域距离顶部的高度
		//[106, 294, 400, 506, 612, 718, 988, 1094, 1200, 1306, 1412, 1518, 1624, 1730, 1836, 1942, 2048, 2236, 2342, 2530, 2636, 2742, 2930, 3036, 3224, 3330, 3436, 3542, 3648, 3754, 3942, 4048, 4154]
		//[34, 150, 184, 218, 252, 286, 484, 518, 552, 586, 620, 654, 688, 722, 756, 790, 824, 858, 892, 1008, 1042, 1076, 1192, 1226, 1342, 1376, 1410, 1444, 1478, 1594, 1628, 1662]
		//滚动的距离大于等于最后一个wai的高度减去右边的整个高度（475）那就超出最大的高度
		console.log(scrollArr)
		console.log(scrollTop)
		//如果滚动的高度大于最后一个框距离顶部的距离，那就超出了
		if (scrollTop > scrollArr[scrollArr.length - 1]) { // this.data.right
			return
		} else {
			//循环所有的wai的高度，如果滚动距离大于等于0，并且滚动高度小于第一个框的高度说明就是初始的
			for (let i = 0; i < scrollArr.length; i++) {
				if (scrollTop >= 0 && scrollTop < scrollArr[0]) {
					// if(0 != this.data.lastactive){
						this.setData({
							navactive: 0
						})
					//如果滚动条高度大于等于
				} else if (scrollTop >= scrollArr[i - 1] - 24 && scrollTop <= scrollArr[i] - 24) {
					// if(i != this.data.lastactive){
						this.setData({
							navactive:i
						})
				}
			}
		}
	},
	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function() {
		this.getHeight()
		// this.getwindowheight()
	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function() {
this.getHeight()
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
