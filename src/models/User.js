const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        default:''
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
        enum: ['facebook', 'google'],
    },
    activePlan: { type: Boolean, default: true },
    isActive:{type:Boolean,default:true},
    role:{type:Number,default:0},
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

