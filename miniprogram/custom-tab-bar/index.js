const query = wx.createSelectorQuery();
const app = getApp();
Component({
  /**
   * Component properties
   */
  properties: {

  },

  /**
   * Component initial data
   */
  data: {
    "selected": 0,
    "color": "#959494",
    "selectedColor": "#1C6DCD",
    "list": [
      {
        "showRedDot": false,
        "selectedIconPath": "../images/selected-emotion.png",
        "iconPath": "../images/Group.png",
        "pagePath": "/pages/questionnaire/questionnaire",
        "text": "情绪追踪"
      },
      {
        "showRedDot": false,
        "selectedIconPath": "../images/selected-med.png",
        "iconPath": "../images/med.png",
        "pagePath": "/pages/calendar/calendar",
        "text": "服药记录"
      },
      {
        "showRedDot": false,
        "selectedIconPath": "../images/selected-tracking.png",
        "iconPath": "../images/tracking.png",
        "pagePath": "/pages/mainpage/mainpage",
        "text": "评估"
      },
      {
        "showRedDot": false,
        "selectedIconPath": "../images/selected-profile2.png",
        "iconPath": "../images/profile.png",
        "pagePath": "/pages/mainpage/mainpage",
        "text": "我的"
      }
    ],
  },

  /**
   * Component methods
   */
  methods: {
    onLoad: function(event) {
      console.log(event.currentTarget)
      console.log(this.data)
    },

    tabChange: function(event) {
      const data = event.currentTarget.dataset
      const url = this.data.list[data.index].pagePath
      console.log(data.index)
      wx.switchTab({
        url: url,
        success(){
          let page = getCurrentPages().pop();
          if(page == undefined || page == null){
              return;
          }
          page.onLoad();
        }
      })
      this.setData({
        active: data.index
      })
    }
  }
})