// pages/lotto/lotto.js
const app = getApp()
let speed = 50,
    timer = null,
    scroll = 10
Page({

    /**
     * 页面的初始数据
     */
    data: {
        imgHost: "",
        pop: false,
        luckNum: 0,//请求接口将返回值赋值。中奖位置 最大是7也就是下标 可能需要 -1
        click: "getLuckNum",
        color: [0, 0, 0, 0, 0, 0, 0, 0],
        scrollTop: 0,
        top: 1,
        qrcode: '',
        goods: [],
        luck: 0,
        goods_name: '',
        winning_id: -1,
        log: [],
        logAll: []
    },
    getLuckGood: function () {
        let that = this
        app.wxrequest({
            url: "OfflineActivities/LuckGoods",
            method: "GET",
            success(res) {
                console.log(res.LuckGoods)
                that.setData({
                    goods: res.LuckGoods
                })
            }
        })
    },
    golog: function () {
        wx.navigateTo({
            url: 'log/log'
        })
    },
    goHome: function () {
        wx.switchTab({
            url: "/pages/index/index"
        })
    },
    hiddenPop: function () {
        this.setData({
            pop: false
        })
    },
    getLuckNum: function () {
        console.log(123)
        if (this.data.click == '') {
            app.toast({
                title: "已经参与过抽奖"
            })
            return
        }
        let that = this
        app.wxrequest({
            url: "OfflineActivities/luckydraw",
            success(res) {
                console.log(res.shop_num)
                that.setData({
                    luck: res.shop_num - 1,
                    goods_name: res.goods_name,
                    click: "getLuckNum",
                    winning_id: res.winning_id
                }, function () {
                    that.stop(res.shop_num - 1)
                })

            },
            error(res) {
                let text = ''
                switch (parseInt(res)) {
                    case 3000:
                        text = '未获取到数据'
                        break;
                    case 3001:
                        text = '用户不存在'
                        break;
                    case 3002:
                        text = 'conid错误'
                        break;
                    case 3003:
                        text = '已参与过抽奖'
                        break;
                    case 3004:
                        text = '奖品已全部抽完'
                        break;
                    case 3005:
                        text = '操作失败'
                        break;
                }
                app.toast({title: text})
                that.setData({
                    click: 'getLuckNum'
                })
                return false
            }
        })
    },
    click: function () {
        //设置按钮不可点击
        this.setData({
            click: '',
            color: [0, 0, 0, 0, 0, 0, 0, 0]
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
            that.data.color[index] = 0.5
            that.setData({
                color: that.data.color
            })
            index++
        }, speed);

        //两秒后停止定时器。这是模拟请求接口的
        // setTimeout(function () {
        //     that.stop(that.data.luckNum)
        // }, 2000)
        this.getLuckNum()
    },
    stop: function (luckNum) {
        clearInterval(timer)
        let that = this
        let current = -1;
        let color = that.data.color;
        for (let i = 0; i < color.length; i++) {
            if (color[i] == 0.5) {
                current = i
            }

        }
        let index = current + 1
        that.stopLuck(luckNum, index, speed, 10)
    },
    stopLuck: function (luckNum, index, time, addtime) {
        let color = this.data.color,
            that = this,
            luck = this.data.luck;
        console.log(luck)
        setTimeout(function () {
            if (index > 7) {
                index = 0
                color[7] = 0
            } else if (index != 0) {
                color[index - 1] = 0
            }
            //当前选中
            color[index] = 0.5
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
                    if (luckNum == luck) {
                        that.setData({
                            pop: true,
                            click: "getLuckNum"
                        })
                        that.qrcode()
                        that.getLuckLog()
                        that.getLuckLogAll()
                    }
                }, 1000)

            }
        }, time)
        console.log(time)
    },
    autoScroll: function () {
        let that = this,
            scroll = this.data.scrollTop,
            intervalId = null;
        if (this.data.logAll.length < 5) {
            return
        }
        intervalId = setInterval(interval, 1500)

        function interval() {
            clearTimeout(timeOut)
            scroll += 35
            if (that.data.top == 0) {
                scroll = 0
                clearInterval(intervalId)
                that.setData({
                    top: 1
                })
            }
            that.setData({
                scrollTop: scroll
            })
        }

        let timeOut = setTimeout(function () {
            that.setData({
                top: 1
            }, function () {
                setInterval(interval, 1500)
            })
        }, 1000)
    },
    tolower: function () {
        this.setData({
            top: 0
        })
    },
    qrcode: function () {
        let wid = this.data.winning_id
        let base = app.base64(app.globalData.host.cmsHost + "lucky.html?pid=" + app.globalData.userInfo.uid + "&wid=" + wid);
        this.setData({
            qrcode: app.globalData.host.apiHost + "OfflineActivities/createOrderQrCode?data=" + base
        })
    },
    getLuckLog: function () {
        let that = this
        app.wxrequest({
            url: "OfflineActivities/getHdLucky",
            data: {
                big: 1
            },
            nologin:true,
            success(res) {
                that.setData({
                    log: res.winnings
                })
            },
            error(res) {

            }
        })
    },
    getLuckLogAll: function () {
        let that = this
        app.wxrequest({
            url: "OfflineActivities/getHdLucky",
            nologin:true,
            success(res) {
                if (res.winnings) {
                    that.setData({
                        logAll: res.winnings
                    })
                }
            },
            error(res) {

            }
        })
    },
    getUserInfo:function(){
        app.judgelogin({
            success(res){
                app.globalData.userInfo = res.data
            }
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

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        // this.getUserInfo()
        this.autoScroll()
        this.getLuckGood()
        this.getLuckLog()
        this.getLuckLogAll()
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
        return app.share()
    }
})