import { getDashboard } from "../repositories/owner.repository.js";

export const getDashboardService = async (
  ownerId,
  sortBy,
  order
) => {
  return getDashboard(
    ownerId,
    sortBy,
    order
  );
};