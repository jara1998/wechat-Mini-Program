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
    var medDate = app.globalData.userData.med_date
    var tabList = this.getTabBar().data.list
    if (medDate.length != 0) {
        var today = new Date()
        var lastDate = new Date(app.globalData.userData.med_date[0])
    
        if (today.toDateString() != lastDate.toDateString()) {
          tabList[1].showRedDot = true
        } else {
          tabList[1].showRedDot = false
        }
    } else {
      tabList[1].showRedDot = true
    }

    // displaying red dot on moodtracking icon
    // displaying red dot on moodtracking icon
    var last_questionare_week = app.globalData.userData.mood_track.mood_date[0];
    var currDate = new Date();
    var janOne = new Date(currDate.getFullYear(),0,1);
    var dayNum = Math.floor((currDate - janOne) / (24 * 60 * 60 * 1000));
    var curWeekNum = Math.ceil((currDate.getDay() + 1 + dayNum) / 7);
    console.log(curWeekNum);
    if (last_questionare_week == -1) {
      tabList[0].showRedDot = true
    } else {
      if (curWeekNum == last_questionare_week) {
        tabList[0].showRedDot = false;
      } else {
        tabList[0].showRedDot = true;
      }
    }

    this.getTabBar().setData({
      list:tabList
    })

    // changes color when selected
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