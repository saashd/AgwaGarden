"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: [true, "Please provide an Email!"],
        unique: [true, "Email Exist"],
    },
    password: {
        type: String,
        required: [true, "Please provide a password!"],
    },
    onboarding: {
        type: Date,
        required: true,
    },
    default_plants_selection: {
        type: Array,
        required: true,
    },
}, {
    timestamps: true,
    collection: "users"
});
exports.default = (0, mongoose_1.model)("User", userSchema);
