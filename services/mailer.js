const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.sendEmail = (payload) => {
  if (!payload.to || !payload.from) {
    return;
  }
  const msg = {
    to: payload.to,
    from: "no-reply@ffoperations.com",
    subject: payload.subject,
    text: payload.text,
    html: payload.html,
  };

  return sgMail.send(msg);
};
