export const sleep = async (time: number) => {
  await new Promise(resolve => {
    setTimeout(() => {
      resolve('done');
    }, time);
  });
};
