//app.js
App({
    onLaunch: function() {
        // 展示本地存储能力
        var logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)
        console.log('运行几次')
            // 登录
        wx.login({
                success: res => {
                    // 发送 res.code 到后台换取 openId, sessionKey, unionId

                }
            })
            // 获取用户信息
        wx.getSetting({
                success: res => {
                    if (res.authSetting['scope.userInfo']) {
                        // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                        wx.getUserInfo({
                            success: res => {
                                // 可以将 res 发送给后台解码出 unionId
                                this.globalData.userInfo = res.userInfo

                                // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                                // 所以此处加入 callback 以防止这种情况
                                if (this.userInfoReadyCallback) {
                                    this.userInfoReadyCallback(res)
                                }
                            }
                        })
                    }
                }
            })
            //本地缓存
        let that = this

    },
    globalData: {
        userInfo: null,
        con_id: ''
    },
    getconid: function() {
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
    wxrequest: function(obj) {
        let that = this
        obj.data = obj.data || {}
        if (!obj.nocon) {
            obj.data.con_id = that.globalData.con_id
        }
        wx.request({
            url: 'http://wwwapi.pzlife.vip/' + obj.url,
            data: obj.data || {},
            method: obj.method || 'POST',
            dataType: JSON,
            header: {
                'content-type': 'application/json' // 默认值
            },
            success(res) {
                // 			console.log(res.data)
                // 				return;
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
            },
            fail(err) {
                if (typeof obj.fail == 'function') {
                    obj.fail(err)
                }
            }
        })
    },
    getUserInfo: function(e) {
        let logincode, info
        wx.login({
            success(res) {
                logincode = res.code
            }
        })
        return logincode
    }
})