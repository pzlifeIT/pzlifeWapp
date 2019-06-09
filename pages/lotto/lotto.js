// pages/lotto/lotto.js
const app = getApp()
let speed = 50,
    timer = null
Page({

    /**
     * 页面的初始数据
     */
    data: {
        imgHost: "",
        pop: false,
        luckNum: 5,//请求接口将返回值赋值。中奖位置 最大是7也就是下标 可能需要 -1
        click: "click",
        color: [0, 0, 0, 0, 0, 0, 0, 0]
    },
    golog: function () {
        wx.navigateTo({
            url: 'log/log'
        })
    },
    click: function () {
        //设置按钮不可点击
        this.setData({
            click: ''
        })
        clearInterval(timer)

        let index = 0,
            that = this
        timer = setInterval(function () {
            if (index > 7) {
                index = 0
                that.data.color[7] = 0
            } else if (index != 0) {
                that.data.color[index - 1] = 0
            }
            that.data.color[index] = 0.2
            that.setData({
                color: that.data.color
            })
            index++
        }, speed);

        //两秒后停止定时器。这是模拟请求接口的
        setTimeout(function () {
            that.stop(that.data.luckNum)
        }, 2000)
    },
    stop: function (luckNum) {
        clearInterval(timer)
        let that = this
        let current = -1;
        let color = that.data.color;
        for (let i = 0; i < color.length; i++) {
            if (color[i] == 0.2) {
                current = i
            }

        }
        let index = current + 1
        that.stopLuck(luckNum, index, speed, 10)
    },
    stopLuck: function (luckNum, index, time, addtime) {
        let color = this.data.color,
            that = this
        setTimeout(function () {
            if (index > 7) {
                index = 0
                color[7] = 0
            } else if (index != 0) {
                color[index - 1] = 0
            }
            //当前选中
            color[index] = 0.2
            that.setData({
                color: color
            })
            //如果旋转时间过短，或者当前位置不是中奖位置。继续执行找到正确位置
            if (time < 200 || index != luckNum) {
                addtime++;
                time += addtime
                index++
                that.stopLuck(luckNum, index, time, addtime)
            } else {
                //找到之后提示中奖信息
                setTimeout(function () {
                    if (luckNum == 5) {//都可以把后台传来的值用在这里
                        that.setData({
                            pop: true,
                            click: "click"
                        })
                    } else {
                        app.toast({ title: "很遗憾未中奖" }) // 改为纸巾的位置！
                        that.setData({
                            click: "click"
                        })
                    }
                }, 1000)

            }
        }, time)
        console.log(time)
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            imgHost: app.globalData.host.imgHost
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