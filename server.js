'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const nodemailer = require('nodemailer');
const cors = require('cors');
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });
const fs = require('fs');
const path = require('path');
const Handlebars = require('handlebars');
app.use(cors());
console.log('PORT ' + process.env.PORT);
const port = process.env.PORT || 4300;
const timeOut = process.env.TIMEOUT || 600000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ 'extended': 'false' }));
app.use(express.static('template'));
Handlebars.registerHelper('formatDate', function(inputDate) {
	return inputDate ? inputDate: 'NA';
});
Handlebars.registerHelper('isApplicable', function(remark) {
  	return remark ? remark: 'NA';
});
var emailTemplate = fs.readFileSync(path.join(__dirname, '/template/email.hbs'), 'utf8');
var template = Handlebars.compile(emailTemplate);
app.post('/sendMail', function(req, res) {
	let emailList=[];
	let map = new Map(Object.entries(req.body.EmailDetails));
	let emails= '';
	let ccMap = new Map ();
	ccMap.set('cfaCCEmail', process.env.cfaCCEmail);
	ccMap.set('serviceCcEmail', process.env.serviceCcEmail);
	ccMap.set('Additives', process.env.additives);
	ccMap.set('Packaging', process.env.packaging);
	ccMap.set('Finished Goods', process.env.finishedGoods);
	ccMap.set('Base Oil', process.env.baseOil);
	ccMap.set('Primary', process.env.primary);
	ccMap.set('Sec South', process.env.secSouth);
	ccMap.set('Sec North', process.env.secNorth);
	ccMap.set('Sec East', process.env.secEast);
	ccMap.set('Sec West', process.env.secWest);
	ccMap.set('Tanker', process.env.tanker);
	let cc;
	let noOfEmails=map.size;
	let errorMsg;
	let transporter = nodemailer.createTransport({
		   host: "smtp.gmail.com",
		   secureConnection: false,
		   port: 587,
			auth: {
				user: process.env.emailId,
				pass: process.env.password
			}
	});
	let counter=0;
	for (var [key, value] of map) {
		if('CfaBill' === value[0].billType)
		{
			cc=ccMap.get('cfaCCEmail');
		}
		else if('ServiceBill' === value[0].billType)
		{
			cc=ccMap.get('serviceCcEmail');
		}
		else
		{
			cc = ccMap.get(value[0].category);
		}
		emails={'emails': value};
		let mailOptions = {
		from: process.env.emailId,
		to: key,
		cc: cc,
		subject: 'Bill Acknowledgement',
		html: template(emails)
		};
		setTimeout(function () {
		transporter.sendMail(mailOptions).then(info =>
		{
			counter++;
			emailList.push(info.accepted[0]);
		})
		.catch(err =>
		{
			counter++;
			errorMsg= err;
		});
		},3000);
	};
	setTimeout(function () {
		transporter.close();
		if (emailList.length > 0) {
			res.send('200', emailList.join(','));
		}
		else {
			res.send('500', errorMsg);
		}
	},timeOut);
});
app.post('/sendBill', upload.single('scannedBill'), function(req, res) {
	let transporter = nodemailer.createTransport({
	   host: "smtp.gmail.com",
	   secureConnection: false,
	   port: 587,
		auth: {
			user: process.env.emailId,
			pass: process.env.password
		}
	});
	let htmlMessage=`<html><head><body>
		<span>Dear Sir/Madam,</span>
		<span>I have verified the bill.</span>
		<p>Please find attached scan copy of bill.</p>
		<p>Kindly provide approval with OV number, PO number and Batch number to process the bills.</p>
		<span>Thanks & Regards,</span><br>
		<span>BPC Team</span>
		</body>
		</head>
		</html>`;
	let subject = 'Scanned Bill for Bill Number '+ req.param('billNumber');
	let mailOptions = {
		from: process.env.emailId,
		to: process.env.scanEmailId,
		cc: process.env.cc,
		subject: subject,
		html: htmlMessage,
		attachments: [
			{
				filename: req.file.originalname,
				path: req.file.path
			}
		]
	};
	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			res.send('500', error);
			console.log(error);
			transporter.close();
			fs.unlinkSync(req.file.path);
		}
		if (info) {
			res.send('Success');
			console.log(info);
			transporter.close();
			fs.unlinkSync(req.file.path);
		}
	});

});
app.listen(port, function () {
  console.log('Express app listening on port: ' + port);
});
