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
            app.globalData.data = out.result.data;
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
              app.globalData.data = out.result.data;
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


  // onGetUserInfo: function(e) {
  //   let that = this
  //   if (!that.data.logged && e.detail.userInfo) {
  //     console.log("on get user info")
  //     that.setData({
  //       logged: true,
  //       avatarUrl: e.detail.userInfo.avatarUrl,
  //       userInfo: e.detail.userInfo,
  //       hasUserInfo: true,
  //     })
  //   }
  // },
  toCalendar: function() {
    wx.navigateTo({
      url: "../calendar/calendar",
    })
  },

  toQuestionnaire: function() {
    wx.navigateTo({
      url: "../questionnaire/questionnaire",
    })
  },


  onGetOpenid: function() {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
        wx.navigateTo({
          url: '../userConsole/userConsole',
        })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        wx.navigateTo({
          url: '../deployFunctions/deployFunctions',
        })
      }
    })
  },

  // 上传图片
  doUpload: function () {
    // 选择图片
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        wx.showLoading({
          title: '上传中',
        })

        const filePath = res.tempFilePaths[0]
        
        // 上传图片
        const cloudPath = `my-image${filePath.match(/\.[^.]+?$/)[0]}`
        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success: res => {
            console.log('[上传文件] 成功：', res)

            app.globalData.fileID = res.fileID
            app.globalData.cloudPath = cloudPath
            app.globalData.imagePath = filePath
            
            wx.navigateTo({
              url: '../storageConsole/storageConsole'
            })
          },
          fail: e => {
            console.error('[上传文件] 失败：', e)
            wx.showToast({
              icon: 'none',
              title: '上传失败',
            })
          },
          complete: () => {
            wx.hideLoading()
          }
        })
      },
      fail: e => {
        console.error(e)
      }
    })
  },

})
