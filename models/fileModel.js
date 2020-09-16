const mongoose = require('mongoose');
const schema = mongoose.Schema;
var Paginate = require('mongoose-paginate');

var fileModel = new schema({
    fileName: {
        type: String
    },
    fileExtension: {
        type: String
    },
    fileSize:{
        type:Number
    },
    fileUrl:{
        type:String
    },
    status: {
        type: String,
        enum: ["ACTIVE",  "DELETE"],
        default: "ACTIVE"
    },


}, { timestamps: true });

fileModel.plugin(Paginate);
module.exports = mongoose.model("file", fileModel);

