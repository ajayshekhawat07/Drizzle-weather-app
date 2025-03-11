import axios from "axios";
import useSWR from "swr";

const fetcher = async (URL) => {
  const response = await axios.get(URL);
  const data = response.data;
  return data;
};

export default function useLocation(query) {
  const { data, isLoading, error } = useSWR(
    !query || query.trim().length < 2
      ? null
      : `https://geocoding-api.open-meteo.com/v1/search?name=${query}&count=10&language=en&format=json`,
    fetcher,
  );

  return { data, isLoading, error };
}
