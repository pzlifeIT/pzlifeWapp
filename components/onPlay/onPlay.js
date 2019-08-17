// components/onPlay/play.js
const app = getApp();
let timer = null;
const voice = wx.createInnerAudioContext();
const background = wx.getBackgroundAudioManager();
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        isWhile: {
            type: Boolean,
            value: true
        },
        isPre: {
            type: Boolean,
            value: true
        },
        isNext: {
            type: Boolean,
            value: true
        },
        isTimeOut: {
            type: Boolean,
            value: true
        },
        voice: {
            type: String,
            value: '',
            observe: function (newVal, oldVal) {
                console.log(newVal)
            }
        },
        voiceName: {
            type: String,
            value: ""
        },
        time: {
            type: String,
            value: ""
        },
        voiceId:{
            type:String,
            value:''
        }
    },
    lifetimes: {
        attached: function () {
            this.setData({
                imgHost: app.globalData.host.imgHost
            });
        }
    },
    ready: function () {
        let that = this,
            title;
        console.log(this.properties);
        this.setData({
            audio: this.properties.voice,
            voiceName:this.properties.voiceName
        })
        // voice.src = this.properties.voice;
        console.log(background.src)
        //如果当前播放的音频和
        if (background.src != this.properties.voice) {
            background.src = this.properties.voice;
        }
        title = this.properties.voiceName;
        background.title = title;
        setTimeout(function () {
            console.log(background.duration);
            let t = Math.floor(background.duration % 3600);
            that.setData({
                duration: background.duration,
                his: Math.floor(background.duration / 3600) + ':' + Math.floor(t / 60) + ':' + t % 60
            })
        }, 1000);

        this.playVoice();
        //监听播放
        background.onPlay(() => {
            console.log(background.currentTime)
            that.setData({
                isPlay:true
            })
            let nowTime = new Date().getTime();
            let endTime = new Date(that.properties.time).getTime();
            console.log('时间' + endTime)
            console.log(nowTime)
            if (nowTime >= endTime) {
                app.toast({
                    title: "音频已失效"
                });
                background.stop()
            }
        });
        //监听停止播放
        background.onStop(() => {
            that.setData({
                isPlay: false
            })

        });
        background.onPause(()=>{
            that.setData({
                isPlay: false
            })
        });
        //监听播放完成
        background.onEnded(() => {
            that.setData({
                isPlay: false
            })
        });
        background.onWaiting(()=>{
            app.toast({title:"努力加载中..."})
        })
    },
    attached: function () {

    },
    /**
     * 组件的初始数据
     */
    data: {
        imgHost: '',
        while: true,
        isPlay: true,
        voiceName: "",
        time: 0,
        audio: '',//音频文件
        duration: 0,//音频总长，音频总长只有在播放之后才能获取到值，所以下面用定时器获取
        currentTime: '0:0:0',//当前播放位置，时分秒
        his: '0:0:0',//转成时分秒的音频总长
        current: 0 //原始的当前播放位置
    },

    /**
     * 组件的方法列表
     */
    methods: {
        doWhile: function () {
            let whileType = !this.data.while
            this.setData({
                while: whileType
            })
        },
        play: function () {
            let isPlay = !this.data.isPlay;
            let that = this;
            this.setData({
                isPlay: isPlay
            }, function () {
                that.playVoice()
            })
        },
        playVoice: function () {
            let that = this,
                time;
            // background.src = that.data.audio;
            // background.title = that.data.voiceName;
            // voice.play();
            background.play();
            console.log(background.duration)
            setTimeout(function () {
                console.log(background.duration)
                let t = Math.floor(background.duration % 3600);
                that.setData({
                    duration: background.duration,
                    his: Math.floor(background.duration / 3600) + ':' + Math.floor(t / 60) + ':' + t % 60 || '0:0:0'
                })
            }, 1000)
            background.onError((res) => {
                console.log(res)
            })
            timer = setInterval(function () {
                let current = Math.floor(background.currentTime % 3600);
                that.setData({
                    current: background.currentTime,
                    currentTime: Math.floor(background.currentTime / 3600) + ':' + Math.floor(current / 60) + ':' + current % 60 || '0:0:0'
                })
                time = that.data.time + 1;
                if (background.currentTime >= background.duration) {
                    // background.stop();
                    background.stop();
                    background.onStop(() => {
                        that.setData({
                            isPlay: !that.data.isPlay
                        })
                    });
                    background.onEnded(() => {
                        that.setData({
                            isPlay: !that.data.isPlay
                        })
                    })
                    clearInterval(timer);
                }
            }, 1000);

        },
        stopplay: function () {
            background.pause()
            clearInterval(timer)
        },
        slider: function (e) {
            console.log('e:' + e.detail.value)
            console.log("time" + this.data.time);
            this.setData({
                current: e.detail.value
            }, function () {
                // voice.seek(e.detail.value);
                background.seek(e.detail.value)
            })
        },
        /**
         * 获取音频列表
         */
        getAudioList:function () {
            let that = this
            app.wxrequest({
                url: "audio/getUserAudioList",
                data: {
                    page: that.data.page || 1,
                    pageNum: that.data.pageNum || 10,
                    status: that.data.head
                },
                success(res) {

                },
                error(res) {
                    switch (parseInt(res)) {
                        case 3001:
                        case 3002:
                            app.toast({title: "con_id错误"});
                            break;
                        case 3003:
                            app.toast({title: '参数错误'});
                            break;
                        case 4001:
                            app.toast({title: '获取微信认证key失败'});
                            break;
                        default:
                            app.toast({title: "错误码：" + res})
                    }
                }
            })
        }
    }
})
