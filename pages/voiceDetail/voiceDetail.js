// pages/voiceDetail/voiceDetail.js
const innerAudioContent = wx.createInnerAudioContext();
const BackgroundAudioManager = wx.getBackgroundAudioManager();
const app = getApp();
let inte = null;
let inter = null;
let interval = null;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        imgHost: '',
        goods_banner: [],
        goods_data: {},
        goods_details: [],
        goods_sku: [],
        goods_spec: [],
        playState: true,
        idx: '',
        selectVoice: false,
        showModel: false,
        buyNum: 1,
        isIphoneX: false,
        goodData: {},
        attr: [],
        repertory: true,
        buy: false,
        indx: 0,
        skuInfo: {},
        goods_id: 0,
        identity: 0,
        cartNum: 0,
        sku_id: '',
        isWhile: true,
        isPre: true,
        isNext: true,
        isTimeOut: true,
        isPlay: true,
        his: '0:0:0',
        currentTime: '0:0:0',
        while: 1,
        time: 0,
        timeOut: false,
        check: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            imgHost: app.globalData.host.imgHost,
            isIphoneX: app.isIphoneX(),
            goods_id: options.goodid,
            // while: app.globalData.whileState
        })
        app.globalData.goods_id = options.goodid
    },
    call: function () {
        wx.makePhoneCall({
            phoneNumber: '15502123212'
        })
    },
    showModel: function () {
        this.setData({
            showModel: true
        })
    },
    putaway: function () {
        let that = this
        app.wxrequest({
            url: 'shopmanage/autoShopGoods',
            data: {
                type: 1,
                goods_id: that.data.goodid
            },
            success: function (res) {
                that.getGoodsAway()
                app.toast({title: '操作成功'})
            }
        })
    },
    preventTouchMove: function () {
        //防止用户操作弹出层外界面
    },
    hideSelect: function () {
        this.setData({
            selectVoice: false
        })
    },
    hideModel: function () {
        this.setData({
            showModel: false
        })
    },
    selectVoice: function () {
        this.setData({
            selectVoice: true
        })
    },
    selectAttr: function (e) {
        //当前选中其他不选中
        let id = e.currentTarget.dataset.id,
            indx = e.currentTarget.dataset.indx;
        let attr = [];
        if (attr[0] == id) {
            attr[0] = 0
        } else {
            attr[0] = id
        }
        this.setData({
            attr: attr
        })
        this.skuPrice()
    },
    skuPrice: function () {
        let attr = this.data.attr;
        let buy = true;
        let sku = this.data.goods_sku;
        let skuInfo = {};
        let that = this;
        let sku_id = 0
        console.log(attr)
        //获取sku信息
        for (let i = 0; i < sku.length; i++) {
            if (sku[i].id == attr[0]) {
                skuInfo.retail_price = sku[i].retail_price
                skuInfo.name = sku[i].name
                skuInfo.brokerage = sku[i].brokerage
                skuInfo.integral_active = sku[i].integral_active
                skuInfo.audio = sku[i].audios[0].audio
                skuInfo.audio_name = sku[i].audios[0].name
                skuInfo.audition_time = sku[i].audios[0].audition_time
                skuInfo.sku_image = this.data.goods_data.image
                skuInfo.sku_audios = sku[i].audios
                skuInfo.id = sku[i].audios[0].id
                skuInfo.duration = sku[i].audios[0].audio_length_text
                skuInfo.durationTime = sku[i].audios[0].audio_length
                skuInfo.audio_id = sku[i].audios[0].id
            }
        }
        console.log(skuInfo);
        BackgroundAudioManager.stop();
        this.setData({
            goodData: skuInfo,
            buy: true
        }, function () {
            that.checkPlayAudio();
        })
    },

    complete: function () {
        let goods_spec = this.data.goods_sku,
            len = goods_spec.length,
            dataattr = this.data.attr,
            i, y = 0
        for (i = 0; i < len; i++) {
            if (dataattr[i]) {
                y++
            }
        }
        if (y == len) {
            return true
        } else {
            return false
        }
    },
    getnum: function (e) {
        var num = e.detail.value;
        this.setData({
            buyNum: num
        });
    },
    previewImage: function (e) {
        wx.previewImage({
            current: e.currentTarget.dataset.img, // 当前显示图片的http链接
            urls: [e.currentTarget.dataset.img] // 需要预览的图片http链接列表
        })
    },
    jian: function (e) {
        // console.log(123)
        var that = this;
        var newnum = that.data.buyNum - 1;
        if (newnum >= 1) {
            this.setData({
                buyNum: newnum
            })
        }
    },
    jia: function (e) {
        var that = this;
        var newnum = that.data.buyNum + 1;
        this.setData({
            buyNum: newnum
        })
    },
    buyGood: function () {
        if (!this.data.showModel) {
            this.setData({
                showModel: true
            })
            return
        }
        if (!this.data.buy) {
            app.toast({
                title: '请选择规格'
            })
            return
        }
        if (this.data.attr.length <= 0) {
            app.toast({
                title: '请选择规格'
            })
            return
        }
        let that = this
        app.judgelogin({
            success(res) {
                wx.navigateTo({
                    url: "/pages/voiceComfirOrder/voiceComfirOrder?sku_id=" + that.data.attr[0] + "&goods_id=" + that.data.goods_data.id + "&buyNum=" + that.data.buyNum
                })
            }
        })
    },
    /**
     * 获取音频详情
     */
    getVoiceDetail: function () {
        let that = this,
            goodData = {},
            buy = false,
            repertory = true,
            attr = [];
        app.wxrequest({
            url: "goods/getGoods",
            data: {
                goods_id: that.data.goods_id,
                source: 4
            },
            success(res) {
                goodData.sku_image = res.goods_data.image
                goodData.audio_name = res.goods_sku[0].audios[0].name
                goodData.audio = res.goods_sku[0].audios[0].audio
                goodData.audio_id = res.goods_sku[0].audios[0].id
                goodData.audition_time = res.goods_sku[0].audios[0].audition_time;
                goodData.sku_audios = res.goods_sku[0].audios
                goodData.duration = res.goods_sku[0].audios[0].audio_length_text
                goodData.durationTime = res.goods_sku[0].audios[0].audio_length
                if (res.goods_sku.length == 1) {
                    goodData.retail_price = res.goods_sku[0].retail_price
                    goodData.integral_active = res.goods_sku[0].integral_active
                    goodData.id = res.goods_sku[0].id
                    goodData.name = res.goods_sku[0].name
                    goodData.audio_id = res.goods_sku[0].audios[0].id
                    goodData.brokerage = res.goods_sku[0].brokerage
                    buy = true
                    attr[0] = res.goods_sku[0].id
                    // attr.push(res.goods_spec[0].list[0].id)
                    if (parseInt(res.goods_sku[0].stock) < 1) {
                        repertory = false
                    }
                }
                console.log(goodData)
                that.setData({
                    goods_banner: res.goods_banner,
                    goods_data: res.goods_data,
                    goods_details: res.goods_details,
                    goods_sku: res.goods_sku,
                    goods_spec: res.goods_spec,
                    goodData: goodData,
                    buy: buy,
                    repertory: repertory,
                    attr: attr
                }, function () {
                    that.backgroundAudio();
                    that.checkPlayAudio();
                })
            },
            error(res) {
                switch (parseInt(res)) {
                    case 3000:
                        app.toast({title: "商品已下架"});
                        break;
                    default:
                        app.toast({title: '错误码：' + res})
                }
            }
        })
    },
    play: function (e) {
        let audio = e.currentTarget.dataset.audio;
        let time = e.currentTarget.dataset.time;
        let playState = !this.data.playState;
        let skuid = e.currentTarget.dataset.sku;
        let that = this;
        let idx = e.currentTarget.dataset.idx;
        innerAudioContent.src = audio;
        innerAudioContent.stop();
        innerAudioContent.play();
        innerAudioContent.onPlay(function () {
            console.log('zhengzaibofang ')
        })
        that.setData({
            idx: idx,
            sku_id: skuid
        });
        //获取当前播放位置
        inte = setInterval(function () {
            if (innerAudioContent.currentTime >= time) {
                innerAudioContent.stop();
                app.toast({title: "试听结束"});
                that.setData({
                    idx: '',
                    sku_id: ''
                })
                clearInterval(inte)
            }
        }, 1000);
        innerAudioContent.onError(function (res) {
            console.log(res)
        })
    },
    stopplay: function (e) {
        innerAudioContent.stop();
        clearInterval(inte)
        this.setData({
            idx: '',
            sku_id: ''
        })
    },
    getgoodsrecommend: function () {
        let that = this
        app.wxrequest({
            url: "goods/goodsrecommend",
            data: {
                goods_id: that.data.goods_id
            },
            nocon: true,
            success(res) {
                that.setData({
                    recommend: res.data
                });
            }

        })
    },
    recommendGoods: function (e) {
        let id = e.currentTarget.dataset.goodsid
        let type = e.currentTarget.dataset.type;
        if (type == 1) {
            wx.navigateTo({
                url: "/pages/goods/detail?goodid=" + id
            })
        } else if (type == 2) {
            wx.navigateTo({
                url: "/pages/voiceDetail/voiceDetail?goodid=" + id
            })
        }

    },
    getCartNum: function (id) {
        let that = this
        app.wxrequest({
            url: 'cart/getUserCartNum',
            nologin: true,
            success: function (res) {
                that.setData({
                    cartNum: res.total
                })
            }
        })
    },
    getGoodsAway: function () {
        if (this.data.identity != 4) return
        let t = this
        app.wxrequest({
            url: 'shopManage/getGoodsAway',
            data: {
                goods_id: t.data.goods_id
            },
            success(res) {

                t.setData({
                    status: res.putaway
                })
            }
        })
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },
    backgroundAudio: function () {
        console.log("我运行了")
        if (BackgroundAudioManager.src && BackgroundAudioManager.src == this.data.goodData.audio) {
            this.setData({
                isPlay: false
            })
            BackgroundAudioManager.onTimeUpdate(() => {
                let duration = Math.floor(BackgroundAudioManager.duration % 3600);
                let currentTime = Math.floor(BackgroundAudioManager.currentTime % 3600);
                that.setData({
                    duration: BackgroundAudioManager.duration,
                    his: Math.floor(BackgroundAudioManager.duration / 3600) + ':' + Math.floor(duration / 60) + ':' + duration % 60,
                    current: BackgroundAudioManager.currentTime,
                    currentTime: Math.floor(BackgroundAudioManager.currentTime / 3600) + ':' + Math.floor(currentTime / 60) + ':' + currentTime % 60
                })
            })
        }

        let that = this;
        BackgroundAudioManager.onError((res) => {
            console.log(res)
        });
        BackgroundAudioManager.onPause(() => {
            console.log('暂停')
            that.setData({
                isPlay: true
            });
            clearInterval(inter)
            clearInterval(interval)
        });
        BackgroundAudioManager.onNext(() => {
            that.next()
        });
        BackgroundAudioManager.onPrev(() => {
            that.pre()
        });
        BackgroundAudioManager.onPlay(() => {
            console.log('播放ing')
            //获取音频长度
            let duration = Math.floor(BackgroundAudioManager.duration % 3600);
            //判断当前用户有没有听全部的资格，如果有就让她听全部，如果没有，就只能听试听的部分
            // that.checkPlayAudio()
            console.log(that.data.check)
            // return
            if (that.data.check) { //不做判断
                //获取当前播放位置,每秒获取一次
                inter = setInterval(function () {
                    let currentTime = Math.floor(BackgroundAudioManager.currentTime % 3600);
                    //判断试听时间
                    that.setData({
                        current: BackgroundAudioManager.currentTime,
                        currentTime: Math.floor(BackgroundAudioManager.currentTime / 3600) + ':' + Math.floor(currentTime / 60) + ':' + currentTime % 60
                    })
                }, 1000);
            } else {
                //将当前播放位置与试听时间比较
                inter = setInterval(function () {
                    let currentTime = Math.floor(BackgroundAudioManager.currentTime % 3600);
                    //判断试听时间
                    if (BackgroundAudioManager.currentTime >= that.data.goodData.audition_time) {
                        app.toast({title: "试听结束"});
                        BackgroundAudioManager.stop()
                    }
                    that.setData({
                        current: BackgroundAudioManager.currentTime,
                        currentTime: Math.floor(BackgroundAudioManager.currentTime / 3600) + ':' + Math.floor(currentTime / 60) + ':' + currentTime % 60
                    })
                }, 1000);
            }
            that.setData({
                isPlay: false,
                duration: BackgroundAudioManager.duration,
                his: Math.floor(BackgroundAudioManager.duration / 3600) + ':' + Math.floor(duration / 60) + ':' + duration % 60
            })
        });
        BackgroundAudioManager.onStop(() => {
            //在这里判断是否开启了循环
            that.setData({
                isPlay: true,
                current: 0,
                currentTime: '0:0:0'
            })
            clearInterval(inter);
            clearInterval(interval);
            console.log('停止')
        });
        BackgroundAudioManager.onEnded(() => {
            if (that.data.while == 3) {
                console.log('进来了')
                console.log(BackgroundAudioManager.src)
                that.listWhile();
                return
            } else if (that.data.while == 2) {
                that.playButton()
                return
            } else if (that.data.while == 1) {
                console.log('关闭循环')
                that.setData({
                    isPlay: true,
                    current: 0,
                    currentTime: '0:0:0'
                });
                clearInterval(inter);
                clearInterval(interval);
                console.log('播放完成')
            }
        })
    },
    playButton: function () {
        //播放
        if (this.data.goodData.audio != BackgroundAudioManager.src) {
            BackgroundAudioManager.src = this.data.goodData.audio;
            console.log(this.data.goodData.audio);
            BackgroundAudioManager.title = this.data.goodData.audio_name;
        }
        BackgroundAudioManager.play()
    },
    stopPlayButton: function () {
        //暂停
        BackgroundAudioManager.pause()
        this.setData({
            isPlay: true
        })
    },
    checkPlayAudio: function () {
        let that = this
        app.wxrequest({
            url: "audio/checkUserAudio",
            data: {
                audio_id: that.data.goodData.audio_id
            },
            success(res) {
                if (res.checked == 1) {
                    that.setData({
                        check: true
                    })
                } else {
                    that.setData({
                        check: false
                    })
                }
            },
            error(res) {
                console.log(res);
            }
        })
    },

    while: function (e) {
        if (!this.data.check) {
            app.toast({title: '未购买无法开启循环'});
            return
        }
        let whileType = e.currentTarget.dataset.while;
        let sku_audios = this.data.goodData.sku_audios;
        let that = this;
        if (sku_audios.length <= 0) {
            app.toast({title: '请选择需要循环的规格'})
            return
        }
        if (whileType == 1) {
            app.toast({title: '关闭循环'});
            this.setData({
                while: whileType
            }, function () {
                BackgroundAudioManager.onEnded(() => {
                    console.log('关闭循环')
                    that.setData({
                        isPlay: true,
                        current: 0,
                        currentTime: '0:0:0'
                    });
                    clearInterval(inter);
                    clearInterval(interval);
                    console.log('播放完成')
                })
            })
            // app.globalData.whileState = whileType
        } else if (whileType == 2) {
            app.toast({title: '开启单曲循环'});
            // app.globalData.whileState = whileType
            this.setData({
                while: whileType
            }, function () {
                BackgroundAudioManager.onEnded(() => { //单曲循环 正常播放完成才会循环
                    that.playButton()
                })
            })

        } else if (whileType == 3) {
            app.toast({title: '开启列表循环'});
            this.setData({
                while: whileType
            }, function () {
                BackgroundAudioManager.onEnded(() => {
                    that.listWhile()
                })
            });
            // app.globalData.whileState = whileType

        }

    },
    listWhile: function () {
        let sku_audios = this.data.goodData.sku_audios;
        let nowPlay = this.data.goodData.audio;
        let that = this
        let index = 0
        let goodData = this.data.goodData
        for (let i = 0; i < sku_audios.length; i++) {
            if (nowPlay == sku_audios[i].audio) {
                if (i + 1 >= sku_audios.length) {
                    index = 0
                } else {
                    index = i + 1
                }

            }
        }
        let playAudio = sku_audios[index].audio;
        let playName = sku_audios[index].name;
        let duration = sku_audios[index].audio_length_text;
        let durationTime = sku_audios[index].audio_length;
        console.log(playAudio);
        goodData.audio = playAudio;
        goodData.audio_name = playName;
        goodData.duration = duration;
        goodData.durationTime = durationTime
        this.setData({
            goodData: goodData
        })
        BackgroundAudioManager.src = playAudio;
        BackgroundAudioManager.title = playName;
        BackgroundAudioManager.play();
    },
    doWhile: function () {
        app.toast({title: "关闭循环"});
        this.setData({
            while: true
        })
    },
    setTimeOut: function () {
        if (!this.data.check) {
            app.toast({title: '请先购买'});
            return
        }
        this.setData({
            timeOut: true
        })
    },
    selectTimeOut: function (e) {
        let value = e.detail.value;
        console.log(value);
        this.setData({
            time: value
        })
    },
    //确认定时
    confirm: function () {
        //判断有没有听得资格
        if (!this.data.check) {
            app.toast({title: '请先购买'});
            return
        }
        //直接用定时器关闭
        let timeOut = this.data.time;
        let msTimeOut = parseInt(timeOut) * 60 * 1000;
        if (timeOut == 0) {
            app.toast({title: '设置成功'});
            this.setData({
                timeOut: false
            });
            return
        }
        app.toast({title: "设置定时成功"});
        this.setData({
            timeOut: false
        })
        setTimeout(function () {
            BackgroundAudioManager.stop()
        }, msTimeOut);

    },
    cancel: function () {
        this.setData({
            timeOut: false
        })
    },
    next: function () {
        //获取当前sku包
        let sku_audios = this.data.goodData.sku_audios;
        let goodData = this.data.goodData;
        console.log(sku_audios)
        //获取当前播放的音频
        let nowPlay = BackgroundAudioManager.src;
        console.log(nowPlay)
        let index = 0;
        if (sku_audios.length == 1) {
            app.toast({title: "当前只有一份音频"});
            return
        }
        if (sku_audios.length <= 0) {
            app.toast({title: '请选择需要播放的规格'})
            return
        }
        for (let i = 0; i < sku_audios.length; i++) {
            //找到当前播放的下标
            if (nowPlay == sku_audios[i].audio) {
                if (i == sku_audios.length - 1) { // 最后一首
                    index = 0;
                } else {
                    index = (i + 1) >= sku_audios.length ? (sku_audios.length - 1) : (i + 1);
                }
                break;
            } else { //如果没播放
                index = 1;
            }
        }
        let playAudio = this.data.goodData.sku_audios[index].audio;
        let playName = this.data.goodData.sku_audios[index].name;
        let duration = this.data.goodData.sku_audios[index].audio_length_text
        let durationTime = sku_audios[index].audio_length;
        console.log(playAudio);
        goodData.audio = playAudio;
        goodData.audio_name = playName;
        goodData.duration = duration;
        goodData.durationTime = durationTime
        this.setData({
            goodData: goodData
        })
        BackgroundAudioManager.src = playAudio;
        BackgroundAudioManager.title = playName;
        BackgroundAudioManager.play();
    },
    pre: function () {
        let sku_audios = this.data.goodData.sku_audios;
        let nowPlay = BackgroundAudioManager.src;
        let goodData = this.data.goodData;
        let index = 0;
        if (sku_audios.length == 1) {
            app.toast({title: "当前只有一份音频"});
            return
        }
        if (sku_audios.length <= 0) {
            app.toast({title: '请选择需要播放的规格'})
            return
        }
        for (let i = 0; i < sku_audios.length; i++) {
            if (nowPlay == sku_audios[i].audio) {
                if (i == 0) { //如果是第一首
                    index = sku_audios.length - 1
                } else {
                    index = (i - 1) <= 0 ? 0 : (i - 1)
                }
                break;
            } else {
                index = (sku_audios.length - 1) <= 0 ? 0 : (sku_audios.length - 1)
            }
        }
        let playAudio = this.data.goodData.sku_audios[index].audio;
        let playName = this.data.goodData.sku_audios[index].name;
        let duration = this.data.goodData.sku_audios[index].audio_length_text
        let durationTime = sku_audios[index].audio_length;
        console.log(playAudio);
        goodData.audio = playAudio;
        goodData.audio_name = playName;
        goodData.duration = duration;
        goodData.durationTime = durationTime
        this.setData({
            goodData: goodData
        })
        BackgroundAudioManager.src = playAudio;
        BackgroundAudioManager.title = playName;
        BackgroundAudioManager.play();
    },
    slider: function (e) {
        if (!this.data.check) {
            app.toast({title: "请先购买"});
            return;
        }
        this.setData({
            current: e.detail.value
        }, function () {
            BackgroundAudioManager.seek(e.detail.value)
        })
    },
    clickSlider: function (e) {
        if (!this.data.check) {
            app.toast({title: "请先购买"});
            return;
        }
        console.log(e)
        this.setData({
            current: e.detail.value
        }, function () {
            BackgroundAudioManager.seek(e.detail.value)
        })
    },
    getNowPlay: function () {
        let that = this
        let nowPlay = BackgroundAudioManager.src
        if (nowPlay) {
            console.log('播放中')
            interval = setInterval(function () {
                let currentTime = Math.floor(BackgroundAudioManager.currentTime % 3600);
                that.setData({
                    current: BackgroundAudioManager.currentTime,
                    currentTime: Math.floor(BackgroundAudioManager.currentTime / 3600) + ':' + Math.floor(currentTime / 60) + ':' + currentTime % 60
                })
            }, 1000);
            this.setData({
                isPlay: false
            })
        }
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        this.setData({
            identity: app.globalData.userInfo.user_identity || 0,
            cartNum: ''
        })
        this.getCartNum()
        this.getGoodsAway()
        this.getVoiceDetail()
        this.getgoodsrecommend()
        // this.getNowPlay()
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
        if (!this.data.check) {
            BackgroundAudioManager.stop()
        }
        innerAudioContent.stop()
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
        let that = this
        return app.share({
            title: that.data.goods_data.goods_name,
            path: '/pages/voiceDetail/voiceDetail?goodid=' + that.data.goods_id,
            imageUrl: that.data.goods_data.share_image,
        })
    }
})