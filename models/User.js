const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    joinDate: {
        type: Date,
        default: Date.now,
    },
    favourites: {
        type: [Schema.Types.ObjectId],
        ref: 'Recipe',
    },
});

UserSchema.set('autoIndex', false);

module.exports = mongoose.model('User', UserSchema);