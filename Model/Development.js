const { model, Schema } = require("mongoose");
const schema = new Schema({
    title: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    visitor: {
        type: Number,
        default: 0
    },
    desc: {
        type: String,
        default: "",
    },
    user: {
        type: String,
        required: true
    }
});
const Component = new model("Development", schema);
module.exports = Component;
