//that.js
const config = require('config/config.js')
App({
    onLaunch: function(opt) {
        // 展示本地存储能力
        //本地缓存
        let that = this
        that.globalData.con_id = wx.getStorageSync('con_id') || ''
        that.globalData.host = config
        wx.setStorageSync("alllenovo", '{}')
        that.getTopHeadHeight()
    },
    globalData: {
        userInfo: {},
        con_id: '',
        addressId: '',
        pid: '',
        host: {},
        updateNum: true,
        topHeadHeight: 0,
        routePage: "",
        wxoptions: ''
    },
    getIndex: function(route = '') {
        let pages = getCurrentPages();
        let index = 100;
        console.log(pages)
        for (let i = 0; i < pages.length; i++) {
            if (pages[i].route == route) {
                index = pages.length - i - 1;
            }
        }
        return index
    },
    getWxRoute: function() {
        let pages = getCurrentPages(),
            prevpage = pages[pages.length - 1];
        if (prevpage.route.indexOf('/login') == -1) {
            this.globalData.routePage = prevpage.route
            this.globalData.wxoptions = ''
            let option = '';
            for (let i in prevpage.options) {
                option += i + '=' + prevpage.options[i] + "&"
            }
            if (option) {
                let newOption = option.slice(0, option.length - 1)
                this.globalData.wxoptions = '?' + newOption
            }
        }
    },
    getTopHeadHeight: function() {
        let that = this
        wx.getSystemInfo({
            success(res) {
                console.log(res.statusBarHeight)
                that.globalData.topHeadHeight = res.statusBarHeight + 46;
            }
        })
    },
    getconid: function() {
        let that = this
        wx.getStorage({
            key: "con_id",
            success(res) {
                that.globalData.con_id = res.data;
                // that.getcartnum(res.data)
            }
        });
        this.getUserInfo()
    },
    setconid: function(conid = '') {
        wx.setStorage({
            key: "con_id",
            data: conid
        })
        this.globalData.con_id = conid
        this.getUserInfo()
    },
    toast: function(data = {}) {
        wx.showToast({
            title: data.title,
            icon: data.icon || "none",
            duration: data.duration || 2000
        })
    },
    share: function(data = {}) {
        if (!data.path) {
            data.path = '/pages/index/index'
        }
        if (data.path.indexOf('?') == -1) {
            data.path = data.path + '?pid=' +
                this.globalData.userInfo.uid || ''
        } else {
            data.path = data.path + '&pid=' + this.globalData.userInfo.uid || ''
        }
        let sharejson = {
            title: data.title || '776品质生活广场',
            path: data.path,
            imageUrl: data.imageUrl || 'https://webimages.pzlive.vip/share.jpg',
            success: function(shareTickets) {

            },
            fail: function(res) {

            },
            complete: function(res) {

            }
        }
        return sharejson
    },
    getUserInfo: function() {
        let that = this
        this.wxrequest({
            url: "user/getuser",
            nologin: true,
            success(res) {
                that.globalData.userInfo = res.data
            }
        })
    },
    judgelogin: function(obj = {}) {
        this.wxrequest({
            url: "user/getuser",
            success(res) {
                typeof obj.success == 'function' ? obj.success(res) : ''
            }
        })
    },
    indexmain: function(id = '') {
        this.wxrequest({
            url: 'user/indexmain',
            data: {
                buid: id
            },
            nologin: true,
            success: function(res) {}
        })
    },
    setCartNum: function(id) {
        let that = this
        that.wxrequest({
            url: 'cart/getUserCartNum',
            nologin: true,
            success: function(res) {
                let n = res.total
                that.globalData.updateNum = false
                if (n == 0) {
                    wx.removeTabBarBadge({
                        index: 2
                    })
                } else {
                    wx.setTabBarBadge({
                        index: 2,
                        text: n.toString()
                    })
                }
            }
        })
    },
    modal: function(data = {}) {
        wx.showModal({
            title: data.title || '',
            content: data.content || '',
            confirmColor: data.confirmColor || "",
            showCancel: data.showCancel || true,
            cancelColor: data.cancelColor || '',
            confirmText: data.confirmText || "确定",
            success(res) {
                if (res.confirm) {
                    typeof data.success == 'function' ? data.success() : ''
                } else if (res.cancel) {
                    typeof data.cancel == 'function' ? data.cancel() : ''
                }
            }
        })
    },
    login: function() {
        let that = this
        this.modal({
            title: "请先登录",
            content: "是否确定去登录",
            success() {
                that.getWxRoute()
                wx.navigateTo({
                    url: "/pages/login/login"
                })
            }
        })
    },
    wxpay: function(data = {}) {
        let that = this
        wx.login({
            success(res) {
                that.wxrequest({
                    url: "pay/pay",
                    data: {
                        order_no: data.order_no || '',
                        payment: data.payment || '1',
                        platform: data.platform || '1',
                        code: res.code || ''
                    },
                    host: 2,
                    nocon: true,
                    success(res) {
                        let parameters = res.parameters || ''
                        wx.requestPayment({
                            timeStamp: parameters.timeStamp || '',
                            nonceStr: parameters.nonceStr || '',
                            package: parameters.package || '',
                            signType: parameters.signType || '',
                            paySign: parameters.paySign || '',
                            success(res) {
                                typeof data.success == 'function' ? data.success(res) : ''
                            },
                            fail(res) {
                                typeof data.fail == 'function' ? data.fail(res) : ''
                            }
                        })
                    },
                    error(code) {
                        let text = ''
                        switch (parseInt(code)) {
                            case 3000:
                                text = '不存在需要支付的订单'
                                break;
                            case 3001:
                                text = '订单号错误'
                                break;
                            case 3002:
                                text = '订单类型错误'
                                break;
                            case 3004:
                                text = '订单已取消'
                                break;
                            case 3005:
                                text = '订单已关闭'
                                break;
                            case 3006:
                                text = '订单已付款'
                                break;
                            case 3007:
                                text = '订单已过期'
                                break;
                            case 3010:
                                text = '支付失败'
                                break;
                            default:
                                text = '意料之外的网络错误'
                        }
                        that.toast({
                            title: text
                        })
                        typeof data.error == 'function' ? data.error(code) : ''
                    }
                })
            }
        })
    },
    wxrequest: function(obj = {}) {
        let that = this,
            url = ''
        obj.data = obj.data || {}
        if (!obj.nocon) {
            if (that.globalData.con_id == '') {
                if (obj.nologin) return
                that.login()
                return
            }
            obj.data.con_id = that.globalData.con_id
        }
        if (!obj.noloading) {
            wx.showLoading({ title: '加载中' })
        }
        obj.host = obj.host || 1
        if (obj.host == 2) {
            url = config.payHost
        } else {
            url = config.apiHost
        }
        wx.request({
            url: url + obj.url,
            data: obj.data || {},
            method: obj.method || 'POST',
            dataType: JSON,
            header: {
                'content-type': 'application/json' // 默认值
            },
            success(res) {
                wx.hideLoading()
                if (res.statusCode == 200) {
                    let result = JSON.parse(res.data);
                    if (result.code == 200) {
                        typeof obj.success == 'function' ? obj.success(result) : ''
                    } else {
                        if (result.code == 5000) {
                            if (obj.nologin) return
                            that.login()
                        } else {
                            typeof obj.error == 'function' ? obj.error(result.code) : ''
                        }
                    }
                } else {
                    that.networkerror(res.statusCode)
                }

            },
            fail(err) {
                wx.hideLoading()
                that.toast({ title: '网络错误' })
                if (typeof obj.fail == 'function') {
                    obj.fail(err)
                }
            }
        })
    },
    networkerror: function(code = 0) {
        let text = ''
        switch (parseInt(code)) {
            case 201:
            case 202:
            case 203:
            case 204:
            case 205:
            case 206:
                text = '服务器无响应'
                break;
            case 400:
                text = '错误请求'
                break;
            case 401:
                text = '身份验证错误'
                break;
            case 403:
                text = '服务器拒绝请求'
                break;
            case 404:
            case 410:
                text = '404错误'
                break;
            case 405:
                text = '方法禁用'
                break;
            case 406:
                text = '不接受请求'
                break;
            case 407:
                text = '需要代理授权'
                break;
            case 408:
                text = '请求超时'
                break;
            case 409:
            case 411:
            case 412:
            case 415:
            case 416:
            case 417:
                text = '请求格式出错'
                break;
            case 413:
                text = '请求实体过大'
                break;
            case 414:
                text = '请求的URI过长'
                break;
            case 500:
            case 501:
            case 502:
            case 503:
            case 504:
            case 505:
                text = '服务器错误'
                break;
            default:
                text = '意料之外的网络错误'
        }
        this.toast({ title: text })
    },
    onShow: function(opt) {
        if (opt.query.scene) {
            this.globalData.pid = opt.query.scene
        }
        if (opt.query.pid) {
            this.globalData.pid = opt.query.pid
        }
        this.getconid()
        this.globalData.host = config
        this.getUserRead(this.globalData.pid)
        if (this.globalData.pid == '') return
        this.indexmain(this.globalData.pid)
    },
    getUserRead(pid = '') {
        let that = this
        if (that.globalData.con_id) return
        wx.login({
            success(res) {
                if (res.code) {
                    that.wxrequest({
                        url: 'user/getUserRead',
                        data: {
                            code: res.code,
                            view_uid: pid
                        },
                        nocon: true,
                        success() {

                        }
                    })
                }
            }
        })

    }
})