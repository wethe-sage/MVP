const { contactUsEmail } = require("../mail/templates/contactFormRes")
const mailSender = require("../utils/mailSender")

exports.contactUsController = async (req, res) => {
  const { email, firstName, message,  } = req.body
  console.log(req.body)
  try {
    const emailRes = await mailSender(
      email,
      "Your data sent successfully",
      contactUsEmail(email, firstName, message,)
    )
    console.log("Email Res ", emailRes)
    return res.json({
      success: true,
      message: "Email sent successfully",
    })
  } catch (error) {
    console.log("Error", error)
    console.log("Error message :", error.message)
    return res.json({
      success: false,
      message: "Something went wrong...",
    })
  }
}
