const cloud = require('wx-server-sdk')
cloud.init()
// params: 
// module_num -> [1, 6], representing the number of the  module
// task_num, representing the number of the task
// page_num, representing the number of the page within the task
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  var result = {};
  result.errCode = 0;
  result.errMsg = "";
  result.data = {};
  if (!event.module_num || event.module_num == undefined) {
    result.errCode = 1;
    result.errMsg = "please pass in the necessary parameter representing the module number";
    return result;
  }
  if (!event.task_num || event.task_num == undefined) {
    result.errCode = 1;
    result.errMsg = "please pass in the necessary parameter representing the task number";
    return result;
  }
  if (!event.page_num || event.page_num == undefined) {
    result.errCode = 1;
    result.errMsg = "please pass in the necessary parameter representing the page number";
    return result;
  }
  if (event.module_num < 1 || event.module_num > 6) {
    result.errCode = 2;
    result.errMsg = "parameter out of range: module_num -> [1, 6]";
    return result;
  }
  var page_int = parseInt("" + event.module_num + event.task_num + event.page_num, 10);
  var userData;
  const db = cloud.database();
  await db.collection("main_db")
  .where({
    openid: wxContext.OPENID
  })
  .get()
  .then(res => {
    userData = res.data[0].starred_pages;
    result.data = res.data[0];
  });
  const index = userData.indexOf(page_int);
  if (index > -1) {  // remove the page from array
    userData.splice(index, 1);
  } else {  // add the page to array
    userData.push(page_int);
  }
  await db.collection("main_db")
  .where({
    openid: wxContext.OPENID
  })
  .update({
    data: {
      starred_pages: userData
    }
  })
  .then(res => {
    console.log("starred/unstarred page successfully");
  })
  result.data.starred_pages = userData;
  return result;
}