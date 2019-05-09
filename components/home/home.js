// components/home/home.js
const app = getApp()
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        pageName:String
    },

    /**
     * 组件的初始数据
     */
    data: {
        navH:0
    },
    lifetimes: {
        attached: function () {
           this.getNavH()
            console.log(app.globalData.topHeadHeight)
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
