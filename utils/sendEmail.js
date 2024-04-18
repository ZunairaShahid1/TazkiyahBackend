import Mailgen from 'mailgen';
import nodemailer from 'nodemailer';

export const SendEmail = (name, email1, phone, message) => {
	const transporter = nodemailer.createTransport({
		service: 'gmail',
		host: 'smtp.gmail.com',
		port: 587,
		// secure: true,
		auth: {
			user: 'tazkiyahriphah56@gmail.com',
			pass: process.env.ApplicationPassword,
		},
	});
	const mailGenerator = new Mailgen({
		theme: 'default',
		product: {
			name: 'Tazkiyah',
			link: 'www.Tazkiyah.com',
		},
		header: {
			title: 'Yours truly',
			imageUrl: 'https://example.com/logo.png', // Replace with your logo image URL
		},
		footer: {
			name: "Hiii",
			title: 'Tazkiyah',
			imageUrl: 'https://example.com/signature.png', // Replace with your signature image URL
		},
	});

	const email = {
		body: {
			intro: `Here is the Message Recieved. <br><br> Name: ${name} <br> Email: ${email1}<br> Phone: ${phone}<br> Message: ${message}<br><br>`,
		}
	}

	const emailBody = mailGenerator.generate(email);
	const mailOptions = {
		from: 'tazkiyahriphah56@gmail.com',
		to: 'tazkiyahriphah56@gmail.com',
		subject: "New Message Recieved from Website",
		html: emailBody,
	};

	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			console.error('Error sending email:', error);
		} else {
			console.log('Email sent successfully:', info.response);
		}
	});
};