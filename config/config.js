console.log(wx.getAccountInfoSync())

let config = {},
    appid = wx.getAccountInfoSync().miniProgram.appId || 'wxa8c604ce63485956';
console.log(appid)
if (appid = 'wx1771b2e93c87e22c') { //正式
    config = {
        apiHost: 'https://api.pzlive.vip/', //正式前端接口域名
        notifyHost: 'https://notifyapi.pzlive.vip', //正式通知接口域名
        payHost: 'http://payapi.pzlife.vip/', //正式支付接口域名
        imgHost: 'https://webimages.pzlive.vip/' //正式图片域名前缀
    }
} else if (appid = 'wxa8c604ce63485956') { //测试
    config = {
        apiHost: 'https://wwwapi.pzlive.vip/index/', //前端接口域名
        notifyHost: 'https://wwwapi.pzlive.vip/notify/', //通知接口域名
        payHost: 'https://wwwapi.pzlive.vip/pay/', //支付接口域名
        imgHost: 'https://webimages.pzlive.vip/' //图片域名前缀
    }
}

module.exports = config;