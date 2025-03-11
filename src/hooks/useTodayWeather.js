import axios from "axios";
import useSWR from "swr";

const fetcher = async (URL) => {
  const response = await axios.get(URL);
  const data = response.data;
  return data;
};

export default function useTodayWeather(latitude, longitude) {
  const { data, isLoading, error } = useSWR(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_sum,precipitation_probability_max,wind_direction_10m_dominant&timezone=auto&forecast_days=1`,
    fetcher,
  );

  return { data, isLoading, error };
}
