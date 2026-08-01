import prisma from "../config/prisma.js";
import { Role } from "@prisma/client";
import { getSorting } from "../utils/sorting.js";

const ALLOWED_ROLES = Object.values(Role);

const ALLOWED_USER_SORT_FIELDS = [
  "name",
  "email",
  "address",
  "role",
  "createdAt",
];

const ALLOWED_STORE_SORT_FIELDS = [
  "name",
  "email",
  "address",
  "createdAt",
];

export const createAdminUser = async (data) => {
  return prisma.user.create({
    data,
  });
};

export const findUserByEmail = async (email) => {
  return prisma.user.findUnique({
    where: {
      email,
    },
  });
};

export const createStore = async (data) => {
  return prisma.store.create({
    data,
    include: {
      owner: true,
    },
  });
};

export const findStoreByEmail = async (email) => {
  return prisma.store.findUnique({
    where: {
      email,
    },
  });
};

export const findOwnerById = async (id) => {
  return prisma.user.findFirst({
    where: {
      id,
      role: Role.OWNER,
    },
  });
};

export const getUserCount = async () => {
  return prisma.user.count();
};

export const getStoreCount = async () => {
  return prisma.store.count();
};

export const getRatingCount = async () => {
  return prisma.rating.count();
};

export const getUsers = async ({
  skip,
  limit,
  search,
  role,
  sortBy,
  order,
}) => {

  const where = {};

  if (search) {
    where.OR = [
      { name: { contains: search } },
      { email: { contains: search } },
      { address: { contains: search } },
    ];
  }

if (ALLOWED_ROLES.includes(role)) {
  where.role = role;
}

const { field, direction } = getSorting(
  sortBy,
  order,
  ALLOWED_USER_SORT_FIELDS
);

  const [users, total] = await Promise.all([
    prisma.user.findMany({
      where,
      skip,
      take: limit,
     orderBy: {
  [field]: direction,
},
      select: {
        id: true,
        name: true,
        email: true,
        address: true,
        role: true,
        createdAt: true,
      },
    }),
    prisma.user.count({
      where,
    }),
  ]);

  return {
    users,
    total,
  };
};

export const getStores = async ({
  skip,
  limit,
  search,
  sortBy,
  order,
}) => {

  const where = {};

  if (search) {
    where.OR = [
      { name: { contains: search } },
      { email: { contains: search } },
      { address: { contains: search } },
    ];
  }

const { field, direction } = getSorting(
  sortBy,
  order,
  ALLOWED_STORE_SORT_FIELDS
);

  const [stores, total] = await Promise.all([
    prisma.store.findMany({
      where,
      skip,
      take: limit,
      orderBy: {
  [field]: direction,
},
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        ratings: {
          select: {
            rating: true,
          },
        },
      },
    }),

    prisma.store.count({
      where,
    }),
  ]);

  const formattedStores = stores.map((store) => {
    const totalRatings = store.ratings.length;

    const averageRating =
      totalRatings === 0
        ? 0
        : Number(
            (
              store.ratings.reduce(
                (sum, rating) => sum + rating.rating,
                0
              ) / totalRatings
            ).toFixed(1)
          );

    return {
      id: store.id,
      name: store.name,
      email: store.email,
      address: store.address,
      owner: store.owner,
      averageRating,
      totalRatings,
    };
  });

  return {
    stores: formattedStores,
    total,
  };
};

export const getDashboard = async () => {
  const [
    totalUsers,
    totalStores,
    totalRatings,
    recentUsers,
    recentStores,
  ] = await Promise.all([
    prisma.user.count(),

    prisma.store.count(),

    prisma.rating.count(),

    prisma.user.findMany({
      take: 5,
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        name: true,
        role: true,
      },
    }),

    prisma.store.findMany({
      take: 5,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        ratings: {
          select: {
            rating: true,
          },
        },
      },
    }),
  ]);

  return {
    totalUsers,
    totalStores,
    totalRatings,

    recentUsers,

    recentStores: recentStores.map((store) => {
      const total = store.ratings.length;

      return {
        id: store.id,
        name: store.name,
        averageRating:
          total === 0
            ? 0
            : Number(
                (
                  store.ratings.reduce(
                    (sum, rating) => sum + rating.rating,
                    0
                  ) / total
                ).toFixed(1)
              ),
      };
    }),
  };
};