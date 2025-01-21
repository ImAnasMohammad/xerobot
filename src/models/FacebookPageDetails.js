
const mongoose = require("mongoose");

const facebookPageSchema = new mongoose.Schema({
  pageId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  picture: { type: String, required: true },
});


const FacebookPages =
  mongoose.models.FacebookPages || mongoose.model('FacebookPages', facebookPageSchema);

module.exports = FacebookPages;
