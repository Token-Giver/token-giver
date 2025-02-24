export const generateRandomInt = (length: number) => {
  if (length <= 0 || !Number.isInteger(length)) {
    throw new Error("Length must be a positive integer");
  }

  // Using crypto.getRandomValues for cryptographically secure random numbers
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);

  const min = 10 ** (length - 1);
  const max = 10 ** length - 1;

  return Math.floor((array[0] / (0xffffffff + 1)) * (max - min + 1)) + min;
};
