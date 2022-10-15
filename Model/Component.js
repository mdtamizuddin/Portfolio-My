const { model, Schema, models } = require("mongoose");
const schema = new Schema({
  category: {
    type: String,
    required: true,
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
});
const Component = new model("Component", schema);
module.exports = Component;
