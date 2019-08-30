// pages/readInfo/readInfo.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        list:[]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getOrderSheet(options.orderno)
    },
    getOrderSheet: function (orderno) {
        let that = this
        app.wxrequest({
            url:'order/getOrderSheet',
            data: {
                order_no:orderno
            },
            success(res){
               that.disSheet(res.fromList)

            },
            error(res){
                switch (parseInt(res)) {
                    case 3000:
                        app.toast({title:"未获取到数据"});
                        break;
                    case 3001:
                        app.toast({title:"订单号错误"});
                        break;
                    default:
                        app.toast({title:"错误码:"+res});
                }
            }
        })
    },
    disSheet:function(data){
        let json = []
        let arr = []
        let js = {}
        for (let i=0;i<data.length;i++){
                // arr.push(k)
                js[i] = data[i].from

        }

        console.log(arr)
        console.log(js)
        console.log(json)
       this.setData({
           arr:arr,
           list:json
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