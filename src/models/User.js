const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    authId:{
        type:String,
        require:true,
    },
    picture: {
        type: String,
        default: ''
    },
    authType: {
        type: String,
        required: true,
        enum: ['Facebook', 'Google'],
    },
    activePlan: { type: Boolean, default: true },
    isActive:{type:Boolean,default:true},
    role:{type:Number},
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});


const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;

