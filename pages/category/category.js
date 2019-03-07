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
		indx:0
	},
	//把所有的二级分类都找出来，全部展示在右边，然后当二级分类的父级id和一级分类id一样时就选中

	selectSub: function(e) {
		//点击获取当前点击的一级分类的id，
		console.log(this.data.firstSub)
		let i = e.currentTarget.dataset.i;
		console.log(i)
		let id = e.currentTarget.dataset.subId,
			//根据一级id找到对应的二三级
			showClassify = this.getShowSub(this.data.subData, id)
		this.setData({
			ind: id,
			showSub: showClassify,
			idx: 0,
			secondCate: [],
			toview: "p" + this.data.firstSub[i].id
		})
	},
	getHeight: function() {
		let that = this;
		let query = wx.createSelectorQuery().in(this);
		let heightArr = [];
		let s = 0
		query.selectAll(".wai").boundingClientRect((react) => {
			//计算出所有wai的高度
			// console.log(react)
			react.forEach((res) => {
				// console.log(res)
				s += res.height;
				heightArr.push(s)
			});
			console.log(s)
			console.log(heightArr)
			this.setData({
				heightArr: heightArr
			});
		});
		query.select(".cate_right").boundingClientRect(function(res) {
			that.setData({
				right: res.height
			})
		}).exec()
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {

		// this.getClassify()
		this.getSubject()
		this.setData({
			imgHost: app.globalData.host.imgHost
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
	//如果最顶部的third 的pid是几那么ind就是几
	//把pid收集起来
	gun: function(e) {
		// this.getHeight()
		let scrollTop = e.detail.scrollTop;
		let scrollArr = this.data.heightArr;
		console.log(this.data.heightArr)
		console.log(this.data.right)
		console.log(this.data.firstSub)
		//[106, 294, 400, 506, 612, 718, 988, 1094, 1200, 1306, 1412, 1518, 1624, 1730, 1836, 1942, 2048, 2236, 2342, 2530, 2636, 2742, 2930, 3036, 3224, 3330, 3436, 3542, 3648, 3754, 3942, 4048, 4154]
		//滚动的距离大于等于最后一个wai的高度减去右边的整个高度（475）那就超出最大的高度
		if (scrollTop >= scrollArr[scrollArr.length - 1] - this.data.right) {
			return
		} else {
			//循环所有的wai的高度，如果滚动距离大于等于0，并且滚动高度小于第一个框的高度说明就是初始的
			for (let i = 0; i < scrollArr.length; ++i) {
				if (scrollTop >= 0 && scrollTop < scrollArr[0]) {
					this.setData({
						ind: 0
					})
					//如果滚动条高度大于等于
				} else if (scrollTop >= scrollArr[i - 1] && scrollTop < scrollArr[i]) {
					this.setData({
						ind:i
					})
				}
			}
		}
		//获取每一个wai的高度，
		// 		let h = 0,
		// 			firstSub = this.data.firstSub,
		// 			ind;
		// 		let that = this
		// 		console.log(firstSub)
		// 		firstSub.forEach(function(classfiy,i){
		// 			console.log(i)
		// 			var _h= 26+firstSub.length(classfiy["id"])*102;
		// 			if(scrollTop >= h){
		// 				ind = classfiy[i]
		// 			}
		// 			h += _h;
		// 		})
		// 		that.setData({
		// 			ind:ind
		// 		})
	},
	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function() {
		this.getHeight()
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
