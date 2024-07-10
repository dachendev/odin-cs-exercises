export function merge(left, right) {
  // merge the sorted halves
  const result = [];
  let leftIndex = 0;
  let rightIndex = 0;

  while (leftIndex < left.length && rightIndex < right.length) {
    // compare the left and right values
    if (left[leftIndex] < right[rightIndex]) {
      result.push(left[leftIndex]);
      leftIndex++;
    } else {
      result.push(right[rightIndex]);
      rightIndex++;
    }
  }

  // add any remaining values from the left half
  if (leftIndex < left.length) {
    result.push(...left.slice(leftIndex));
  }

  // add any remaining values from the right half
  if (rightIndex < right.length) {
    result.push(...right.slice(rightIndex));
  }

  return result;
}

export function mergeSort(arr) {
  // base case
  if (arr.length <= 1) {
    return arr;
  }

  // get the midpoint
  const midpoint = Math.floor(arr.length / 2);

  // split the array in half
  const left = arr.slice(0, midpoint);
  const right = arr.slice(midpoint);

  // merge the sorted halves
  return merge(mergeSort(left), mergeSort(right));
}
