// pages/boss/earnings/earnings.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      num:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.earn == 1){
      wx.setNavigationBarTitle({
        title: '经营性收益总额'
      })
    }else if (options.earn == 2){
      wx.setNavigationBarTitle({
        title: '上月收益'
      })
    } else if (options.earn == 3){
      wx.setNavigationBarTitle({
        title: '本月收益'
      })
    }
  },
  clickSelect:function(e){
    let num = e.currentTarget.dataset.num
      this.setData({
          num:num
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