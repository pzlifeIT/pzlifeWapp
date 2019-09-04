// pages/readInfo/readInfo.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        list: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(123)
        this.getOrderSheet(options.orderno)
    },
    getOrderSheet: function (orderno) {
        let that = this
        app.wxrequest({
            url: 'order/getOrderSheet',
            data: {
                order_no: orderno
            },
            success(res) {
                that.disSheet(res.fromList)

            },
            error(res) {
                switch (parseInt(res)) {
                    case 3000:
                        app.toast({title: "未获取到数据"});
                        break;
                    case 3001:
                        app.toast({title: "订单号错误"});
                        break;
                    default:
                        app.toast({title: "错误码:" + res});
                }
            }
        })
    },
    disSheet: function (data) {
        let json = []
        let arr = []
        let js = {}
        let from = data[0].from
        let airplane = [],
            name = '',
            idcard = '',
            medicare_card = '',
            mobile = '',
            hospital_name = '',
            registration_department = '',
            experts_name = '',
            appointment_time = '',
            appointment_period = '',
            is_adjustment = '',
            other_treatment = '',
            anamnesis = '',
            get_report_barcode = '',
            get_report_time = '',
            get_report_address = '',
            need_escort_time = '',
            need_escort_place = '',
            sex = '',
            nick_name = '',
            age = '',
            phone = '',
            passport_number = '',
            e_mail = '',
            appeal = '',
            birth_certificate_image = '',
            incumbency_certification = '',
            assets_certification = '',
            child_birth_certificate_image = '',
            business_License_copies = '',
            student_identity_card = '',
            certificate_of_criminal_record = '',
            child_household_register_image = [],
            passport_image = [],
            photograph = [],
            id_card_copies = [],
            household_register_copies = [],
            visa_application_form = [],
            iqama = [],
            half_year_social_security = [],
            Wage_bill = [],
            half_bank_card_statement = [],
            copy_of_credit_card_Statement = [],
            half_year_tax_bill = [],
            marriage_certificate_copies = [],
            house_property_copies = [],
            retirement_card = [],
            Retirement_card_copies = []
        for (let k in from) {
            switch (k) {
                case '乘机人信息':
                    airplane = from[k];
                    break;
                case '就诊人姓名':
                    name = from[k];
                    break;
                case '身份证号码':
                    idcard = from[k];
                    break;
                case '上海医保/医疗卡号（如有请填写）':
                    medicare_card = from[k];
                    break;
                case '联系人电话':
                    mobile = from[k];
                    break;
                case '挂号医院名称':
                    hospital_name = from[k];
                    break;
                case "挂号科室":
                    registration_department = from[k];
                    break;
                case "专家姓名":
                    experts_name = from[k];
                    break;
                case '预约时间':
                    appointment_time = from[k]
                    break;
                case '预约时间段':
                    appointment_period = from[k];
                    break;
                case '预约时间接受调节':
                    is_adjustment = from[k];
                    break;
                case '外院治疗情况':
                    other_treatment = from[k];
                    break;
                case '既往病史':
                    anamnesis = from[k];
                    break;
                case '取报告条码':
                    get_report_barcode = from[k];
                    break;
                case '需要取报告时间':
                    get_report_time = from[k];
                    break;
                case '需要取报告地点':
                    get_report_address = from[k];
                    break;
                case '需要陪护时间':
                    need_escort_time = from[k];
                    break;
                case '需要陪护地点':
                    need_escort_place = from[k];
                    break;
                case '性别':
                    sex = from[k];
                    break;
                case '姓名':
                    nick_name = from[k];
                    break;
                case '年龄':
                    age = from[k];
                    break;
                case '手机号码':
                    phone = from[k];
                    break;
                case '护照号码':
                    passport_number = from[k];
                    break;
                case '邮箱':
                    e_mail = from[k];
                    break;
                case '诉求':
                    appeal = from[k];
                    break;
                case '出生证明':
                    birth_certificate_image = from[k];
                    break;
                case '在职证明':
                    incumbency_certification = from[k];
                    break;
                case '资产证明':
                    assets_certification = from[k];
                    break;
                case '营业执照复印件盖公章':
                    business_License_copies = from[k];
                    break;
                case '儿童出生证明':
                    child_birth_certificate_image = from[k];
                    break;
                case '学生证':
                    student_identity_card = from[k];
                    break;
                case '犯罪记录证明':
                    certificate_of_criminal_record = from[k];
                    break;
                case '儿童户口本':
                    child_household_register_image.push(from[k])
                    break;
                case '护照原件':
                    passport_image.push(from[k]);
                    break;
                case '照片':
                    photograph.push(from[k]);
                    break;
                case '身份复印件':
                    id_card_copies.push(from[k]);
                    break;
                case '户口本复印件':
                    household_register_copies.push(from[k]);
                    break;
                case '签证申请表':
                    visa_application_form.push(from[k]);
                    break;
                case '居住证':
                    iqama.push(from[k]);
                    break;
                case '半年社保':
                    half_year_social_security.push(from[k]);
                    break;
                case '工资流水':
                    Wage_bill.push(from[k]);
                    break;
                case '半年银行卡对账单':
                    half_bank_card_statement.push(from[k]);
                    break;
                case '信用卡对账单':
                    copy_of_credit_card_Statement.push(from[k]);
                    break;
                case '半年税单':
                    half_year_tax_bill.push(from[k]);
                    break;
                case '结婚证复印件':
                    marriage_certificate_copies.push(from[k]);
                    break;
                case '房产证复印件':
                    house_property_copies.push(from[k]);
                    break;
                case '退休证原件':
                    retirement_card.push(from[k]);
                    break;
                case '退休证复印件':
                    Retirement_card_copies.push(from[k]);
                    break;
            }
            this.setData({
                airplane :airplane,
                name:name,
                idcard :idcard,
                medicare_card :medicare_card,
                mobile :mobile,
                hospital_name :hospital_name,
                registration_department :registration_department,
                experts_name :experts_name,
                appointment_time :appointment_time,
                appointment_period :appointment_period,
                is_adjustment :is_adjustment,
                other_treatment :other_treatment,
                anamnesis :anamnesis,
                get_report_barcode :get_report_barcode,
                get_report_time :get_report_time,
                get_report_address :get_report_address,
                need_escort_time:need_escort_time,
                need_escort_place :need_escort_place,
                sex :sex,
                nick_name :nick_name,
                age :age,
                phone :phone,
                passport_number :passport_number,
                e_mail :e_mail,
                appeal :appeal,
                birth_certificate_image :birth_certificate_image,
                incumbency_certification :incumbency_certification,
                assets_certification :assets_certification,
                child_birth_certificate_image :child_birth_certificate_image,
                business_License_copies :business_License_copies,
                student_identity_card :student_identity_card,
                certificate_of_criminal_record :certificate_of_criminal_record,
                child_household_register_image :child_household_register_image,
                passport_image :passport_image,
                photograph :photograph,
                id_card_copies :id_card_copies,
                household_register_copies :household_register_copies,
                visa_application_form :visa_application_form,
                iqama :iqama,
                half_year_social_security :half_year_social_security,
                Wage_bill :Wage_bill,
                half_bank_card_statement :half_bank_card_statement,
                copy_of_credit_card_Statement :copy_of_credit_card_Statement,
                half_year_tax_bill :half_year_tax_bill,
                marriage_certificate_copies :marriage_certificate_copies,
                house_property_copies :house_property_copies,
                retirement_card :retirement_card,
                Retirement_card_copies :Retirement_card_copies
            })
        }
        for (let i = 0; i < data.length; i++) {
            console.log(data[i].from)
            console.log(data[i].from['乘机人信息'])
            // if (data[i].from['乘机人信息']){}
        }
        console.log(arr)
        console.log(js)
        console.log(json)
        this.setData({
            arr: arr,
            list: json
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