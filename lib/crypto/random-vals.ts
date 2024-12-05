export const getRandomValues = () => {
  const array = new Uint32Array(1);

  const [vals] = crypto.getRandomValues(array);

  return vals;
};
