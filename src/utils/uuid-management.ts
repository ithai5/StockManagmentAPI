export const convertV4ToMongo = (currentV4: string): string => {
  return currentV4.replace(/-/g, "");
};
