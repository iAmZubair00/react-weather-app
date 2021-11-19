export const getCorrectScaledTemp = (scale, temp) =>
  scale === "c" ? temp : Math.trunc(temp * (9 / 5) + 32);

export const fetcher = (url) => fetch(url).then((res) => res.json());
