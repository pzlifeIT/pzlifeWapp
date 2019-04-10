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
        huiyuan:[],
        div:1,
        qudao:[],
        total:0
    },
    /**
     * 选择账单类型
     * @param e
     */
    clickDiv:function(e){
        let div = parseInt(e.currentTarget.dataset.div)
        this.setData({
            div:div,
            page:1,
            reach:true,
            eranList:[],
            huiyuan:[],
            qudao:[]
        })
        if (div == 2){
            wx.setNavigationBarTitle({
                title: '已入账'
            });
        } else if(div == 1){
            wx.setNavigationBarTitle({
                title: '待入账'
            });
        }
        this.getEarnings(div,this.data.num)
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            entered:options.entered,
            enter:options.enter,
            all:options.all
        })
        if (options.earn == 2) {
            wx.setNavigationBarTitle({
                title: '已入账'
            });
           this.setData({
               div:parseInt(options.earn)
           })
        } else if (options.earn == 1) {
            wx.setNavigationBarTitle({
                title: '待入账'
            });
            this.setData({
                div:parseInt(options.earn)
            })
        }
        this.getEarnings(parseInt(options.earn),1)
        this.setData({
            imgHost:app.globalData.host.imgHost
        })
    },
    /**
     * 选择消费类型
     * @param e
     */
    clickSelect: function (e) {
        let num = parseInt(e.currentTarget.dataset.num),
            status = this.data.div;
        this.setData({
            num: num,
            huiyuan:[],
            eranList:[],
            page:1,
            reach:true,
            qudao:[]
        });
        this.getEarnings(status,num)
    },
    getEarnings: function (status,stype) {
        let that = this
        app.wxrequest({
            url: "user/getuserbonus",
            data: {
                status:status,
                stype:stype,
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
                        huiyuan = that.data.huiyuan,
                        qudao = that.data.qudao;
                    let total = 0
                    if (stype == 1){
                        earnList.push(res.data)
                        total = res.combined
                    } else if (stype == 2){
                        huiyuan.push(res.data)
                        total = res.combined
                    } else if(stype == 3){
                        qudao.push(res.data)
                        total = res.combined
                    }
                    console.log(earnList)
                    that.setData({
                        eranList:earnList,
                        huiyuan:huiyuan,
                        qudao:qudao,
                        total:total,
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
        let status = this.data.div,
            stype = this.data.num
        this.getEarnings(status,stype)
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})