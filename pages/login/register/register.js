// pages/login/register/register.js
const app = getApp()
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		phone: null,
		code: null,
		pass: "",
		checkpass: "",
		getcode: "获取验证码",
		time: 59,
		disabled: false,
		logcode: ""
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {

	},
	/**
	 * 获取输入的值
	 */
	inputwacth: function(e) {
		console.log(e)
		let item = e.currentTarget.dataset.model
		// console.log(item)
		this.setData({
				[item]: e.detail.value
			}),
			console.log(this.data.pass)
		console.log(this.data.checkpass)
	},
	/**
	 * 获取短信验证码
	 */
	getCaptcha: function(e) {
		console.log("huoqule")
		let phone = parseInt(this.data.phone),
			that = this
		app.wxrequest({
			url: "index/user/sendvercode",
			data: {
				mobile: phone,
				stype: 1
			},
			success(res) {
				that.timeOut()
			},
			error(res) {
				if (res == 3004) {
					wx.showToast({
						title: "短信发送失败",
						icon: "none",
						duration: 2000
					})
				} else if (res == 3001) {
					wx.showToast({
						title: "手机号码格式有误",
						icon: "none",
						duration: 2000
					})
				} else if (res == 3003) {
					wx.showToast({
						title: "一分钟内不能重复发送",
						icon: "none",
						duration: 2000
					})
				}
			},
			fail(res) {
				console.log(res)
			}
		})
	},
	timeOut: function() {
		let num = this.data.time,
			that = this
		let i = setInterval(function() {
			num--
			if (num < 1) {
				that.setData({
					getcode: "获取验证码",
					disabled:false
				})
				clearInterval(i)
				return
			}
			that.setData({
				getcode: num + "秒后重发",
				disabled: true
			})
		}, 1000)
	},
	/**
	 * 注册
	 */
	bindGetUserInfo: function(e) {
		this.getCode()
		let encrypteddata = e.detail.encryptedData,
			iv = e.detail.iv,
			mobile = this.data.phone,
			vercode = this.data.code,
			password = this.data.pass,
			checkpass = this.data.checkpass,
			code = this.data.logcode		
		if (password != checkpass) {
			wx.showToast({
				title: "两次密码不一致",
				icon: "none",
				duration: 2500
			})
		}
		app.wxrequest({
			url: "index/user/register",
			data: {
				mobile: mobile,
				encrypteddata: encrypteddata,
				iv: iv,
				vercode: vercode,
				password: password,
				code: code
			},
			success(res) {
				wx.showToast({
					title: "注册成功",
					icon: "none",
					duration: 2000
				})
			},
			error(res) {
				if (res == 3001) {
					wx.showToast({
						title: "手机格式有误",
						icon: "none",
						duration: 2000
					})
				} else if (res == 3002) {
					wx.showToast({
						title: "code码错误",
						icon: "none",
						duration: 2000
					})
				} else if (res == 3004) {
					wx.showToast({
						title: "验证码格式有误",
						icon: "none",
						duration: 2000
					})
				} else if (res == 3005) {
					wx.showToast({
						title: "密码强度不够",
						icon: "none",
						duration: 2000
					})
				} else if (res == 3006) {
					wx.showToast({
						title: "验证码错误",
						icon: "none",
						duration: 2000
					})
				} else if (res == 3007) {
					wx.showToast({
						title: "注册失败",
						icon: "none",
						duration: 2000
					})
				} else if (res == 3008) {
					wx.showToast({
						title: "手机号已被注册",
						icon: "none",
						duration: 2000
					})
				}
			},
			fail(res) {

			}
		})
	},
	getCode: function() {
		let that = this
		wx.login({
			success(res) {
				that.setData({
					logcode: res.code
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
