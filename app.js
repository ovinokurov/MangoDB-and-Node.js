
var databaseUrl = "localhost"; // "username:password@example.com/mydb"
var collections = ["users", "reports"]
var db = require("mongojs").connect(databaseUrl, collections);


db.users.find({sex: "female"}, function(err, users) {
    if( err || !users) console.log("No female users found");
    else users.forEach( function(femaleUser) {
        console.log(femaleUser);
    } );
});

 /*
db.users.save({email: "srirangan@gmail.com", password: "iLoveMongo", sex: "male"}, function(err, saved) {
    if( err || !saved ) console.log("User not saved");
    else console.log("User saved");
});
db.users.save({email: "1srirangan@gmail.com", password: "iLoveMongo", sex: "female"}, function(err, saved) {
    if( err || !saved ) console.log("User not saved");
    else console.log("User saved");
});
db.users.save({email: "2srirangan@gmail.com", password: "iLoveMongo", sex: "female"}, function(err, saved) {
    if( err || !saved ) console.log("User not saved");
    else console.log("User saved");
});
db.users.save({email: "3srirangan@gmail.com", password: "iLoveMongo", sex: "female"}, function(err, saved) {
    if( err || !saved ) console.log("User not saved");
    else console.log("User saved");
});
*/

 /*
db.users.update({email: "srirangan@gmail.com"}, {$set: {sex: "female"}}, function(err, updated) {
    if( err || !updated ) console.log("User not updated");
    else console.log("User updated");
});
*/


var http = require('http');
var url = require('url');

http.createServer(function (req, res) {
    var objUsers = [];
	//"female"
    var sex = url.parse(req.url).pathname.substr(1);
    console.log(sex);
    res.writeHead(200, {'Content-Type': 'application/json'})
    db.users.find({sex: sex}, function(err, users) {
        //console.log(err +"/n");
        //console.log(users +"/n");
        if(err || users=="")
            //console.log("No " + sex + " users found");
            //res.write(JSON.stringify([{"Error:" : "No female users found"}]);
            res.write(JSON.stringify([{"Error:" : "No female users found"}]));
            //console.log("No users found");
        else
            users.forEach( function(User) {
				objUsers.push(User);
        } );
		res.write(JSON.stringify(objUsers));
        res.end();
    });


}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');