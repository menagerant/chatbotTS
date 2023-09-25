import { Schema, model, models } from "mongoose";

const ChatSchema = new Schema({
  id: {
    type: String,
    unique: [true, "Id already exists."],
    required: [true, "Id is required!"],
  },
  firstConnection: {
    type: Date,
    required: [true, "First date is required!"],
  },
  lastConnection: {
    type: Date,
    required: [true, "Last date is required!"],
  },
  messages: {
    type: String,
    required: false,
  },
});

const Chat = models.Chat || model("Chat", ChatSchema);

export default Chat;
