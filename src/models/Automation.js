import { automationTypes } from '@/utils/automationTypes';

const mongoose = require('mongoose');


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
  },
  trigger: {
    type: String,
    required: true,
  },
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

