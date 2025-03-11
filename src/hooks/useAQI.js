import axios from "axios";
import useSWR from "swr";

const fetcher = async (URL) => {
  const response = await axios.get(URL);
  const data = response.data;
  return data;
};

export default function useAQI(latitude, longitude) {
  const { data, isLoading, error } = useSWR(
    `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${latitude}&longitude=${longitude}&current=us_aqi,pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,sulphur_dioxide,ozone&timezone=auto&forecast_days=1`,
    fetcher,
  );

  return { data, isLoading, error };
}
