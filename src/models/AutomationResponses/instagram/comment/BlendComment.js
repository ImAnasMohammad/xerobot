import { automationTypes } from '@/utils/automationTypes';

const mongoose = require('mongoose');

const buttonSchema = new mongoose.Schema({
    title: { type: String, default: 'Click me' },
    url: { type: String },
    type: { type: String, default: "web_url" },
});

const BlendCommentSchema = new mongoose.Schema({
    automationId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Automation',
    },
    reply: {
        type: String,
        default: '',
    },
    dm: {
        type: String,
        default: '',
    },
    buttons: { type: [buttonSchema] },
});


const BlendComment = mongoose.models.BlendComment || mongoose.model('BlendComment', BlendCommentSchema);

export default BlendComment;

