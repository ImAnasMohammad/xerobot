const mongoose = require('mongoose');

const socialMediaAccountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  accountId: {
    type: String,
    required: true,
    unique: true,
  },
  accountName: {
    type: String,
    required: true,
  },
  accountUserName: {
    type: String,
    required: true,
  },
  accountProfile: {
    type: String,
  },
  platform: {
    type: String,
    required: true,
    enum: ['Instagram', 'Facebook', 'YouTube'],
  },
  accountType: {
    type: String,
    enum: ['Personal', 'BUSINESS', 'CREATOR'],
  },
  accessKey:{
    type: String,
    required: true,
  },
  streamId:{ type: String },
  isCompleted:{type:Boolean},
  isActive:{type:Boolean},
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});


const SocialMediaAccounts = mongoose.models.SocialMediaAccounts || mongoose.model('SocialMediaAccounts', socialMediaAccountSchema);

export default SocialMediaAccounts;

