// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  var result = {};
  result.errCode = 0;
  result.errMsg = "";
  result.data = {
    registered: false
  };
  if (wxContext.OPENID != undefined) {
    console.log("user data: " + wxContext.OPENID);
  } else {
    result.errCode = 1;
    result.errMsg = "failed to get user data from WXContext";
    return result;
  }

  const db = cloud.database();
  var userData;
  await db.collection("main_db")
  .where({
    openid: wxContext.OPENID
  })
  .get()
  .then(res => {
    console.log("sucessfully check the database for user information");
    userData = res.data[0];
  });
  if (userData == undefined) {
    result.errCode = 0;
    result.errMsg = "the current user haven't registered";
    return result;
  } else {
    result.errCode = 0;
    result.errMsg = "the current user have registered, the userInfo is returned";
    result.data.registered = true;
    result.data.userData = userData;
    return result;
  }
}