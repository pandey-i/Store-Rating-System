export const getSorting = (
  sortBy,
  order,
  allowedFields,
  defaultField = "createdAt"
) => {
  return {
    field: allowedFields.includes(sortBy)
      ? sortBy
      : defaultField,
    direction: order === "asc" ? "asc" : "desc",
  };
};