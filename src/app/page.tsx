'use client'
import Detail from "@/components/weather/Detail";
import SearchSideMenu from "@/components/weather/SearchSideMenu";
import Summary from "@/components/weather/Summary";
import { WeatherProvider } from "@/contexts/WeatherContext";

export default function Home() {
  return (
    <div className="text-textColor flex flex-col md:flex-row min-h-screen max-w-full font-raleway text-base">
      <WeatherProvider>
        <SearchSideMenu />
        <Summary />
        <Detail />
      </WeatherProvider>
    </div>
  );
}
