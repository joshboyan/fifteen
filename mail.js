var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'Yahoo',
  auth: {
    user: 'joshboyan@yahoo.com',
    pass: '24045Hss!'
  }
});

app.post('/email', function(req, res) {
  console.log(req.body.select);
    /*var message = {
        from: 'joshboyan@yahoo.com',
        to: 'joshboyan@yahoo.com',
        subject: 'Message from Fifteen Puzzle',
        text: req.body.name + '/n' +
              req.body.email + '/n' +
              req.body.select             
    };
    // Send the mail
    transporter.sendMail(message, function(err, info){
        if(err){
            return console.log(err);
        }
        console.log('Message sent: ' + info.response);
    });*/
});
