// pages/writeTravelInfo/addTravelInfo/addTravelInfo.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        name: '',
        passport: '',
        mobile: '',
        idcard: '',
        disable: true,
        id: '',
        type: 0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        if (options.name != '' && options.mobile != '' && options.idcard != '') {
            this.setData({
                name: options.name || '',
                passport: options.passport || "",
                mobile: options.phone || '',
                idcard: options.idcard || '',
                id: options.id || '',
                type: options.type || '',
                disable: false
            })
        }
    },
    input: function (e) {
        // console.log(e)
        let item = e.currentTarget.dataset.model
        let value = e.detail.value;
        let name = this.data.name;
        let mobile = this.data.mobile;
        let idcard = this.data.idcard;
        let that = this;
        this.setData({
            [item]: value
        }, function () {
            if (that.data.name != '' && that.data.mobile != '' && that.data.idcard != '') {
                that.setData({
                    disable: false
                })
            } else {
                that.setData({
                    disable: true
                })
            }
        })
    },
    submit: function () {
        console.log(123)
        let name = this.data.name;
        let mobile = this.data.mobile;
        let idcard = this.data.idcard;
        let passport = this.data.passport;
        if (mobile.length < 11) {
            app.toast({title: "请检查手机号"});
            return
        }
        app.wxrequest({
            url: 'user/addAirplanePassenger',
            data: {
                name: name,
                phone: mobile,
                idcard: idcard,
                passport: passport
            },
            success(res) {
                app.toast({title: '添加成功'});
                setTimeout(function () {
                    wx.navigateBack({
                        delta: 1
                    })
                }, 1500)
            },
            error(res) {
                let text = ''
                switch (parseInt(res)) {
                    case 3001:
                        text = '身份证号错误'
                        break;
                    default:
                        text = '错误码：' + res
                }
                app.toast({title: text})
            }

        })
    },
    edit: function () {
        let name = this.data.name;
        let mobile = this.data.mobile;
        let idcard = this.data.idcard;
        let passport = this.data.passport;
        let id = this.data.id
        if (mobile.length < 11) {
            app.toast({title: "请检查手机号"});
            return
        }

        app.wxrequest({
            url: 'user/addAirplanePassenger',
            data: {
                name: name,
                phone: mobile,
                idcard: idcard,
                passport: passport,
                id: id
            },
            success(res) {
                app.toast({title: '修改成功'});
                setTimeout(function () {
                    wx.navigateBack({
                        delta: 1
                    })
                }, 1500)
            },
            error(res) {
                app.toast({title: '错误码：' + res})
            }

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