// pages/boss/earnings/earnings.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        num: 1,
        page:1,
        pageNum:10,
        reach:true,
        eranList:[],
        imgHost:'',
        huiyuan:[]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let date = new Date();
        let month = parseInt(date.getMonth());
        let year = parseInt(date.getFullYear())
        if (options.earn == 1) {
            wx.setNavigationBarTitle({
                title: '上月收益'
            });
            let premonth;
            if(month == 0){//一月
                year = year - 1;
                premonth = 12
            }else {
                premonth = parseInt(month)
            }
            this.setData({
                month:premonth,
                year:year
            });
            this.getEarnings(premonth, year,1)
        } else if (options.earn == 2) {
            wx.setNavigationBarTitle({
                title: '本月收益'
            });
            let premonth = parseInt(month) + 1
            this.setData({
                month:premonth,
                year:year
            });
            this.getEarnings(premonth, year,1)
        }
        this.setData({
            imgHost:app.globalData.host.imgHost
        })
    },
    //在每一年的一月,查询上一个月的明细,也就是前一年的12月
    clickSelect: function (e) {
        let num = parseInt(e.currentTarget.dataset.num),
            month = this.data.month,
            year = this.data.year
        this.setData({
            num: num,
            huiyuan:[],
            eranList:[],
            page:1
        });
        this.getEarnings(month,year,num)
    },
    getEarnings: function (month, year,num) {
        let that = this
        app.wxrequest({
            url: "user/getuserbonus",
            data: {
                year: year,
                month: month,
                stype:num,
                page:that.data.page || 1,
                pageNum:that.data.pageNum || 10
            },
            nocon: false,
            success(res) {
                if (res.data.length < 10){
                    that.setData({
                        reach:false
                    })
                }
                if (res.data.length > 0){
                    let earnList = that.data.eranList,
                        huiyuan = that.data.huiyuan
                    if (num == 1){
                        earnList.push(res.data)
                    } else if (num == 2){
                        huiyuan.push(res.data)
                    }

                    that.setData({
                        eranList:earnList,
                        huiyuan:huiyuan,
                        page:that.data.page + 1
                    })
                }

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
        if (!this.data.reach) return
        let month = this.data.month,
            year = this.data.year,
            num = this.data.num || 1
        this.getEarnings(month,year,num)
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})