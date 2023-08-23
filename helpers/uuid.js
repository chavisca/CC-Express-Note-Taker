// Immediately export a function that generates a string of random numbers and letters
function uuid() {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
};