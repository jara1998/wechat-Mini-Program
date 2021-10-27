const app = getApp();
// pages/mainpage/mainpage.js
Page({

  /**
   * Page initial data
   */
  data: {

  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
      
  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function() {
    // displaying red dot on calendar icon
    var today = new Date();
    var tabList = this.getTabBar().data.list;
    console.log(app.globalData.userData);
    console.log("look above");
    if (app.globalData.userData.med_date.length == 0) {
      tabList[1].showRedDot = true;

    } else {
      var lastDate = new Date(app.globalData.userData.med_date[0])
      if (today.toDateString() != lastDate.toDateString()) {
        tabList[1].showRedDot = true;
      } else {
        tabList[1].showRedDot = false;
      }
    }
      this.getTabBar().setData({
        list:tabList
      })

    if (typeof this.getTabBar === "function" && this.getTabBar()) {
        this.getTabBar().setData({
            selected: 3
        })
    }
},

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  },
  
  toInfoPage: function () {
    wx.navigateTo({
      url: '../infoPage/infoPage',
    })
  }
})