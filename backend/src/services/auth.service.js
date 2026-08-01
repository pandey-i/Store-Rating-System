import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import {
  findUserByEmail,
  createUser,
  findUserById,
  updatePassword,
  getProfile,
} from "../repositories/auth.repository.js";

// Register
export const registerUser = async (userData) => {
  const { name, email, password, address } = userData;

  const existingUser = await findUserByEmail(email);

  if (existingUser) {
    throw new Error("Email already registered");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  return createUser({
    name,
    email,
    password: hashedPassword,
    address,
    role: "USER",
  });
};

// Login
export const loginUser = async (email, password) => {
  const user = await findUserByEmail(email);

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw new Error("Invalid email or password");
  }

  const token = jwt.sign(
    {
      id: user.id,
      role: user.role,
      email: user.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );

  return {
    token,
    user,
  };
};

// Profile
export const getProfileService = async (id) => {
  const user = await getProfile(id);

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

// Change Password
// Change Password
export const changeUserPassword = async (
  userId,
  currentPassword,
  newPassword
) => {
  const user = await findUserById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  // Verify current password
  const match = await bcrypt.compare(
    currentPassword,
    user.password
  );

  if (!match) {
    throw new Error("Current password is incorrect");
  }

  // Prevent using the same password again
  const isSamePassword = await bcrypt.compare(
    newPassword,
    user.password
  );

  if (isSamePassword) {
    throw new Error(
      "New password must be different from the current password"
    );
  }

  // Hash and update password
  const hashedPassword = await bcrypt.hash(
    newPassword,
    10
  );

  await updatePassword(userId, hashedPassword);

  return true;
};