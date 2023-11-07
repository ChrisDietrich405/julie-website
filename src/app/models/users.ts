import mongoose from "@/lib/mongoose";
const { Schema } = mongoose;

if (!mongoose.models.users) { //this is referring to the db
  const usersSchema = new Schema({
    firstName: String,
    lastName: String,
    password: String,
    email: { type: String, unique: true },
  });

  mongoose.model("users", usersSchema);
}
export const UsersModel = mongoose.models.users;