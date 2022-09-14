import { Schema, model } from "mongoose";

const PollSchema = new Schema({
    title: String,
    options: [{ option: String, votes: { type: Number, default: 0 } }]
    
});

const Poll = model("polls", PollSchema);

export default Poll;
