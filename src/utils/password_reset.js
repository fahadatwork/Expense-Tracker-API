const crypto = require("crypto");

function randomToken() {
  const token = crypto.randomBytes(16).toString("hex");

  return token;
}

function TemplateGenerator(token, username, email) {
  let template = `<body>

<h3>Hello ${username}<h3>
</br>
</br>
</br>
<p>Here is your passworrd reset token for your email ${email} which you can use to reset password<p>
<h3><strong>${token}</strong></h3>
</br>
</hr>
<span>You are getting this email because you have requested a password reset</span>
</br>
</br>
</body>`;

  return template;
}

module.exports = {
  randomToken: randomToken,
  TemplateGenerator: TemplateGenerator,
};
