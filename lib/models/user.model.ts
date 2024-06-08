import mongoose from "mongoose";

const followerSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const reactionSchema = new mongoose.Schema({
  thread: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Thread",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const userSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: String,
  bio: String,
  position: String,
  Potential: String,
  WeakFoot: String,
  Skill: String,
  Crossing: String,
  Finishing: String,
  Heading: String,
  ShortPass: String,
  Volley: String,
  Dribbling: String,
  Curve: String,
  Freekick: String,
  LongPass: String,
  BallControl: String,
  Acceleration: String,
  Speed: String,
  Agility: String,
  Reactions: String,
  Balance: String,
  ShotPower: String,
  Stamina: String,
  LongShots: String,
  Aggression: String,
  Intercept: String,
  Positioning: String,
  Vision: String,
  Penalties: String,
  Composure: String,
  Tackle: String,
  SlidingTackle: String,
  Height: String,
  Weight: String,
  GKReflexes: String,

  followers: [followerSchema],
  following: [followerSchema],
  threads: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Thread",
    },
  ],
  reactions: [reactionSchema],
  onboarded: {
    type: Boolean,
    default: false,
  },
  communities: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Community",
    },
  ],
  events: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
    },
  ],
});

userSchema.virtual("threadsCount").get(function () {
  return this.threads.length;
});

userSchema.virtual("followersCount").get(function () {
  return this.followers.length;
});

userSchema.virtual("followingCount").get(function () {
  return this.following.length;
});

userSchema.virtual("communitiesCount").get(function () {
  return this.communities.length;
});

userSchema.virtual("reactionsCount").get(function () {
  return this.reactions.length;
});

userSchema.virtual("eventsCount").get(function () {
  return this.events.length;
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
