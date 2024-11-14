export const sortByPrice = <T extends { price: number }>(
  items: T[],
  direction: "asc" | "desc" = "asc"
): T[] => {
  return [...items].sort((a, b) => {
    if (direction === "asc") {
      return a.price - b.price;
    } else {
      return b.price - a.price;
    }
  });
};
