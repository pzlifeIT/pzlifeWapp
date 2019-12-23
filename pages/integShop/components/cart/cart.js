// pages/integShop/components/cart/cart.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    mask: false,
    valid: [],
    failure: [],
    total: 0,
    selectAll: true,
    sku_id: 0,
    con_id: "",
    shop_id: 0,
    imgHost: '',
    noClick: false,
    isselect: 0,
    s: [],
    sg: []
  },
lifetimes:{
  attached() {
    this.setData({
      imgHost: app.globalData.host.imgHost
    })
  },
  ready() {
    this.getStorage()
    if (app.globalData.updateNum) {
      app.setCartNum()
    }
    this.setData({
      selectAll: true
    })
  }
},
  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 全选
     */
    selectAll: function () {
      let valid = this.data.valid,
          selectAll = !this.data.selectAll,
          s = this.data.s
      for (let i = 0; i < valid.length; i++) {
        valid[i].selectStatus = selectAll
        s[i] = selectAll
        for (let j = 0; j < valid[i].goods.length; j++) {
          valid[i].goods[j].selectStatus = selectAll
          if (valid[i].goods[j].selectStatus == true) {
            selectAll = true
          }
        }
      }
      this.setData({
        valid: valid,
        selectAll: selectAll,
        s: s
      });
      this.getTotal(valid)
    },
    /**
     * 选择店铺
     */
    selectShop: function (e) {
      let valid = e.currentTarget.dataset.valid,
          validIndex = e.currentTarget.dataset.validIndex,
          selectShop = !valid[validIndex].selectStatus,
          select = []
      let isselect = this.data.isselect
      let s = this.data.s
      console.log(valid)
      console.log(isselect)
      // 只是改变商品的选择状态
      for (let i = 0; i < valid[validIndex].goods.length; i++) {
        valid[validIndex].goods[i].selectStatus = selectShop
        // select[i] = valid[validIndex].goods[i].selectStatus
        s[validIndex] = selectShop
      }
      let status = false
      let have = s.indexOf(status)
      console.log(s)
      console.log(have)
      if (have > -1) { //如果没有false
        this.setData({
          selectAll: false
        })
      } else {
        this.setData({
          selectAll: true
        })
      }
      valid[validIndex].selectStatus = selectShop
      this.setData({
        valid: valid
      });
      this.getTotal(valid)
    },
    /**
     * 选择商品
     */
    selectGoods: function (e) {
      let goodsIndex = e.currentTarget.dataset.goodsIndex,
          goods = e.currentTarget.dataset.goods,
          selectStatus = !goods[goodsIndex].selectStatus,
          validIndex = e.currentTarget.dataset.validIndex,
          valid = this.data.valid
      let sg = []
      // 改变选中的商品状态
      goods[goodsIndex].selectStatus = selectStatus
      // 将改变之后的商品放进有效商品
      valid[validIndex].goods = goods
      console.log(valid)
      console.log(valid[validIndex].goods)
      let select = []
      for (let i = 0; i < valid.length; i++) {
        for (let j = 0; j < valid[i].goods.length; j++) {
          select.push(valid[i].goods[j].selectStatus)
          // sg.push(valid[validIndex].goods[j].selectStatus)
        }
      }
      // 商品对应供应商
      for (let x = 0; x < valid[validIndex].goods.length; x++) {
        sg.push(valid[validIndex].goods[x].selectStatus)
      }
      console.log(select)
      // return
      let status = false
      let have = select.indexOf(status) // 这里应该判断是不是所有的
      if (have < 0 && selectStatus) { //如果没有false
        this.setData({
          selectAll: true
        })
      } else {
        this.setData({
          selectAll: false
        })
      }
      let haveTrue = sg.indexOf(true)
      if (haveTrue >= 0) {
        valid[validIndex].selectStatus = true
      } else {
        valid[validIndex].selectStatus = false
      }
      this.setData({
        valid: valid
      });
      this.getTotal(valid)
    },
    /**
     * 计算总价
     */
    getTotal: function (valid) {
      // valid = this.data.valid,
      let total = 0
      for (let i = 0; i < valid.length; i++) {
        for (let j = 0; j < valid[i].goods.length; j++) {
          if (valid[i].goods[j].selectStatus) {
            total += valid[i].goods[j].num * valid[i].goods[j].integral_price
          }
        }
      }
      total = parseFloat(total.toFixed(2))
      this.setData({
        // valid:valid,
        total: total
      })
    },

    jian: function (e) {
      let that = this
      const goodsIndex = e.currentTarget.dataset.goodsIndex //商品下标
      let goods = e.currentTarget.dataset.goods, //商品数据
          num = goods[goodsIndex].num, //购买数量
          valid = this.data.valid,
          con_id = this.data.con_id,
          sku_id = goods[goodsIndex].id,
          track_id = goods[goodsIndex].track_id,
          validIndex = e.currentTarget.dataset.validIndex, //有效商品下标
          brokerage = goods[goodsIndex].brokerage
      if (num <= 1) {
        return false
      }
      if (this.data.noClick) return
      this.setData({
        noClick: true
      })
      app.wxrequest({
        url: "cart/addUserIntegralCart",
        data: {
          con_id: con_id,
          goods_skuid: sku_id,
          goods_num: -1,
          parent_id: app.globalData.pid
        },
        success(res) {
          brokerage = parseFloat(brokerage / num)
          num = num - 1
          brokerage = parseFloat(brokerage * num)
          goods[goodsIndex].num = num
          goods[goodsIndex].brokerage = parseFloat(brokerage.toFixed(2))
          valid[validIndex].goods = goods
          that.setData({
            valid: valid,
            noClick: false
          });
          that.getTotal(valid)
          app.setCartNum()
          // that.getStorage()
        },
        error(res) {
          that.setData({
            noClick: false
          });
          if (res == 3001) {
            app.toast({
              title: "con_id错误"
            })
          } else if (res == 3005) {
            app.toast({title: "该商品为钻石会员及以上身份专享"})
          } else if (res == 3006) {
            app.toast({title: "库存不足"})
          } else if (res == 3007) {
            app.toast({title: "该商品为创业店主及以上身份专享"})
          } else if (res == 3008) {
            app.toast({title: "该商品为合伙人及以上身份专享"})
          } else {
            app.toast({title: "错误码：" + res})
          }
        },
        fail(res) {
          that.setData({
            noClick: false
          });
        }
      })
    },
    jia: function (e) {
      let that = this
      const goodsIndex = e.currentTarget.dataset.goodsIndex //商品下标
      let goods = e.currentTarget.dataset.goods, //商品数据
          num = goods[goodsIndex].num, //购买数量
          valid = this.data.valid,
          con_id = this.data.con_id,
          sku_id = goods[goodsIndex].id,
          track_id = goods[goodsIndex].track_id,
          validIndex = e.currentTarget.dataset.validIndex, //有效商品下标
          stock = goods[goodsIndex].stock,
          brokerage = goods[goodsIndex].brokerage
      // console.log(e)
      // 		return
      if (num >= stock) {
        app.toast({
          title: "库存不足"
        });
        return false
      }
      if (this.data.noClick) return
      this.setData({
        noClick: true
      })
      app.wxrequest({
        url: "cart/addUserIntegralCart",
        data: {
          con_id: con_id,
          goods_skuid: sku_id,
          goods_num: 1,
          parent_id: app.globalData.pid
        },
        success(res) {
          brokerage = parseFloat(brokerage / num)
          num = num + 1
          brokerage = parseFloat(brokerage * num)
          goods[goodsIndex].num = num
          goods[goodsIndex].brokerage = parseFloat(brokerage.toFixed(2))
          valid[validIndex].goods = goods
          that.setData({
            valid: valid,
            noClick: false
          });
          that.getTotal(valid)
          app.setCartNum()
          // that.getStorage()
        },
        error(res) {
          that.setData({
            noClick: false
          });
          if (res == 3001) {
            app.toast({
              title: "con_id错误"
            })
          } else if (res == 3005) {
            app.toast({title: "该商品为钻石会员及以上身份专享"})
          } else if (res == 3006) {
            app.toast({title: "库存不足"})
          } else if (res == 3007) {
            app.toast({title: "该商品为创业店主及以上身份专享"})
          } else if (res == 3008) {
            app.toast({title: "该商品为合伙人及以上身份专享"})
          } else {
            app.toast({title: "错误码：" + res})
          }
        },
        fail(res) {
          that.setData({
            noClick: false
          });
        }
      })

    },
    del: function (e) {
      console.log(e)
      let goods = e.currentTarget.dataset.goods,
          goodsIndex = e.currentTarget.dataset.goodsIndex,
          sku_id = goods[goodsIndex].id
      this.setData({
        mask: true,
        sku_id: sku_id
      })
    },
    confirmDel: function () {
      let con_id = this.data.con_id,
          sku_id = this.data.sku_id,
          that = this
      app.wxrequest({
        url: "cart/editUserCart",
        data: {
          con_id: con_id,
          del_skuid: sku_id
        },
        success(res) {
          that.setData({
            mask: false,
            selectAll: true
          });
          app.toast({
            title: "删除成功"
          })
          app.setCartNum()
          that.getStorage()
        },
        error(res) {
          console.log(res)
        },
        fail(res) {
          console.log(res)
        }
      })
    },
    preventTouchMove: function (e) {
      //弹出层防止界面滑动
    },
    hidemask: function (e) {
      this.setData({
        mask: false
      })
    },
    none: function (e) {

    },
    /**
     * 去结算
     */
    buyGoods: function () {
      let valid = this.data.valid,
          len = valid.length,
          len1, x, y, skus = ''
      for (x = 0; x < len; x++) {
        len1 = valid[x].goods.length
        for (y = 0; y < len1; y++) {
          if (valid[x].goods[y].selectStatus) {
            skus += valid[x].goods[y].id + ','
          }
        }
      }
      skus = skus.substring(0, skus.length - 1);
      console.log(skus)
      if (!skus) {
        app.toast({
          title: "请选择商品"
        })
        return;
      }
      wx.navigateTo({
        url: '/pages/integShop/confirmOrder/confirmOrder?skus=' + skus
      })
    },
    /**
     * 添加选择状态字段
     */
    addText: function (data) {
      for (let i = 0; i < data.length; i++) {
        data[i].selectStatus = true
        for (let j = 0; j < data[i].goods.length; j++) {
          data[i].goods[j].selectStatus = true
        }
      }
      return data
    },
    getCartGoodsList: function (con_id) {
      let that = this
      app.wxrequest({
        url: "cart/getUserIntegralCart",
        data: {
          con_id: con_id
        },
        success(res) {
          let valid = that.addText(res.valid)
          that.setData({
            valid: valid,
            failure: res.failure,
            validNum: valid.length + ''
          });
          that.getTotal(valid)
        },
        error(res) {
          console.log(456)
          if (res == 5000) {
            wx.showModal({
              title: "请先登录",
              content: "是否确定去登录",
              showCancel: true,
              confirmColor: "#E61F18",
              success(res) {
                if (res.confirm) { //点击确定
                  wx.navigateTo({
                    url: "/pages/login/login"
                  })
                }
              }
            })
          } else if (res == 3000) {
            that.setData({
              valid: [],
              failure: []
            })
          }
        }
      })
    },
    /**
     * 获取con_id
     */
    getStorage: function () {
      let that = this
      wx.getStorage({
        key: "con_id",
        success(res) {
          that.getCartGoodsList(res.data)
          console.log(res)
          that.setData({
            con_id: res.data
          })
        },
        fail(res) {
          wx.showModal({
            title: "请先登录",
            content: "是否确定去登录",
            showCancel: true,
            confirmColor: "#E61F18",
            success(res) {
              if (res.confirm) { //点击确定
                wx.navigateTo({
                  url: "/pages/login/login"
                })
              }
            }
          })
        }
      })
    },
  }
})
