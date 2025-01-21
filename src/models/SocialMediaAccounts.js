const mongoose = require('mongoose');

const socialMediaAccountSchema = new mongoose.Schema({
  // userId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   required: true,
  //   ref: 'User', // Reference to the user who owns this account
  // },
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
    enum: ['Personal', 'Business', 'Creator'],
  },
  accessKey:{
    type: String,
    required: true,
  },
  streamId:{ type: String },
  facebookId:{type:String,default:null},
  tokenType: {
    type: String,
    default:''
  },
  isCompleted:{type:Boolean},
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

