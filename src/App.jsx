import { createContext, useState } from "react";
import SearchBox from "@/components/SearchBox";
import Header from "@/components/Header";
import CurrentWeather from "@/components/CurrentWeather";
import TodaysForecast from "@/components/TodayWeather";
import AirQuality from "@/components/AirQuality";
import WeeklyForecast from "@/components/WeeklyForecast";
import Footer from "./components/Footer";

const LocationContext = createContext(null);

function App() {
  const [location, setLocation] = useState({
    id: 1261481,
    name: "New Delhi",
    latitude: 28.63576,
    longitude: 77.22445,
    country_code: "IN",
    country: "India",
    admin1: "Delhi",
  });

  return (
    <LocationContext.Provider value={{ location, setLocation }}>
      <main className="">
        <div className="m-4">
          <Header />
          <div className="mb-6">
            <SearchBox />
          </div>
        </div>
        <div className="flex justify-center mb-6">
          <div className="mt-6 grid w-10/11 grid-cols-12 gap-4 md:w-3/5">
            <div className="col-span-12">
              <CurrentWeather />
            </div>
            <div className="col-span-12 md:col-span-6">
              <TodaysForecast />
            </div>
            <div className="col-span-12 md:col-span-6">
              <AirQuality />
            </div>
            <div className="col-span-12">
              <WeeklyForecast />
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </LocationContext.Provider>
  );
}

export default App;
export { LocationContext };
