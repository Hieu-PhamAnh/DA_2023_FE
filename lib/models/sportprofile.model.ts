import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    position: { type: String, default: "" },
    Crossing: { type: Number, default: "" },
    Finishing: { type: Number, default: "" },
    Heading: { type: Number, default: "" },
    ShortPass: { type: Number, default: "" },
    Freekick: { type: Number, default: "" },
    LongPass: { type: Number, default: "" },
    BallControl: { type: Number, default: "" },
    Intercept: { type: Number, default: "" },
    Positioning: { type: Number, default: "" },
    Marking: { type: Number, default: "" },
    Tackle: { type: Number, default: "" },
    GKReflexes: { type: Number, default: "" },
    Height: { type: Number, default: "" },
    Weight: { type: Number, default: "" },
  },
  {
    timestamps: true,
    versionKey: false, // disable versionKey
  }
);

const Profile = mongoose.model("Profile", profileSchema);

export default Profile;
