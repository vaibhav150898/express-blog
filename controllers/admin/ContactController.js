const ContactModel = require("../../models/fcontact");

class ContactController {
  static contactdisplay = async (req, res) => {
    const contact = await ContactModel.find().sort({ _id: -1 }).limit(6);
    //    console.log(contact)
    res.render("admin/contact/contactdisplay", { fc: contact });
  };
}
module.exports = ContactController;
