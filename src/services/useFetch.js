import { useCallback, useEffect, useState } from "react";

const CORS_BRIDGE_API_KEY = "98962845-3242-4056-bec2-0d078e520371";
const apiOptions = {
  headers: {
    "x-cors-grida-api-key": CORS_BRIDGE_API_KEY,
  },
};

const baseUrl =
  "https://cors.bridged.cc/https://www.metaweather.com/api/location/";

const useFetch = (location) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const findIdByLatLong = useCallback(async (loc) => {
    const { lat, long } = loc;
    try {
      const response = await fetch(
        baseUrl + `search/?lattlong=${lat},${long}`,
        apiOptions
      );
      if (response.ok) {
        const json = await response.json();
        getWeather(json[0].woeid);
      } else {
        throw response;
      }
    } catch (e) {
      setError(e);
    }
  }, []);

  async function getWeather(id) {
    try {
      const response = await fetch(baseUrl + `${id}`, apiOptions);
      if (response.ok) {
        const json = await response.json();
        setData(json);
      } else {
        throw response;
      }
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    findIdByLatLong(location);
  }, [location, findIdByLatLong]);
  return { data, error, loading, setLoading };
};

export default useFetch;
