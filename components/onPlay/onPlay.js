// components/onPlay/onPlay.js
const app = getApp();
let timer = null;
const voice = wx.createInnerAudioContext();
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        isWhile: {
            type: Boolean,
            value: false
        },
        isPre: {
            type: Boolean,
            value: false
        },
        isNext: {
            type: Boolean,
            value: false
        },
        isTimeOut: {
            type: Boolean,
            value: false
        },
        voice: {
            type: String,
            value: '',
            observe: function (newVal, oldVal) {
                console.log(newVal)
            }
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
        let that = this
        console.log(this.properties);
        this.setData({
            audio: this.properties.voice
        })
        voice.src = this.properties.voice
        setTimeout(function () {
            console.log(voice.duration)
            let t = Math.floor(voice.duration % 3600);
            that.setData({
                duration: voice.duration,
                his: Math.floor(voice.duration / 3600) + ':' + Math.floor(t / 60) + ':' + t % 60
            })
        },1000)

    },
    /**
     * 组件的初始数据
     */
    data: {
        imgHost: '',
        while: true,
        isPlay: true,
        time: 0,
        audio: '',//音频文件
        duration: 0,//音频总长，音频总长只有在播放之后才能获取到值，所以下面用定时器获取
        currentTime: '0:0:0',//当前播放位置，时分秒
        his:'0:0:0',//转成时分秒的音频总长
        current:0 //原始的当前播放位置
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
            voice.src = that.data.audio;
            voice.play()
            console.log(voice.duration)
            setTimeout(function () {
                console.log(voice.duration)
                let t = Math.floor(voice.duration % 3600);
                that.setData({
                    duration: voice.duration,
                    his: Math.floor(voice.duration / 3600) + ':' + Math.floor(t / 60) + ':' + t % 60
                })
            },1000)
            voice.onError((res) => {
                console.log(res)
            })
            timer = setInterval(function () {
                let current = Math.floor(voice.currentTime % 3600);
                that.setData({
                    current:voice.currentTime,
                    currentTime: Math.floor(voice.currentTime / 3600) + ':' + Math.floor(current / 60) + ':' + current % 60
                })
                time = that.data.time + 1;
                if (voice.currentTime >= voice.duration) {
                    voice.stop();
                    clearInterval(timer);
                    return
                }
                that.setData({
                    time: time
                })
            }, 1000)
        },
        stopplay: function () {
            let isPlay = !this.data.isPlay;
            this.setData({
                isPlay: isPlay
            })
            voice.pause()
            clearInterval(timer)
        },
        slider: function (e) {
            console.log('e:' + e.detail.value)
            console.log("time" + this.data.time);
            // voice.startTime = e.detail.value
            // console.log(voice.startTime)
            // voice.play();

            this.setData({
                current:e.detail.value
            },function () {
                voice.seek(e.detail.value)
            })
        }
    }
})
