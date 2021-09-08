const cloud = require('wx-server-sdk')
cloud.init()
// need to know the total number of sub_modules
// params: module_num -> [0, 6]
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  
}