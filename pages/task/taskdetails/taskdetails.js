// pages/task/task.js.
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        imgHost: '',
        detail: {},
        percent: 0,
        page: 1,
        page_num: 10,
        reach: true,
        list: [],
        id: 0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            imgHost: app.globalData.host.imgHost,
            id: options.taskid
        })
        this.getTaskDetail(options.taskid)
        this.getTaskUser(options.taskid)
    },
    getTaskDetail: function (id) {
        let that = this
        app.wxrequest({
            url: "rights/userTask",
            data: {
                taskid: id,
                page: 1,
                page_num: 1
            },
            success(res) {
                console.log(res)
                that.setData({
                    detail: res.usertask,
                    percent: (res.usertask.has_target / res.usertask.target) * 100
                })
            },
            error(res){
                let text = '';
                switch (parseInt(res)) {
                    case 3000:
                        text = '用户不存在';
                        break;
                    case 3001:
                        text = '页码错误';
                        break;
                    default:
                        text = '错误码：'+res
                        break;
                }
                app.toast({title:text})
            }
        })
    },
    getTaskUser: function (id) {
        let that = this
        app.wxrequest({
            url: "rights/userTaskInfo",
            data: {
                taskid: id,
                page: that.data.page || 1,
                page_num: that.data.page_num || 10
            },
            success(res) {
                if (res.task_invited.length < 10) {
                    that.setData({
                        reach: false
                    })
                }
                if (res.task_invited.length > 0) {
                    let list = that.data.list
                    list.push(res.task_invited)
                    that.setData({
                        list: list,
                        page: that.data.page + 1
                    })
                }
            },
            error(res){
                let text = '';
                switch (parseInt(res)) {
                    case 3000:
                        text = '用户不存在';
                        break;
                    case 3001:
                        text = 'taskid必须是数字';
                        break;
                    case 3002:
                        text = '该任务不存在';
                        break;
                    case 3003:
                        text = '页码错误';
                        break;
                    default:
                        text = '错误码：'+res
                        break;
                }
                app.toast({title:text})
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
        if (!this.data.reach) return
        this.getTaskUser(this.data.id)
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