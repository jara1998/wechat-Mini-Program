const app = getApp();

Page({
  data: {
    questions: [{option: 0, value: '没有兴趣或不乐意做事情'}, 
                {option: 1, value: '感到情绪低落，沮丧或绝望'}, 
                {option: 2, value: '入睡或保持睡眠有困难'}, 
                {option: 3, value: '感到疲劳或没有精神'}, 
                {option: 4, value: '胃口不好或饮食过度'}, 
                {option: 5, value: '对自己感到难过；感觉自己是个失败者或让自己或家人失望'},
              ],

    options: [{option: 0, value: '很少或没有时间（不到1天）'},
              {option: 1, value: '一些或一点时间（1-2天）'},
              {option: 2, value: '偶尔或适量时间（3-4天）'},
              {option: 3, value: '大部分或所有时间（5-7天）'}
            ],
            
    answers: [-1, -1, -1, -1, -1, -1],
    highestScore: 18.0,  // 6 * 3
    is_completed: false,
    pageNum: 0
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