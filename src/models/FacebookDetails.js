const mongoose = require('mongoose');

const facebookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  facebookId: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
  },
  profilePicture: {
    type: String,
  },
  accessToken: {
    type: String,
    required: true,
  },
  tokenType: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const FacebookDetails =
  mongoose.models.FacebookDetails || mongoose.model('FacebookDetails', facebookSchema);

export default FacebookDetails;
