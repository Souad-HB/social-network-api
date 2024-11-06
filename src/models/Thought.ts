import { Document, model, Schema } from "mongoose";
import Reaction from "./Reaction.js";

// define the thought interface
interface IThought extends Document {
  thoughtText: string;
  createdAt: Date | string;
  username: string;
  reactions: (typeof Reaction)[];
  reactionCount: number;
}

// create the thought schema
const thoughtSchema = new Schema<IThought>(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (val: Date) => val.toLocaleString(), // formats the date
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [Reaction], // embeds reaction as an array of subdocuments
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

// initialize the thought model
const Thought = model("thought", thoughtSchema);

export default Thought;
