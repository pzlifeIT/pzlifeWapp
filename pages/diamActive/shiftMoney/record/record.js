// pages/shiftMoney/record/record.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        recordlist: [],
        loading: true,
        page: 1,
        imgHost:""
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

        this.setData({
            imgHost:app.globalData.host.imgHost
        })
    },
    getLogTransfer() {
        let that = this
        app.wxrequest({
            url: 'user/getLogTransfer',
            data: {
                stype: 3,
                page: that.data.page
            },
            success(res) {
                if (res.log_transfer.length < 10) {
                    that.setData({
                        loading: false
                    })
                }
                if (res.log_transfer.length > 0) {
                    let recordlist = that.data.recordlist,
                        page = that.data.page + 1
                    recordlist.push(that.disrecordlist(res.log_transfer))
                    that.setData({
                        recordlist: recordlist,
                        page: page
                    })
                }
            },
            error(code) {
                that.setData({
                    loading: false
                })
            }
        })
    },
    disrecordlist(data) {
        let arr = data,
            len = arr.length;
        for (let i = 0; i < len; i++) {
            arr[i].statusText = this.getStatusText(arr[i].status)
        }
        return arr
    },
    getStatusText(n) {
        let text = '';
        switch (parseInt(n)) {
            case 1:
                text = '待处理'
                break;
            case 2:
                text = '申请成功'
                break;
            case 3:
                text = '已取消'
                break;
        }
        return text
    },
    shiftCase:function(){
        wx.navigateTo({
            url:"/pages/diamActive/shiftMoney/shiftMoney"
        })
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        this.getLogTransfer()
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
        if (this.data.loading) {
            this.getLogTransfer()
        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})