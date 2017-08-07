var nodeMailer = require("nodemailer");
var xoauth2 = require("xoauth2");
var fs = require("fs");
var config = JSON.parse(fs.readFileSync("config.json"));
var email = process.argv[2];
var student = require("./allStudents.js")
var recipient = student[process.argv[3]];

switch(email){
	case "session":
		session();
		break;
	case "intro":
		newStudent();
		break;
	case "eval":
		evalForm();
		break;
	case "all":
		emailAll();
		break;
}

function newStudent(){
	var subject = "Introduction";

	var newEmail = "Hello new student";

	emailThis(newEmail,recipient.email,subject)
}

function session(){
	var subject = "Session today";

	var newEmail = "we have a session today";

	emailThis(newEmail,recipient.email,subject)
}
function evalForm(){
	var subject = "Evaluation form";

	var newEmail = "forgot to fill eval";


	emailThis(newEmail,recipient.email, subject)
}

function emailThis(email,recipient, sub){
	var transporter = nodeMailer.createTransport({
	service:"yahoo",
	secure: false,
	port:25,
	auth:{
		user:"carrillojesus123@yahoo.com",
		pass:config.password
	},
	tls:{
		rejectUnauthorized:false
	}
    });

	var mailOptions = {
		from:"carrillojesus123@yahoo.com",
	
		to: recipient,
		subject:sub,
		text:email
	}


	transporter.sendMail(mailOptions, function(err,info){
		if(err){
			console.log(err)
		}
		
	});
	console.log("email sent to: ", recipient);

}

function emailAll(){
	var emailAll ="Hi everyone";

	for(var key in student){
		var allStudents = student[key].email;
		var transporter = nodeMailer.createTransport({
		service:"yahoo",
		secure: false,
		port:25,
		auth:{
			user:"carrillojesus123@yahoo.com",
			pass:config.password
		},
		tls:{
			rejectUnauthorized:false
		}
	    });

		var mailOptions = {
			from:"carrillojesus123@yahoo.com",
			to:allStudents,
			subject:"Available for sessions",
			text:emailAll
		}


		transporter.sendMail(mailOptions, function(err,info){
			if(err){
				console.log(err)
			}
			
		});
		console.log("student, " + student[key].name + " emailed")

	}
	
}

