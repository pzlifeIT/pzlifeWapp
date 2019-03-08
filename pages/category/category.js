const app = getApp()
Page({
    data: {
        firstSub: [],
        showSub: [],
        ind: 0,
        imgHost: '',
        third: [],
        heightArr: [],
        right: 0,
        toview: 'p1'
    },
    selectSub: function(e) {
        let i = e.currentTarget.dataset.i,
            subId = e.currentTarget.dataset.subId
        this.setData({
            ind: i,
            toview: "p" + subId
        })
    },
    getHeight: function() {
        let that = this,
            query = wx.createSelectorQuery().in(this),
            heightArr = [],
            s = 0
        query.selectAll(".wai").boundingClientRect((react) => {
            react.forEach((res) => {
                s += res.height;
                heightArr.push(s)
            });
            this.setData({
                heightArr: heightArr
            });
        });
        query.select(".cate_right").boundingClientRect(function(res) {
            that.setData({
                right: res.height
            })
        }).exec()
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        // this.getClassify()
        this.getSubject()
        this.setData({
            imgHost: app.globalData.host.imgHost
        })
    },
    /**
     * 获取专题
     */
    getSubject: function() {
        let that = this
        app.wxrequest({
            url: "category/getGoodsSubject",
            nocon: true,
            success(res) {
                let firstSub = that.getFirstSub(res.data)
                that.setData({
                    firstSub: firstSub,
                    third: res.data
                })
            }
        })
    },
    /**
     * 获取一级专题
     */
    getFirstSub: function(data) {
        let arr = []
        for (var i = 0; i < data.length; i++) {
            let json = {}
            json.id = data[i].id
            json.subject = data[i].subject
            arr.push(json)
        }
        return arr
    },
    /**
     * 获取二三级专题
     */
    getShowSub: function(data, id) {
        let arr = []
        for (let i = 0; i < data.length; i++) {
            if (id == data[i].id) {
                if (data[i]._child instanceof Array) {
                    arr = data[i]._child
                }
                break
            }
        }
        return arr;
    },

    gun: function(e) {
        let scrollTop = e.detail.scrollTop,
            scrollArr = this.data.heightArr;
        if (scrollTop > scrollArr[scrollArr.length - 1] - this.data.right) {
            return
        } else {
            for (let i = 0; i < scrollArr.length; i++) {
                if (scrollTop >= 0 && scrollTop < scrollArr[0]) {
                    if (this.data.ind === 0) return
                    this.setData({
                        ind: 0
                    })
                } else if (scrollTop >= scrollArr[i - 1] && scrollTop <= scrollArr[i]) {
                    console.log(i)
                    if (this.data.ind === i) return
                    this.setData({
                        ind: i
                    })
                }
            }
        }
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {
        this.getHeight()
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

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

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})