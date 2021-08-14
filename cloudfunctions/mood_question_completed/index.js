const cloud = require('wx-server-sdk')
cloud.init()
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  var result = {};
  result.errCode = 0;
  result.errMsg = "";
  result.data = {};
  if (event.week == undefined) {
    result.errCode = 1;
    result.errMsg = "missing required parameter";
    return result;
  }
  if (event.week > 53 || event.week <= 0) {
    result.errCode = 2;
    result.errMsg = "parametere out of range, check your parameter";
    return result;
  }
  const db = cloud.database();
  await db.collection("main_db")
  .where({
    openid: wxContext.OPENID
  })
  .get()
  .then(res => {
    var temp = res.data[0].mood_track.mood_date[0] == event.week;
    result.data = {
      is_completed: temp
    }
  });
  result.errCode = 0;
  result.errMsg = 'successfully return';
  return result;
}