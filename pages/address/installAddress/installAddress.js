// pages/address/installAddress/installAddress.js
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        id: '',
        name: '',
        mobile: '',
        address: '',
        region: [],
		imgHost:""
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
		this.setData({
		    imgHost: app.globalData.host.imgHost
		})
        if (options.id) {
            this.setData({
                id: options.id
            })
            this.getUserAddress(options.id)
        } else {

        }
        this.setData
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },
    bindname: function(e) {
        console.log(e.detail.value)
        this.setData({
            name: e.detail.value
        })
    },
    bindmobile: function(e) {
        console.log()
        let mobile = e.detail.value
        mobile = mobile.replace(/[^\d]/g, '')
        this.setData({
            mobile: mobile
        })
    },
    bindaddress: function(e) {
        console.log(e.detail.value)
        this.setData({
            address: e.detail.value
        })
    },
    bindRegionChange: function(e) {
        console.log(e.detail)
        this.setData({
            region: e.detail.value
        })
    },

    save: function() {
        let data = this.data
        if (data.name == '') {
            app.toast({ title: '请填写姓名' })
            return
        }
        data.mobile = data.mobile.replace(/\s+/g, "")
        if (data.mobile == '') {
            app.toast({ title: '请填写手机号码' })
            return
        }
        if (data.mobile.length > 11 || data.mobile.length < 11) {
            app.toast({ title: '请填写11位手机号码' })
            return
        }
        if (data.region.length == 0) {
            app.toast({ title: '请选择省市区' })
            return
        }
        if (data.address == '') {
            app.toast({ title: '请填写详细地址' })
            return
        }
        if (this.data.id) {
            this.updateUserAddress({
                address_id: this.data.id,
                province_name: data.region[0],
                city_name: data.region[1],
                area_name: data.region[2],
                address: data.address,
                mobile: data.mobile,
                name: data.name
            })
        } else {
            this.addUserAddress({
                province_name: data.region[0],
                city_name: data.region[1],
                area_name: data.region[2],
                address: data.address,
                mobile: data.mobile,
                name: data.name
            })
        }
    },
    /**
     * 添加地址接口
     */
    addUserAddress: function(data) {
        let that = this
        app.wxrequest({
            url: 'index/user/addUserAddress',
            data: {
                province_name: data.province_name,
                city_name: data.city_name,
                area_name: data.area_name,
                address: data.address,
                mobile: data.mobile,
                name: data.name
            },
            success: function(res) {
                app.toast({ title: '添加地址成功' })
                wx.navigateBack()
            },
            error(code) {
                that.hintcode(code)
            }
        })
    },
    hintcode: function(code) {
        switch (parseInt(code)) {
            case 3003:
                app.toast({ title: '手机格式有误' })
                break;
            case 3004:
            case 3005:
            case 3006:
                app.toast({ title: '错误的省市区级名称' })
                break;
            case 3007:
                app.toast({ title: '请填写详细街道地址' })
                break;
            case 3008:
                app.toast({ title: '添加失败' })
                break;
            case 3010:
                app.toast({ title: '请填写收货人姓名' })
                break;
            default:
                app.toast({ title: '意料之外的错误' })
                break;
        }
    },
    /**
     * 修改地址接口
     */
    updateUserAddress: function(data) {
        let that = this
        app.wxrequest({
            url: 'index/user/updateUserAddress',
            data: {
                address_id: data.address_id,
                province_name: data.province_name,
                city_name: data.city_name,
                area_name: data.area_name,
                address: data.address,
                mobile: data.mobile,
                name: data.name
            },
            success: function(res) {
                wx.navigateBack()
            },
            error(code) {
                that.hintcode(code)
            }
        })
    },
    /**
     * 获取地址详情接口
     */
    getUserAddress: function(id) {
        let that = this
        app.wxrequest({
            url: 'index/user/getUserAddress',
            data: {
                address_id: id
            },
            success: function(res) {
                let data = res.data
                that.setData({
                    name: data.name,
                    mobile: data.mobile,
                    address: data.address,
                    region: [data.province_name, data.city_name, data.area_name]
                })
            }
        })
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