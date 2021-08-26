const app = getApp();

Page({
  data: {
    questions: [{option: 0, value: '没有兴趣或不乐意做事情'}, 
                {option: 1, value: '感到情绪低落，沮丧或绝望'}, 
                {option: 2, value: '入睡或保持睡眠有困难'}, 
                {option: 3, value: '感到疲劳或没有精神'}, 
                {option: 4, value: '胃口不好或饮食过度'}, 
                {option: 5, value: '对自己感到难过'}],
    options: [{option: 0, value: '很少或没有 不到1天'},
              {option: 1, value: '一些或一点 1-2天'},
              {option: 2, value: '偶尔或适量 3-4天'},
              {option: 3, value: '大部分或所有 5-7天'}],
    answers: [-1, -1, -1, -1, -1, -1],
    highestScore: 18.0
  },
/////////////////////////// "Submit" - In progress
  onTap(event) {
    console.log(event.currentTarget.dataset.index);
    console.log(event.mark.groupMark);
    console.log("tapped");

    let questionNum = event.mark.groupMark
    let answerNum = event.currentTarget.dataset.index;

    // this.data.answers[questionNum] = this.data.options[answerNum].option;
    var temp = this.data.answers
    temp[questionNum] = this.data.options[answerNum]
    this.setData({
      answers: temp
    })
    
  },

  // radio_change(e) {
  //   const items = this.data.options
  //   for (let i = 0; i < items.length; i++) {
  //     if (items[i].value === e.detail.value) {

  //     }
  //   }
  // },

  mood_submit() {
    // Calculate the week number of the year
    currDate = new Date();
    var janOne = new Date(currDate.getFullYear(),0,1);
    var dayNum = Math.floor((currDate - janOne) / (24 * 60 * 60 * 1000));
    var weekNum = Math.ceil((currDate.getDay() + 1 + dayNum) / 7);
    //////
    // console.log(week_number)
    wx.cloud.callFunction({
      name: 'mood_tracking_complete',
      data: {
        weekNum
      },
      success: out => {
        if (out) {
          wx.showToast({
            title:'您本周已经提交过调查问卷，不可重复提交',
          })  // the user has submitted this week
          return
        }
        const allScores = this.data.answers
        let total = 0
        for (var i = 0; i < allScores.length; i++) {
          if (allScores[i] < 0) {
            wx.showToast({
              title:'您尚未完成所有问题',
            })
            return
          }
          total += allScores[i]
        }
        finalScore = Math.round((1 - total / this.data.highestScore) * 100)
        wx.cloud.callFunction({
          name: 'mood_tracking_submit',
          data: {
            week: weekNum,
            score: finalScore
          },
          success: out => {
            console.log('Questionnaire successfully submitted.')
            wx.showToast({
              title:'提交成功',
            })
          }
        })
      }
    })
  }
})

