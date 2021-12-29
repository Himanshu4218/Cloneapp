const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const port = 3000
const Success = {
        success: true,
        message: "Email sent successfully"
       }

const Fail = {
    success: false,
    message: "Error message"
    }

const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
        user: "jenifer.steuber44@ethereal.email", 
        pass: "BmwuYhayAz8jSRUz1a", 
    },
    });
 
app.use(bodyParser.json())

app.post('/', async (req,res) => {

    try{
       const msg = req.body.message;
       const email = req.body.email;
     
       mail = {
           from: 'himanshukashyap@gmail.com',
           to: email, 
           subject: "mail test",
           text: msg 
       }
   
       const info = await transporter.sendMail(mail);
       res.send(Success);

        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    } catch(e){
        res.send(Fail);
    }

})

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
})