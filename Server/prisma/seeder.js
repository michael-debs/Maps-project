const prisma = require("../services/prismaService");
const activitySeeder = require("./seeds/activitySeeder");
const postSeeder = require("./seeds/postSeeder");
const userSeeder = require("./seeds/userSeeder");

try {
    seed()
} catch (error) {
    console.error(error)
}

async function seed() {

    await userSeeder();
    await activitySeeder();
    await postSeeder();
}