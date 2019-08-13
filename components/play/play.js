// components/onPlay/play.js
const app = getApp();
let timer = null;
const voice = wx.createInnerAudioContext();
Component({
    /**
     * 组件的属性列表
     * 对外属性不可缺少
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
            value: ''
        }
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
        his: '0:0:0',//转成时分秒的音频总长
        current: 0, //原始的当前播放位置
        audios:[]
    },
    lifetimes: {
        attached: function () {
            this.setData({
                imgHost: 'https://webimages.pzlive.vip/'
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
        console.log(voice.src);
        setTimeout(function () {
            console.log(voice.duration)
            let t = Math.floor(voice.duration % 3600);
            that.setData({
                duration: voice.duration,
                his: Math.floor(voice.duration / 3600) + ':' + Math.floor(t / 60) + ':' + t % 60
            })
        }, 1000)
        this.playVoice()
        //监听播放
        voice.onPlay(()=>{
            console.log('正在播放');
            that.setData({
                isPlay:false
            })
        });
        voice.onError((res)=>{
            console.log(res)
        })

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
        next: function (e) {
            let audios = this.data.audios
            let index = 0;
            let id = e.currentTarget.dataset.id // 当前播放的下标
            console.log(audios)
            //获取当前播放的下标
            for (let i=0;i<audios.length;i++){
                if (audios[i].id == id) {
                    if ((i+1) == audios.length){
                        index = 0
                    } else {
                        index = i + 1
                    }
                }
            }
            voice.src = this.data.audios[index]
            this.play()
        },
        pre:function(e){
            let audios = this.data.audios
            let index = 0;
            let id = e.currentTarget.dataset.id // 当前播放的下标
            //获取当前播放的下标
            for (let i=0;i<audios.length;i++){
                if (audios[i].id == id) {
                    if (i == 0){
                        index = audios.length - 1
                    } else {
                        index = i - 1
                    }
                }
            }
            voice.src = this.data.audios[index]
            this.play()
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
            //获取音频
            // voice.src = that.data.audio;
            //播放
            voice.play()
            console.log(voice.duration) // 0
            //利用定时器获取音频时长
            setTimeout(function () {
                console.log(voice.duration)
                let t = Math.floor(voice.duration % 3600);
                that.setData({
                    duration: voice.duration,
                    his: Math.floor(voice.duration / 3600) + ':' + Math.floor(t / 60) + ':' + t % 60
                })
            }, 1000)
            //监听播放出错
            voice.onError((res) => {
                console.log(res)
            })
            //使用定时器让滑动条滑动，并转化当前播放长度为时分秒
            timer = setInterval(function () {
                let current = Math.floor(voice.currentTime % 3600);
                that.setData({
                    current: voice.currentTime,
                    currentTime: Math.floor(voice.currentTime / 3600) + ':' + Math.floor(current / 60) + ':' + current % 60
                })
                // time = that.data.time + 1;
                //当播放长度大于等于时长就停止播放，并清除定时器
                //这里可以直接使用监听播放完成来清除定时器，没必要用这种无聊的判断
                if (voice.currentTime >= voice.duration) {
                    voice.stop();
                    clearInterval(timer);
                    return
                }
                // that.setData({
                //     time: time
                // })
            }, 1000)
        },
        //点击暂停
        stopplay: function () {
            let isPlay = !this.data.isPlay;
            this.setData({
                isPlay: isPlay
            })
            voice.pause()
            clearInterval(timer)
        },
        //滑动滑块快进
        slider: function (e) {
            console.log('e:' + e.detail.value)
            console.log("time" + this.data.time);
            // voice.startTime = e.detail.value
            // console.log(voice.startTime)
            // voice.play();

            this.setData({
                current: e.detail.value
            }, function () {
                voice.seek(e.detail.value)
            })
        }
    }
})
