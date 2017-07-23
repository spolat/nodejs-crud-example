const express = require("express"),
      logger = require("morgan"),
      bodyParser = require("body-parser"),
      db = require("./db/db"),
      app = express(),
      User = require("./models/user"),
      PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));

app.post("/saveToDb" , (req,res) => {
   const newUser = new User({
       email : req.body.email,
       username : req.body.username,
       lastname : req.body.lastname
   });

   newUser.save((err,savedUser) => {
        if(err) return res.status(500).send(err);
        return res.status(200).send(savedUser);
   });  
});

app.post("/getAllFromDb" , (req,res) => {
    User.find({"email" : req.body.email} , (err,result) => {
        if(err) return res.status(500).send(err);
        else return res.status(200).send(result);
    });
});

app.post("/getUniqueFromDb" , (req,res) => {
    User.findOne({"email" : req.body.email} , (err,user) => {
        if(err) return res.status(500).send(err);
        if(!user) return res.status(404).send({errCode : 404 , message : "Can not find user"});
        else return res.status(200).send(user);
    });
});

app.post("/setAllUsername" , (req,res) => {
    User.update({"email" : req.body.email} , {$set : {username : req.body.username}},{multi : true} , (err,result) => {
        if(err) return res.status(500).send(err);
        return res.status(200).send(result);
    });
});

app.post("/setUniqueUsername" , (req,res) => {
    User.findOneAndUpdate({"email" : req.body.email} , {$set : {username : req.body.username}} , (err,result) => {
        if(err) return res.status(500).send(err);
        return res.status(200).send(result);
    });
});

app.listen(PORT , () => {
    console.log("app listening on port: " + PORT);
});