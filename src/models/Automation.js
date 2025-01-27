const mongoose = require('mongoose');

const buttonSchema = new mongoose.Schema({
    label: { type: String },  // Label for the button
    url: { type: String },    // URL that the button links to
});

const AutomationSchema = new mongoose.Schema({
  // userId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   required: true,
  //   ref: 'User', // Reference to the user who owns this account
  // },
  mediaId: {
    type: String,
    required: true,
    unique: true,
  },
  trigger: {
    type: String,
    required: true,
  },
  accountId: {
    type: String,
    //required: true,
  },
  commentReply: {
    type: String,
  },
  direactMessage: {
    type: String,
  },
  askToFollow:{
    type:Boolean
  },
  initialMessage: {
    type: String,
  },
  buttons:{type:[buttonSchema]},
  commentCount:{
    type:Number,
    default:0,
  },
  replyCount:{
    type:Number,
    default:0,
  },
  isLive:{type:Boolean},
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});


const Automations = mongoose.models.Automations || mongoose.model('Automations', AutomationSchema);

export default Automations;

