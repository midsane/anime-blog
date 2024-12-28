import mongoose, {mongo, Schema} from "mongoose";

const PostSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  rating: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  format: {
    type: String,
    required: true,
  },
  episodes: {
    type: String,
    required: true,
  },
  longDescription: {
    type: String,
    required: true,
  },
  imageLinks: {
    type: [String],
    required: true,
  },
  imageCredits: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },

  RecommendationTitle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Article",
  },
  tags: {
    type: [String],
    required: true,
  },
  releaseDate: {
    type: String,
    required: true,
  },
});

export const Post = mongoose.model("Post", PostSchema)