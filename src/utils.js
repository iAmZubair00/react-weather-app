export const getCorrectScaledTemp = (scale, temp) =>
  scale === "c" ? temp : Math.trunc(temp * (9 / 5) + 32);

export const fetcher = (url) => fetch(url).then((res) => res.json());

var currentLocation;
export const getCurrentLocation = () => {
  navigator.geolocation.getCurrentPosition((position) => {
    currentLocation = {
      lat: position.coords.latitude,
      long: position.coords.longitude,
    };
  });
  console.log(currentLocation);
  return currentLocation;
};
