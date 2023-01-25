const { model, Schema } = require("mongoose");
const schema = new Schema({
    data: {
        type: Object,
        require: true
    },
    date: {
        type: Date,
        default: new Date()
    }
});
const Subject = new model("Subject", schema);
module.exports = Subject;
