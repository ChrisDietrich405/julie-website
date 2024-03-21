import { Document } from "mongoose";

interface UserDocument extends Document {
    name: String,
    streetAddress: String,
    city: String,
    email: String,
    password: String,
}

export default UserDocument;