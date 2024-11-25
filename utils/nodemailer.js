import nodemailer from 'nodemailer'

export default async function nodemailer(message, to) {
   let transporter = nodemailer.createTransport({
      service: 'privateemail',
      auth: {
         user: process.env.EMAIL,
         pass: process.env.PASSWORD,
      },
      host: 'mail.privateemail.com',
      port: 465,
      secure: true,
   })

   const mailOptions = {
      from: process.env.EMAIL_ADDRESS,
      ...message,
   }

   transporter.verify(function (error, success) {
      if (error) {
         console.error(error)
      } else {
         console.log('Server is ready to take our messages')
      }
   })

   try {
      // Send the email
      await transporter.sendMail(mailOptions)
      return { message: 'Email sent successfully' }
   } catch (error) {
      return { error: 'Failed to send email' }
   }
}
