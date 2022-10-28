const { model, Schema } = require("mongoose");
const schema = new Schema({
  category: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "pending",
  },
  visitor: {
    type: Number,
    default: 0
  },
  img: {
    type: String,
    required: true,
  },
  imgMobile: {
    type: String,
    default: "",
  },
  desc: {
    type: String,
    default: "",
  },
  code: {
    type: String,
    required: true,
  },
  css: {
    type: String,
    default: "",
  },
  user: {
    type: String,
    required: true
  }
});
const Component = new model("Component", schema);
module.exports = Component;
