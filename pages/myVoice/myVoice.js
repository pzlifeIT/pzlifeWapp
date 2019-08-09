// pages/myVoice/myVoice.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        head: 1,
        imgHost: '',
        page: 1,
        pageNum: 10,
        list: [],
        reach: true
    },
    select: function (e) {
        let num = e.currentTarget.dataset.num
        this.setData({
            head: num,
            page: 1,
            list: [],
            reach: true
        }, function () {
            this.getMyVoice()
        })

    },
    playVoice: function (e) {
        let audio = e.currentTarget.dataset.audio;
        let name = e.currentTarget.dataset.name;
        if (this.data.head == 2){
            return
        }
        wx.navigateTo({
            url: '/pages/playVoice/playVoice?audio=' + audio + "&name=" + name
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            imgHost: app.globalData.host.imgHost
        })
    },
    getMyVoice: function () {
        let that = this
        app.wxrequest({
            url: "audio/getUserAudioList",
            data: {
                page: that.data.page || 1,
                pageNum: that.data.pageNum || 10,
                status: that.data.head
            },
            success(res) {
                // console.log(res.audioList)
                if (res.audioList.length < 10) {
                    that.setData({
                        reach: false
                    })
                }
                if (res.audioList.length > 0) {
                    let list = that.data.list
                    that.disTime(res.audioList)
                    list.push(res.audioList)
                    that.setData({
                        list: list,
                        page: that.data.page + 1
                    })
                }
            },
            error(res) {
                switch (parseInt(res)) {
                    case 3001:
                    case 3002:
                        app.toast({title: "con_id错误"});
                        break;
                    case 3003:
                        app.toast({title: '参数错误'});
                        break;
                    case 4001:
                        app.toast({title: '获取微信认证key失败'});
                        break;
                    default:
                        app.toast({title: "错误码：" + res})
                }
            }
        })
    },
    disTime: function (data) {
        for (let i = 0; i < data.length; i++) {
            data[i].end_time = data[i].end_time.split(' ')[0].replace(/-/g, '.')
            data[i].create_time = data[i].create_time.split(' ')[0].replace(/-/g, '.')

        }
        return data
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
        this.getMyVoice()
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
        this.getMyVoice()
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})