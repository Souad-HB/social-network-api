import { Types } from "mongoose";

const usernames = ["Souad", "Hayden", "Peter"];
// const emails = ["Souad@gmail.com", "Hayden@gmail.com", "Peter@gmail.com"];
const thoughtTexts = [
  "I love coding!",
  "Mongo is ok I guess.",
  "Life is great.",
];
const reactions = ["Nice thought!", "I agree!", "Well said!"];

// Helper function to get a random item from an array
const getRandomArrItem = (arr: any[]) =>
  arr[Math.floor(Math.random() * arr.length)];

// Generate random thoughts with associated reactions
const getRandomThoughts = () => {
  return [
    {
      thoughtText: getRandomArrItem(thoughtTexts),
      username: "Souad",
      reactions: getThoughtReactions(2), // Souad's thought has reactions
    },
    {
      thoughtText: getRandomArrItem(thoughtTexts),
      username: "Hayden",
      reactions: [], // Hayden's thought has no reactions
    },
  ];
};

// Generate random reactions for thoughts
const getThoughtReactions = (numReactions: number) => {
  const reactionsArr = [];

  for (let i = 0; i < numReactions; i++) {
    reactionsArr.push({
      reactionId: new Types.ObjectId(),
      reactionBody: getRandomArrItem(reactions),
      username: getRandomArrItem(usernames),
    });
  }

  return reactionsArr;
};

// Generate three users with different configurations for thoughts and friends
const getRandomUsers = (thoughtIds: Types.ObjectId[]) => {
  const peterId = new Types.ObjectId();
  return [
    {
      username: "Souad",
      email: "Souad@gmail.com",
      thoughts: [thoughtIds[0]], // Souad has one thought
      friends: [], // Souad has no friends
    },
    {
      username: "Hayden",
      email: "Hayden@gmail.com",
      thoughts: [thoughtIds[1]], // Hayden has one thought
      friends: [peterId], // Hayden has Peter as a friend
    },
    {
      _id: peterId,
      username: "Peter",
      email: "Peter@gmail.com",
      thoughts: [], // Peter has no thoughts
      friends: [], // Peter has no friends
    },
  ];
};

export { getRandomUsers, getRandomThoughts };
