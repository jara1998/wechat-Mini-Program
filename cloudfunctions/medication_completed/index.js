// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
// paramter: date, date object
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  var result = {};
  result.errCode = 0;
  result.errMsg = "";
  result.data = {};
  if (event.date == undefined) {
    result.errCode = 1;
    result.errMsg = "missing required parameter"
    return result;
  }
  // if (Object.prototype.toString.call(event.date) !== "[object Date]") {
  //   result.errCode = 2;
  //   result.errMsg = "wrong parameter type (should be s date object)"
  //   return result;
  // }
  var userData;
  const db = cloud.database();
  await db.collection("main_db")
  .where({
    openid: wxContext.OPENID
  })
  .get()
  .then(res => {
    if (res.data[0].med_date.length == 0) {
      result.data.is_completed = false;
      return result;
    }
    var received_date = res.data[0].med_date[0];
    result.data.is_completed = (received_date.getYear() == event.date.getYear()) && (received_date.getMonth() == event.date.getMonth()) && (received_date.getDay() == event.date.getDay());
  })
  return result;
}