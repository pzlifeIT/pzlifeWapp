// pages/category/category.js
const url = require("../../config.js").url;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    category:"",
    firstCate:[],
    secondCate:[],
    thirdCate:{
      "title":"",
      "image":""
    },
    idx:0
  },
//选择一级分类
  selectCate:function(e){
    var idx = e.currentTarget.dataset.index;
    var id = e.currentTarget.dataset.cateId;
    // console.log(id)
    var that = this
    wx.request({
      url: url + 'index/category/getsecondcate',
      method: "post",
      data: {id:id},
      header: {
        "content-type": "application/json"
      },
      dataType: "json",
      success(res) {
        // console.log(res.data.data)
        var second = res.data.data
        that.setData({
          secondCate: second,
          idx:idx
        })
      }
    })

  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
  
      wx.request({
        url: url+'index/category/getfirstcate',
        method:"post",
        data:{},
        header:{
          'content-type':'application/json'
        },
        dataType:'json',
        success(res){
          
        var first = res.data.data
        var id = res.data.data.id
        that.setData({
          firstCate:first,
          
        })
  
          // console.log(index)
        }
      })
      
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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

  }
})