// pages/playVoice/playVoice.js
const app = getApp();
const BackgroundAudioManager = wx.getBackgroundAudioManager();
let inter = null;
let interval = null;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        imgHost: '',
        name: '',
        audio: '',
        id: '',
        isWhile: true,
        isPre: true,
        isNext: true,
        isTimeOut: true,
        isPlay: true,
        while: 1,
        time: 0,
        timeOut: false,
        list: [],
        currentTime: '0:0:0',
        his: '0:0:0',
        duration: '',
        current: 0,
        durationTime: 0,
        audio_length: 0
    },
    /**
     * 获取所有音频
     */
    getVoiceList: function () {
        let that = this
        app.wxrequest({
            url: 'audio/getUserAudioList',
            data: {
                status: 1,
                getall: 1
            },
            success(res) {
                let arr = that.disVoiceList(res.audioList);
                console.log(arr)
                that.setData({
                    list: arr
                })
            },
            error(res) {
                app.toast({title: '获取音频列表失败'})
            }
        })
    },
    disVoiceList: function (data) {
        let arr = []
        for (let i = 0; i < data.length; i++) {
            arr.push(data[i].audio)
        }
        return arr
    },
    backgroundAudio: function () {
        console.log('我运行了')
        setTimeout(function () {
            let currentTime = Math.floor(BackgroundAudioManager.currentTime % 3600);
            let duration = Math.floor(BackgroundAudioManager.duration % 3600);
            that.setData({
                current: BackgroundAudioManager.currentTime,
                currentTime: Math.floor(BackgroundAudioManager.currentTime / 3600) + ':' + Math.floor(currentTime / 60) + ':' + currentTime % 60,
                durationTime: BackgroundAudioManager.duration,
                his: Math.floor(BackgroundAudioManager.duration / 3600) + ':' + Math.floor(duration / 60) + ':' + duration % 60,
                isPlay:false
            })
        }, 1000)
        this.playButton()
        let that = this;
        BackgroundAudioManager.onError((res) => {
            console.log(res)
        })
        BackgroundAudioManager.onPause(() => {
            console.log('暂停')
            that.setData({
                isPlay: true
            })
            clearInterval(inter)
            clearInterval(interval)
        })
        BackgroundAudioManager.onStop(() => {
            //在这里判断是否开启了循环
            that.setData({
                isPlay: true,
                current: 0,
                currentTime: '0:0:0'
            })
            clearInterval(inter)
            clearInterval(interval)
            console.log('停止')
        })
        BackgroundAudioManager.onEnded(() => {
            if (that.data.while == 3) {
                console.log('进来了')
                console.log(BackgroundAudioManager.src)
                that.listWhile();
                return
            } else if (that.data.while == 2) {
                that.playButton()
                return
            }
            that.setData({
                isPlay: true,
                current: 0,
                currentTime: '0:0:0'
            })
            clearInterval(inter)
            clearInterval(interval)
            console.log('播放完成')
        })
        BackgroundAudioManager.onNext(() => {
            that.next()
        })
        BackgroundAudioManager.onPrev(() => {
            that.pre()
        })
        BackgroundAudioManager.onPlay(() => {
            console.log('播放ing')
            //获取音频长度
            //获取当前播放位置,每秒获取一次
            inter = setInterval(function () {
                let currentTime = Math.floor(BackgroundAudioManager.currentTime % 3600);
                that.setData({
                    current: BackgroundAudioManager.currentTime,
                    currentTime: Math.floor(BackgroundAudioManager.currentTime / 3600) + ':' + Math.floor(currentTime / 60) + ':' + currentTime % 60
                })
            }, 1000);
            that.setData({
                isPlay: false
            })
        })


    },
    playButton: function () {
        //播放
        let that = this;
        console.log('播放了')
        if (BackgroundAudioManager.src != this.data.audio){
            BackgroundAudioManager.src = this.data.audio;
            console.log(this.data.audio);
            BackgroundAudioManager.title = this.data.name;
        }
        BackgroundAudioManager.play();
        BackgroundAudioManager.onPlay(() => {
            console.log('正在播放了')
            that.setData({
                isPlay: false
            })
        })
        interval = setInterval(function () {
            let currentTime = Math.floor(BackgroundAudioManager.currentTime % 3600);
            that.setData({
                current: BackgroundAudioManager.currentTime,
                currentTime: Math.floor(BackgroundAudioManager.currentTime / 3600) + ':' + Math.floor(currentTime / 60) + ':' + currentTime % 60
            })
        }, 1000);
    },
    stopPlayButton: function () {
        //暂停
        BackgroundAudioManager.pause()
    },
    while: function (e) {
        let whileType = e.currentTarget.dataset.while;
        let sku_audios = this.data.list;
        let that = this;
        this.setData({
            while: whileType
        });
        if (whileType == 1) {
            app.toast({title: '关闭循环'});
            app.globalData.whileState = whileType
        } else if (whileType == 2) {
            app.toast({title: '开启单曲循环'});
            app.globalData.whileState = whileType
            // BackgroundAudioManager.onEnded(() => { //单曲循环 正常播放完成才会循环
            //     that.playButton()
            // })
        } else if (whileType == 3) {
            app.toast({title: '开启列表循环'});
            app.globalData.whileState = whileType
        }

    },
    listWhile: function () {
        let sku_audios = this.data.list;
        let nowPlay = this.data.audio;
        let that = this
        let index = 0
        console.log(nowPlay)
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
        this.setData({
            name: playName,
            audio: playAudio
        })
        BackgroundAudioManager.src = playAudio;
        BackgroundAudioManager.title = playName;
        BackgroundAudioManager.play();
    },
    setTimeOut: function () {
        this.setData({
            timeOut: true
        })
    },
    selectTimeOut: function (e) {
        let value = e.detail.value;
        console.log(value);
        app.globalData.timeOutState = value;
        this.setData({
            time:value
        })
    },
    //确认定时
    confirm: function () {
        //直接用定时器关闭
        let timeOut = this.data.time;
        let msTimeOut = parseInt(timeOut) * 60 * 1000;
        //记录初次定时的时间,到现在定时的时间,过去了多久,然后用设定的时间减去过去的时间就是剩下的时间
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
        let sku_audios = this.data.list;
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
        let playAudio = sku_audios[index].audio;
        let playName = sku_audios[index].name;
        let duration = sku_audios[index].audio_length_text;
        let durationTime = sku_audios[index].audio_length;
        console.log(playAudio);
        this.setData({
            name: playName,
            // duration: duration,
            audio: playAudio,
            // durationTime: durationTime
        })
        BackgroundAudioManager.src = playAudio;
        BackgroundAudioManager.title = playName;
        BackgroundAudioManager.play();
    },
    pre: function () {
        let sku_audios = this.data.list;
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
        let playAudio = sku_audios[index].audio;
        let playName = sku_audios[index].name;
        let duration = sku_audios[index].audio_length_text;
        let durationTime = sku_audios[index].audio_length;
        console.log(playAudio);
        this.setData({
            name: playName,
            // duration: duration,
            audio: playAudio,
            // durationTime: durationTime
        })
        BackgroundAudioManager.src = playAudio;
        BackgroundAudioManager.title = playName;
        BackgroundAudioManager.play();
    },
    slider: function (e) {
        console.log(e)
        this.setData({
            current: e.detail.value
        }, function () {
            BackgroundAudioManager.seek(e.detail.value)
        })
    },
    clickSlider: function (e) {
        console.log(e)
        this.setData({
            current: e.detail.value
        }, function () {
            BackgroundAudioManager.seek(e.detail.value)
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            imgHost: app.globalData.host.imgHost,
            audio: options.audio,
            name: options.name,
            duration: options.duration,
            // durationTime: options.audio_length,
            while:app.globalData.whileState,
            time:app.globalData.timeOutState
        })
        this.getVoiceList()
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        this.backgroundAudio()
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        //
        if (this.data.audio != BackgroundAudioManager.src){
            BackgroundAudioManager.src = this.data.audio;
        }
        BackgroundAudioManager.title = this.data.name
        this.backgroundAudio()
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {
        this.backgroundAudio()
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

    }
})