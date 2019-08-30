// pages/writeAppointmentInfo/writeAppointmentInfo.js
const util = require('../../utils/util.js');
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        index: 0,
        startX: 0,
        startY: 0,
        firstScreen: true,
        secondScreen: false,
        thirdScreen: false,
        screen: 1,
        turn: 'left',
        state: 'a1',
        imgHost: '',
        first: '',
        second: '',
        third: '',
        fourth: '',
        fifth: '',
        sixth: '',
        select: false,
        list: []
    },
    select() {
        let select = !this.data.select
        this.setData({
            select: select
        })
    },
    selectInfo(e) {
        this.setData({
            name: e.currentTarget.dataset.name,
            mobile: e.currentTarget.dataset.mobile,
            mail: e.currentTarget.dataset.mail,
            select: false
        })
    },
    bindPickerChange: function (e) {
        this.setData({
            index: e.detail.value
        })
    },
    takePhoto: function (e) {
        let num = e.currentTarget.dataset.num;
        console.log(typeof num)
        let that = this;
        wx.chooseImage({
            count: 1, //默认9
            sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], //从相册选择
            success: (res) => {
                console.log(res)
                switch (parseInt(num)) {
                    case 1:
                        that.setData({
                            first: res.tempFilePaths[0]
                        }, function () {
                            console.log(that.data.first)
                        });
                        break;
                    case 2:
                        that.setData({
                            second: res.tempFilePaths[0]
                        });
                        break;
                    case 3:
                        that.setData({
                            third: res.tempFilePaths[0]
                        });
                        break;
                    case 4:
                        that.setData({
                            fourth: res.tempFilePaths[0]
                        });
                        break;
                    case 5:
                        that.setData({
                            fifth: res.tempFilePaths[0]
                        });
                        break;
                    case 6:
                        that.setData({
                            sixth: res.tempFilePaths[0]
                        });
                        break
                }
            }
        });
    },
    next: function () {
        let screen = this.data.screen
        screen = screen + 1
        if (screen >= 2) {
            screen = 2
        }
        this.setData({
            screen: screen,
            turn: 'left',
            state: 'a' + screen
        })
    },
    prev: function () {
        let screen = this.data.screen
        screen = screen - 1;
        if (screen <= 1) {
            screen = 1
        }
        this.setData({
            screen: screen,
            turn: 'right',
            state: 'a' + screen
        })
    },
    touchStart: function (e) {
        this.setData({
            startX: e.changedTouches[0].clientX || 0,
            startY: e.changedTouches[0].clientY || 0
        })
    },
    touchEnd: function (e) {
        let endX = e.changedTouches[0].clientX;
        let endY = e.changedTouches[0].clientY;
        let turn = util.getTouchData(endX, endY, this.data.startX, this.data.startY);
        let screen = this.data.screen;
        console.log(turn)
        if (turn == 'left') {
            screen = screen + 1
            if (screen >= 2) {
                screen = 2
            }
        } else if (turn == 'right') {
            screen = screen - 1
            if (screen <= 1) {
                screen = 1
            }
        }else {
            return
        }
        this.setData({
            screen: screen,
            turn: turn,
            state: 'a' + screen
        })

    },
    getTravelInfo: function () {
        let that = this;
        app.wxrequest({
            url: "user/getAirplanePassenger",
            success(res) {
                console.log(res.airplanepassenger)
                that.setData({
                    list: res.airplanepassenger
                })
            },
            error(res) {
                app.toast({title: "错误码：" + res})
            }
        })
    },
    add: function (e) {
        let type = e.currentTarget.dataset.type;
        let name = e.currentTarget.dataset.name;
        let idcard = e.currentTarget.dataset.idcard;
        let passport = e.currentTarget.dataset.passport;
        let phone = e.currentTarget.dataset.phone;
        let id = e.currentTarget.dataset.id;
        if (type == 1){
            wx.navigateTo({
                url: 'addTravelInfo/addTravelInfo?name='+name+"&idcard="+idcard+"&passport="+passport+"&phone="+phone+"&id="+id+"&type="+type
            })
        } else {
            wx.navigateTo({
                url: 'addTravelInfo/addTravelInfo'
            })
        }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            imgHost: app.globalData.host.imgHost
        })
        if (options.type == 1){
            wx.setNavigationBarTitle({
                title:'修改乘机人'
            })
        }else {
            wx.setNavigationBarTitle({
                title:'新增乘机人'
            })
        }

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
        this.getTravelInfo()
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
        return app.share()
    }
})