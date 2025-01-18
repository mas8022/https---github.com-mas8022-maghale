const regexAfterHint = /^.*\.(\d+)$/;
const regexBefotHint = /^(\d+)\.\d*$/;

const useConvertTime = (time) => {
  const pureHour = time / 3600;

  const hour = String(pureHour).replace(regexBefotHint, "$1");

  const hourHint = String(pureHour).replace(regexAfterHint, "$1");

  const minute = String(Math.floor(Number(`0.${hourHint}`) * 60));

  return { hour, minute };
};

export default useConvertTime;
