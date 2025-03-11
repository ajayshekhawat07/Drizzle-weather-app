import axios from "axios";
import useSWR from "swr";

const fetcher = async (URL) => {
  const response = await axios.get(URL);
  const data = response.data;
  return data;
};

export default function useWeeklyForecast(latitude, longitude) {
  const { data, isLoading, error } = useSWR(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,wind_speed_10m_max&timezone=auto&past_days=1`,
    fetcher,
  );

  return { data, isLoading, error };
}
