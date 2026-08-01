import prisma from "../config/prisma.js";

export const findUserByEmail = async (email) => {
  return prisma.user.findUnique({
    where: {
      email,
    },
  });
};

export const createUser = async (data) => {
  return prisma.user.create({
    data,
  });
};

export const findUserById = async (id) => {
  return prisma.user.findUnique({
    where: {
      id,
    },
  });
};

export const updatePassword = async (id, password) => {
  return prisma.user.update({
    where: {
      id,
    },
    data: {
      password,
    },
  });
};

export const getProfile = async (id) => {
  return prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      address: true,
      role: true,
      createdAt: true,
    },
  });
};