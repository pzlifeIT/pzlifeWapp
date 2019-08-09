// pages/search/search.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        search: '',
        oldsearch: '',
        searchList: [],
        goodsList: [],
        imgHost: '',
        page: 1,
        pageNum: 10,
        reach: true,
        lenovoList: [],
        lenovoModal: false,
        alllenovo: {}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let alllenovo = {}
        if (wx.getStorageSync("alllenovo")) {
            alllenovo = JSON.parse(wx.getStorageSync("alllenovo"))
        }
        this.setData({
            imgHost: app.globalData.host.imgHost,
            alllenovo: alllenovo
        })
    },
    goDetail: function (e) {
        let id = e.currentTarget.dataset.id;
        let type = e.currentTarget.dataset.type;
        if (type == 1) {
            wx.navigateTo({
                url: '/pages/goods/detail?goodid=' + id
            })
        } else if (type == 2) {
            wx.navigateTo({
                url: "/pages/voiceDetail/voiceDetail?goodid=" + id
            })
        }
    },
    inputchange: function (e) {
        let val = e.detail.value.replace(/\s*/g, "")
        if (val == '') {
            this.setData({
                search: '',
                lenovoModal: false,
                goodsList: [],
                page: 1
            });
            return
        }
        let alllenovo = this.data.alllenovo
        console.log(alllenovo)
        if (alllenovo[val]) {
            if (alllenovo[val].length > 0) {
                this.setData({
                    lenovoList: alllenovo[val],
                    lenovoModal: true
                });
            } else {
                this.setData({
                    lenovoModal: false
                });
            }
        } else {
            this.searchlabel(val)
        }
        this.setData({
            search: val
        });
    },
    searchlabel: function (val) {
        let that = this
        app.wxrequest({
            url: "goods/searchlabel",
            data: {
                search_content: val
            },
            nocon: true,
            noloading: true,
            success(res) {
                that.setAlllenovo(val, res.data)
                that.setData({
                    lenovoList: res.data,
                    lenovoModal: true
                })
            },
            error(res) {
                that.setAlllenovo(val, [])
                that.setData({
                    lenovoList: [],
                    lenovoModal: false
                })
            }
        })
    },
    setAlllenovo(val, data = []) {
        let alllenovo = this.data.alllenovo
        alllenovo[val] = data
        this.setData({
            alllenovo: alllenovo
        })
        wx.setStorageSync("alllenovo", JSON.stringify(alllenovo))
    },
    /**
     * 搜索
     */
    mid: function (keyword = "") {
        let arr = this.data.searchList,
            search = '';
        if (keyword) {
            search = keyword.replace(/\s*/g, "")
        } else {
            search = this.data.search.replace(/\s*/g, "")
        }

        if (search == '') return

        for (let i = 0; i < arr.length; i++) {
            if (arr[i] == search) {
                arr.splice(i, 1)
            }
        }
        arr.unshift(search)
        this.setData({
            searchList: arr,
            search: search
        });
        wx.setStorageSync("searchList", arr)
        this.getSearchGood(search)
    },
    /**
     * 请求搜索
     */
    getSearchGood: function (search) {
        let that = this
        app.wxrequest({
            url: "goods/getsearchgoodsbylabel",
            data: {
                label_name: search,
                page: that.data.page || 1,
                page_num: that.data.pageNum || 10
            },
            nocon: true,
            success(res) {
                if (res.goods_data.length < 10) {
                    that.setData({
                        reach: false
                    })
                }
                if (res.goods_data.length <= 0) {
                    app.toast({
                        title: "未搜索到商品"
                    })
                    return
                }
                let goodsList = that.data.goodsList
                goodsList.push(res.goods_data)
                that.setData({
                    goodsList: goodsList,
                    page: that.data.page + 1
                })
            },
            error(res) {

            }
        })
    },
    /**
     * 点击搜索按钮
     */
    clickSearch: function (e) {
        this.setData({
            page: 1,
            goodsList: []
        })
        this.mid(e.currentTarget.dataset.keyword)
    },
    getSearchGoods: function (e) {
        let that = this
        this.setData({
            page: 1,
            goodsList: [],
            lenovoList: [],
            lenovoModal: false
        }, function () {
            that.mid()
        })

    },
    lenovoClick: function (e) {
        let name = e.currentTarget.dataset.name
        let that = this
        this.setData({
            page: 1,
            goodsList: [],
            lenovoList: [],
            lenovoModal: false
        }, function () {
            that.mid(name)
        })
    },
    del: function () {
        let that = this
        app.modal({
            content: "是否清空历史搜索？",
            success() {
                wx.setStorageSync("searchList", [])
                that.setData({
                    searchList: []
                })
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
        // 		获取搜索历史
        this.setData({
            searchList: wx.getStorageSync("searchList") || []
        })
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
        if (!this.data.reach) return;
        this.mid()
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})