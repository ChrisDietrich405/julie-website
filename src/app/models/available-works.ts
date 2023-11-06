import mongoose from "@/lib/mongoose";
const { Schema } = mongoose;

if (!mongoose.models.available_works) {
  const availableWorksSchema = new Schema({
    price: Number,
    image: String,
  });
  mongoose.model("available_works", availableWorksSchema);
}
export const AvailableWorksModel = mongoose.models.available_works;

//model is a mongoose method to join the collection with the schema

//the models are all the collections (an object containing all of the collections)