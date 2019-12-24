const app = getApp()
Page({
  data: {
    firstSub: [],
    showSub: [],
    ind: 0,
    imgHost: '',
    third: [],
    heightArr: [],
    right: 0,
    toview: 'p1',
    page:'cate'
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (options.page){
      this.setData({
        page:options.page
      })
    }
  },
  jump(e){
    let page = e.currentTarget.dataset.page
    this.setData({
      page:page
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    // this.getHeight()
    if (app.globalData.updateNum) {
      app.setCartNum()
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    let share = app.share({
      title: "分类",
      path: '/pages/category/category'
    })
    return share
  }
})