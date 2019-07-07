// pages/task/task.js.
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        imgHost: '',
        page: 1,
        page_num: 10,
        reach: true,
        list: [],
        had_bonus: 0,
        no_bonus: 0
    },

    getTask: function () {
        let that = this
        app.wxrequest({
            url: "rights/userTask",
            data: {
                page: that.data.page || 1,
                page_num: that.data.page_num || 10
            },
            success(res) {
                if (res.usertask.length < 10) {
                    that.setData({
                        reach: false
                    })
                }
                if (res.usertask.length > 0) {
                    let list = that.data.list;
                    that.disposeTime(res.usertask);
                    list.push(res.usertask);
                    that.setData({
                        list: list,
                        no_bonus: res.no_bonus,
                        had_bonus: res.had_bonus,
                        page: that.page + 1
                    })
                }
            },
            error(res) {
                let text = '';
                switch (parseInt(res)) {
                    case 3000:
                        text = '用户不存在';
                        break;
                    case 3001:
                        text = '页码错误';
                        break;
                    default:
                        text = '错误码：' + res
                        break;
                }
                app.toast({title: text})
            }
        })
    },
    disposeTime: function (data) {
        for (let i = 0; i < data.length; i++) {
            if(data[i].end_time != null){
                data[i]._end_time = data[i].end_time.split(' ')[0].replace(/-/g, '/').replace(/20/g, '');
                data[i]._start_time = data[i].start_time.split(' ')[0].replace(/-/g, '/').replace(/20/g, '')
            }else{
                data[i]._end_time = data[i].end_time
                data[i]._start_time = data[i].start_time
            }
            
        }
        console.log(data)
        return data
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            imgHost: app.globalData.host.imgHost
        })
        this.getTask()
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
        this.getTask()
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
        return app.share()
    }
})