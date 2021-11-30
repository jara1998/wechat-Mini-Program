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

  onLoad: function() {
    let that = this
    // if (!wx.cloud) {
    //   wx.redirectTo({
    //     url: '../chooseLib/chooseLib',
    //   })
    //   return
    // }
    // var value = wx.getStorageSync('userdata')
    // if (value) {
    //   that.setData({
    //     avatarUrl: value.avatarUrl,
    //     userInfo: value,
    //     hasUserInfo: true,
    //     logged: true,
    //     username: value.nickName
    //   })
    // }
    // check if the current user have already registered
    wx.showLoading({
      title: '加载中',
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
