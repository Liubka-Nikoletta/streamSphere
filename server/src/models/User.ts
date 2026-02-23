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
        required: [true, 'User name is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
        match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters']
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