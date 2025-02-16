import { automationTypes } from '@/utils/automationTypes';

const mongoose = require('mongoose');

const buttonSchema = new mongoose.Schema({
  title: { type: String,default:'Click me' },
  url: { type: String },
  type:{type:String,default:"web_url"},
});

const AutomationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  name:{
    type:String,
    default:'Automation'
  },
  type: {
    type: String,
    required: true,
    enum: automationTypes,
  },
  accountId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'SocialMediaAccounts',
  },
  mediaId: {
    type: String,
    required: true,
    unique: true,
  },
  trigger: {
    type: String,
    required: true,
  },
  commentReply: {
    type: String,
  },
  message: {
    type: String,
  },
  askToFollow:{
    type:Boolean
  },
  initialMessage: {
    type: String,
  },
  buttons:{type:[buttonSchema]},
  imageUrl:{type:String},
  imageTitle:{type:String},
  imageSubTitle:{type:String},
  imageDefaultAction:{type:String},
  receivedCount:{
    type:Number,
    default:0,
  },
  respondedCount:{
    type:Number,
    default:0,
  },
  isLive:{type:Boolean,default:true},
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

