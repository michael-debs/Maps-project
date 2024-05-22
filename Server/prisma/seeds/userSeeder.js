const { createUser } = require("../../services/userService");
const bcrypt = require("bcrypt");
const { faker } = require("@faker-js/faker/locale/en");
const path = require("path");
const fs = require("fs/promises");

module.exports = async function ({ count = 5 } = {}) {
  const filePath = path.join(__dirname, "user_data.dummy.txt");
  await deleteIfExists(filePath);
  for (let i = 0; i < count; i++) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const email = faker.internet.email({ firstName, lastName });
    const password = faker.internet.password();
    const hashedPassword = await bcrypt.hash(password, 10);
    const bio = faker.person.bio();
    const profilePicture = faker.image.avatar();

    const data = `Email: ${email}\nPassword: ${password}\nHashed Password: ${hashedPassword}\n\n`;

    try {
      await fs.appendFile(filePath, data);
    } catch (err) {
      console.error("Error writing to file", err);
    }
    await createUser({
      firstName,
      lastName,
      email,
      password,
      bio,
      profilePicture,
    });
  }
  console.log(
    "User table seeded successfully - You can find each user's email and password in the user_data.dummy.txt.\n\n"
  );
};

async function deleteIfExists(filePath) {
  try {
    await fs.access(filePath); 
    await fs.unlink(filePath); 
  } catch (err) {
    console.error("File does not exist or cannot be deleted:", err);
  }
}
