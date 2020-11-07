//Forgot Password , resets OTP
var connection = require('path');
module.exports.forgotPassword=function(req,res){
    var today = new Date();
    var val = Math.floor(100000 + Math.random() * 900000);
    var Query =connection.query('update users set OTP=? WHERE mobile =?',[val,req.body.mobile], function (error, results, fields) {
        if (error) {
            res.json({
              status:false,
              message:'There is some error with the query'
              })
        }else{
                  res.json({
                      status:true,
                      message:'OTP set successfully '
                  })
                } 
      });
      console.log("Query :: "+Query);
}