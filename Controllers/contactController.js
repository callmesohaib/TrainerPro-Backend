const Contact = require("../Models/contactModel");
const contact = async (req, res) => {
  const { name, email, subject, message } = req.body;
  try {
    const newContact = new Contact({
      name,
      email,
      subject,
      message,
    });
    await newContact.save();
    res.status(200).json({ success: true,  message: "Contact saved successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error saving contact" });
  }
};
module.exports = { contact };
