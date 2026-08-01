import prisma from "../config/prisma.js";

export const getDashboard = async (ownerId,   sortBy = "name",
  order = "asc") => {
  const store = await prisma.store.findFirst({
    where: {
      ownerId,
    },
    include: {
ratings: {
  orderBy:
    sortBy === "rating"
      ? {
          rating: order,
        }
      : {
          user: {
            [sortBy]: order,
          },
        },

  include: {
    user: {
      select: {
        id: true,
        name: true,
        email: true,
      },
    },
  },
},
    },
  });

  if (!store) {
    throw new Error("Store not found");
  }

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

  return {
    store: {
      id: store.id,
      name: store.name,
      email: store.email,
      address: store.address,
      averageRating,
      totalRatings,
    },
    ratings: store.ratings.map((rating) => ({
      userId: rating.user.id,
      name: rating.user.name,
      email: rating.user.email,
      rating: rating.rating,
    })),
  };
};