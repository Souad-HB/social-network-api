import db from "../config/connection.js";
import { User, Thought } from "../models/index.js";
import cleanDB from "./cleanDB.js";
import { getRandomName, getRandomEmail, getRandomThoughts } from "./data.js";

try {
  await db();
  await cleanDB();

  // Create empty array to hold the users

  const thoughts = getRandomThoughts(8);
  const createdThoughts = await Thought.insertMany(thoughts);

  // Collect thought _ids to assign to users
  const thoughtIds = createdThoughts.map((thought) => thought._id);

  const usedUsernames = new Set();
  const usedEmails = new Set();
  const users = [];

  // Loop 8 times -- add users to the users array
  for (let i = 0; i < 8; i++) {
    let username;
    do {
      username = getRandomName();
    } while (usedUsernames.has(username)); // Ensure unique username

    usedUsernames.add(username);
    let email;
    do {
      email = getRandomEmail();
    } while (usedEmails.has(email)); // ensure unique email
    usedEmails.add(email);
    const userThoughts = [thoughtIds[i % thoughtIds.length]];

    users.push({
      username,
      email,
      thoughts: userThoughts,
      
    });
  }
  const createdUsers = await User.insertMany(users);
  // Add one friend to each user
  for (let i = 0; i < createdUsers.length; i++) {
    const userId = createdUsers[i]._id;
    const friendId = createdUsers[(i + 1) % createdUsers.length]._id; // select the next user as a friend, looping back to the start

    await User.findByIdAndUpdate(userId, { $addToSet: { friends: friendId } });
  }

  // loop through the saved thoughts, for each thought we need to generate a reaction and insert the reaction
  console.table(users);
  console.table(thoughts);
  console.info("Seeding complete! 🌱");
  process.exit(0);
} catch (err) {
  console.log("error seeding the db", err);
}
