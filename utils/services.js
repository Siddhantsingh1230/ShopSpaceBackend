import nodemailer from "nodemailer";
import ejs from "ejs";
import path from "path";

export const sanitizeUser = (user) => {
  const {
    _id,
    username,
    mobileNo,
    email,
    profileImageURL,
    enableNotifications,
    role,
  } = user;
  return {
    _id,
    username,
    mobileNo,
    email,
    profileImageURL,
    enableNotifications,
    role,
  };
};

// Sends mail on successful registration
export const sendRegMail = (name, date, from, pass, recipient, sub) => {
  // Create a Nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: "Gmail", // e.g., 'Gmail', 'Outlook'
    auth: {
      user: from,
      pass: pass,
    },
  });

  // Compile the EJS template
  const emailTemplatePath = path.join(
    path.resolve(),
    "/views/Registration_mail.ejs"
  );

  // Define the email content and recipient
  const mailOptions = {
    from: from,
    to: recipient,
    subject: sub,
  };

  // Data to be passed into the EJS template
  const data = {
    name,
    date,
    email: recipient,
  };

  // Render the EJS template
  ejs.renderFile(emailTemplatePath, data, (err, html) => {
    if (err) {
      console.error("Error rendering EJS template:", err);
      return;
    }

    // Set the HTML content of the email
    mailOptions.html = html;

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });
  });
};

// Sends mail on ResetPassword request
export const sendPasswordResetMail = (
  name,
  date,
  from,
  pass,
  recipient,
  link
) => {
  var transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: from,
      pass: pass,
    },
  });

  var mailOptions = {
    from: from,
    to: recipient,
    subject: `Reset Password | ${name}'s Account `,
    text: `Click the link below to reset your password (${date}) . Ensure you complete the reset process within the next 5 minutes for security reasons ,Link:  ${link}`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

// Sends mail on placing successful order for user
export const sendOrderPlaced = (
  name,
  date,
  from,
  pass,
  recipient,
  link,
  order,
  products,id
) => {
  var transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: from,
      pass: pass,
    },
  });

  // Compile the EJS template
  const emailTemplatePath = path.join(
    path.resolve(),
    "/views/OrderConfirmationMail.ejs"
  );

  // Define the email content and recipient
  const mailOptions = {
    from: from,
    to: recipient,
    subject: "Order Confirmed",
  };

  // Data to be passed into the EJS template
  const data = {
    name,
    date,
    email: recipient,
    order,
    products,id
  };

  // Render the EJS template
  ejs.renderFile(emailTemplatePath, data, (err, html) => {
    if (err) {
      console.error("Error rendering EJS template:", err);
      return;
    }

    // Set the HTML content of the email
    mailOptions.html = html;

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });
  });
  // var mailOptions = {
  //   from: from,
  //   to: recipient,
  //   subject: `Your Order is Confirmed – Thank You for Choosing shopSpace `,
  //   text: `Dear ${name},

  //   Thank you for your recent purchase with Shopspace. We're excited to confirm that your order was successful!

  //   For your convenience, you can review your order details on our website by clicking on the following link: ${link}.

  //   If you have any questions or need assistance, please don't hesitate to reply to this email. We're here to help!v.

  //   We appreciate your business and look forward to serving you again.

  //   Best regards,

  //   Admin,
  //   shopSpace`,
  // };

  // transporter.sendMail(mailOptions, function (error, info) {
  //   if (error) {
  //     console.log(error);
  //   } else {
  //     console.log("Email sent: " + info.response);
  //   }
  // });
};
