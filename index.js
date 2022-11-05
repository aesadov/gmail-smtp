const express = require('express')
const cors = require('cors')
const app = express()
const port = 3010
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser')

app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
// parse application/json
app.use(bodyParser.json())

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    //host: "smtp.ethereal.email",
    service: 'gmail',
    auth: {
        user: 'moydomm@gmail.com', // generated ethereal user
        pass: 'buyqdhcsdmzryinf', // generated ethereal password
    },
});

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/sendMessage', async (req, res) => {

    let {name, contacts, message} = req.body
    // send mail with defined transport object
    let info = await transporter.sendMail({
        to: 'aesadov@gmail.com', // list of receivers
        subject: 'сообщение от HR с моего PortfolioPage', // Subject line
        text: `
        from: ${name}; ${contacts}
        
        ${message}`, // plain text body
    })

    res.send('blabla yo-yo!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
