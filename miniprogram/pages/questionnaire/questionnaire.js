const app = getApp();
const FIRST_PAGE = 1;
const LAST_PAGE = 10;
const QUERY = wx.createSelectorQuery()

Page({
  data: {
    questions: [{option: 0, value: '没有兴趣或不乐意做事情'}, 
                {option: 1, value: '感到情绪低落，沮丧或绝望'}, 
                {option: 2, value: '入睡或保持睡眠有困难'}, 
                {option: 3, value: '感到疲劳或没有精神'}, 
                {option: 4, value: '胃口不好或饮食过度'}, 
                {option: 5, value: '对自己感到难过；感觉自己是个失败者或让自己或家人失望'},
                {option: 6, value: '做事不能集中注意力，如读报纸或看电视'},
                {option: 7, value: '走路或说话很慢，慢到引人注意（或者相反，坐立 不安或好动，比通常情况下走动的时间多）'},
                {option: 8, value: '想到自己最好去死或者以某种方式伤害自己'},
              ],

    options: [{option: 0, value: '很少或没有时间（不到1天）'},
              {option: 1, value: '一些或一点时间（1-2天）'},
              {option: 2, value: '偶尔或适量时间（3-4天）'},
              {option: 3, value: '大部分或所有时间（5-7天）'}
            ],
            
    answers: [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    highestScore: 27.0,  // 6 * 3
    is_completed: false,
    pageNum: 1,
  },

  toPrevPage: function() {
    let num; 

    if (this.data.pageNum != FIRST_PAGE) {
      num = this.data.pageNum - 1;
    } else {
      num = FIRST_PAGE;
    } 

    this.setData({
      pageNum: num
    });

    this.clearSelection
  },

  toNextPage: function() {
    let num; 

    if (this.data.pageNum != LAST_PAGE) {
      num = this.data.pageNum + 1;
    } else {
      num = LAST_PAGE;
    }

    this.setData({
      pageNum: num
    });

    this.clearSelection();
  },

  clearSelection: function() {
    let buttons = QUERY.selectAll(". radio").fields();
    console.log(buttons);
    for (let i = 0; i < buttons.length; i++) {
      let button = buttons[i];
      button.checked = false;
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
    temp[questionNum - 1] = this.data.options[answerNum].option
    this.setData({
      answers: temp
    })
    console.log(temp)
    
  },

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