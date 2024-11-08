import { Types } from "mongoose";

// Sample data arrays for random selection
const usernames = ["Souad", "Hayden", "Peter"];
// const emails = ["Souad@gmail.com", "Hayden@gmail.com", "Peter@gmail.com"];
const thoughtTexts = [
  "I love coding!",
  "JavaScript is awesome.",
  "Mongoose makes life easier.",
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
      friends: [new Types.ObjectId()], // Hayden has one friend
    },
    {
      username: "Peter",
      email: "Peter@gmail.com",
      thoughts: [], // Peter has no thoughts
      friends: [], // Peter has no friends
    },
  ];
};

// Export the functions for use in seeding
export { getRandomUsers, getRandomThoughts };

// const usernames = [
//   "Souad",
//   "Ana",
//   "Hayden",
//   // "Parker",
//   // "Asma",
//   // "Justin",
//   // "Ana",
//   // "Tom",
// ];

// const emails = [
//   "test1@gmail.com",
//   "test2@gmail.com",
//   "test3@gmail.com",
//   // "test4@gmail.com",
//   // "test5@gmail.com",
//   // "test6@gmail.com",
//   // "test7@gmail.com",
//   // "test8@gmail.com",
// ];

// const thoughtText = [
//   "Today is a nice day",
//   "I cant seem to find my phone",
//   "I think I should take off work",
//   "I think I should change jobs",
//   "My love for my husband is big",
//   "I should get more clothes",
//   "Wearing new clothes is such a therapy",
//   "Stupid Social Media App",
// ];

// const possibleReactions = [
//   "Wow",
//   "Surprised",
//   "Angry",
//   "Thumbs up",
//   "Thumbs down",
//   "Laugh",
// ];

// // Get a random item given an array
// const getRandomArrItem = (arr: any[]) =>
//   arr[Math.floor(Math.random() * arr.length)];

// // Gets a random  username
// const getRandomName = () => `${getRandomArrItem(usernames)}`;
// // gets a random email
// const getRandomEmail = () => `${getRandomArrItem(emails)}`;

// // Function to generate random thoughtText that we can add to the database. Includes thought reactions.
// const getRandomThoughts = (int: number) => {
//   let results = [];
//   for (let i = 0; i < int; i++) {
//     results.push({
//       username: getRandomName(),
//       thoughtText: getRandomArrItem(thoughtText),
//       reactions: [...getThoughtReactions(1)],
//     });
//   }
//   return results;
// };

// // Create the tags that will be added to each application
// const getThoughtReactions = (int: number) => {

//   const results = [];
//   for (let i = 0; i < int; i++) {
//     results.push({
//       reactionBody: getRandomArrItem(possibleReactions),
//       username: getRandomName(),
//     });
//   }
//   return results;
// };

// // Export the functions for use in seed.js
// export { getRandomName, getRandomThoughts, getRandomEmail };
