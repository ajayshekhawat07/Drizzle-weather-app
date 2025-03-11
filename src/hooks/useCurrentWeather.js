import axios from "axios";
import useSWR from "swr";

const fetcher = async (URL) => {
  const response = await axios.get(URL);
  const data = response.data;
  return data;
};

export default function useCurrentWeather(latitude, longitude) {
  const { data, isLoading, error } = useSWR(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}5&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,wind_speed_10m&timezone=auto&past_days=1`,
    fetcher,
  );

  return { data, isLoading, error };
}
