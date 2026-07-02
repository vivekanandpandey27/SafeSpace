import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    image: { type: String, default: 'https://cdn-icons-png.flaticon.com/512/149/149071.png' },
    phone: { type: String, default: '000000000' },
    address: { type: Object, default: { line1: '', line2: '' } },
    gender: { type: String, default: 'Not Selected' },
    dob: { type: String, default: 'Not Selected' },
    password: { type: String, required: false },      // optional for Google OAuth users
    googleId: { type: String, default: null },        // Google's unique user ID
    authProvider: { type: String, default: 'local' }, // 'local' or 'google'
})

const userModel = mongoose.models.user || mongoose.model("user", userSchema);
export default userModel;