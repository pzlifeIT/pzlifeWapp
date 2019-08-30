// pages/writeAppointmentInfo/writeAppointmentInfo.js
const util = require('../../utils/util.js');
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        yesOrNo: ['是', '否'],
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
        card: '',
        hospitalname: '',
        departments: '',
        experts: '',
        appointmenttime: '',
        appointmenttimes: '',
        case: '',
        barcode: '',
        reporttime: '',
        reportarea: '',
        chaperonagetime: '',
        chaperonagearea: '',
        sickname: '',
        sickphone: '',
        sickcard: '',
        sex: '',
        age: '',
        contactname: '',
        contactphone: '',
        mail: '',
        appeal: '',
        date: '',
        start_date: '',
        end_date: '',
        report_date: '',
        chaper_date: '',
        order_no: '',
        goods_id: '',
        child_household_register_image: '',//儿童户口本
        birth_certificate_image: "",//出生证明
        photograph: [],//照片
        id_card_copies: [],//身份证复印件
        text:[],
        list:[]
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
                        break;
                    case 7:
                        that.setData({
                            seventh:res.tempFilePaths[0]
                        })
                }
                that.upload(res.tempFilePaths[0], num)
            }
        });
    },
    upload: function (file, num) {
        let url = app.globalData.host.apiHost;
        let that = this;
        let id_card_copies = this.data.id_card_copies;
        let photograph = this.data.photograph;
        let child_household_register_image = this.data.child_household_register_image;
        let birth_certificate_image = this.data.birth_certificate_image;
        wx.uploadFile({
            url: url + 'upload/uploaduserimage',
            filePath: file,
            name: 'filename',
            success(res) {
                switch (parseInt(num)) {
                    case 1:
                        id_card_copies[0] = res.image_path;
                        break;
                    case 2:
                        id_card_copies[1] = res.image_path;
                        break;
                    case 3:
                        photograph[0] = res.image_path;
                        break;
                    case 4:
                        photograph[1] = res.image_path;
                        break;
                    case 5:
                        child_household_register_image = res.image_path;
                        break;
                    case 6:
                        birth_certificate_image = res.image_path;
                        break;
                }
                that.setData({
                    id_card_copies: id_card_copies,
                    photograph: photograph,
                    child_household_register_image: child_household_register_image,
                    birth_certificate_image: birth_certificate_image
                })
            }
        })
    },
    next: function () {
        let screen = this.data.screen
        screen = screen + 1
        if (screen >= 3) {
            screen = 3
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
            startX: e.changedTouches[0].clientX,
            startY: e.changedTouches[0].clientY
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
            if (screen >= 3) {
                screen = 3
            }
        } else if (turn == 'right') {
            screen = screen - 1
            if (screen <= 1) {
                screen = 1
            }
        } else {
            return
        }
        this.setData({
            screen: screen,
            turn: turn,
            state: 'a' + screen
        })

    },
    input: function (e) {
        let item = e.currentTarget.dataset.model
        // console.log([item])
        let value = e.detail.value
        this.setData({
            [item]: value
        })
    },
    bindPickerDate: function (e) {
        this.setData({
            date: e.detail.value
        })
    },
    bindPickerStartDate: function (e) {
        this.setData({
            start_date: e.detail.value
        })
    },
    bindPickerEndDate: function (e) {
        this.setData({
            end_date: e.detail.value
        })
    },
    bindPickerChaperDate: function (e) {
        this.setData({
            chaper_date: e.detail.value
        })
    },
    bindPickerReportDate: function (e) {
        this.setData({
            report_date: e.detail.value
        })
    },
    submit: function () {
        let that = this
        let goods_id = this.data.goods_id;
        let form = {}
        form[goods_id] = {
            name: that.data.sickname,
            idcard: that.data.sickcard,
            medicare_card: that.data.card,
            mobile: that.data.contactphone,
            hospital_name: that.data.hospitalname,
            registration_department: that.data.departments,
            experts_name: that.data.experts,
            appointment_time: that.data.date,
            appointment_period: that.data.start_date + '--' + that.data.end_date,
            is_adjustment: that.data.yesOrNo[that.data.index],
            other_treatment: that.data.case,
            get_report_barcode: that.data.barcode,
            get_report_time: that.data.report_date,
            get_report_address: that.data.reportarea,
            need_escort_time: that.data.chaper_date,
            need_escort_place: that.data.chaperonagearea,
            sex: that.data.sex,
            nick_name: that.data.contactname,
            age: that.data.age,
            phone: that.data.sickphone,
            e_maile: that.data.mail,
            appeal: that.data.appeal,
            id_card_copies: that.data.id_card_copies,
            child_household_register_image: that.data.child_household_register_image,
            photograph: that.data.photograph,
            birth_certificate_image: that.data.birth_certificate_image
        }
        app.wxrequest({
            url: "order/submitOrderSheet",
            data: {
                order_no: that.data.order_no,
                from: form
            },
            success(res) {
                app.modal({
                    title: "提交成功",
                    content: "是否返回首页",
                    success() {
                        wx.switchTab({
                            url: '/pages/index/index'
                        })
                    }
                })
            },
            error(res) {
                app.toast({title: "错误码" + res})
            }
        })
    },
    isOrderSheet: function (orderno) {
        let that = this
        app.wxrequest({
            url: "order/isOrderSheet",
            data: {
                order_no: orderno
            },
            success(res) {
                that.disSheet(res.sheet_list)
            },
            error(res) {

            }
        })
    },
    disSheet: function (data) {
        let text = [],
            time = [],
            radio = [],
            check = [],
            textarea = [],
            img = [],
            imgs = [];
        let list = [];

        this.setData({
            text: text,
            time: time,
            radio: radio,
            check: check,
            textarea: textarea,
            img: img,
            imgs: imgs,
            list:data[0].options
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            imgHost: app.globalData.host.imgHost
        })
        this.isOrderSheet(options.orderno)
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
        return app.share()
    }
})