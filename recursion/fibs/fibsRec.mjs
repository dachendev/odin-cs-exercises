export function fibsRec(num) {
  // base case
  if (num <= 0) {
    return [];
  }

  if (num === 1) {
    return [0];
  }

  if (num === 2) {
    return [0, 1];
  }

  const result = fibsRec(num - 1);

  // add the previous two values
  result.push(result[num - 2] + result[num - 3]);

  return result;
}
