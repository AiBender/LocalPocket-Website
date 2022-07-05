const mail = require('@sendgrid/mail');

mail.setApiKey(process.env.SENDGRID_API_KEY);

const apiKey = `${process.env.SENDGRID_API_KEY}`;
console.log("SendGrid key ", apiKey);

export default async (req, res) => {
  // const body = JSON.parse(req.body);

  const message = `
    Name: ${req.body.name}\r\n
    Email: ${req.body.email}\r\n
    PhoneType: ${req.body.email}\r\n
    CustomerType: ${req.body.phonetype}
  `;

  const data = {
    to: req.body.email,
    from: 'local.pocket2022@gmail.com',
    subject: `New message from ${req.body.name}`,
    text: message,
    html: message.replace(/\r\n/g, '<br />'),
  };
  try {
    await mail.send(data);
    
  } catch (error) {
    console.log('error', error);
    return res.status(error.statusCode || 500).json({ error: error.message });
  };
  return res.status(200).json({ error: "" });
}
