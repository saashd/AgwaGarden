import {IUser} from "../types/user"
import {model, Schema} from "mongoose"

const userSchema: Schema = new Schema(
    {
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
    },
    {
        timestamps: true,
        collection: "users"
    }
);

export default model<IUser>("User", userSchema)