const { faker } = require("@faker-js/faker/locale/en");
const { createPost } = require("../../services/postService");

module.exports = async function ({
  count = 10,
  minUser = 1,
  maxUser = 5,
  minActivity = 1,
  maxActivity = 5,
} = {}) {
  for (let i = 1; i <= count; i++) {
    const title = faker.lorem.words();
    const content = faker.lorem.paragraph();
    const likes = faker.number.int({ min: 0, max: 99 });
    const lng = faker.location.longitude();
    const lat = faker.location.latitude();
    const userId = faker.number.int({ min: minUser, max: maxUser });
    const activityId = faker.number.int({ min: minActivity, max: maxActivity });

    await createPost({
      title,
      content,
      likes,
      lng: parseFloat(lng),
      lat: parseFloat(lat),
      userId,
      activityId,
    });
  }
  console.log("Post table seeded successfully.\n\n");
};
