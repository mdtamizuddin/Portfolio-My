const mongoose = require("mongoose");

const memberSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "user",
  },
  user: {
    type: Object,
    required: true,
  },
});

const Member = new mongoose.model("Member", memberSchema);

module.exports = Member;
