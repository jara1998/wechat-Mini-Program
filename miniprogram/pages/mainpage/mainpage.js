//index.js
const app = getApp()

Page({
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    username: '用户未登录',
    hasUserInfo: false,
    logged: false,
    takeSession: false,
    requestResult: '',
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') // 如需尝试获取用户信息可改为false
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
    wx.cloud.callFunction({
      name: 'authorized_user',
      data: {
      },
      success: out => {
        console.log('callfunction sucess');
        console.log(out);
        if (out.result.errCode == 0) {
          if (out.result.data.registered) {
            app.globalData.userData = out.result.data.userData;
            console.log(out.errMsg);
            this.setData({
              gender: out.result.data.userData.gender,
              avatarUrl: out.result.data.userData.avatarUrl,
              userInfo: out.result.data.userData,
              hasUserInfo: true,
              logged: true,
              username: out.result.data.userData.nickname
            })
          } else {
            console.log(out.errMsg);
          }
        } else {
          console.log(out.errMsg);
        }
      },
      fail: out => {
        console.log('call function failed')
      },
      complete: out => {
        console.log('call function completed')
        wx.hideLoading()
        console.log(app.globalData.userData)
      }
    })
  },

  // logout() {
  //   let that = this
  //   wx.setStorageSync('userdata', null)
  //   that.setData({
  //     avatarUrl: './user-unlogin.png',
  //     userInfo: null,
  //     hasUserInfo: false,
  //     logged: false,
  //     username: '用户未登录'
  //   })
  //   wx.showToast({
  //     title:'logged out',
  //   })
  // },

  authorization() {
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        //console.log(res.userInfo.avatarUrl)
        wx.showToast({
          title:'授权成功',
        })
        //wx.setStorageSync('userdata', res.userInfo)
        this.setData({
          gender: res.userInfo.gender,
          avatarUrl: res.userInfo.avatarUrl,
          userInfo: res.userInfo,
          hasUserInfo: true,
          logged: true,
          username: res.userInfo.nickName
        })
        //console.log(res.userInfo)
        wx.cloud.callFunction({
          name: 'sign_in',
          data: {
            avatarUrl: res.userInfo.avatarUrl,
            nickname: res.userInfo.nickName,
            gender: res.userInfo.gender
          },
          success: out => {
            console.log('callfunction sucess');
            console.log(out);
            if (out.result.errCode == 0) {
              app.globalData.userData = out.result.data;
            } else {
              console.log(out.errMsg);
            }
          },
          fail: out => {
            console.log('call function failed')
          },
          complete: out => {
            console.log('call function completed')
          }
        })
      }
    })
  },


  toCalendar: function() {
    wx.navigateTo({
      url: "../calendar/calendar",
    })
  },

  toQuesetionnaire: function() {
    wx.navigateTo({
      url: "../questionnaire/questionnaire",
    })
  },

  to_new_mood_tracking: function() {
    wx.navigateTo({
      url: "../new_mood_tracking/new_mood_tracking",
    })
  },

  call_complete_page: function() {
    wx.cloud.callFunction({
      name: 'complete_page',
      data: {
        module_num: 1,
        task_num: 3,
        page_num: 2
      },
      success: out => {
        console.log('callfunction sucess');
        console.log(out);
        if (out.result.errCode == 0) {
          console.log("call CP func sucess")
          console.log(out.result)
        } else {
          console.log(out.errMsg);
        }
      },
      fail: out => {
        console.log('call CP function failed')
      },
      complete: out => {
        console.log('call CP function completed')
      }
    })
  },





})
