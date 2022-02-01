export const getRandomNumber = () => {
  return (
    Date.now() + Math.floor(Math.random() * (999999 - 100000) + 100000) + 1
  );
};
