const { faker } = require("@faker-js/faker/locale/en");
const { createActivity } = require("../../services/activityService");

module.exports = async function ({ count = 5, minUser = 1, maxUser = 5 } = {}) {
  for (let i = 0; i < count; i++) {
    const name = faker.helpers.arrayElement([
      "Hiking",
      "Cycling",
      "Swimming",
      "Running",
      "Yoga",
    ]);
    const description = faker.lorem.sentence();
    const profile = faker.image.url();
    const color = faker.internet.color();
    const userId = faker.number.int({ min: minUser, max: maxUser });

    await createActivity({
      name,
      description,
      profile,
      color,
      userId,
    });
  }
  console.log("Activity table seeded successfully.\n\n");
};
