const cloud = require('wx-server-sdk')
cloud.init()
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  if (wxContext.OPENID != undefined) {
    console.log("user data: " + wxContext.OPENID);
  } else {
    var result = {};
    result.errCode = 1;
    result.errMsg = "failed to get user data from WXContext";
    result.data = {};
    return result;
  }
  
  // check if it can get avatar and gender info
  if (event.avatarUrl == undefined || event.gender == undefined) {
    var result = {};
    result.errCode = 2;
    result.errMsg = "Please pass the avatar and gender information as parameters";
    result.data = {};
    return result;
  }

  // check database
  const db = cloud.database();
  var user;
  await db.collection("main_db")
  .where({
    openid: wxContext.OPENID
  })
  .get()
  .then(res => {
    console.log("sucessfully check the database for user information");
    user = res.data[0];
  });

  // check if the user had already registered
  if (user == undefined) {
    // build a new record
    to_add_data = {
      nickname: event.nickname,
      avatarUrl: event.avatarUrl,
      gender: event.gender,
      openid: wxContext.OPENID,
      is_admin: false,
      reg_time: new Date(),
      last_sign_in: new Date(),
      med_rec: {},
      med_track: {
        med_date: [],
        mood_score: []
      }
    };
    console.log(to_add_data);
    var add_rec_result = {};
    await db.collection('main_db')
    .add({
      data: to_add_data
    })
    .then(res => {
      console.log("new user added in the database");
    });
  } else {
    await db.collection('main_db')
    .where({
      openid: wxContext.OPENID
    })
    .update({
      data: {
        avatarUrl: event.avatarUrl,
        gender: event.gender,
        last_sign_in: new Date(),
        nickname: event.nickname
      }
    })
    .then(res => {
      console.log("update userinfo successfully");
      console.log(res);
    })
  }
  
  // get user newest information in the database and return
  // to the frontend
  await db.collection('main_db')
  .where({
    openid: wxContext.OPENID
  })
  .get()
  .then(res => {
    console.log("Got newest userinfo from database");
    user = res.data[0];
  });
  
  var result = {};
  result.errCode = 0;
  result.errMsg = 'successfully return userinformation';
  result.data = user;
  return result;
}