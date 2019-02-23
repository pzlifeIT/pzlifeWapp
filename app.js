//app.js
App({
    onLaunch: function(opt) {
        // 展示本地存储能力

        //本地缓存
        let that = this

    },
    globalData: {
        userInfo: {},
        con_id: '',
        pid: ''
    },
    getconid: function() {
        let that = this
        wx.getStorage({
            key: "con_id",
            success(res) {
                that.globalData.con_id = res.data
            }
        })
    },
    toast: function(data) {
        wx.showToast({
            title: data.title,
            icon: data.icon || "none",
            duration: data.duration || 2000
        })
    },
    share: function(data) {
        let sharejson = {
            title: data.title || '品质生活商城',
            path: data.path || '/page/index/index?pid=',
            imageUrl: data.imageUrl,
            success: function(shareTickets) {

            },
            fail: function(res) {

            },
            complete: function(res) {

            }
        }
        return sharejson
    },
    modal: function(data) {
        wx.showModal({
            title: data.title || '',
            content: data.content || '',
            success(res) {
                if (res.confirm) {
                    console.log('用户点击确定')
                    data.success()
                } else if (res.cancel) {
                    data.cancel()
                    console.log('用户点击取消')
                }
            }
        })

    },
    wxrequest: function(obj) {
        let that = this
        obj.data = obj.data || {}
        if (!obj.nocon) {
            obj.data.con_id = that.globalData.con_id
        }
        wx.showLoading({
            title: '加载中',
        })
        wx.request({
            url: 'http://wwwapi.pzlife.vip/' + obj.url,
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
                        if (typeof obj.success == 'function') {
                            obj.success(result)
                        }
                    } else {
                        if (typeof obj.error == 'function') {
                            obj.error(result.code)
                        }
                    }
                } else {
                    that.networkerror(res.statusCode)
                }

            },
            fail(err) {
                if (typeof obj.fail == 'function') {
                    obj.fail(err)
                }
            }
        })
    },
    networkerror: function(code) {
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
                text = '请求的 URI 过长'
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
    getUserInfo: function(e) {
        let logincode, info
        wx.login({
            success(res) {
                logincode = res.code
            }
        })
        return logincode
    },
    onShow: function(opt) {
        console.log('onshow', opt.query.pid)
        this.globalData.pid = opt.query.pid
    }
})