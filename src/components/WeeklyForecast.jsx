import useWeeklyForecast from "@/hooks/useWeeklyForecast";
import { useContext } from "react";
import { LocationContext } from "../App";
import { weatherImageMap } from "@/utils/weatherImageMap";

export default function WeeklyForecast() {
  const { location } = useContext(LocationContext);
  const { data, isLoading, error } = useWeeklyForecast(
    location.latitude,
    location.longitude,
  );

  const {
    time,
    weather_code: weatherCode,
    temperature_2m_max: maxTemperature,
    temperature_2m_min: minTemperature,
    precipitation_probability_max: precipitationProbability,
    wind_speed_10m_max: windSpeed,
  } = data?.daily || {};

  const getWeekDay = (someDay) => {
    const today = new Date().getDate();
    const someDate = new Date(someDay);
    const someDateDay = someDate.toLocaleString("default", { weekday: "long" });

    const dateDifference = today - someDate.getDate();
    if (dateDifference === 0) {
      return "Today";
    }
    if (dateDifference === 1) {
      return "Yesterday";
    }
    if (dateDifference === -1) {
      return "Tomorrow";
    }

    return someDateDay;
  };

  const getDate = (time) => {
    const dateISO = new Date(time);
    const timeString = dateISO.toLocaleString("default", {
      day: "2-digit",
      month: "short",
    });
    return timeString;
  };

  const getWeatherImage = (weatherCode) => {
    const imageCode = `${weatherCode}d`;
    const image = weatherImageMap[imageCode];
    return image;
  };

  return (
    <div className="bg-base-200 card relative flex min-h-[10rem] p-4">
      {error && (
        <div className="flex h-full w-full justify-center">
          <div className="text-red-500">Something went wrong!</div>
        </div>
      )}

      {isLoading && (
        <div className="absolute inset-0">
          <div className="skeleton h-full w-full"></div>
        </div>
      )}

      <div className="">
        <p className="m-4 text-center text-xl font-light">Weekly Forecast</p>
        <ul className="grid gap-2 space-y-4 md:grid-cols-4">
          {time?.map((date, index) => (
            <li key={date}>
              <div className="bg-base-300 flex flex-col items-center px-4 py-2 card">
                <p className="text-sm">{getDate(date)}</p>
                <p className="text-sm">{getWeekDay(date)}</p>
                <img
                  className="size-12"
                  src={getWeatherImage(weatherCode[index])?.imageSrc}
                  alt={getWeatherImage(weatherCode[index])?.description}
                />
                <p className="text-sm">
                  {getWeatherImage(weatherCode[index])?.description}
                </p>
                <p className="p-2 font-mono text-lg font-semibold">
                  {maxTemperature?.[index]}° / {minTemperature?.[index]}°
                </p>
                <div className="flex items-center">
                  <img className="size-11" src="/rain-probability.svg" />
                  <p className="font-mono text-lg font-semibold">
                    {precipitationProbability?.[index]} %
                  </p>
                </div>
                <p className="text-xs">Chances of rain</p>
                <div className="flex items-center gap-2 pt-2">
                  <img className="size-10" src="/wind.svg" alt="wind-svg" />
                  <p className="font-mono text-lg font-semibold">
                    {windSpeed?.[index]} km/h
                  </p>
                </div>
                <p className="text-xs">Wind</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
