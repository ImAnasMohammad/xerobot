

const mongoose = require('mongoose');


const DMCommentSchema = new mongoose.Schema({
  automationId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Automation',
  },
  dm: {
    type: String,
    required: true,
  },
});


const DMComment = mongoose.models.DMComment || mongoose.model('DMComment', DMCommentSchema);

export default DMComment;

