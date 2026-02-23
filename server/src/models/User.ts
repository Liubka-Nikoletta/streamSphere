import bcrypt from 'bcrypt';
import {Schema, model, Document, CallbackError} from 'mongoose';

interface IUser extends Document {
    userName: string;
    email: string;
    password: string;
}

const userSchema = new Schema<IUser>({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    }
})

userSchema.pre<IUser>('save', async function () {
    if(!this.isModified('password')) return;
    try{
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    } catch(err){
        throw err;
    }
})

export const User = model<IUser>('User', userSchema);