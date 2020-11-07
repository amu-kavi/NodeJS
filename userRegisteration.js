    var connection = require('config file path');
    module.exports.register=function(req,res){
        var today = new Date();
        var val = Math.floor(100000 + Math.random() * 900000);
        var users=[null,req.body.Firstname,req.body.Lastname,req.body.mobile,"",val,today,today];
        connection.query('SELECT * FROM users WHERE mobile = ?',[req.body.mobile], function (error, results, fields) {
          if(error){
            res.json({
              status:false,
              message:'There is some error with query'
          })
          }else if(results[0]){
            res.json({
              status:false,
              message:'Mobile Number already exists.'
          })
          }else{

        var sqlQuery = connection.query('INSERT INTO users VALUES (?)',[users], function (error, results, fields) {

          if (error) {
            res.json({
                status:false,
                message:'There is some error with query'
            })
          }else{
              res.json({
                status:true,
                data:results,
                message:'User has registered sucessfully'
            })
          }
        });
        console.log("query :: "+ sqlQuery.sql)
      }
    });
    }