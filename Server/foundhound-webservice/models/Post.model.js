const Mongoose = require("mongoose");
const POST_CONSTANTS = require("../data/posts.constants.json");
const Schema = Mongoose.Schema;

const postSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    name: {
        type: String,
    },
    image:{
        type: String,
        default: "https://www.yiwubazaar.com/resources/assets/images/default-product.jpg",
        required: true,
    },
    animal:{
        type: String,
        required: true,
    },
    breed: {
        type: [String],
        required: true,
    },
    sex: {
        type: String,
        required: true,
    },
    color: {
        type: [String],
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    localization: {
        type: String,
    },
    helpers: {
        type: [Schema.Types.ObjectId],
        ref: "User",
        default: [],
    },
    date: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        default: POST_CONSTANTS.STATUS.ACTIVE,
        required: true,
    },
    reports: {
        type: [{
            user: {
                type: Schema.Types.ObjectId,
                ref: "User",
                required: true,
            },
            content: {
                type: String,
                required: true
            },
        }],
        default: []
    }
}, {timestamps: true})

module.exports = Mongoose.model("Post", postSchema);