const Mongoose = require("mongoose");
const crypto = require("crypto");
const { kStringMaxLength } = require("buffer");
const Schema = Mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    hashedPassword:{
        type: String,
        required: true,
    },
    hashedCode: {
        type: String,
    },
    codeDate: {
        type: Date,
    },
    salt: {
        type: String,
    },
    tokens: {
        type: [String],
        default: [],
    },
    roles: {
        type: [String],
        default: [],
    },
    dui: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: "https://cdn-icons-png.flaticon.com/512/64/64572.png"
    },
    reviews: {
        type: [{
            user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true},
            rating:{
                type: Number,
                required: true,
            },
            content: {
                type: String,
            },
            timestamp: {
                type: Date,
                required: true
            }
        }]
    }

}, {timestamps: true});

userSchema.methods = {
    encryptPassword: function (password) {
        if (!password) return "";
        try {
            const _password = crypto.pbkdf2Sync(
                password,
                this.salt,
                1000, 64,
                `sha512`
            ).toString("hex");
            return _password;
        } catch (error) {
            debug({error});
            return "";
        }
    },
    compareCode: function (code) {
        return this.hashedCode === this.encryptPassword(code);
    },
    makeSalt: function () {
        return crypto.randomBytes(16).toString("hex");
    },
    comparePassword: function (password) {
        return this.hashedPassword === this.encryptPassword(password);
    }
}

userSchema
    .virtual("password")
    .set(function(password = crypto.randomBytes(16).toString()){
        this.salt = this.makeSalt();
        this.hashedPassword = this.encryptPassword(password);
    });

//Al setear password se crea una nueva salt,
//Antes de volver a setear (actualizar) la contra, necesita confirmar el código, por lo que siempre se usará la que se crea con la contra
userSchema  
    .virtual("code")
    .set(function(code = crypto.randomBytes(16).toString()){
        this.hashedCode = this.encryptPassword(code);
    });

module.exports = Mongoose.model("User", userSchema);