const app = getApp();

Page({
  data: {
    questions: [{option: 0, value: '对任何事情都提不起兴趣'}, 
                {option: 1, value: '感觉沮丧，忧郁，或绝望 '}, 
                {option: 2, value: '无法入睡，无法保持睡眠，或睡眠时间过多'}, 
                {option: 3, value: '感觉乏力和没有精力'}, 
                {option: 4, value: '没有胃口或过量进食'}, 
                {option: 5, value: '对自己感到不满(感觉自己是个失败者)，或感觉让自己或家人失望'},
                {option: 6, value: '无法集中注意力，比如在读报或看电视时'},
                {option: 7, value: '行动或说话缓慢，以至于引起旁人注意。相反，或因为烦躁而坐立不安'},
                {option: 8, value: '有想要死亡或以某种途径伤害自己的想法'},
              ],

    options: [{option: 0, value: '完全没有'},
              {option: 1, value: '有过几天'},
              {option: 2, value: '超过一半'},
              {option: 3, value: '几乎每天'}
            ],
            
    answers: [-1, -1, -1, -1, -1, -1],
    highestScore: 18.0,  // 6 * 3
    is_completed: false
  },

  onShow: function() {
  // displaying red dot on calendar icon
  var today = new Date();
  var tabList = this.getTabBar().data.list
  var lastDate = new Date(app.globalData.userData.med_date[0])

  if (today.toDateString() != lastDate.toDateString()) {
      tabList[1].showRedDot = true;
  } else {
      tabList[1].showRedDot = false;
  }

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


    if (typeof this.getTabBar === "function" && this.getTabBar()) {
        this.getTabBar().setData({
            selected: 0
        })
    }
},

  onLoad: function (options) {
    // The most recent week during which the questionaire was completed
    var last_questionare_week = app.globalData.userData.mood_track.mood_date[0];

    // Calculates the number of weeks into the program according to today's date
    var currDate = new Date();
    var janOne = new Date(currDate.getFullYear(),0,1);
    var dayNum = Math.floor((currDate - janOne) / (24 * 60 * 60 * 1000));
    var curWeekNum = Math.ceil((currDate.getDay() + 1 + dayNum) / 7);

    // Check if today is in the week, in which the questionare has already been
    // sumbitted
    var is_completed = (curWeekNum == last_questionare_week);

    this.setData({
      is_completed: is_completed
    });
  },
/////////////////////////// "Submit" - In progress
  onTap(event) {
    console.log(app.globalData.userData.mood_track);
    console.log(event.currentTarget.dataset.index);
    console.log(event.mark.groupMark);
    console.log("tapped");

    let questionNum = event.mark.groupMark
    let answerNum = event.currentTarget.dataset.index;

    // this.data.answers[questionNum] = this.data.options[answerNum].option;
    var temp = this.data.answers
    temp[questionNum] = this.data.options[answerNum].option
    this.setData({
      answers: temp
    })
    console.log(temp)
    
  },

  // radio_change(e) {
  //   const items = this.data.options
  //   for (let i = 0; i < items.length; i++) {
  //     if (items[i].value === e.detail.value) {

  //     }
  //   }
  // },

  mood_submit() {
    const allScores = this.data.answers
    let total = 0
    for (var i = 0; i < allScores.length; i++) {
      if (allScores[i] < 0) {
        wx.showToast({
          title:'您尚未完成问卷',
          icon: 'none'
        })
        return
      }
      total += allScores[i]
    }
    var finalScore = Math.round(total)

    // Calculate the week number of the year
    var currDate = new Date();
    var janOne = new Date(currDate.getFullYear(),0,1);
    var dayNum = Math.floor((currDate - janOne) / (24 * 60 * 60 * 1000));
    var weekNum = Math.ceil((currDate.getDay() + 1 + dayNum) / 7);
    this.setData({
      is_completed: true
    });

    wx.cloud.callFunction({
      name: 'mood_tracking_submit',
      data: {
        week: weekNum,
        score: finalScore
      },
      success: out => {
        console.log(out)
        app.globalData.userData.mood_track = out.result.data.mood_track;
        wx.showToast({
          title:'提交成功',
          icon: 'success'
        })
      }
    })
  }
})