const prisma = require("./prismaService");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

async function createUser({
  firstName,
  lastName,
  email,
  password,
  bio,
  profilePicture,
}) {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        bio,
        profilePicture,
      },
    });
    return user;
  } catch (error) {
    console.error(error);
    throw new Error(`Error creating user: ${error.message}`);
  }
}

async function deleteUser({ id }) {
  try {
    const user = await prisma.user.delete({
      where: {
        id: parseInt(id),
      },
    });
    return user;
  } catch (error) {
    console.error(error);
    throw new Error(`Error deleting user: ${error.message}`);
  }
}

async function findUserWithId({ id }) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (!user) {
      return;
    }
    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      bio: user.bio,
      profilePicture: user.profilePicture,
    };
  } catch (error) {
    console.error(error);
    throw new Error(`Error finding user: ${error.message}`);
  }
}

async function findUserWithEmail({ email }) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    return user;
  } catch (error) {
    console.error(error);
    throw new Error(`Error finding user: ${error.message}`);
  }
}

async function updateUser({ id, data }) {
  try {
    const user = await prisma.user.update({
      where: {
        id: parseInt(id),
      },
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        bio: data.bio,
        profilePicture: data.profilePicture,
      },
    });
    if (!user) {
      return;
    }
    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      bio: user.bio,
      profilePicture: user.profilePicture,
    };
  } catch (error) {
    throw new Error(`Error updating user: ${error.message}`);
  }
}
async function registerUser({ firstName, lastName, email, password }) {
  try {
    // Check if user already exists
    const existingUser = await findUserWithEmail({ email });
    if (existingUser) {
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new 4rfv
    const newUser = await createUser({
      email,
      password: hashedPassword,
      firstName,
      lastName,
    });

    // Generate JWT token
    const token = jwt.sign(
      {
        id: newUser.id,
        email: newUser.email,
      },
      JWT_SECRET
    );

    return {
      token,
      user: {
        id: newUser.id,
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        bio: newUser.bio,
        profilePicture: newUser.profilePicture,
      },
    };
  } catch (error) {
    console.error(error);
    throw new Error(`Error registering user: ${error.message}`);
  }
}
async function loginUser({ email, password }) {
  try {
    const user = await findUserWithEmail({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      JWT_SECRET
    );

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        bio: user.bio,
        profilePicture: user.profilePicture,
      },
    };
  } catch (error) {
    console.error(error.message);
    throw new Error(`Error signing user: ${error.message}`);
  }
}

module.exports = {
  findUserWithEmail,
  deleteUser,
  createUser,
  findUserWithId,
  loginUser,
  registerUser,
  updateUser,
};
