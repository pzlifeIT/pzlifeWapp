// pages/integShop/components/cate/cate.js
const app = getApp()
Component({
    /**
     * 组件的属性列表
     */
    properties: {},

    /**
     * 组件的初始数据
     */
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
    lifetimes: {
        attached: function () {
            // 在组件实例进入页面节点树时执行
            this.getSubject()
            this.setData({
                imgHost: app.globalData.host.imgHost
            })
        },
        ready: function () {

        },
        detached: function () {
            // 在组件实例被从页面节点树移除时执行
        },
    },
    /**
     * 组件的方法列表
     */
    methods: {
        selectSub: function (e) {
            let i = e.currentTarget.dataset.i,
                subId = e.currentTarget.dataset.subId
            this.setData({
                ind: i,
                toview: "p" + subId
            })
        },
        getHeight: function () {
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
            query.select(".cate_right").boundingClientRect(function (res) {
                that.setData({
                    right: res.height
                })
            }).exec()
        },
        getSubject: function () {
            let that = this
            app.wxrequest({
                url: "category/getGoodsIntegralSubject",
                nocon: true,
                success(res) {
                    let firstSub = that.getFirstSub(res.data)
                    that.setData({
                        firstSub: firstSub,
                        third: res.data
                    })
                    that.getHeight()
                }
            })
        },
        /**
         * 获取一级专题
         */
        getFirstSub: function (data) {
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
        getShowSub: function (data, id) {
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

        gun: function (e) {
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
                        if (this.data.ind === i) return
                        this.setData({
                            ind: i
                        })
                    }
                }
            }
        },
    }
})
