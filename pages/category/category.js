// pages/category/category.js
const url = require("../../config.js").url;
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
		firstSub:[],
		subData:[],
		showSub:[],
		ind:0
    },


    //选择一级分类
    selectCate: function(e) {
        let id = e.currentTarget.dataset.cateId,
            showClassify = this.getshowClassify(this.data.classify, id)
        this.setData({
            idx: id,
            secondCate: showClassify,
			ind:0,
			showSub:[]
        })
    },
	selectSub:function(e){
		let id = e.currentTarget.dataset.subId,
		//根据一级id找到对应的二三级
			showClassify = this.getShowSub(this.data.subData,id)
			this.setData({
				ind:id,
				showSub:showClassify,
				idx:0,
				secondCate:[]
			})
	},
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        // this.getClassify()
		this.getSubject()
    },
    /**
     * 获取分类
     */
    getClassify: function() {
        let that = this
        app.wxrequest({
            url: 'index/category/getfirstcate',
            success(res) {
				console.log(res)
                let first = that.getfirst(res.data),
                    id = res.data[0].id,
                    showClassify = that.getshowClassify(res.data, id)
                that.setData({
                    firstCate: first,
                    classify: res.data,
                    // secondCate: showClassify,
                    // idx: id		
                })
            }
        })
    },
	/**
	 * 获取专题
	 */
	getSubject:function(){
		let that = this
		app.wxrequest({
			url:"index/category/getGoodsSubject",
			success(res){
				
				let firstSub = that.getFirstSub(res.data),
					id = res.data[0].id,
					showSub = that.getShowSub(res.data,id)
					that.setData({
						firstSub:firstSub,
						subData:res.data,
						showSub:showSub,
						ind:id
					})
			}
		})
	},
	/**
	 * 获取一级专题
	 */
	getFirstSub:function(data){
		let arr = []
		for(var i=0;i<data.length;i++){
		let	json = {}
			json.id = data[i].id
			json.subject = data[i].subject
			arr.push(json)
		}
		return arr
	},
    /**
     * 获取一级分类
     */
    getfirst: function(data) {
        let len = data.length,
            i, arr = [],
            json1
        for (i = 0; i < len; i++) {
            json1 = {}
            json1.id = data[i].id
            json1.type_name = data[i].type_name
            arr.push(json1)
        }
        return arr
    },
	/**
	 * 获取二三级专题
	 */
	getShowSub:function(data,id){
// 		console.log(data)
// 		console.log(id)
		//循环遍历数组，根据传过来的一级id获取当前一级专题的子专题，放进一个空数组中
		let arr = []
		for(let i = 0;i<data.length;i++ ){
			if(id == data[i].id){
				if(data[i]._child instanceof Array){
					arr = data[i]._child
				}
				break
			}
		}
		// console.log(arr)
		return arr;
	},
    /**
     * 获取展示分类
     */
    getshowClassify: function(data, id) {
        let len = data.length,
            i, arr = [],
            json1
        for (i = 0; i < len; i++) {
            if (id == data[i].id) {
                if (data[i]._child instanceof Array) {
                    arr = data[i]._child
                }
                break
            }
        }
        return arr
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