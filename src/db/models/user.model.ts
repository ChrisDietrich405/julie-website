import { Schema } from "mongoose";
import mongoose, {MongooseDocument} from "@/db/mongoose";
import {RoleEnum, UserBaseRequest} from '@/interfaces/user.interface'

type UserDocument = MongooseDocument<UserBaseRequest>;

if (!mongoose.models.users) {
  const userSchema = new Schema<UserDocument>({
    name: {
      type: String,
      required: true,
    },
    streetAddress: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    role: {
      type: Number,
      required: false,
      default: RoleEnum.CUSTOMER,
      enum: Object.values(RoleEnum).filter(val => typeof val === 'number'),
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  });
  mongoose.model<UserDocument>("users", userSchema);
}

export default mongoose.models.users as mongoose.Model<UserDocument>;
