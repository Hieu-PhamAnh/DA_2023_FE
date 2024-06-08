import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    lastMessageAt: { type: Date, default: null },
    messages: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Message",
        },
      ],
      default: [],
    },
  },
  {
    timestamps: true,
    versionKey: false, // disable versionKey
  }
);

const Chat = mongoose.model("Chat", chatSchema);

export default Chat;
