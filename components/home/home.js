// components/home/home.js
const app = getApp()
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        pageName:String,
        showHome:{
            type:Boolean,
            value:true
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        navH:0,
        showPre:false
    },
    lifetimes: {
        attached: function () {
           this.getNavH()
            console.log(app.globalData.topHeadHeight)
            this.getPages()
        }
    },
    /**
     * 组件的方法列表
     */
    methods: {
        getNavH:function(){
            this.setData({
                navH: app.globalData.topHeadHeight
            })
        },
        getPages:function(){
            //根据页面栈判断有没有上一页，如果有上一页就显示返回键，没有就只显示home
            let pages = getCurrentPages();
            console.log(pages)
            console.log( typeof pages[pages.length-2])
            if (pages[pages.length - 2] != undefined || typeof pages[pages.length - 2] != 'undefined') {
                this.setData({
                    showPre:true
                })
            }
        },
        //回退
        navBack: function () {
            wx.navigateBack({
                delta: 1
            })
        },
        //回主页
        toIndex: function () {
            console.log(123)
            wx.switchTab({
                url:"/pages/index/index"
            })
        },
    }
})
