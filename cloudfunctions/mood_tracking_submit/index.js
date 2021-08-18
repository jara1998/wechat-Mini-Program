
// add the questionnaire result to database
const cloud = require('wx-server-sdk');
cloud.init();
// parameters: week(num) -> [1, 53], score(num) -> [0, 27]
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  var result = {};
  result.errCode = 0;
  result.errMsg = "";
  result.data = {};
  if (!event.week || event.score == undefined) {
    result.errCode = 1;
    result.errMsg = "please pass in all the necessary parameters";
    return result;
  }
  if (event.week > 53 || event.week <= 0 || event.score < 0 || event.score > 27) {
    result.errCode = 2;
    result.errMsg = "parameters out of valid range, valid range: (week -> [1, 53], score -> [0, 27])";
    return result;
  }

  var userData;
  const db = cloud.database();
  await db.collection("main_db")
  .where({
    openid: wxContext.OPENID
  })
  .get()
  .then(res => {
    userData = res.data[0];
  });
  // console.log("updating the mood tracking data");
  // console.log(userData.mood_track);
  var new_mood_date = userData.mood_track.mood_date;
  var new_mood_score = userData.mood_track.mood_score;

  new_mood_date.pop();
  new_mood_score.pop();
  new_mood_date.unshift(event.week);
  new_mood_score.unshift(event.score);
  
  await db.collection("main_db")
  .where({
    openid: wxContext.OPENID
  })
  .update({
    data: {
      mood_track: {
        mood_date: new_mood_date,
        mood_score: new_mood_score
      }
    }
  })
  .then(res => {
    console.log("update mood tracking successfully");
    console.log(res);
  })

  // get user newest information in the database and return
  // to the frontend
  await db.collection('main_db')
  .where({
    openid: wxContext.OPENID
  })
  .get()
  .then(res => {
    console.log("Got newest userinfo from database");
    userData = res.data[0];
  });


  var result = {};
  result.errCode = 0;
  result.errMsg = 'successfully return newest userinformation';
  result.data = userData;
  return result;
}

