import prisma from "../config/prisma.js";
import { getSorting } from "../utils/sorting.js";

export const findUserByEmail = async (email) => {
  return prisma.user.findUnique({
    where: { email },
  });
};

export const findUserById = async (id) => {
  return prisma.user.findUnique({
    where: { id },
  });
};

export const createUser = async (data) => {
  return prisma.user.create({
    data,
  });
};

export const updatePassword = async (id, password) => {
  return prisma.user.update({
    where: { id },
    data: {
      password,
    },
  });
};

export const countUsers = async () => {
  return prisma.user.count();
};

export const getStores = async ({
  userId,
  skip,
  limit,
  search,
  sortBy,
  order,
}) => {
  const where = {};

  if (search) {
    where.OR = [
      {
        name: {
          contains: search,
        },
      },
      {
        address: {
          contains: search,
        },
      },
    ];
  }

  const { field, direction } = getSorting(
    sortBy,
    order,
    ["name", "email", "address", "createdAt"]
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
        ratings: {
          select: {
            rating: true,
            userId: true,
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
                (sum, item) => sum + item.rating,
                0
              ) / totalRatings
            ).toFixed(1)
          );

    const myRating =
      store.ratings.find((rating) => rating.userId === userId)?.rating ??
      null;

    return {
      id: store.id,
      name: store.name,
      address: store.address,
      averageRating,
      myRating,
    };
  });

  return {
    stores: formattedStores,
    total,
  };
};

export const submitRating = async ({
  userId,
  storeId,
  rating,
}) => {
  const store = await prisma.store.findUnique({
    where: {
      id: storeId,
    },
  });

  if (!store) {
    throw new Error("Store not found");
  }

  return prisma.rating.upsert({
    where: {
      userId_storeId: {
        userId,
        storeId,
      },
    },
    update: {
      rating,
    },
    create: {
      userId,
      storeId,
      rating,
    },
    select: {
      id: true,
      storeId: true,
      rating: true,
      updatedAt: true,
    },
  });
};