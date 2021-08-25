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
    answers: ["", "", "", "", "", ""],
  },
/////////////////////////// "Submit" - In progress
  radio_data: {
    highest: 18.0, // 3 * 6 = 18
    scores: [0, 0, 0, 0, 0, 0] // to store the score for each question
  },

  onTap(event) {
    console.log(event.currentTarget.dataset.index);
    console.log(event.mark.groupMark);
    console.log("tapped");

    let questionNum = event.mark.groupMark
    let answerNum = event.currentTarget.dataset.index;

    this.data.answers[questionNum] = this.data.options[answerNum].value;
    
  },

  radio_change(e) {
    const items = this.data.options
    for (let i = 0; i < items.length; i++) {
      if (items[i].value === e.detail.value) {

      }
    }
  },

  mood_submit() {
    // Calculate the week number of the year
    current_date = new Date();
    var jan_one = new Date(currentdate.getFullYear(),0,1);
    var day_number = Math.floor((current_date - jan_one) / (24 * 60 * 60 * 1000));
    var week_number = Math.ceil((current_date.getDay() + 1 + day_number) / 7);
    //////
    wx.cloud.callFunction({
      name: 'mood_tracking_complete',
      data: {
        week_number
      },
      success: out => {
        if (out) {
          wx.showToast({
            title:'您本周已经提交过调查问卷，不可重复提交',
          })  // the user has submitted this week
          return
        }
        const all_score = this.radio_data.scores
        var total = 0
        for(var i = 0; i < all_score.length; i++) {
          total += score[i]
        }
        final_score = Math.round((1 - total / this.radio_data.highest) * 100)
        wx.cloud.callFunction({
          name: 'mood_tracking_submit',
          data: {
            week: week_number,
            score: final_score
          },
          success: out => {
            console.log('Questionnaire successfully submitted.')
          }
        })
      }
    })
  }
})

