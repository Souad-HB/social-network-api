import { Document, Schema, model, ObjectId } from "mongoose";

// define the user interface
interface IUser extends Document {
  username: string;
  email: string;
  thoughts: ObjectId[];
  friends: ObjectId[];
  friendCount: number;
}

// define the schema to create User model
const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^([a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+)$/,
        "Please use a valid email address",
      ],
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false, // disable the virtual id property
  }
);

// creating a virtual property friendCount that retrieves the length of the user's friends array
userSchema
  .virtual("friendCount")
  .get(function (this: IUser) { // this doesnt doesnt modify the data in the db
    return this.friends.length;
  });

// initialize the user model
const User = model("User", userSchema);

export default User;
