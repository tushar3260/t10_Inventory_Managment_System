import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,       // makes sure every category has a name
      unique: true,         // no duplicate categories
      trim: true,           // removes extra spaces
    },
    description: {
      type: String,
      default: "",          // optional description
      trim: true,
    },
  },
  { timestamps: true }       // adds createdAt and updatedAt automatically
);

export default mongoose.model("Category", categorySchema);
