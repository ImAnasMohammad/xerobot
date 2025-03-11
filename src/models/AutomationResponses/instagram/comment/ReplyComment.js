


const mongoose = require('mongoose');


const ReplyCommentSchema = new mongoose.Schema({
  automationId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Automation',
    unique: true,
  },
  reply: {
    type: String,
    required: true,
  },
});


const ReplyComment = mongoose.models.ReplyComment || mongoose.model('ReplyComment', ReplyCommentSchema);

export default ReplyComment;

