   // LOGIN PAGE
   var connection = require('path');
    module.exports.authenticate=function(req,res){
        var mobile=req.body.mobile;
        var password=req.body.password;
        connection.query('SELECT * FROM users WHERE mobile = ?',[mobile], function (error, results, fields) {
            console.log("results :: "+ results);
          if (error) {console.log(error)
              res.json({
                status:false,
                message:'There is some error with query'
                })
          }else{
            if(results.length >0){
                if(password==results[0].password){
                    res.json({
                        status:true,
                        message:'Successfully authenticated'
                    })
                }else{
                    res.json({
                      status:false,
                      message:"mobile and password does not match"
                     });
                }
             
            }
            else{
              res.json({
                  status:false,    
                message:"mobile is Not Registered"
              });
            }
          }
        });
    }