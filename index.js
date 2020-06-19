const express=require("express");
const bodyParser=require("body-parser");
const ejs=require("ejs");
const request=require("request");
const router = express.Router();
var mysql = require('mysql'); 
const app=express();
app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));


var con = mysql.createConnection({
  host: "sql12.freemysqlhosting.net",
  user: "sql12349493",
  password: "THzlgueHjw",
  database: "sql12349493"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});


app.get("/",function(req,res){
    res.render("index");
});
app.get("/admin",function(req,res){
  res.render("admin");
});
app.get("/insert",function(req,res){
  res.render("insert");
});

app.post("/insert",function(req,res){
  var sql = "INSERT INTO products (idp,name,quantity,brand,price,url,discription,rating) VALUES ?";  
  var values = [  
  [req.body.idp,req.body.name,req.body.quantity,req.body.brand,req.body.price,req.body.url,req.body.message,req.body.rating],  
  ];  
  var sql2="SELECT * FROM products WHERE idp = ?"
  var data=req.body.idp;
  con.query(sql2,data, function (err, result) {
    if (err) throw err;
    if(result.length==0){
      con.query(sql, [values], function (err, result) {
        if (err) throw err;
        console.log("1 record inserted"+result.affectedRows);
        res.render("insert")
      });
    }
    else{
      console.log("IDP Already present");
    }
    
  });
  
});

app.post("/update",function(req,res){
  var sql = "INSERT INTO products (idp,name,quantity,brand,price,url,discription,rating) VALUES ?";  
  var values = [  
  [req.body.idp,req.body.name,req.body.quantity,req.body.brand,req.body.price,req.body.url,req.body.message,req.body.rating],  
  ];  
  var sql2="SELECT * FROM products WHERE idp = ?"
  var data=req.body.idp2;
  con.query(sql2,data, function (err, result) {
    if (err) throw err;
    if(result.length!=0){
      con.query(sql, [values], function (err, result) {
        if (err) throw err;
        console.log("1 record Updated"+result.affectedRows);
        res.render("update");
      });
    }
    else{
      console.log("IDP Not present");
      res.render("update");
    }
    
  });
  
});
app.post("/delete",function(req,res){
 
  var sql = "DELETE FROM products WHERE idp = ?";
  var val=req.body.idp2;
  console.log(val);
  
  con.query(sql, val,function (err, result) {
    if (err) throw err;
    console.log("Number of records deleted: " + result.affectedRows);
    res.render("delete");
  });
})




app.get("/list",function(req,res){
  con.query("SELECT * FROM products", function (err, results, fields) {
    if (err) throw err;
    console.log(results);
    posts=results
    res.render("display",posts);
  });
 
});


app.post("/dis",function(req,res){
  var sql2="SELECT * FROM products WHERE name = ?"
  var data=req.body.name;

  con.query(sql2,data, function (err, results) {
    if (err) throw err;
    if(results.length!=0){
      posts=results;
      res.render("display",posts);
    }
    else{
      res.json('{ success: true }')
   
    }
});});

app.post("/update1",function(req,res){
  var sql2="SELECT * FROM products WHERE idp = ?"
  var data=req.body.idp2;
  con.query(sql2,data, function (err, result) {
    console.log(result[0].name);
   
    products=result[0];
    req='required=""';
    res.render("update",products,req);
  });
});
app.get("/update",function(req,res){

    products={};
    check=false;
  res.render("update",products,check);

});
app.get("/delete",function(req,res){
  res.render("delete");

});
app.get("/login",function(req,res){
  res.render("login");

});
app.get("/signup",function(req,res){
  res.render("signup");

});
var PORT=process.env.PORT||4000;
app.listen(PORT,function(){
    console.log("server started successfully");
  });