const app = getApp()
Page({
    data: {
        tab: 1,
        imgHost: '',
        reach: true,
        page: 1,
        searchText: '',
        goodsList: []
    },
    searchchange(e) {
        this.setData({
            searchText: e.detail.value
        })
    },
    searchfinish(e) {
        this.setData({
            page: 1,
            reach: true,
            goodsList: []
        })
        this.getShopGoods()
    },
    autostatus(e) {
        console.log(e)
        let status = this.data.tab,
            goodid = e.currentTarget.dataset.goodsid,
            type = 0;
        if (status == 3) {
            type = 1
        } else {
            type = 2
        }
        console.log(goodid)
        this.autoShopGoods({
            goods_id: goodid,
            type: type
        })
    },
    foldchange(e) {
        let goodsList = this.data.goodsList,
            cur = e.currentTarget.dataset;
        if (cur.fold) {
            goodsList[cur.idx][cur.idx1].fold = false
        } else {
            goodsList[cur.idx][cur.idx1].fold = true
        }
        this.setData({
            goodsList: goodsList
        })
    },
    tabtap(e) {
        let tabdata = e.currentTarget.dataset.tab
        if (this.data.tab == tabdata) return
        this.setData({
            tab: tabdata,
            page: 1,
            reach: true,
            goodsList: []
        })
        this.getShopGoods()
    },
    getShopGoods: function() {
        let that = this
        app.wxrequest({
            url: 'shopmanage/getShopGoods',
            data: {
                type: that.data.tab,
                search: that.data.searchText,
                page: that.data.page,
                pagenum: 10
            },
            success: function(res) {
                if (res.goods_list.length < 10) {
                    that.setData({
                        reach: false
                    })
                }
                if (res.goods_list.length > 0) {
                    let goodsList = that.data.goodsList
                    goodsList.push(that.disGoodsList(res.goods_list))
                    that.setData({
                        goodsList: goodsList,
                        page: that.data.page + 1
                    })
                }
            }
        })
    },
    autoShopGoods(data) {
        let that = this
        app.wxrequest({
            url: 'shopmanage/autoShopGoods',
            data: {
                type: data.type,
                goods_id: data.goods_id
            },
            success: function(res) {
                that.searchfinish()
                app.toast({ title: '操作成功' })

            }
        })
    },
    disGoodsList(data) {
        let len = data.length,
            x = 0;
        for (let i = 0; i < len; i++) {
            x = data[i].goods_sku.length
            if (x === 1) {
                data[i].isShow = false
            } else if (x > 1) {
                data[i].isShow = true
                data[i].fold = true
            }
        }
        return data
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.setData({
            imgHost: app.globalData.host.imgHost
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
        this.getShopGoods()
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
        if (!this.data.reach) return
        this.getShopGoods()
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})