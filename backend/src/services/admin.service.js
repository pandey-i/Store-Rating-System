import bcrypt from "bcrypt";

import {
  createAdminUser,
  findUserByEmail,
  createStore,
  findStoreByEmail,
  findOwnerById,
  getDashboard,
  getUsers,
  getStores,
} from "../repositories/admin.repository.js";

import { getPagination } from "../utils/pagination.js";

export const createUserService = async (userData) => {
  const { name, email, password, address, role } = userData;

  const existing = await findUserByEmail(email);

  if (existing) {
    throw new Error("Email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  return createAdminUser({
    name,
    email,
    password: hashedPassword,
    address,
    role,
  });
};

export const createStoreService = async (storeData) => {
  const { name, email, address, ownerId } = storeData;

  const existingStore = await findStoreByEmail(email);

  if (existingStore) {
    throw new Error("Store email already exists");
  }

  const owner = await findOwnerById(Number(ownerId));

  if (!owner) {
    throw new Error("Selected owner does not exist or is not a Store Owner");
  }

  return createStore({
    name,
    email,
    address,
    ownerId: Number(ownerId),
  });
};

// export const getDashboardStatsService = async () => {
//   const [totalUsers, totalStores, totalRatings] = await Promise.all([
//     getUserCount(),
//     getStoreCount(),
//     getRatingCount(),
//   ]);

//   return {
//     totalUsers,
//     totalStores,
//     totalRatings,
//   };
// };
export const getDashboardStatsService = async () => {
  return getDashboard();
};

export const getUsersService = async (query) => {
  const { limit, skip } = getPagination(query);

  return getUsers({
    skip,
    limit,
    search: query.search || "",
    role: query.role,
    sortBy: query.sortBy || "createdAt",
    order: query.order || "desc",
  });
};

export const getStoresService = async (query) => {
  const {  limit, skip } = getPagination(query);

  return getStores({
    skip,
    limit,
    search: query.search || "",
    sortBy: query.sortBy || "createdAt",
    order: query.order || "desc",
  });
};