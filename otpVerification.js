//Code snippet to set password
var connection = require('"config path"');
module.exports.otpVerification=function(req,res){
    var today = new Date();
    var confirmPassword =req.body.confirmPassword;
    var users={
        "mobile":req.body.mobile,
        "password":req.body.Password,
        "OTP":req.body.OTP,
        "updated_at":today
    }
    var stm1 = connection.query('SELECT * FROM users WHERE mobile = ?',req.body.mobile, function (error, results, fields) {
          console.log("results :: "+ results[0].OTP);
        if (error) {
        res.json({
            status:false,
            message:'There are some error with query'
        })
      }else{
          if(results[0].OTP==req.body.OTP)
                console.log("OTP matched");
          if(req.body.password==confirmPassword)
               console.log("Password matched")
        if(results.length >0 && results[0].OTP==req.body.OTP && req.body.Password==req.body.confirmPassword){
        var stm2 =connection.query("UPDATE users SET OTP=0,Password=?,updated_at=? WHERE mobile = ?",[req.body.Password,today,users.mobile], function (error, results, fields) {
            if (error) {
                res.json({
                    status:false,
                    message:'There is some error with query'
                })
            }else{
            res.json({
            status:true,
            data:results,
            message:'OTP matched!'
        })
    }
      });
      console.log("query :: "+ stm2.sql);
    }else{
        res.json({
        status:false,
        data:results,
        message:'OTP/password mismatch!'
    })
}
}
    });
    console.log("query :: "+ stm1.sql);
    
}