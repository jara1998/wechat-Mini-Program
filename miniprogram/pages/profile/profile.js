const app = getApp()

Page({
  data: {
    avatarUrl: './user-unlogin.png',
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl')
  },

  onLoad: function() {
    let that = this

    wx.cloud.callFunction({
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
              avatarUrl: out.result.data.userData.avatarUrl,
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

  toSettingMenu: function() {
    wx.navigateTo({
      url: "../profile/setting/setting",
    })
  },

})
