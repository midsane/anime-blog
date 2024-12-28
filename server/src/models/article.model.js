import mongoose, {Schema} from "mongoose";
const articleSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  intro: {
    type: String,
    required: true,
  },
  bannerImgLink: {
    type: String,
    required: true
  },
  List: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Post",
  }
});

export const Article = mongoose.model("Article", articleSchema)