import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    time: { type: Date, default: new Date() },
    from: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    content: { type: String, default: "" },
  },
  {
    timestamps: true,
    versionKey: false, // disable versionKey
  }
);

const Message = mongoose.model("Message", messageSchema);

export default Message;
