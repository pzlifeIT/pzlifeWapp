// pages/appointment/appointment.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        options: [],
        imgList: [],
        index: null,
        sheet_name: [],
        business_License_copies: '',
        birth_certificate_image: '',
        incumbency_certification: '',
        assets_certification: '',
        certificate_of_criminal_record: "",
        child_birth_certificate_image: '',
        student_identity_card: "",
        yesOrNo: ['是', '否'],
        arr: [],
        child_household_register_image: [],
        passport_image: [],
        photograph: [],
        id_card_copies: [],
        household_register_copies: [],
        visa_application_form: [],
        iqama: [],
        half_year_social_security: [],
        Wage_bill: [],
        half_bank_card_statement: [],
        copy_of_credit_card_Statement: [],
        half_year_tax_bill: [],
        marriage_certificate_copies: [],
        house_property_copies: [],
        retirement_card: [],
        Retirement_card_copies: [],
        first: '',
        second: '',
        third: '',
        fourth: '',
        fifth: '',
        sixth: '',
        seventh: '',
        name: '',
        idcard: '',
        medicare_card: '',
        mobile: '',
        hospital_name: "",
        registration_department: '',
        experts_name: '',
        appointment_time: '',
        appointment_period: '',
        is_adjustment: '',
        other_treatment: '',
        anamnesis: '',
        get_report_barcode: '',
        get_report_time: '',
        get_report_address: '',
        need_escort_time: '',
        need_escort_place: "",
        sex: '',
        nick_name: '',
        age: '',
        phone: '',
        passport_number: '',
        e_mail: '',
        appeal: '',
        goods_id: [],
        air: [],
        selectAir: [],
        attr: [],
        sheet_arr: [],
        sheet_json: {},
        airPlan: ''
    },
    getTravelInfo: function () {
        let that = this;
        app.wxrequest({
            url: "user/getAirplanePassenger",
            success(res) {
                console.log(res.airplanepassenger)
                that.setData({
                    air: res.airplanepassenger
                })
            },
            error(res) {
                app.toast({title: "错误码：" + res})
            }
        })
    },
    select(e) {
        let airname = e.currentTarget.dataset.name;
        let phone = e.currentTarget.dataset.phone;
        let idcard = e.currentTarget.dataset.idcard;
        let id = e.currentTarget.dataset.id;
        let passport = e.currentTarget.dataset.passport;
        let selectAir = this.data.selectAir;
        let index = e.currentTarget.dataset.index;
        let attr = this.data.attr;
        let str = ''
        if (attr[index] == id) {
            attr[index] = 0

        } else {
            attr[index] = id
            selectAir.push(id);
            str = selectAir.join(',')
        }

        this.setData({
            airPlan: str,
            attr: attr,
            selectAir: selectAir
        })
    },
    add: function (e) {
        let type = e.currentTarget.dataset.type;
        let name = e.currentTarget.dataset.name;
        let idcard = e.currentTarget.dataset.idcard;
        let passport = e.currentTarget.dataset.passport;
        let phone = e.currentTarget.dataset.phone;
        let id = e.currentTarget.dataset.id;
        if (type == 1) {
            wx.navigateTo({
                url: '/pages/writeTravelInfo/addTravelInfo/addTravelInfo?name=' + name + "&idcard=" + idcard + "&passport=" + passport + "&phone=" + phone + "&id=" + id + "&type=" + type
            })
        } else {
            wx.navigateTo({
                url: '/pages/writeTravelInfo/addTravelInfo/addTravelInfo'
            })
        }
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
                that.setData({
                    sheetLength: res.sheet_list.length,
                    sheet: res.sheet_list
                })
                that.dis(res.sheet_list)
            },
            error(res) {

            }
        })
    },
    dis: function (data) {
        let arr = [];
        for (let i = 0; i < data.length; i++) {
            for (let j = 0; j < data[i].options.length; j++) {
                // if (data[i].options[j].type != 6 || data[i].options[j].type != 7) {
                data[i].options[j].goods_id = data[i].goods_id
                data[i].options[j].name_id = data[i].options[j].name + '&' + data[i].goods_id
                console.log(data[i].options[j])
                arr.push(data[i].options[j])
                // }
            }
        }
        console.log(arr)
        this.setData({
            arr: arr
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
        let sheet_name = [];
        let goods_id = [];
        for (let i = 0; i < data.length; i++) {
            goods_id.push(data[i].goods_id)
            for (let j = 0; j < data[i].options.length; j++) {
                data[i].options[j].name_id = data[i].options[j].name + '&' + data[i].goods_id
                data[i].options[j].goods_id = data[i].goods_id
                if (data[i].options[j].type == 1) {
                    text.push(data[i].options[j])
                } else if (data[i].options[j].type == 2) {
                    time.push(data[i].options[j])
                } else if (data[i].options[j].type == 3) {
                    radio.push(data[i].options[j])
                } else if (data[i].options[j].type == 4) {
                    check.push(data[i].options[j])
                } else if (data[i].options[j].type == 5) {
                    textarea.push(data[i].options[j])
                } else if (data[i].options[j].type == 6) {
                    img.push(data[i].options[j])
                } else if (data[i].options[j].type == 7) {
                    data[i].options[j].image = []
                    imgs.push(data[i].options[j])
                    // imgs_name.push(data[i].option[j].name)
                }
                sheet_name.push(data[i].options[j].name)
            }
        }
        console.log(text)
        console.log(check)
        console.log(img)
        console.log(imgs)
        this.setData({
            text: text,
            time: time,
            radio: radio,
            check: check,
            textarea: textarea,
            img: img,
            imgs: imgs,
            sheet_name: sheet_name,
            goods_id: goods_id
        })
    },
    input: function (e) {
        console.log(e)
        let item = e.currentTarget.dataset.model;
        let value = e.detail.value;
        this.setData({
            [item]: value
        })
    },
    ChooseImage(e) {
        let name = e.currentTarget.dataset.name
        name = name.replace(/\s*$/g,'')
        let imgList = this.data.imgList
        let index = e.currentTarget.dataset.idx;
        let imgs_name = this.data.imgs_name;
        let imgs = this.data.imgs;
        let that = this
        let arr = []
        console.log(index)
        wx.chooseImage({
            count: 1, //默认9
            sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], //从相册选择
            success: (res) => {
                imgs[index].image.push(res.tempFilePaths[0]);
                console.log(imgs)
                that.setData({
                    imgs: imgs
                })
                that.upload(res.tempFilePaths[0], 0, name)
            }
        });
    },
    DelImg(e) {
        let idx = e.currentTarget.dataset.idx
        let index = e.currentTarget.dataset.index
        let name = e.currentTarget.dataset.name
        console.log(this.data.imgs[idx])
        wx.showModal({
            content: '确定要删除吗？',
            cancelText: '取消',
            confirmText: '确定',
            success: res => {
                if (res.confirm) {
                   this.data.imgs[idx].image.splice(index,1)
                    this.data[name].splice(index,1)
                    // this.data.imgList.splice(e.currentTarget.dataset.index, 1);
                    this.setData({
                        imgs: this.data.imgs,
                        [name]:this.data[name]
                    })
                }
            }
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
                            seventh: res.tempFilePaths[0]
                        })
                }
                that.upload(res.tempFilePaths[0], num)
            }
        });
    },
    upload: function (file, num = 0, name = '') {
        let url = app.globalData.host.apiHost;
        let that = this;
        let birth_certificate_image = this.data.birth_certificate_image;
        let business_License_copies = this.data.business_License_copies;
        let incumbency_certification = this.data.incumbency_certification;
        let assets_certification = this.data.assets_certification;
        let certificate_of_criminal_record = this.data.certificate_of_criminal_record;
        let child_birth_certificate_image = this.data.child_birth_certificate_image;
        let student_identity_card = this.data.student_identity_card
        wx.uploadFile({
            url: url + 'upload/uploaduserimage',
            filePath: file,
            name: 'filename',
            success(res) {
                if (parseInt(res.statusCode) === 200) {
                    console.log(JSON.parse(res.data))
                    let image_path = JSON.parse(res.data).image_path
                    switch (parseInt(num)) {
                        case 1:
                            birth_certificate_image = image_path;//出生证明
                            break;
                        case 2:
                            business_License_copies = image_path;//营业执照
                            break;
                        case 3:
                            incumbency_certification = image_path;//在职证明
                            break;
                        case 4:
                            assets_certification = image_path;//资产
                            break;
                        case 5:
                            child_birth_certificate_image = image_path;//儿童出生
                            break;
                        case 6:
                            student_identity_card = image_path;//学生证
                            break;
                        case 7:
                            console.log(image_path)
                            certificate_of_criminal_record = image_path;//犯罪
                            break;
                        default:
                            that.isImages(name, image_path)
                    }
                    that.setData({
                        birth_certificate_image: birth_certificate_image,
                        business_License_copies: business_License_copies,
                        incumbency_certification: incumbency_certification,
                        assets_certification: assets_certification,
                        child_birth_certificate_image: child_birth_certificate_image,
                        student_identity_card: student_identity_card,
                        certificate_of_criminal_record: certificate_of_criminal_record
                    })
                } else {
                    app.networkerror(res.statusCode)
                }
            },
            fail(res){
                app.toast({title:'上传失败fail'})
            }
        })
    },
    isImages: function (name, img_path) {
        switch (name) {
            case 'child_household_register_image':
                this.data.child_household_register_image.push(img_path);
                break;
            case "passport_image":
                this.data.passport_image.push(img_path);
                break;
            case 'photograph':
                this.data.photograph.push(img_path);
                break;
            case 'id_card_copies':
                this.data.id_card_copies.push(img_path);
                break;
            case 'household_register_copies':
                this.data.household_register_copies.push(img_path)
                break;
            case 'visa_application_form':
                this.data.visa_application_form.push(img_path);
                break;
            case 'iqama':
                this.data.iqama.push(img_path);
                break;
            case 'half_year_social_security':
                this.data.half_year_social_security.push(img_path);
                break;
            case 'Wage_bill':
                this.data.Wage_bill.push(img_path);
                break;
            case 'half_bank_card_statement':
                this.data.half_bank_card_statement.push(img_path);
                break;
            case 'copy_of_credit_card_Statement':
                this.data.copy_of_credit_card_Statement.push(img_path);
                break;
            case 'half_year_tax_bill':
                this.data.half_year_tax_bill.push(img_path);
                break;
            case 'marriage_certificate_copies':
                this.data.marriage_certificate_copies.push(img_path);
                break;
            case 'house_property_copies':
                this.data.house_property_copies.push(img_path);
                break;
            case 'retirement_card':
                this.data.retirement_card.push(img_path);
                break;
            case 'Retirement_card_copies':
                this.data.Retirement_card_copies.push(img_path);
                break;
        }
    },
    submit: function () {
        let that = this
        let goods_id = this.data.goods_id;
        let data = this.data;
        console.log(goods_id)
        let form = {};
        let id = {};
        let json = {};
        let sheet = this.data.sheet_name;
        let sheet_list = this.data.sheet_list
        console.log(sheet)
        console.log(this.data.imgs)
        console.log(this.data.text)
        // this.disSheetSubmit()
        // return
        //先把所有字段放进form里
        for (let i = 0; i < sheet.length; i++) {
            for (let k in data) {
                if (sheet[i].replace(/\s*$/g,'') == k) {
                    console.log(this.data[sheet[i].replace(/\s*$/g,'')])
                    id[k] = this.data[sheet[i].replace(/\s*$/g,'')]
                }
            }
        }
        form[goods_id[0]] = id
        console.log(form)
        if (this.data.selectAir.length > 0) {
            form[goods_id[0]].rassenger_information = this.data.airPlan
        }
        console.log(form)
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
                            url: "/pages/index/index"
                        })
                    }

                })
            },
            error(res) {
                switch (parseInt(res)) {
                    case 3006:
                        app.toast({title:"表格填写不完整"});
                        break;
                    case 3007:
                        app.toast({title:"信息验证失败,请检查"});
                        break;
                    case 3008:
                        app.toast({title:"不可重复提交"});
                        break;
                    default:
                        app.toast({title: "错误码：" + res})
                }
            }
        })
    },
    //半处理的多表，input可以了
    disSheetSubmit: function () {
        let text = this.data.text,
            time = this.data.time,
            check = this.data.check,
            radio = this.data.radio,
            textarea = this.data.textarea,
            img = this.data.img,
            imgs = this.data.imgs;
        let data = this.data;
        let goods_id = this.data.goods_id
        let json = {
            [goods_id[0]]:{},
            [goods_id[1]]:{},
            [goods_id[2]]:{},
        };
        console.log(json)
        let form = {};
        if (text.length > 0) {
            for (let i = 0; i < text.length; i++) {
                if (text[i].goods_id == text[i].name_id.split('&')[1]) {//每个商品id中的最后一个字段会把前面的覆盖掉。也就是同id 的只会保留一个
                    json[text[i].goods_id][text[i].name_id.split('&')[0]] = data[text[i].name_id]
                }
            }
        }
        if (time.length > 0){
            for (let i = 0; i < time.length; i++) {
                if (time[i].goods_id == time[i].name_id.split('&')[1]) {//每个商品id中的最后一个字段会把前面的覆盖掉。也就是同id 的只会保留一个
                    json[time[i].goods_id][time[i].name_id.split('&')[0]] = data[time[i].name_id]
                }
            }
        }
        if (check.length > 0){
            for (let i = 0; i < check.length; i++) {
                if (check[i].goods_id == check[i].name_id.split('&')[1]) {//每个商品id中的最后一个字段会把前面的覆盖掉。也就是同id 的只会保留一个
                    json[check[i].goods_id][check[i].name_id.split('&')[0]] = data[check[i].name_id]
                }
            }
        }
        if (radio.length > 0){
            for (let i = 0; i < radio.length; i++) {
                if (radio[i].goods_id == radio[i].name_id.split('&')[1]) {//每个商品id中的最后一个字段会把前面的覆盖掉。也就是同id 的只会保留一个
                    json[radio[i].goods_id][radio[i].name_id.split('&')[0]] = data[radio[i].name_id]
                }
            }
        }
        console.log(json)
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.isOrderSheet(options.orderno);

        this.setData({
            imgHost: app.globalData.host.imgHost,
            order_no: options.orderno
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

    }
})