const mongoose = require("mongoose");

const noticeSchema = new mongoose.Schema({
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Notice", noticeSchema);
