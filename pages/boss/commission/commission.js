// pages/boss/commission/commission.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        div: 1,
        num: 1,
        page:1,
        pageNum:10,
        reach:true,
        eranList:[],
        imgHost:'',
        huiyuan:[],
        info:{},
        qudao:[],
        zhaoshang:[],
        total:0
    },
    clickDiv: function (e) {
        let div = e.currentTarget.dataset.div,
            num = this.data.num
        this.setData({
            div: div,
            eranList:[],
            huiyuan:[],
            qudao:[],
            zhaoshang:[],
            reach:true
        })
        if (div == 1){
            this.getEarnings(num)
        } else if (div == 2){
            this.getmerchants()
        }
    },
    //在每一年的一月,查询上一个月的明细,也就是前一年的12月
    clickSelect: function (e) {
        let num = parseInt(e.currentTarget.dataset.num)
        this.setData({
            num: num,
            huiyuan:[],
            eranList:[],
            zhaoshang:[],
            page:1,
            reach:true
        });
        this.getEarnings(num)
    },
    getEarnings:function(stype = 1){
        let that = this
        app.wxrequest({
            url:"user/getuserbonus",
            data:{
                status:2,
                stype:stype,
                page:that.data.page || 1,
                pageNum:that.data.pageNum || 10
            },
            success(res){
                if (res.data.length < 10){
                    that.setData({
                        reach:false
                    })
                }
                if (res.data.length > 0){
                    let eranList = that.data.eranList,
                        huiyuan = that.data.huiyuan,
                        qudao = that.data.qudao,
                        total = that.data.total
                    if (stype == 1){
                        eranList.push(res.data)
                         total = res.combined
                    } else if(stype == 2){
                        huiyuan.push(res.data)
                        total = res.combined
                    } else if(stype == 3){
                        qudao.push(res.data)
                        total = res.combined
                    }
                    that.setData({
                        eranList:eranList,
                        huiyuan:huiyuan,
                        qudao:qudao,
                        total:total,
                        page:that.data.page + 1

                    })
                }

            }
        })
    },
    getInfo:function(){
        let that = this
        app.wxrequest({
            url:"user/getbossshop",
            success(res){
                that.setData({
                    info:res.data
                })
            }
        })
    },
    getmerchants:function(){
        let that = this
        app.wxrequest({
            url:"/user/getmerchants",
            data:{
                page:that.data.page || 1,
                pageNum:that.data.pageNum || 10
            },
            success(res){
                if (res.data.length < 10){
                    that.setData({
                        reach:false
                    })
                }
                if (res.data.length > 0){
                    let zhaoshang = that.data.zhaoshang
                    zhaoshang.push(res.data)
                    that.setData({
                        zhaoshang:zhaoshang
                    })
                }
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getInfo()
        this.getEarnings(this.data.num)
        this.setData({
            imgHost:app.globalData.host.imgHost
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
        if (!this.data.reach){
            return
        }
        if (this.data.div == 1){
            this.getEarnings(this.data.num)
        } else if(this.data.div == 2){
            this.getmerchants()
        }

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})