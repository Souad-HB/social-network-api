const usernames = [
  "Souad",
  "Sarah",
  "Hayden",
  "Parker",
  "Asma",
  "Justin",
  "Ana",
  "Tom",
];

const emails = [
  "test1@gmail.com",
  "test2@gmail.com",
  "test3@gmail.com",
  "test4@gmail.com",
  "test5@gmail.com",
  "test6@gmail.com",
  "test7@gmail.com",
  "test8@gmail.com",
];

const thoughtText = [
  "Today is a nice day",
  "I cant seem to find my phone",
  "I think I should take off work",
  "I think I should change jobs",
  "My love for my husband is big",
  "I should get more clothes",
  "Wearing new clothes is such a therapy",
  "Stupid Social Media App",
];

const possibleReactions = [
  "Wow",
  "Surprised",
  "Angry",
  "Thumbs up",
  "Thumbs down",
  "Laugh",
];

// Get a random item given an array
const getRandomArrItem = (arr: any[]) =>
  arr[Math.floor(Math.random() * arr.length)];

// Gets a random  username
const getRandomName = () => `${getRandomArrItem(usernames)}`;
// gets a random email
const getRandomEmail = () => `${getRandomArrItem(emails)}`;

// Function to generate random thoughtText that we can add to the database. Includes thought reactions.
const getRandomThoughts = (int: number) => {
  let results = [];
  for (let i = 0; i < int; i++) {
    results.push({
      username: getRandomName(),
      thoughtText: getRandomArrItem(thoughtText),
      reactions: [...getThoughtReactions(2)],
    });
  }
  return results;
};

// Create the tags that will be added to each application
const getThoughtReactions = (int: number) => {
  if (int === 1) {
    return getRandomArrItem(possibleReactions);
  }
  const results = [];
  for (let i = 0; i < int; i++) {
    results.push({
      reactionBody: getRandomArrItem(possibleReactions),
      username: getRandomName(),
    });
  }
  return results;
};

// Export the functions for use in seed.js
export { getRandomName, getRandomThoughts, getRandomEmail };
