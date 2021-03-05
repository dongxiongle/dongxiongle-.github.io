export const Compare = {
  LESS_THEN: -1,
  BIGGER_THAN: 1
};

export const defaultCompare = (a: number | string, b: number | string) => {
  if (a === b) {
    return 0;
  }
  return a < b ? Compare.LESS_THEN : Compare.BIGGER_THAN;
};
