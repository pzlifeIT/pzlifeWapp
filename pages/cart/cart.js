// pages/cart/cart.js
const app = getApp();
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		mask: false,
		valid: [],
		failure: [],
		total: 0,
		selectAll: true,
		sku_id:0,
		con_id:""
	},
	/**
	 * 全选
	 */
	selectAll: function() {
		let valid = this.data.valid,
			selectAll = !this.data.selectAll			
		for(let i=0;i<valid.length;i++){
			valid[i].selectStatus = selectAll
			for(let j=0;j<valid[i].goods.length;j++){
				valid[i].goods[j].selectStatus = selectAll
				if(valid[i].goods[j].selectStatus == false){
					 selectAll = false
				}
			}
		}
		
		this.setData({
			valid:valid,
			selectAll:selectAll
		});
		this.getTotal(valid)
	},
	/**
	 * 选择店铺
	 */
	selectShop: function(e) {
		let valid = e.currentTarget.dataset.valid,
			validIndex = e.currentTarget.dataset.validIndex,
			selectShop = !valid[validIndex].selectStatus,
			select = []
		for(let i=0;i<valid[validIndex].goods.length;i++){
			valid[validIndex].goods[i].selectStatus = selectShop
			select[i] = valid[validIndex].goods[i].selectStatus
		}
		let status = false
		let have = select.indexOf(status)
		if(have<0){//如果没有false
			this.setData({
				selectAll:true
			})
		}else{
			this.setData({
				selectAll:false
			})
		}
		valid[validIndex].selectStatus = selectShop
		this.setData({
			valid:valid
		});
		this.getTotal(valid)
	},
	/**
	 * 选择商品
	 */
	selectGoods: function(e) {
		let goodsIndex = e.currentTarget.dataset.goodsIndex,
			goods = e.currentTarget.dataset.goods,
			selectStatus = !goods[goodsIndex].selectStatus,
			validIndex = e.currentTarget.dataset.validIndex,
			valid = this.data.valid	
			console.log(goods)
			console.log(valid)
		goods[goodsIndex].selectStatus = selectStatus
		valid[validIndex].goods = goods
		let select = []
		for(let i=0;i<goods.length;i++){
			//必须所有的都是true全选才是true
			//把所有的状态都存进一个数组里，如果数组元素有一个是false就不能是true
			select[i] = goods[i].selectStatus
		}
		let status = false
		let have = select.indexOf(status)
		if(have<0){//如果没有false
			this.setData({
				selectAll:true
			})
		}else{
			this.setData({
				selectAll:false
			})
		}
		let haveTrue = select.indexOf(true)
		if(haveTrue >= 0){
			valid[validIndex].selectStatus = true
		}else{
			valid[validIndex].selectStatus = false
		}
		this.setData({
			valid:valid
		});
		this.getTotal(valid)
	},
	/**
	 * 计算总价
	 */
	getTotal:function(valid){
		 // valid = this.data.valid,
		let	total = 0
			for(let i=0;i<valid.length;i++){
				for(let j=0;j<valid[i].goods.length;j++){
					if(valid[i].goods[j].selectStatus){
						total += valid[i].goods[j].buy_num * valid[i].goods[j].retail_price
					}
				}
			}
			this.setData({
				// valid:valid,
				total:total
			})
	},
	jian: function(e) {
		const goodsIndex = e.currentTarget.dataset.goodsIndex //商品下标
		let goods = e.currentTarget.dataset.goods, //商品数据
			num = goods[goodsIndex].buy_num, //购买数量
			valid = this.data.valid,
			validIndex = e.currentTarget.dataset.validIndex //有效商品下标
		if (num <= 1) {
			return false
		}
		num = num - 1
		goods[goodsIndex].buy_num = num
		//在获取大的数组和下标然后把这个goods放进大数组中替换掉原有的元素
		valid[validIndex].goods = goods
		this.setData({
			valid: valid
		});
		this.getTotal(valid)
	},
	jia: function(e) {
		const goodsIndex = e.currentTarget.dataset.goodsIndex //商品下标
		let goods = e.currentTarget.dataset.goods, //商品数据
			num = goods[goodsIndex].buy_num, //购买数量
			valid = this.data.valid,
			validIndex = e.currentTarget.dataset.validIndex, //有效商品下标
			stock = goods[goodsIndex].stock
		// console.log(e)
		// 		return
		if (num > stock) {
			return false
		}
		num = num + 1
		goods[goodsIndex].buy_num = num
		//在获取大的数组和下标然后把这个goods放进大数组中替换掉原有的元素
		valid[validIndex].goods = goods
		this.setData({
				valid: valid
			}),
		this.getTotal(valid)
	},
	del: function(e) {
		console.log(e)
		let sku_id = e.currentTarget.dataset.sku
		this.setData({
			mask: true,
			sku_id:sku_id
		})
	},
	confirmDel:function(){
		let sku_id = this.data.sku_id,
			con_id = this.data.con_id
		app.wxrequest({
			url:"index/cart/editUserCart",
			data:{con_id:con_id,del_skuid:sku_id},
			success(res){
				console.log(res)
			},
			error(res){
				console.log(res)
			},
			fail(res){
				console.log(res)
			}
		})
	},
	preventTouchMove: function(e) {
		//弹出层防止界面滑动
	},
	hidemask: function(e) {
		this.setData({
			mask: false
		})
	},
	none: function(e) {

	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		// this.getCartGoodsList()
		// this.getStorage()
	},
	/**
	 * 添加选择状态字段
	 */
	addText:function(data){
		for(let i = 0;i<data.length;i++){
			data[i].selectStatus = true
			for(let j = 0;j<data[i].goods.length;j++){
				data[i].goods[j].selectStatus = true
			}
		}
		return data
	},
	getCartGoodsList: function(con_id) {
		let that = this
		app.wxrequest({
			url: "index/cart/getUserCart",
			data: {
				con_id: con_id
			},
			success(res) {
				let valid = that.addText(res.valid)
				that.setData({
					valid: valid,
					failure: res.failure
				});
				that.getTotal(valid)
			},
			error(res) {
				console.log(456)
				if (res == 5000) {
					wx.showModal({
						title: "请先登录",
						content: "是否确定去登录",
						showCancel: true,
						confirmColor: "#E61F18",
						success(res) {
							if (res.confirm) { //点击确定
								wx.navigateTo({
									url: "/pages/login/login"
								})
							}
						}
					})
				} else if (res == 3000) {
					that.setData({
						valid: [],
						failure: []
					})
				}
			}
		})
	},
	/**
	 * 获取con_id
	 */
	getStorage: function() {
		let that = this
		wx.getStorage({
			key: "con_id",
			success(res) {
				that.getCartGoodsList(res.data)
				console.log(res)
				that.setData({
					con_id:res.data
				})
			},
			fail(res) {
				wx.showModal({
					title: "请先登录",
					content: "是否确定去登录",
					showCancel: true,
					confirmColor: "#E61F18",
					success(res) {
						if (res.confirm) { //点击确定
							wx.navigateTo({
								url: "/pages/login/login"
							})
						}
					}
				})
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
		this.getStorage()
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
