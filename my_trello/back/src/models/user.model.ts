import { model, Schema} from "mongoose";
import { UserDocument } from "../types/user.interface";
import validator from "validator";
import { genSalt, hash, compare} from "bcryptjs";

const userSchema = new Schema<UserDocument>({
    email: {
        type: String,
        require: [true, "The email is required!"],
        validate: [validator.isEmail, "Invalid email!"],
        createIndexs: { unique: true }
    },
    name: {
        type: String,
        require: [true, "The name is required!"]
    },
    username: {
        type: String,
        require: [true, "The usename is required!"],
        validate: [validator.isLowercase, "The username must be lowercase!"],
        select: false
    },
    password: {
        type: String,
        require: [true, "The password is required!"],
        select: false
    }
},{
    timestamps: true
});

userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        return next();
    }
    try {
        const salt = await genSalt(10);
        this.password = await hash(this.password, salt);
        return next();
    } catch (error) {
        return next(error as Error);
    }
});

userSchema.methods.validatePassword = function(password: string){
    return compare(password, this.password);
}

export default model<UserDocument>("User", userSchema);