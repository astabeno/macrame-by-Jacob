import nodemailer from 'nodemailer'

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

export default async function emailer(req, res) {
   if (req.method === 'OPTIONS') {
      // Handle preflight request
      res.status(200).end()
      return
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
      await transporter.sendMail(req.body)
      res.status(200).json({ message: 'Email sent successfully' })
   } catch (error) {
      res.status(500).json({ error: 'Failed to send email' })
   }
}
