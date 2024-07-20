const express = require('express');

const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const multer = require('multer');

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Parse application/json
app.use(bodyParser.json());

//ejs setup
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.set('views', path.join(__dirname, 'views'));

const fs = require('fs');

const uploadsDir = path.join(__dirname, 'uploads');

// Create the uploads directory if it does not exist
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}
// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadsDir = path.join(__dirname, 'uploads');
        if (!fs.existsSync(uploadsDir)) {
            fs.mkdirSync(uploadsDir);
        }
        cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });
app.get('/', (req, res) => {

    res.render('index');

});
app.get('/aboutus', (req, res) => {
    res.render('aboutus');
});
app.get('/services', (req, res) => {
    res.render('services');
});

app.get('/career', (req, res) => {
    res.render('career');
});

app.get('/contactus', (req, res) => {
    res.render('contactus');
});
app.get('/consulationpage', (req, res) => {
    res.render('consulationpage');
});

app.get('/mobiledevelopment', (req, res) => {
    res.render('mobiledevelopment');

});

app.get('/webdevelopment', (req, res) => {
    res.render('webdevelopment');

});

app.get('/billingdevelopment', (req, res) => {
    res.render('billingdevelopment');

});

app.get('/enterpricedevelopment', (req, res) => {
    res.render('enterpricedevelopment');

});

app.get('/uiuxdevelopment', (req, res) => {
    res.render('uiuxdevelopment');

});
app.get('/desktopdevelopment', (req, res) => {
    res.render('desktopdevelopment');

});
app.get('/resume', (req, res) => {
    res.render('resume')
    
});

// Define a route to handle form submissions
app.post('/send-email', (req, res) => {
    const { name, email, mobile, address, subject, message } = req.body;

    // Create a transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
        service: 'gmail', // Use your email service
        auth: {
            user: 'codewinxit@gmail.com', // Your email address
            pass: 'blit moqz tpei retf'   // Your email password
        }
    });

    // Set up email data
    const mailOptions = {
        from: email, // sender address
        to: 'codewinxit@gmail.com', // list of receivers
        subject: `Contact Form Submission: ${subject}`, // Subject line
        text: `
        Name: ${name}
        Email: ${email}
        Mobile: ${mobile}
        Address: ${address}
        Message: ${message}
        ` // plain text body
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).json({ message: 'Error sending email. Please try again later.' });
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).json({ message: 'Email sent successfully!' });
        }
    });
});
app.post('/send-consultation-email', (req, res) => {
    const { name, email, phone, service, preferredDate, message } = req.body;

    // Setup Nodemailer
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'codewinxit@gmail.com',
            pass: 'blit moqz tpei retf'
        }
    });

    const mailOptions = {
        from: email,
        to: 'codewinxit@gmail.com',
        subject: 'New Consultation Request',
        text: `Name: ${name}
        Email: ${email}
        Phone: ${phone}
        Service: ${service}
        Preferred Date: ${preferredDate}
        Message: ${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).json({ message: 'Error sending email. Please try again later.' });
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).json({ message: 'Email sent successfully!' });
        }
    });
});
app.post('/submit-resume', upload.single('resume'), async (req, res) => {
    try {
        // Configure nodemailer
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'codewinxit@gmail.com',
                pass: 'blit moqz tpei retf'
            }
        });

        const mailOptions = {
            from: 'codewinxit@gmail.com',
            to: 'recipient-email@example.com',
            subject: 'New Resume Submission',
            text: `Name: ${req.body.name}\nEmail: ${req.body.email}\nPhone: ${req.body.phone}\nPosition: ${req.body.position}\nMessage: ${req.body.message}`,
            attachments: [
                {
                    filename: req.file.originalname,
                    path: req.file.path
                }
            ]
        };

        await transporter.sendMail(mailOptions);

        // Delete the file after sending the email
        fs.unlink(req.file.path, (err) => {
            if (err) console.error('Error deleting file:', err);
        });

        res.json({ message: 'Application submitted successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error submitting the application. Please try again later.' });
    }
});

app.listen(3000);

console.log('Listening on port 3000...');
