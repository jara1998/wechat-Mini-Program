// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  var result = {};
  result.errCode = 0;
  result.errMsg = "";
  if (event.feedback_text == undefined || event.feedback_text.length == 0) {
    result.errCode = 1;
    result.errMsg = "feedback text should not be empty";
    return result;
  }
  if ((typeof event.feedback_text).localeCompare('string')) {
    result.errCode = 2;
    result.errMsg = "feedback text should be a string";
    return result;
  }
  data_to_add = {
    date: new Date(),
    feedback_text: event.feedback_text,
    solved: false
  };
  const db = cloud.database();
  await db.collection("user_feedback_db")
  .add({
    data: data_to_add
  })
  .then(res => {
    console.log("user feedback added");
    result.errMsg = "user feedback added successfully";
  });
  return result;
}